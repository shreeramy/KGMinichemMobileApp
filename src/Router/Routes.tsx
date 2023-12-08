import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Responsive, Screen } from "../Helper";
import {
  AttendanceHistoryScreen,
  CatalogDetils,
  CustomerScreen,
  EditOrderLineScreen,
  EditProfile,
  HomeScreen,
  LiveLocationScreen,
  Locationsendscreen,
  LoginScreen,
  NewCreateOrderScreen,
  OrderHistory,
  ProductCatalog,
  Profile,
  SellOrderDetails,
  ShowOrderScreen,
} from "../Screen";
import AppDrawer from "./AppDrawer";
import { StyleSheet } from "react-native";
import AppBottomTab from "./AppBottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

interface appScrollviewProps {
  isLogin?: boolean;
}
// const userId = await AsyncStorage.getItem("userId");
// console.log("<<<></>>>..//", userId);
const checkUserSession = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    console.log("<<<></>>>..//", userId);
    if (userId) {
      console.log("<<<><????..", userId);
    } else {
      console.log("<<<><nullnullnull/", null);
    }
  } catch (error) {
    console.error("Error checking user session:", error);
    return null;
  }
};
// const token = useSelector((state) => state.token);

export default function Routes(props: appScrollviewProps) {
  const renderBottomTab = () => {
    // const initialRouteName = userId ? Screen.HomeScreen : Screen.LoginScreen;
    const initialRouteName = checkUserSession()
      ? Screen.HomeScreen
      : Screen.LoginScreen;
    return (
      <Tab.Navigator
        tabBar={(props) => <AppBottomTab props={props} />}
        screenOptions={{
          lazy: true,
          headerShown: false,
        }}
        initialRouteName={initialRouteName}
      >
        <Tab.Screen name={Screen.HomeScreen} component={HomeScreen} />
        <Tab.Screen name={Screen.LoginScreen} component={LoginScreen} />
        <Tab.Screen
          name={Screen.Locationsendscreen}
          component={Locationsendscreen}
        />
        {/* <Tab.Screen name={Screen.ContactUsScreen} component={ContactUsScreen} />  */}
      </Tab.Navigator>
    );
  };
  const drawerContainer = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: styles.drawercontainer,
          drawerType: "slide",
        }}
        drawerContent={(props) => {
          return <AppDrawer {...props} />;
        }}
      >
        <Drawer.Screen name={"Root1"} component={renderBottomTab} />
        <Drawer.Screen name={Screen.HomeScreen} component={HomeScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screen.LoginScreen}
        // initialRouteName={
        //   checkUserSession() ? Screen.HomeScreen : Screen.LoginScreen
        // }
        // initialRouteName={Screen.LoginScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={Screen.HomeScreen} component={drawerContainer} />
        <Stack.Screen name={Screen.CustomerScreen} component={CustomerScreen} />
        <Stack.Screen name={Screen.ProductCatalog} component={ProductCatalog} />
        <Stack.Screen name={Screen.Profile} component={Profile} />
        <Stack.Screen name={Screen.EditProfile} component={EditProfile} />
        <Stack.Screen name={Screen.OrderHistory} component={OrderHistory} />
        <Stack.Screen name={Screen.CatalogDetils} component={CatalogDetils} />
        <Stack.Screen
          name={Screen.AttendanceHistoryScreen}
          component={AttendanceHistoryScreen}
        />
        <Stack.Screen
          name={Screen.LiveLocationScreen}
          component={LiveLocationScreen}
        />
        <Stack.Screen
          name={Screen.SellOrderDetails}
          component={SellOrderDetails}
        />
        <Stack.Screen
          name={Screen.ShowOrderScreen}
          component={ShowOrderScreen}
        />
        <Stack.Screen
          name={Screen.NewCreateOrderScreen}
          component={NewCreateOrderScreen}
        />
        <Stack.Screen
          name={Screen.EditOrderLineScreen}
          component={EditOrderLineScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
Routes.defaultProps = {
  isLogin: false,
};
const styles = StyleSheet.create({
  drawercontainer: {
    backgroundColor: "white",
    width: Responsive.widthPx(75),
  },
});
