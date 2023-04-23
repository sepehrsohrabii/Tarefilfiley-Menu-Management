import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userHandler = async () => {
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const sessionID = await AsyncStorage.getItem("sessionID");
    if (sessionID) {
      const response = await axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${sessionID}`,
        },
      });
      await AsyncStorage.setItem("userData", response.data);
      setUser(response.data);
    }
  }, []);
  return user;
};
export default userHandler;
