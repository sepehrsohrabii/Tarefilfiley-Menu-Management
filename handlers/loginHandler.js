import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleLogin = async ({
  email,
  password,
  setError,
  loginSheet,
  fetchData,
  navigation,
}) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    if (response.status === 200) {
      const sessionID = response.data;
      await AsyncStorage.setItem("sessionID", sessionID);
      fetchData();
      loginSheet.current.close();
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
export default handleLogin;
