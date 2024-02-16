import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Color, Fonts, Images, Responsive } from "../Helper";

interface AppTextInputProps {
  placeHolder?: string;
  placeholderTextColor?: string;
  value?: any;
  autoCapitalize?: any;
  textColor?: any;
  onChangeText?: any;
  onSubmitEditing?: any;
  keyboardType?: any;
  secureTextEntry?: any;
  returnKeyType?: any;
  autoFocus?: any;
  reference?: any;
  containerStyle?: any;
  inputContainer?: any;
  editable?: any;
  textStyle?: any;
  maxLength?: any;
  ismaxLength?: any;
  onImageChange?: any;
  onFocus?: any;
  onPressIn?: any;
  isShowIcon?: any;
  onClickShow?: any;
  onKeyPress?: any;
  lableImage?: any;
  leftImage?: any;
  passimg?: any;
  userimg?: any;
}

const AppTextInput = (props: AppTextInputProps) => {
  const {
    placeHolder,
    placeholderTextColor,
    value,
    autoCapitalize,
    textColor,
    onChangeText,
    onSubmitEditing,
    keyboardType,
    secureTextEntry,
    returnKeyType,
    autoFocus,
    containerStyle,
    inputContainer,
    editable,
    textStyle,
    maxLength,
    ismaxLength,
    onFocus,
    onPressIn,
    isShowIcon,
    onClickShow,
    onKeyPress,
    lableImage,
    leftImage,
    userimg,
    passimg,
  } = props;

  return (
    <View style={containerStyle}>
      <TouchableOpacity disabled={editable} onPress={onFocus}>
        <View style={[styles.container, inputContainer]}>
          {lableImage ? (
            <View style={styles.lableImagestyle}>
              <Image
                style={styles.imagestyle}
                source={lableImage}
                resizeMode="contain"
              />
            </View>
          ) : null}

          {userimg ? (
            <View style={styles.lableImagestyle}>
              <Image
                style={styles.imagestyle}
                source={Images.user}
                resizeMode="contain"
              />
            </View>
          ) : null}
          {passimg ? (
            <View style={styles.lableImagestyle}>
              <Image
                style={styles.imagestyle}
                source={Images.pass}
                resizeMode="contain"
              />
            </View>
          ) : null}

          <TextInput
            maxLength={!ismaxLength ? maxLength : null}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            placeholder={placeHolder}
            {...(keyboardType !== null && { keyboardType })}
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid="transparent"
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            allowFontScaling={false}
            style={[styles.input, textStyle, { color: textColor }]}
            onSubmitEditing={onSubmitEditing}
            editable={editable}
            autoFocus={autoFocus}
            blurOnSubmit={false}
            onPressIn={() => onPressIn()}
            onKeyPress={onKeyPress}
          />
          {isShowIcon && (
            <TouchableOpacity
              style={styles.touchstyle}
              onPress={() => onClickShow()}
            >
              {secureTextEntry ? (
                <Image
                  style={styles.imagestyle}
                  source={Images.hidden_eyes}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={styles.imagestyle}
                  source={Images.show_eyes}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          )}
          {leftImage && (
            <TouchableOpacity
              style={styles.touchstyle}
              onPress={() => onClickShow()}
            >
              <Image
                testID="left-image"
                style={[styles.imagestyle]}
                source={Images.next}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppTextInput;

AppTextInput.defaultProps = {
  leftImage: false,
  userimg: false,
  passimg: false,
  isShowIcon: false,
  containerStyle: {},
  inputContainer: {},
  textStyle: {},
  placeHolder: "",
  placeholderTextColor: Color.text_color,
  value: "",
  textColor: Color.black,
  secureTextEntry: false,
  autoFocus: false,
  editable: true,
  ismaxLength: false,
  keyboardType: null,
  returnKeyType: "next",
  autoCapitalize: "none",
  onChangeText: () => {},
  onSubmitEditing: () => {},
  onPressSelect: () => {},
  onPressIn: () => {},
  maxLength: 100,
  onClickShow: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: Responsive.widthPx(90),
    height: Responsive.widthPx(15),
    borderRadius: Responsive.widthPx(5),
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: Responsive.heightPx(2),
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: Responsive.font(4),
    color: Color.black,
    fontFamily: Fonts.Poppins_Regular,
    height: Responsive.widthPx(15),
    justifyContent: "center",
    width: "80%",
    paddingLeft: 15,
  },
  imagestyle: {
    width: Responsive.widthPx(7),
    height: Responsive.widthPx(7),
  },
  touchstyle: {
    flex: 1,
    paddingRight: 10,
    alignItems: "flex-end",
  },
  lableImagestyle: {
    paddingLeft: 10,
  },
});
