import React, { useState } from 'react';
import { Text, TextInput, View, Image } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppButton from '../../Component/AppButton';
import {
  Const, Utility, Responsive, Images, Color, Screen
} from "../../Helper";

import ApiEndPoints from '../../NetworkCall/ApiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from '../../Component/AppContainer';
import { TouchableOpacity } from 'react-native';
import styles from './Settingstyle';
import { CommonActions } from '@react-navigation/native';

interface SettingScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route: any;
}

const SettingScreen = (props: SettingScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmNewPassword, setHideConfirmNewPassword] = useState(true);

  async function handleChangePassword() {
    try {
      const odooPassword = await AsyncStorage.getItem("@odopassword");
      if (!currentPassword || !newPassword || !confirmPassword) {

        Utility.showDangerToast("All fields are required")
        return;
      }
      if (newPassword !== confirmPassword) {
        Utility.showDangerToast("New password and confirm password must match")
        return;
      }
      if (currentPassword !== odooPassword) {
        Utility.showDangerToast("Current Password is wrong")
        return;
      }
      const uid = await AsyncStorage.getItem("userId");
      const uidNumber = uid !== null ? parseInt(uid, 10) : console.log("UserId is null");
      console.log("userid", uid)

      if (uid) {
        const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              "service": "object",
              "method": "execute_kw",
              "args": [
                ApiEndPoints.odooDatabase,
                uid,
                odooPassword,
                "res.users",
                "write",
                [
                  [uidNumber],
                  {
                    "password": newPassword
                  }
                ]
              ]
            },
          }),
        });

        const responseData = await response.json();

        if (responseData.result === true) {
          __DEV__ ?
            Utility.showSuccessToast("Password Changed successfully") :
            console.log("Password Changed successfully");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Screen.HomeScreen }],
            })
          );
        } else {
          __DEV__ ?
            Utility.showDangerToast("Password Changed Failed") :
            console.log("Password Changed Failed");
          console.error("failed:", responseData.error);
        }
      }
    } catch (error) {
      console.error("Error sending token:", error);
    }
  }

  return (
    <AppContainer>
      <View style={styles.container}>
        <View style={styles.headerview}>
          <View style={styles.headerview1}>
            <TouchableOpacity onPress={() => navigation.goBack(null)}>
              <Image
                style={{
                  width: Responsive.widthPx(10),
                  height: Responsive.heightPx(8),
                }}
                resizeMode="contain"
                source={Images.blackbacicon}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginLeft: 5, color: Color.black }}>
              Change Password
            </Text>

          </View>

        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Current Password"}
            secureTextEntry={hideCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}

          />
          <TouchableOpacity onPress={() => setHideCurrentPassword(!hideCurrentPassword)} style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={hideCurrentPassword ? Images.visibilityoff : Images.visibility}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"New Password"}
            secureTextEntry={hideNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setHideNewPassword(!hideNewPassword)} style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={hideNewPassword ? Images.visibilityoff : Images.visibility}
            />
          </TouchableOpacity>
        </View><View style={styles.inputContainer}>
          <TextInput
            placeholder={"Confirm New Password"}
            secureTextEntry={hideConfirmNewPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setHideConfirmNewPassword(!hideConfirmNewPassword)} style={styles.iconContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={hideConfirmNewPassword ? Images.visibilityoff : Images.visibility}
            />
          </TouchableOpacity>
        </View>
        <AppButton onPress={handleChangePassword} label={"Change Password"} />
      </View>
    </AppContainer>

  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SettingScreen);
