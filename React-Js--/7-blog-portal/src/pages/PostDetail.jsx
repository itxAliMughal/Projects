import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { postService } from "../services/posts.service";
import { helperService } from "../utils/helper";
import PradoImage from "../Audi.jpg";
import { Spin, message } from "antd";
import { UNAUTHENTICATED_ROUTES } from "../utils/constant";
import { commentService } from "../services/comments.service";

function PostDetail() {
  const { postId } = useParams();
  const [commentValue, setCommentValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: commentRequest, isLoading: commentLoader } = useMutation(
    ["storeComment", postId],
    (payload) => commentService.storeComment(payload)
  );

  const commentSubmitHandler = (event) => {
    event.preventDefault();

    const payload = {
      comment_content: commentValue,
      post_id: postId,
    };

    commentRequest(payload, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Comment added successfully but approval is required.",
        });

        setCommentValue("");
      },
    });
  };

  const commentChangeHandler = (e) => {
    e.preventDefault();
    setCommentValue(e.target.value);
  };

  const { data: postDetailData, isLoading: postDetailLoader } = useQuery(
    ["postDetail", postId],
    () => postService.getPostById(postId),
    {
      enabled: Boolean(postId),
    }
  );

  const singlePost = postDetailData?.data?.results;

  return (
    <Spin spinning={postDetailLoader}>
      {contextHolder}
      <>
        <h1>{singlePost?.post_title}</h1>
        <p className="lead">
          by <a href="#">{singlePost?.post_author}</a>
        </p>
        <hr />
        <p>
          <span className="glyphicon glyphicon-time"></span> Posted on &nbsp;{" "}
          {helperService.convertDateToOurFormat(singlePost?.post_date)}
        </p>
        <hr />
        <Link
          to={UNAUTHENTICATED_ROUTES.POST_DETAIL.replace(
            ":postId",
            singlePost?.id
          )}
        >
          {singlePost?.image ? (
            <img className="img-responsive" src={singlePost?.image} alt="" />
          ) : (
            <img className="img-responsive" src={PradoImage} alt="" />
          )}
        </Link>
        <hr />
        <p className="lead">{singlePost?.post_content}</p>
        <hr />

        <div className="well">
          <h4>Leave a Comment:</h4>
          <form role="form" onSubmit={commentSubmitHandler}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                value={commentValue}
                onChange={commentChangeHandler}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!Boolean(commentValue) || commentLoader}
            >
              Submit
            </button>
          </form>
        </div>
        <hr />

        {/* <!-- Posted Comments --> */}

        {/* <!-- Comment --> */}
        <div class="media">
          <a class="pull-left" href="#">
            <img class="media-object" src="http://placehold.it/64x64" alt="" />
          </a>
          <div class="media-body">
            <h4 class="media-heading">
              Start Bootstrap
              <small>August 25, 2014 at 9:30 PM</small>
            </h4>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
            in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
            nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </div>
        </div>
      </>
    </Spin>
  );
}

export default PostDetail;
