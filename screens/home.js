import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import theme from "../config/theme";

// import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import SignUpForm from "../components/signUpForm";
import LoginForm from "../components/loginForm";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// SplashScreen.preventAutoHideAsync();

const homeImage = require("../assets/img/food.jpg");

const HomeScreen = () => {
  const loginRefRBSheet = useRef();
  const signupRefRBSheet = useRef();
  const navigation = useNavigation();

  const [user, setUser] = useState();
  const fetchData = async () => {
    const sessionID = await AsyncStorage.getItem("sessionID");
    const response = await axios.get("https://api.tarefilfiley.me/user", {
      headers: {
        Authorization: `Bearer ${sessionID}`,
      },
    });
    if (response.status === 200) {
      setUser(response.data);
      AsyncStorage.setItem("userID", response.data.id);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Row>
        <ImageBackground
          source={homeImage}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>
        <Col>
          <TextBox>
            <Title>تَره فیلفیلِی</Title>
          </TextBox>
          <TextBox>
            <SubTitle>پلتفرم رایگان منو آنلاین</SubTitle>
          </TextBox>
          <TextBox>
            <Paragraph2>
              دارای قابلیت تخصیص لینک و صفحه‌ی اختصاصی به هر رستوران و ساخت
              کیو‌آر‌کد برای شما کافه رستوران داران عزیز.
            </Paragraph2>
          </TextBox>
        </Col>
      </Row>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (user) {
            navigation.navigate("Restaurants", { user: user });
          } else {
            loginRefRBSheet.current.open();
          }
        }}
      >
        <ButtonText>ورود</ButtonText>
      </TouchableOpacity>
      <RBSheet
        ref={loginRefRBSheet}
        closeOnDragDown={true}
        height={650}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: theme.colors.white,
            paddingHorizontal: 30,
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
        <LoginForm
          loginSheet={loginRefRBSheet}
          signupSheet={signupRefRBSheet}
          fetchData={fetchData}
          navigation={navigation}
        />
      </RBSheet>
      <RBSheet
        ref={signupRefRBSheet}
        closeOnDragDown={true}
        height={650}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: theme.colors.white,
            paddingHorizontal: 30,
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
        <SignUpForm
          loginSheet={loginRefRBSheet}
          signupSheet={signupRefRBSheet}
          fetchData={fetchData}
          navigation={navigation}
        />
      </RBSheet>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  max-width: 100%;
  flex-direction: column;
  background: ${theme.colors.one};
`;
const Row = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Col = styled.View`
  flex: 0.5;
  align-self: center;
  text-align: right;
`;
const TextBox = styled.View`
  width: 100%;
  padding-right: 10%;
  padding-left: 10%;
  margin-bottom: 10%;
`;
const Title = styled.Text`
  font-family: ${theme.typography.heading1.fontFamily};
  font-size: ${theme.typography.heading1.fontSize};
  color: ${theme.colors.white};
`;
const SubTitle = styled.Text`
  font-family: ${theme.typography.subTitle.fontFamily};
  font-size: ${theme.typography.subTitle.fontSize};
  color: ${theme.colors.three};
`;
const Paragraph2 = styled.Text`
  font-family: ${theme.typography.paragraph3.fontFamily};
  font-size: ${theme.typography.paragraph3.fontSize};
  color: ${theme.colors.white};
  // text-align: justify;
  line-height: 25px;
  margin-top: 10%;
`;
const ButtonText = styled.Text`
  font-family: ${theme.typography.subTitle_M.fontFamily};
  font-size: ${theme.typography.subTitle_M.fontSize};
  color: ${theme.colors.white};
  text-align: center;
`;
const styles = StyleSheet.create({
  image: {
    flex: 0.5,
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.colors.four,
    borderRadius: "20px",
    padding: "13px",
    left: "15%",
    right: "15%",
    position: "absolute",
    bottom: "7%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
export default HomeScreen;
