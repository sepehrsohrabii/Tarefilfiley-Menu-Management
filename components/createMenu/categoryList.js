import { Icon } from "@rneui/themed";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import theme from "../../config/theme";
import AddEditCategoryForm from "./addEditCategoryForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ fetchData, item }) => {
  const refRBSheet2 = useRef();
  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          refRBSheet2.current.open();
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subTitle}>۱۲ مورد</Text>
        <Icon type="material" name="edit" color={theme.colors.two} />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        height={300}
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
        <AddEditCategoryForm
          fetchData={fetchData}
          item={item}
          bottomSheet={refRBSheet2}
        />
      </RBSheet>
    </View>
  );
};

const CategoryList = () => {
  const [dataList, setDataList] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
  ]);

  const fetchData = async () => {
    const userID = await AsyncStorage.getItem("userID");
    const restaurantID = await AsyncStorage.getItem("restaurantID");
    const response = await axios.post("https://api.tarefilfiley.me/category/all", {
      userID,
      restaurantID,
    });
    setDataList([
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      ...response.data,
    ]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refRBSheet = useRef();

  return (
    <FlatList
      data={dataList}
      renderItem={({ item, index }) => {
        if (index == 0) {
          return (
            <View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              >
                <Text style={styles.addButtonText}>جدید</Text>
                <Icon type="material" name="add" color={theme.colors.white} />
              </TouchableOpacity>
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={300}
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
                <AddEditCategoryForm
                  fetchData={fetchData}
                  item={null}
                  bottomSheet={refRBSheet}
                />
              </RBSheet>
            </View>
          );
        } else {
          return <Item fetchData={fetchData} item={item} />;
        }
      }}
      keyExtractor={(item) => item.id}
      horizontal={true}
      inverted
      style={{ paddingVertical: 6 }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: 150,
    height: 100,
    borderColor: theme.colors.one,
    borderWidth: 0,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    backgroundColor: theme.colors.white,
    elevation: 11,
    marginLeft: 10,
    marginVertical: 0,
  },
  title: {
    fontFamily: theme.typography.subTitle.fontFamily,
    fontSize: theme.typography.subTitle.fontSize,
    color: theme.colors.darkTextColor,
  },
  subTitle: {
    fontFamily: theme.typography.smallest.fontFamily,
    fontSize: theme.typography.smallest.fontSize,
    color: theme.colors.lightTextColor,
    marginBottom: 5,
  },
  addButton: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.four,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    marginLeft: 10,
    marginRight: 30,
  },
  addButtonText: {
    fontFamily: theme.typography.subTitle.fontFamily,
    fontSize: theme.typography.subTitle.fontSize,
    color: theme.colors.white,
    marginBottom: 5,
  },
});

export default CategoryList;
