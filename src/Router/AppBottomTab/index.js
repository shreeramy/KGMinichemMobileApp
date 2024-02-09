import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import _ from "lodash";
import { Color, Fonts, Images, Responsive, Screen } from "../../Helper";

const tabArray = [
  {
    key: Screen.HomeScreen,
    name: "Home",
    icon: Images.inactiveHome,
    active_icon: Images.activehome,
    color: Color.botton_Color,
  },
  {
    key: Screen.HomeScreen,
    name: "Notifiation",
    icon: Images.inactiveNotification,
    active_icon: Images.activeNotification,
    color: Color.botton_Color,
  },
  {
    key: Screen.HomeScreen,
    name: "Setting",
    icon: Images.Setting,
    active_icon: Images.activeSetting,
    color: Color.botton_Color,
  },
  {
    key: Screen.Locationsendscreen,
    name: "Send Location",
    icon: Images.camera,
    active_icon: Images.camera,
    color: Color.botton_Color,
  },
];

const AppBottomTab = ({ props }) => {
  const onPressDrawer = (key) => {
    props?.navigation?.jumpTo(key);
  };

  return (
    <View>
      <View style={styles.container}>
        {_.map(tabArray, (item, index) => {
          const isFocused = props.state.index === index;

          return (
            <TouchableOpacity
              style={styles.container1}
              onPress={() => onPressDrawer(item.key)}
              key={`tab-${index}`}
            >
              <View style={styles.imageView}>
                <Image
                  source={isFocused ? item.active_icon : item.icon}
                  style={styles.personImage}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={[
                  styles.chatText,
                  { color: isFocused ? item.color : Color.black },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <SafeAreaView style={styles.backgroundColor} />
    </View>
  );
};

export default AppBottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 0.05,
  },
  backgroundColor: {
    backgroundColor: Color.white,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    backgroundColor: Color.white,
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
  },
  chatText: {
    fontSize: Responsive.font(3),
    fontFamily: Fonts.Metropolis_Bold,
  },
  imageView: {
    width: Responsive.widthPx(10),
    height: Responsive.widthPx(10),
    justifyContent: "center",
    alignItems: "center",
  },
  personImage: {
    width: Responsive.widthPx(6.5),
    height: Responsive.heightPx(6.5),
  },
});
