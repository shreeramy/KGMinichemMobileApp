import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Responsive, Color, Fonts, CommonStyles } from "../Helper";

interface AppButtonProps {
  containerStyle?: Object;
  labelStyle?: Object;
  label: string;
  onPress: any;
  isUpperCase?: boolean;
  disable?: boolean;
  isImage?: boolean;
  imageUrl?: any;
  tintColor?: string;
  isBorderButton?: boolean;
}

const AppButton = (props: AppButtonProps) => {
  const {
    containerStyle,
    labelStyle,
    label,
    onPress,
    isUpperCase,
    disable,
    isImage,
    imageUrl,
    tintColor,
    isBorderButton,
  } = props;
  return (
    <TouchableOpacity
      testID="app-button"
      style={[
        styles.container,
        containerStyle,
        isBorderButton && { backgroundColor: Color.white },
        disable && { backgroundColor: Color.greenShade5A },
      ]}
      onPress={() => (onPress ? onPress() : {})}
      disabled={disable}
    >
      <Text
        style={[
          isUpperCase && styles.upperCase,
          styles.labelStyle,
          !isBorderButton && { color: Color.white },
          labelStyle,
          disable && { color: Color.black },
        ]}
      >
        {label}
      </Text>
      {isImage && (
        <Image
          style={[styles.downImage, { tintColor }]}
          source={imageUrl}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

AppButton.defaultProps = {
  containerStyle: {},
  labelStyle: {},
  label: "",
  isUpperCase: false,
  disable: false,
};

const styles = StyleSheet.create({
  downImage: {
    marginLeft: 15,
    tintColor: Color.white,
    width: Responsive.widthPx(5),
    height: Responsive.widthPx(5),
  },
  upperCase: {
    textTransform: "uppercase",
  },
  container: {
    flexDirection: "row",
    width: Responsive.widthPx(90),
    height: Responsive.widthPx(15),
    alignSelf: "center",
    backgroundColor: Color.botton_Color,
    borderRadius: 10,
    ...CommonStyles.centerItem,
    marginTop: Responsive.heightPx(5),
    marginBottom: Responsive.heightPx(4),
  },
  labelStyle: {
    fontFamily: Fonts.Metropolis_Regular,
    fontSize: Responsive.font(5),
    fontWeight: "bold",
  },
});
