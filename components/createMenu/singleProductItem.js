import React, { useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { ListItem, Icon } from "@rneui/themed";
import theme from "../../config/theme";
import RBSheet from "react-native-raw-bottom-sheet";
import AddEditProductForm from "./addEditProductForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleProductItem = ({ item, fetchProductData }) => {
  const refEditProductSheet = useRef();
  return (
    <ListItem.Swipeable
      containerStyle={styles.container}
      leftWidth={80}
      rightWidth={90}
      minSlideWidth={0}
      leftContent={() => (
        <TouchableOpacity
          style={styles.swipedButton}
          onPress={async () => {
            await axios.delete("http://localhost:3000/product/remove", {
              data: {
                userID: await AsyncStorage.getItem("userID"),
                restaurantID: await AsyncStorage.getItem("restaurantID"),
                productID: item._id,
              },
            });
            fetchProductData();
          }}
        >
          <Icon
            type="material"
            name="delete-forever"
            color={theme.colors.four}
            size={40}
          />
        </TouchableOpacity>
      )}
      rightContent={() => {
        return (
          <View>
            <TouchableOpacity
              style={styles.swipedButton}
              onPress={() => {
                refEditProductSheet.current.open();
              }}
            >
              <Icon
                type="feather"
                name="edit"
                color={theme.colors.two}
                size={35}
              />
            </TouchableOpacity>
            <RBSheet
              ref={refEditProductSheet}
              closeOnDragDown={true}
              height={720}
              customStyles={{
                wrapper: {
                  backgroundColor: "transparent",
                },
                container: {
                  backgroundColor: theme.colors.white,
                  paddingHorizontal: 60,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: -5,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 6.27,

                  elevation: 10,
                },
                draggableIcon: {
                  backgroundColor: theme.colors.one,
                },
              }}
            >
              <AddEditProductForm
                bottomSheet={refEditProductSheet}
                item={item}
                fetchProductData={fetchProductData}
              />
            </RBSheet>
          </View>
        );
      }}
    >
      <View style={styles.priceBox}>
        <Text style={styles.tooman}>تومان</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={styles.flexBox}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.description}</Text>
        </View>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.img} />
        ) : (
          <Image
            source={require("../../assets/img/food (1).svg")}
            style={styles.img}
          />
        )}
      </View>
    </ListItem.Swipeable>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 80,
    borderColor: theme.colors.one,
    borderWidth: 0,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    backgroundColor: theme.colors.white,
    elevation: 11,
    marginBottom: 10,
  },
  flexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 20,
  },
  title: {
    fontFamily: theme.typography.productTitle.fontFamily,
    fontSize: theme.typography.productTitle.fontSize,
    color: theme.colors.darkTextColor,
    textAlign: "right",
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: theme.typography.productSubTitle.fontFamily,
    fontSize: theme.typography.productSubTitle.fontSize,
    color: theme.colors.lightTextColor,
    textAlign: "right",
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  tooman: {
    fontFamily: theme.typography.productSubTitle.fontFamily,
    fontSize: theme.typography.productSubTitle.fontSize,
    color: theme.colors.lightTextColor,
    textAlign: "right",
  },
  price: {
    fontFamily: theme.typography.productPrice.fontFamily,
    fontSize: theme.typography.productPrice.fontSize,
    color: theme.colors.darkTextColor,
    textAlign: "right",
    marginLeft: 5,
  },
  swipedButton: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SingleProductItem;
