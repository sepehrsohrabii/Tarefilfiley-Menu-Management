import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateMenu from "../screens/createMenu";
import HomeScreen from "../screens/home";
import Restaurants from "../screens/restaurants";

const Stack = createNativeStackNavigator();
const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "تره فیلفیلی - منو آنلاین" }}
        />

        <Stack.Screen
          name="Restaurants"
          component={Restaurants}
          options={{ title: "منو ها" }}
        />
        <Stack.Screen
          name="CreateMenu"
          component={CreateMenu}
          options={{ title: "ساخت منو" }}
          initialParams={{
            persianName: "",
            englishName: "",
            link: "",
            img: "",
            logo: "",
            phone: "",
            hours: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Layout;
