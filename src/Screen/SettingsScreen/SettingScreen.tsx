import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppButton from '../../Component/AppButton';
import {
  Const
} from "../../Helper";

interface SettingScreenProps {
    navigation?: any;
    text?: any;
    commonActions?: any;
    route: any;
  }

const SettingScreen = (props:SettingScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Implement password change logic here
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Change Password</Text>
      <TextInput
        placeholder="Current Password"
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={{ marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, width: 300 }}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
        style={{ marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, width: 300 }}
      />
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{ marginVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, width: 300 }}
      />
      <AppButton onPress={handleChangePassword} label={"Change Password"} />
    </View>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SettingScreen);
