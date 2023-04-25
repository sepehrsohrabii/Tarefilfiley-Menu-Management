import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import RestaurantsList from "../components/restaurantsList";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

const Restaurants = () => {
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetchUserData();
    fetchRestaurantsData();
  }, []);
  const fetchUserData = async () => {
    const sessionID = await AsyncStorage.getItem("sessionID");
    if (sessionID) {
      const response = await axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${sessionID}`,
        },
      });
      // await AsyncStorage.setItem("userData", response.data);
      setUser(response.data);
    }
  };
  const fetchRestaurantsData = async () => {
    const userID = await AsyncStorage.getItem("userID");
    const response = await axios.post("http://localhost:3000/restaurant/all", {
      userID,
    });
    setRestaurants(response.data);
  };
  return (
    <Container>
      <View style={styles.titleBox}>
        <View style={styles.backBox}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.backButton}>
              <Icon
                type="ionicon"
                name="md-chevron-back"
                color={theme.colors.white}
                size={24}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.backButton}>
              <Icon
                type="material-community"
                name="account"
                color={theme.colors.white}
                size={24}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Title>تره فیلفیلی</Title>
        <SubTitle>مدیریت مجموعه ها</SubTitle>
      </View>
      <Padding>
        <View>
          {user ? (
            <View style={styles.flexBox2}>
              <Text style={styles.welcomeText}>
                {user.name} عزیز خوش آمدید!
              </Text>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <View style={styles.flexBox}>
          <TouchableOpacity
            onPress={async () => {
              const response = await axios.post(
                "http://localhost:3000/restaurant/create",
                { userID: user.id }
              );
              await AsyncStorage.setItem("restaurantID", response.data);
              navigation.navigate("CreateMenu");
            }}
          >
            <View style={styles.addRestaurant}>
              <Icon type="material" name="add" color={theme.colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>مجموعه‌ها</Text>
        </View>
        <RestaurantsList
          restaurants={restaurants}
          fetchRestaurantsData={fetchRestaurantsData}
        />
      </Padding>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  max-width: 100%;
  flex-direction: column;
  background: ${theme.colors.white};
`;
const Title = styled.Text`
  font-family: ${theme.typography.heading2.fontFamily};
  font-size: ${theme.typography.heading2.fontSize};
  color: ${theme.colors.two};
  margin-top: 40px;
  text-align: center;
`;
const SubTitle = styled.Text`
  font-family: ${theme.typography.paragraph2.fontFamily};
  font-size: ${theme.typography.paragraph2.fontSize};
  color: ${theme.colors.white};
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;
const Padding = styled.View`
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
`;
const styles = StyleSheet.create({
  titleBox: {
    backgroundColor: theme.colors.one,
    textAlign: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: "40px",
    shadowColor: "#000000",
    shadowOffset: {
      width: -1,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  title: {
    fontFamily: theme.typography.heading4.fontFamily,
    fontSize: theme.typography.heading4.fontSize,
    color: theme.colors.darkTextColor,
  },
  addRestaurant: {
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
  flexBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },

  flexBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
    marginTop: 30,
  },
  welcomeText: {
    fontFamily: theme.typography.heading6.fontFamily,
    fontSize: theme.typography.heading6.fontSize,
    color: theme.colors.darkTextColor,
    textAlign: "right",
  },
  backBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 30,
  },
  backButton: {
    backgroundColor: theme.colors.black,
    opacity: 0.5,
    borderRadius: 50,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Restaurants;