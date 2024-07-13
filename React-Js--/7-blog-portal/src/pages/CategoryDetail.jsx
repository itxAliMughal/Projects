import React from "react";
import SinglePost from "../components/SinglePost/SinglePost";
import { Spin, Typography } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { categoryService } from "../services/categories.service";

function CategoryDetail() {
  const { catId } = useParams();
  const { data: catDataById, isLoading: catLoader } = useQuery(
    ["categoryById", catId],
    () => categoryService.getCategoriesById(catId),
    {
      enabled: Boolean(catId),
    }
  );

  const singleCategoryData = catDataById?.data?.results;

  // console.log(singleCategoryData, "singleCategoryData");

  return (
    <Spin spinning={catLoader}>
      <Typography.Title>Category Detail</Typography.Title>
      {singleCategoryData?.posts?.length > 0
        ? singleCategoryData?.posts?.map((singlePost) => {
            return <SinglePost singlePost={singlePost} />;
          })
        : !catLoader && <h2>No Post Found</h2>}
    </Spin>
  );
}

export default CategoryDetail;
