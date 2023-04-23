import React from "react";
import { FlatList } from "react-native";
import SingleProductItem from "./singleProductItem";

const ProductList = ({ dataList, fetchProductData }) => {
  return (
    <FlatList
      data={dataList}
      renderItem={({ item }) => {
        return (
          <SingleProductItem item={item} fetchProductData={fetchProductData} />
        );
      }}
      keyExtractor={(item) => item.id}
      style={{ overflow: "visible" }}
    />
  );
};

export default ProductList;
