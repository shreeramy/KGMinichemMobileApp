import React from 'react';
import { Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Const
} from "../../Helper";

interface NotificationScreenProps {
    navigation?: any;
    text?: any;
    commonActions?: any;
    route: any;
  }

const NotificationScreen = (props:NotificationScreenProps) => {
  const { navigation, text, commonActions, route } = props;
 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notification</Text>
    
    </View>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(NotificationScreen);
