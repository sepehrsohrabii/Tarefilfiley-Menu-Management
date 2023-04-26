import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import theme from "../../config/theme";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "@rneui/themed";
import CategoryList from "./categoryList";
import ProductList from "./productList";
import RBSheet from "react-native-raw-bottom-sheet";
import AddEditProductForm from "./addEditProductForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CreateMenuMainForm = ({
  persianName,
  englishName,
  link,
  img,
  logo,
  phone,
  hours,
}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [persianNameState, onChangePersianName] = useState(persianName || "");
  const [englishNameState, onChangeEnglishName] = useState(englishName || "");
  const [linkState, setLink] = useState(link || "");
  const [phoneState, onChangePhone] = useState(phone || "");
  const [clocksState, onChangeClocks] = useState(hours || "");
  const [imageState, setImage] = useState(img || null);
  const [logoState, setLogo] = useState(logo || null);
  const refProductSheet = useRef();
  const handleEnglishNameChange = (text) => {
    onChangeEnglishName(text);
    const convertToUrl = (text) => {
      return text.trim().toLowerCase().replace(/\s+/g, "-");
    };
    setLink(convertToUrl(text));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const pickLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = async () => {
    const userID = await AsyncStorage.getItem("userID");
    const restaurantID = await AsyncStorage.getItem("restaurantID");
    const response = await axios.post(
      "https://api.tarefilfiley.me/product/all",
      {
        userID,
        restaurantID,
      }
    );
    setDataList(response.data);
  };
  return (
    <SafeAreaView>
      <Padding>
        <Label>نام مجموعه به فارسی</Label>
        <TextInput
          style={styles.input}
          onChangeText={onChangePersianName}
          value={persianNameState}
          placeholder="عمو خسرو ..."
          inputMode="text"
        />
        <Label>نام مجموعه به انگلیسی</Label>
        <TextInput
          style={styles.input}
          onChangeText={handleEnglishNameChange}
          value={englishNameState}
          placeholder="Amoo Khosro ..."
          inputMode="text"
        />
        <Label>لینک اختصاصی مجموعه</Label>
        <TextInput
          style={styles.input}
          onChangeText={setLink}
          value={linkState}
          placeholder="amoo-khosro ..."
          inputMode="text"
        />
        <Label>عکس عمودی برای صفحه اول</Label>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <ButtonText>انتخاب عکس</ButtonText>
          <Icon type="feather" name="upload-cloud" />
        </TouchableOpacity>
        <Label>لوگو</Label>
        <TouchableOpacity style={styles.button} onPress={pickLogo}>
          <ButtonText>انتخاب لوگو</ButtonText>
          <Icon type="feather" name="upload-cloud" />
        </TouchableOpacity>
        <Label>تلفن تماس</Label>
        <TextInput
          style={styles.input}
          onChangeText={onChangePhone}
          value={phoneState}
          placeholder="09369671111"
          inputMode="tel"
        />
        <Label>ساعت کاری</Label>
        <TextInput
          style={styles.bigInput}
          onChangeText={onChangeClocks}
          value={clocksState}
          placeholder={"صبح ها:\nاز ساعت فلان تا فلان"}
          multiline={true}
          numberOfLines={4}
        />
      </Padding>
      <Padding>
        <Label>دسته بندی ها</Label>
      </Padding>
      <CategoryList />
      <Padding>
        <View style={styles.productListTitleBox}>
          <TouchableOpacity
            onPress={() => {
              refProductSheet.current.open();
            }}
          >
            <View style={styles.addProduct}>
              <Icon type="material" name="add" color={theme.colors.white} />
            </View>
          </TouchableOpacity>
          <RBSheet
            ref={refProductSheet}
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
              dataList={dataList}
              fetchProductData={fetchProductData}
              bottomSheet={refProductSheet}
            />
          </RBSheet>
          <ProductListLabel>لیست محصولات</ProductListLabel>
        </View>
        <ProductList
          dataList={dataList}
          fetchProductData={fetchProductData}
          bottomSheet={refProductSheet}
        />
        {isLoading ? (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={async (req, res) => {}}
          >
            <ActivityIndicator size="small" color={theme.colors.three} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={async (req, res) => {
              const userID = await AsyncStorage.getItem("userID");
              const restaurantID = await AsyncStorage.getItem("restaurantID");
              setIsLoading(true);
              const response = await axios.post(
                "https://api.tarefilfiley.me/restaurant/update",
                {
                  restaurantID: restaurantID,
                  persianName: persianNameState,
                  englishName: englishNameState,
                  link: linkState,
                  img: imageState,
                  logo: logoState,
                  phone: phoneState,
                  hours: clocksState,
                  userID: userID,
                }
              );
              setIsLoading(false);
              navigation.navigate("Restaurants");
            }}
          >
            <SaveButtonText>ذخیره</SaveButtonText>
          </TouchableOpacity>
        )}
      </Padding>
    </SafeAreaView>
  );
};
const Padding = styled.View`
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
`;
const Label = styled.Text`
  font-family: ${theme.typography.label.fontFamily};
  font-size: ${theme.typography.label.fontSize};
  color: ${theme.colors.darkTextColor};
  margin-top: 30px;
  margin-bottom: 10px;
  padding-right: 10px;
`;
const ProductListLabel = styled.Text`
  font-family: ${theme.typography.label.fontFamily};
  font-size: ${theme.typography.label.fontSize};
  color: ${theme.colors.darkTextColor};
`;
const ButtonText = styled.Text`
  font-family: ${theme.typography.subTitle_M.fontFamily};
  font-size: ${theme.typography.subTitle_M.fontSize};
  color: ${theme.colors.darkTextColor};
  text-align: center;
  margin-right: 10px;
`;
const SaveButtonText = styled.Text`
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
  bigInput: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    textAlign: "right",
    fontFamily: "IS",
    backgroundColor: theme.colors.lightGray,
    borderWidth: 0,
    placeholderTextColor: theme.colors.lightTextColor,
  },
  button: {
    borderColor: theme.colors.four,
    borderWidth: 2,
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
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productListTitleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
    paddingRight: 10,
  },
  addProduct: {
    backgroundColor: theme.colors.four,
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
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
    marginTop: 30,
    marginBottom: 30,
  },
});
export default CreateMenuMainForm;
