import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import theme from "../config/theme";
import CreateMenuMainForm from "../components/createMenu/createMenuMainForm";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
const CreateMenu = ({ route }) => {
  const { persianName, englishName, link, img, logo, phone, hours } =
    route.params;
  const navigation = useNavigation();
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
        <Title>جدید</Title>
        <SubTitle>ساخت منو</SubTitle>
      </View>
      <CreateMenuMainForm
        persianName={persianName}
        englishName={englishName}
        link={link}
        img={img}
        logo={logo}
        phone={phone}
        hours={hours}
      />
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
const styles = StyleSheet.create({
  titleBox: {
    backgroundColor: theme.colors.one,
    textAlign: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: "20px",
    shadowColor: "#000000",
    shadowOffset: {
      width: -1,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  backBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
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
export default CreateMenu;
