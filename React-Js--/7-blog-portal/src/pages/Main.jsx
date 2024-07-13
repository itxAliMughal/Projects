import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { postService } from "../services/posts.service";
import { helperService } from "../utils/helper";
import SinglePost from "../components/SinglePost/SinglePost";

function Main() {
  const { data: postData, isLoading: postsLoader } = useQuery("posts", () =>
    postService.getPosts()
  );

  const posts = useMemo(
    () => postData?.data?.results,
    [postData?.data?.results]
  );

  return (
    <div>
      <h1 className="page-header">Blog Posts</h1>

      {/* <!-- First Blog Post --> */}
      {posts?.length > 0 ? (
        posts.map((singlePost) => {
          return <SinglePost singlePost={singlePost} />;
        })
      ) : !postsLoader ? (
        <h2>Not Found</h2>
      ) : postsLoader === "loading" ? (
        <h2>Loading...</h2>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default Main;
