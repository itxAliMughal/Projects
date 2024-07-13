import React from "react";
import { useQuery } from "react-query";
import { SearchService } from "../services/search.service";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import SinglePost from "../components/SinglePost/SinglePost";

function SearchDetail() {
  const { query } = useParams();

  const { data: searchPostData, isLoading: searchPostLoader } = useQuery(
    ["search", query],
    () =>
      SearchService.searchPost({
        query_custom: query,
      }),
    {
      enabled: Boolean(query),
    }
  );

  const searchData = searchPostData?.data?.results;

  return (
    <Spin spinning={searchPostLoader}>
      <h2>Search Detail</h2>
      {searchData?.length > 0
        ? searchData.map((singlePost) => <SinglePost singlePost={singlePost} />)
        : !searchPostLoader && <h2>No Post Found!</h2>}
    </Spin>
  );
}

export default SearchDetail;
