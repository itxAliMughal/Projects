import React from "react";
import { helperService } from "../../utils/helper";
import { Link } from "react-router-dom";
import { UNAUTHENTICATED_ROUTES } from "../../utils/constant";
import AudiImage from "../../Audi.jpg";

function SinglePost({ singlePost }) {
  return (
    <>
      <Link
        to={UNAUTHENTICATED_ROUTES.POST_DETAIL.replace(
          ":postId",
          singlePost?.id
        )}
      >
        <h2>{singlePost?.post_title}</h2>
        <p className="lead">
          by <a href="index.php">{singlePost?.post_author}</a>
        </p>
        <p>
          <span className="glyphicon glyphicon-time"></span> Posted on &nbsp;{" "}
          {helperService.convertDateToOurFormat(singlePost?.post_date)}
        </p>
        <hr />
        {singlePost?.image ? (
          <img src={singlePost?.image} />
        ) : (
          <img className="img-responsive" src={AudiImage} alt="" />
        )}

        <hr />
        <p>{singlePost?.post_content}</p>
        <a className="btn btn-primary" href="#">
          Read More <span className="glyphicon glyphicon-chevron-right"></span>
        </a>
        <hr />
      </Link>
    </>
  );
}

export default SinglePost;
