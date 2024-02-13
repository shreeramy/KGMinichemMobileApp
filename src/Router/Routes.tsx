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
  SettingScreen,
  NotificationScreen
} from "../Screen";
import AppDrawer from "./AppDrawer";
import { StyleSheet } from "react-native";
import AppBottomTab from "./AppBottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import OrderFilterScreen from "../Screen/OrderFilterScreen.js";
import PdfViewer from "../Component/pdfViewer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

interface appScrollviewProps {
  isLogin?: boolean;
}

export default function Routes(props) {
  const initialRoute = props.data;
  console.log("route--->", initialRoute)
  const renderBottomTab =  () => {
    return (
      <Tab.Navigator
        tabBar={(props) => <AppBottomTab props={props} />}
        screenOptions={{
          lazy: true,
          headerShown: false,
        }}
        initialRouteName={Screen.LoginScreen}
      >
        <Tab.Screen name={Screen.HomeScreen} component={HomeScreen} />
        <Tab.Screen name={Screen.NotificationScreen} component={NotificationScreen} />
        <Tab.Screen
          name={Screen.SettingScreen}
          component={SettingScreen}
        />
        <Tab.Screen
          name={Screen.Locationsendscreen}
          component={Locationsendscreen}
        />

      </Tab.Navigator>
    );
  };
  const DrawerContainer = () => {
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
        initialRouteName={initialRoute === true ? Screen.HomeScreen : Screen.LoginScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={Screen.HomeScreen} component={DrawerContainer} />
        <Stack.Screen name={Screen.CustomerScreen} component={CustomerScreen} />
        <Stack.Screen name={Screen.ProductCatalog} component={ProductCatalog} />
        <Stack.Screen name={Screen.Profile} component={Profile} />
        <Stack.Screen name={Screen.EditProfile} component={EditProfile} />
        <Stack.Screen name={Screen.OrderFilterScreen} component={OrderFilterScreen} />
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
        <Stack.Screen name={Screen.PdfViewer} component={PdfViewer} />
        <Stack.Screen name={Screen.SettingScreen} component={SettingScreen} />
        <Stack.Screen name={Screen.NotificationScreen} component={NotificationScreen} />
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
