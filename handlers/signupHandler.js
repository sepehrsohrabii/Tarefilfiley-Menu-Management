import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleSignup = async ({
  name,
  email,
  password,
  setError,
  signupSheet,
  fetchData,
  navigation,
}) => {
  try {
    const response = await axios.post("https://api.tarefilfiley.me/signup", {
      name,
      email,
      password,
    });
    if (response.status === 200) {
      const sessionID = response.data;
      await AsyncStorage.setItem("sessionID", sessionID);
      fetchData();
      signupSheet.current.close();
      navigation.navigate("Restaurants");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      setError(error.response.data.errors[0].msg);
    } else {
      setError(error.message);
    }
  }
};
export default handleSignup;
