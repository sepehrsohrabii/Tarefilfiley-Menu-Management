import { Icon } from "@rneui/base";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import theme from "../../config/theme";
import createOrEditProduct from "../../handlers/createOrEditProductHandler";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddEditProductForm = ({ bottomSheet, item, fetchProductData }) => {
  let image = "";
  let title = "";
  let description = "";
  let price = "";
  let category = "";

  if (item) {
    image = item.image;
    title = item.title;
    description = item.description;
    price = item.price;
    category = item.category;
  }
  const [productImage, setProductImage] = useState(image);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };
  const [error, setError] = useState("");
  const [productTitle, onChangeProductTitle] = useState(title);
  const [productDescription, onChangeProductDescription] =
    useState(description);
  const [productPrice, onChangeProductPrice] = useState(price);
  const [productCategory, setProductCategory] = useState(category);
  const [allCats, setAllCats] = useState([]);
  useEffect(() => {
    setProductCategory(category);
  }, [category]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userID = await AsyncStorage.getItem("userID");
    const restaurantID = await AsyncStorage.getItem("restaurantID");
    const response = await axios.post(
      "https://api.tarefilfiley.me/category/all",
      {
        userID,
        restaurantID,
      }
    );
    setAllCats(response.data);
  };
  return (
    <SafeAreaView>
      <View style={styles.box}>
        <View>
          {productImage ? (
            <Image source={{ uri: productImage }} style={styles.imgBox} />
          ) : (
            <Image
              source={require("../../assets/img/food (2).svg")}
              style={styles.imgBox}
            />
          )}
        </View>
        <View style={styles.imgInputBox}>
          <Label>عکس محصول</Label>
          <View style={styles.buttonBoxWidth}>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => {
                bottomSheet.current.close();
              }}
            >
              <Icon
                type="material"
                name="delete-forever"
                color={theme.colors.four}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Icon
                type="feather"
                name="upload-cloud"
                color={theme.colors.one}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Label style={styles.label}>نام محصول</Label>
      <TextInput
        style={styles.input}
        onChangeText={onChangeProductTitle}
        value={productTitle}
        placeholder="کوفت ..."
        inputMode="text"
      />
      <Label style={styles.label}>دسته بندی محصول</Label>
      <View style={{ direction: "rtl" }}>
        <Picker
          style={styles.picker}
          itemStyle={styles.itemPicker}
          selectedValue={productCategory}
          onValueChange={(itemValue) => {
            setProductCategory(itemValue);
          }}
        >
          {allCats.map((element) => {
            return (
              <Picker.Item
                style={styles.itemPicker}
                label={element.title}
                value={element._id}
              />
            );
          })}
        </Picker>
      </View>
      <Label style={styles.label}>توضیحات محصول</Label>
      <TextInput
        style={styles.descInput}
        onChangeText={onChangeProductDescription}
        value={productDescription}
        placeholder="کوفت ..."
        inputMode="text"
        multiline={true}
        numberOfLines={4}
      />
      <Label style={styles.label}>قیمت به تومان</Label>
      <TextInput
        style={styles.input}
        onChangeText={onChangeProductPrice}
        value={productPrice}
        placeholder="۳۶۰۰"
        inputMode="numeric"
      />
      <View style={styles.buttonBox}>
        {isLoading ? (
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <ActivityIndicator size="small" color={theme.colors.three} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsLoading(true);
              createOrEditProduct({
                bottomSheet,
                item,
                productImage,
                productTitle,
                productDescription,
                productPrice,
                productCategory,
                setError,
                fetchProductData,
              });
              setIsLoading(false);
            }}
          >
            <ButtonText>ثبت</ButtonText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
const Label = styled.Text`
  font-family: ${theme.typography.label.fontFamily};
  font-size: ${theme.typography.label.fontSize};
  color: ${theme.colors.darkTextColor};
  margin-bottom: 10px;
  padding-right: 10px;
`;
const ButtonText = styled.Text`
  font-family: ${theme.typography.subTitle_M.fontFamily};
  font-size: ${theme.typography.subTitle_M.fontSize};
  color: ${theme.colors.white};
  text-align: center;
`;
const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    textAlign: "right",
    fontFamily: "IS",
    backgroundColor: theme.colors.lightGray,
    borderWidth: 0,
    placeholderTextColor: theme.colors.lightTextColor,
  },
  picker: {
    height: 50,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    textAlign: "right",
    fontFamily: "IS",
    backgroundColor: theme.colors.lightGray,
    borderWidth: 0,
    placeholderTextColor: theme.colors.lightTextColor,
  },
  itemPicker: {
    height: 50,
    padding: 10,
    fontFamily: "IS",
    backgroundColor: theme.colors.lightGray,
  },
  descInput: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    textAlign: "right",
    fontFamily: "IS",
    backgroundColor: theme.colors.lightGray,
    borderWidth: 0,
    placeholderTextColor: theme.colors.lightTextColor,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  buttonBoxWidth: {
    flexDirection: "row",
    justifyContent: "right",
    flex: 1,
    alignItems: "center",
  },
  button: {
    flex: 0.8,
    backgroundColor: theme.colors.one,
    borderRadius: 10,
    padding: "13px",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  imageButton: {
    padding: "13px",
  },
  buttonDelete: {
    flex: 0.2,
    borderRadius: 10,
    padding: "13px",
  },
  buttonDelete2: {
    flex: 0.1,
    backgroundColor: theme.colors.four,
    borderRadius: 10,
    padding: "13px",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  imgPreBox: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: theme.colors.one,
    borderWidth: 1,
  },
  imgBox: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  imgInputBox: {
    flex: 0.9,
  },
  label: {
    marginTop: 20,
  },
});

export default AddEditProductForm;
