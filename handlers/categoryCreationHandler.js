import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createOrEditCategory = async ({
  title,
  categoryName,
  bottomSheet,
  setError,
  fetchData,
}) => {
  try {
    const userID = await AsyncStorage.getItem("userID");
    const restaurantID = await AsyncStorage.getItem("restaurantID");
    const response = await axios.post("https://api.tarefilfiley.me/category/create", {
      title,
      categoryName,
      userID,
      restaurantID,
    });
    fetchData();
    bottomSheet.current.close();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      setError(error.response.data.errors[0].msg);
    } else {
      setError(error.message);
    }
  }
};
export default createOrEditCategory;
