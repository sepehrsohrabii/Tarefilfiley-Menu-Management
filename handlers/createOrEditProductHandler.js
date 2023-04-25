import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createOrEditProduct = async ({
  bottomSheet,
  item,
  productImage,
  productTitle,
  productDescription,
  productPrice,
  productCategory,
  setError,
  fetchProductData,
}) => {
  try {
    const userID = await AsyncStorage.getItem("userID");
    const restaurantID = await AsyncStorage.getItem("restaurantID");
    const response = await axios.post(
      "https://api.tarefilfiley.me/product/create",
      {
        item,
        productImage,
        productTitle,
        productDescription,
        productPrice,
        productCategory,
        userID,
        restaurantID,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    fetchProductData();
    bottomSheet.current.close();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      setError(error.response.data.errors[0].msg);
    } else {
      setError(error.message);
    }
  }
};
export default createOrEditProduct;
