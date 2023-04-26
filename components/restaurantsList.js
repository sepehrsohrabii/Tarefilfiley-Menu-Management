import React from "react";
import { FlatList, View } from "react-native";
import SingleRestaurantItem from "./singleRestaurantItem";


const RestaurantsList = ({ restaurants, fetchRestaurantsData }) => {
  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <SingleRestaurantItem
              item={item}
              fetchRestaurantsData={fetchRestaurantsData}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        style={{ overflow: "visible", marginVertical: 20 }}
      />
    </View>
  );
};
export default RestaurantsList;
