import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppContainer } from '../../Component';
import {
  Color,
  Const,
  Images,
  Loader,
  Responsive
} from "../../Helper";
import { ApiEndPoints } from "../../NetworkCall";
import styles from './Notificationstyle';
import { useFocusEffect } from '@react-navigation/native';

interface NotificationScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route: any;
}

const NotificationScreen = (props: NotificationScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [notificationdata, setnotificationdata] = useState<any>([]);

  useEffect(() => {
    getNotifications();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [])
  );

  async function getNotifications() {
    try {
      const uid = await AsyncStorage.getItem("userId");
      const uidNumber = uid !== null ? parseInt(uid, 10) : console.log("UserId is null");
      const odooPassword = await AsyncStorage.getItem("@odopassword");

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
              service: "object",
              method: "execute_kw",
              args: [ApiEndPoints.odooDatabase, uid, odooPassword, "res.users", "get_all_notifications", [uidNumber], {}]
            },
          }),
        });

        const responseData = await response.json();

        if (responseData.result) {
          Loader.isLoading(false);
          const notificationdata = responseData.result;
          console.log("notification", notificationdata)
          setnotificationdata(notificationdata);
        } else {
          console.error("search_read error://..", responseData.error);
          return null;
        }
      }
    } catch (error) {
      console.error("Error getting notifications:", error);
    }
  }


  function addHoursAndMinutes(dateString, hours, minutes) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hoursStr, minutesStr, secondsStr] = timePart.split(':');

    const date = new Date(year, month - 1, day, hoursStr, minutesStr, secondsStr);
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
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
              Notifications
            </Text>
          </View>
        </View>
        <FlatList
          data={notificationdata}
          // keyExtractor={(item) => item.date.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.listtext}>{item.name}</Text>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Image resizeMode="contain" source={Images.Orderstatus} />
                  <View style={{ marginLeft: 5 }}>
                    <Text style={styles.listtext}>{item.body}</Text>
                    <Text style={styles.listtext}>{addHoursAndMinutes(item.date, 5, 30)}</Text>

                  </View>
                </View>
              </View>
            </View>

          )}
        // onEndReached={onendreached}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={() =>
        //   loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        // }
        />

      </View>
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(NotificationScreen);
