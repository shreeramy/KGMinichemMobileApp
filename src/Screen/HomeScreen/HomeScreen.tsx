import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  ImageBackground,
  PermissionsAndroid,
} from "react-native";
import { check, request } from "react-native-permissions";
import React, { Component, useState } from "react";
import { SvgIcon } from "../../Component/SvgIcons";
import {
  Color,
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppContainer, AppHeader, AppScrollview } from "../../Component";
import { useEffect } from "react";
import styles from "./HomeScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
import Geolocation from "@react-native-community/geolocation";
import moment from "moment";
import * as OdooApi from "../OdooApi";
interface HomeScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}
var sttendentdata = [];
const HomeScreen = (props: HomeScreenProps) => {
  const { navigation, text, commonActions } = props;
  const [customerdata, setcustomerdata] = useState([]);

  const data = [
    {
      text1: "Customer",
      text2: "12",
      text3: "0% since last period",
      img: Images.listimg1,
      navkey: Screen.CustomerScreen,
    },
    {
      text1: "Quotation",
      text2: "8",
      text3: "0% since last period",
      img: Images.listimg2,
      navkey: Screen.ShowOrderScreen,
    },
    {
      text1: "Order",
      text2: "10",
      text3: "0% since last period",
      img: Images.listimg3,
      navkey: Screen.ShowOrderScreen,
    },
    {
      text1: "Attandance",
      text2: "24",
      text3: "0% since last period",
      img: Images.listimg4,
      navkey: Screen.AttendanceHistoryScreen,
    },
    {
      text1: "Products",
      text2: "2",
      text3: "0% since last period",
      img: Images.listimg5,
      navkey: Screen.ProductCatalog,
    },

    // Add more items as needed
  ];
  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        console.log("Retrieved data: ", value);
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  const [totalLoggedInTime, setTotalLoggedInTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [showtime, setshowtime] = useState("");
  const [showdate, setshowdate] = useState("");
  const [emplotId, setemplotId] = useState();
  const [attendanceId, setattendanceId] = useState();
  const [getattendece, setgetattendece] = useState([]);
  const [attendeceid, setattendeceid] = useState(getattendece[0]?.id);

  useEffect(() => {
    // getime();
  }, []);
  useEffect(() => {
    retrieveData();
    getEmployeesId();
  }, []);
  console.log("getattendece....", getattendece[0]?.id);

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        setTotalLoggedInTime((prevTime) => prevTime + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      startTimer();
      setLoginTime(new Date());
    } else {
      stopTimer();
      if (loginTime) {
        const logoutTime = new Date();
        const timeDifference = Math.floor((logoutTime - loginTime) / 1000);
        setTotalLoggedInTime(totalLoggedInTime + timeDifference);
      }
    }
  }, [loggedIn]);

  useEffect(() => {
     getattendance();
  });

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     // Replace 'MainAppScreen' with your main screen name
  //     {
  //       getattendece[0]?.check_in ? startTimer() : null;
  //     }
  //   }, 2000);

  //   return () => clearTimeout(timeoutId);
  // }, [getattendece[0]?.check_in]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    if (loggedIn) {
      setLoggedIn(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  // Get the current date
  const currentDate = new Date();

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  // Format the date and time as "YYYY-MM-DD HH:mm:ss"
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const formattedDateTime1 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const senddatetime = formattedDateTime;
  // Format the date as "YYYY-MM-DD"

  const [timeDifferenceInSeconds, setTimeDifferenceInSeconds] = useState<
    number | null
  >(null);
  const [totalSeconds11, settotalSeconds1] = useState<number | null>(null);

  // const calculateTimeDifference = () => {
  //   console.log(">??..call this againg");
  //   const attendanceTimeString = getattendece[0]?.check_in;
  //   const currentTimeString = senddatetime.slice(10, 20);
  //   console.log(
  //     "differenceInSeconds...",
  //     attendanceTimeString,
  //     "currentTimeString",
  //     currentTimeString
  //   );
  //   if (attendanceTimeString && currentTimeString) {
  //     const [hours1, minutes1, seconds1] = attendanceTimeString
  //       .split(":")
  //       .map(Number);
  //     const [hours2, minutes2, seconds2] = currentTimeString
  //       .split(":")
  //       .map(Number);

  //     const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
  //     const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;
  //     console.log(
  //       "t???....",
  //       totalSeconds1,
  //       "totalSeconds2../..",
  //       totalSeconds2
  //     );

  //     const differenceInSeconds = totalSeconds2 - totalSeconds1;
  //     console.log("differenceInSec 17 lock..", differenceInSeconds);
  //     // setTimeDifferenceInSeconds(differenceInSeconds);
  //     settotalSeconds1(totalSeconds1);
  //     setTimeDifferenceInSeconds(totalSeconds2);
  //   } else {
  //     console.error(
  //       "Invalid timeStrings:",
  //       attendanceTimeString,
  //       currentTimeString
  //     );
  //   }
  // };

  // useEffect(() => {
  //   calculateTimeDifference();

  //   const intervalId = setInterval(() => {
  //     calculateTimeDifference();
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // const timeString = getattendece[0]?.check_in?.slice(10, 20);
  // const getcurrentTimeString = senddatetime.slice(10, 20);

  // if (timeString && getcurrentTimeString) {
  //   // Parse the hours, minutes, and seconds from the time strings
  //   const [hours1, minutes1, seconds1] = timeString.split(":").map(Number);
  //   const [hours2, minutes2, seconds2] = getcurrentTimeString
  //     .split(":")
  //     .map(Number);

  //   // Calculate the total seconds for each time
  //   const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
  //   const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

  //   // Calculate the time difference in seconds
  //   const timeDifferenceInSeconds = totalSeconds2 - totalSeconds1;
  //   const differenceInSeconds = totalSeconds2 - totalSeconds1;
  //   // Update the state with the calculated difference
  //   setTimeDifferenceInSeconds(differenceInSeconds);

  //   console.log("Time Difference in Seconds:", timeDifferenceInSeconds);
  // } else {
  //   console.error("Invalid timeStrings:", timeString, getcurrentTimeString);
  // }

  async function Createattandece() {
    const uid = await AsyncStorage.getItem("userId");
    const storedatetime = await AsyncStorage.setItem(
      "formattedDateTime1",
      formattedDateTime1
    );
    // Loader.isLoading(true);
    Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
      {
      } // Output: "2023-12-05"
      const userData = {
        employee_id: emplotId,
        check_in: senddatetime,
        check_out: false,
      };
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
            args: [
              ApiEndPoints.odooDatabase,
              uid,
              "admin",
              "hr.attendance", // Replace with the desired model name
              "create",
              [userData],
              {},
            ],
          },
        }),
      });
      const responseData = await response.json();
      if (responseData.result) {
        Loader.isLoading(false);
        Utility.showSuccessToast("Clocked in successfully");
        // navigation.navigate(Screen.ShowOrderScreen);
        const customdata = responseData.result;
        handleLogin();
        setshowtime(`${hours}:${minutes}:${seconds}`);
        setshowdate(`${day}-${month}-${year}`);
        setattendanceId(customdata);
      } else {
        Loader.isLoading(false);
        Utility.showDangerToast("already clocked in , can't clocked in again");
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  async function editattandece() {
    const uid = await AsyncStorage.getItem("userId");
    const gettimedate = await AsyncStorage.getItem("formattedDateTime1");
    // Loader.isLoading(true);
    Loader.isLoading(true);
    const userData = {
      employee_id: emplotId,
      check_in: gettimedate,
      check_out: senddatetime,
    };

    if (uid) {
      const searchCriteria = [["id", "=", 174]];
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
            args: [
              ApiEndPoints.odooDatabase,
              uid,
              "admin",
              "hr.attendance", // Replace with the desired model name
              "write",
              [attendanceId],
              { vals: userData },
            ],
          },
        }),
      });

      const responseData = await response.json();
      if (responseData.result) {
        Loader.isLoading(false);
        // Utility.showSuccessToast("profile Edited successfully");
        handleLogout();
        // navigation.navigate(Screen.CustomerScreen);
        const customdata = responseData.result;
        // setcustomerdata(customdata);
      } else {
        Loader.isLoading(false);
        // Utility.showDangerToast("profile not Edited");
        return null;
      }

      return responseData.result;
    }

    return null;
  }

  // async function editattandece(e: any) {
  //   const uid = await AsyncStorage.getItem("userId");

  //   // Loader.isLoading(true);

  //   const userData = {
  //     employee_id: emplotId,
  //     check_in: false,
  //     check_out: senddatetime,
  //   };

  //   if (uid) {
  //     const searchCriteria = [["id", "!=", 0]];

  //     const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         jsonrpc: "2.0",
  //         method: "call",
  //         params: {
  //           service: "object",
  //           method: "execute_kw",
  //           args: [
  //             ApiEndPoints.odooDatabase,
  //             uid,
  //             "admin",
  //             "hr.attendance", // Replace with the desired model name
  //             "write",
  //             [uid],
  //             { userData },
  //           ],
  //         },
  //       }),
  //     });

  //     const responseData = await response.json();

  //     if (responseData.result) {
  //       Loader.isLoading(false);
  //       Utility.showSuccessToast("profile Edited successfully");
  //       navigation.navigate(Screen.CustomerScreen);
  //       const customdata = responseData.result;
  //       // setcustomerdata(customdata);
  //       console.log("editattandece.....", responseData.result);
  //     } else {
  //       Loader.isLoading(false);
  //       Utility.showDangerToast("profile not Edited");
  //       console.error("search_read error://..", responseData.error);
  //       return null;
  //     }

  //     return responseData.result;
  //   }

  //   return null;
  // }

  async function getEmployeesId() {
    const uid = await AsyncStorage.getItem("userId");
    Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [["user_id", "=", Number(uid)]];
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
            args: [
              ApiEndPoints.odooDatabase,
              uid,
              "admin",
              "hr.employee", // Replace with the desired model name
              "search_read",
              [searchCriteria],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();

      if (responseData) {
        Loader.isLoading(false);
        const customdata = responseData.result;
        // setcustomerdata(customdata);
        customdata.forEach((element) => {
        });
        // Utility.showSuccessToast("create Empolye Id");
        // console.log("se?>>>>", customdata);
      } else {
        Loader.isLoading(false);
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  async function sendlatlong() {
    const uid = await AsyncStorage.getItem("userId");
    // console.log("createorder=--array", createorder);
    // Loader.isLoading(true);
    Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
      const userData = locationData;
      // {
      //   name: "test2333",
      //   lat: "37.421998333333335",
      //   log: "-122.084",
      //   user_id: 2,
      //   attendance_id: 44,
      // },
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
            args: [
              ApiEndPoints.odooDatabase,
              uid,
              "admin",
              "hr.attendance", // Replace with the desired model name
              "create_location",
              [1, userData],
            ],
          },
        }),
      });
      const responseData = await response.json();
      if (responseData) {
        Loader.isLoading(false);
        // Utility.showSuccessToast("sellorder created successfully");
        // navigation.navigate(Screen.ShowOrderScreen);
        const customdata = responseData.result;
      } else {
        Loader.isLoading(false);
        // Utility.showDangerToast("profile not created");
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  // %$&*********************************************

  // useEffect(() => {
  //   const sendLocationDataTimer = setInterval(() => {
  //     sendLocationData();
  //   }, 300000);
  //   return () => {
  //     // Clear the timer when the component unmounts
  //     clearInterval(sendLocationDataTimer);
  //   };
  // }, []);

  // Function to perform a search_read operation
  AsyncStorage.setItem("attendata", attendeceid);
  // setattendeceid(getattanddata);

  async function getattendance() {
    const uid = await AsyncStorage.getItem("userId");
    // Loader.isLoading(true);

    if (uid) {
      // const searchCriteria = [["id", "!=", 0]];
      const searchCriteria = [
        ["check_out", "=", false],
        ["employee_id", "=", emplotId],
      ];
      // if (name){
      //   searchCriteria.append(["name", "=", name])
      // }
      // const searchCriteria = [];
      // Replace with your search criteria

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
            args: [
              ApiEndPoints.odooDatabase,
              uid,
              "admin",
              "hr.attendance", // Replace with the desired model name
              "search_read",
              [searchCriteria],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();

      if (responseData.result) {
        // Loader.isLoading(false);
        const attendencedata = responseData.result;
        setgetattendece(attendencedata);

      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  const checkoutfun = () => {
    return (
      <View>
        {/* {getattendece[0]?.check_in ? (
          <View
            style={{
              height: Responsive.heightPx(25),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {console.log(">>>>>>>>>>>?????")}
            <TouchableOpacity onPress={() => editattandece()}>
              <ImageBackground
                style={{
                  width: Responsive.widthPx(70),
                  height: Responsive.heightPx(25),
                }}
                resizeMode="contain"
                source={Images.attendence}
              >
                <View
                  style={{
                    // backgroundColor: "red",
                    width: Responsive.widthPx(70),
                    height: Responsive.heightPx(19),
                    justifyContent: "flex-end",
                    alignItems: "center",
                    // opacity: 0.3,
                  }}
                >
                  {loggedIn ? (
                    <Text style={styles.showtime}>
                      {formatTime(totalLoggedInTime)}{" "}
                    </Text>
                  ) : (
                    <Text style={styles.showtime}>
                      {formatTime(totalLoggedInTime)}
                    </Text>
                  )}
                  <Text style={styles.checlout}>Clocked Out</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        ) : ( */}
        <View>
          {loggedIn ? (
            <View
              style={{
                height: Responsive.heightPx(25),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => editattandece()}>
                <ImageBackground
                  style={{
                    width: Responsive.widthPx(70),
                    height: Responsive.heightPx(25),
                  }}
                  resizeMode="contain"
                  source={Images.attendence}
                >
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: Responsive.widthPx(70),
                      height: Responsive.heightPx(19),
                      justifyContent: "flex-end",
                      alignItems: "center",
                      // opacity: 0.3,
                    }}
                  >
                    {loggedIn ? (
                      <Text style={styles.showtime}>
                        {formatTime(totalLoggedInTime)}{" "}
                      </Text>
                    ) : (
                      <Text style={styles.showtime}>
                        {formatTime(totalLoggedInTime)}
                      </Text>
                    )}
                    <Text style={styles.checlout}>Clocked Out</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                // backgroundColor: "red",
                height: Responsive.heightPx(25),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={Createattandece}>
                <ImageBackground
                  style={{
                    width: Responsive.widthPx(70),
                    height: Responsive.heightPx(25),
                  }}
                  resizeMode="contain"
                  source={Images.attendence}
                >
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: Responsive.widthPx(70),
                      height: Responsive.heightPx(19),
                      justifyContent: "flex-end",
                      alignItems: "center",
                      // opacity: 0.3,
                    }}
                  >
                    {loggedIn ? (
                      <Text style={styles.showtime}>
                        {formatTime(totalLoggedInTime)}{" "}
                      </Text>
                    ) : (
                      <Text style={styles.showtime}>
                        {formatTime(totalLoggedInTime)}
                      </Text>
                    )}
                    <Text style={styles.checlout}>Clocked In</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* )} */}
      </View>
    );
  };
  //&******************=<*******************************

  return (
    <AppContainer>
      <AppHeader
        {...props}
        // title="Home"
        isBackBtn={false}
        islogo={true}
        drawermenu={true}
        isRightImage={true}
      />
      <AppScrollview>
        <View style={styles.container}>
          <View style={styles.topcontener}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  color: Color.botton_Color,
                }}
              >
                Clocked in
              </Text>

              {/* <Button title="getEmployeesId" onPress={getEmployeesId} /> */}
              {/* <Button title="Send Location Data" onPress={sendLocationData} /> */}
              {showtime ? (
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "800",
                    color: Color.black,
                  }}
                >
                  {showtime}
                </Text>
              ) : (
                <View>
                  {getattendece[0]?.check_in ? (
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "800",
                        color: Color.black,
                      }}
                    >
                      {getattendece[0]?.check_in.slice(10, 20)}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "800",
                        color: Color.black,
                      }}
                    >
                      00:00:00
                    </Text>
                  )}
                </View>
              )}
              {showdate ? (
                <Text style={{ color: Color.text_color }}>{showdate}</Text>
              ) : (
                <View>
                  {getattendece[0]?.check_in ? (
                    <Text style={{ color: Color.text_color, fontSize: 18 }}>
                      {/* {getattendece[0]?.check_in.slice(0, 10)} */}
                      {moment(getattendece[0]?.check_in.slice(0, 10)).format(
                        "DD-MM-YYYY"
                      )}
                    </Text>
                  ) : (
                    <Text style={{ color: Color.text_color, fontSize: 18 }}>
                      Date
                    </Text>
                  )}
                </View>
              )}
            </View>
            {checkoutfun()}
          </View>

          <View style={styles.btnview}>
            <TouchableOpacity>
              <View style={styles.btntextview}>
                <Text style={styles.btntext}>Overview</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.btntextview1}>
                <Text style={styles.btntext1}>Analytics</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Responsive.widthPx(90),
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: Responsive.heightPx(2),
              // backgroundColor: "red",
            }}
          >
            <FlatList
              data={data}
              numColumns={3}
              renderItem={({ item, index }) => (
                <View>
                  {index === 0 ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate(item.navkey)}
                    >
                      <View style={styles.item}>
                        <View
                          style={{
                            marginTop: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image source={item.img} />
                          <Text style={styles.listtext1}>{item.text1}</Text>
                          <Text style={styles.listtext1}>{item.text2}</Text>
                          <Text style={styles.listtext1}>{item.text3}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      {index === 1 ? (
                        <View style={styles.item1}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate(item.navkey, {
                                status: "Quotation",
                              })
                            }
                          >
                            <View
                              style={{
                                marginTop: 10,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Image source={item.img} />
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 11,
                                  color: Color.text_color,
                                  fontWeight: "800",
                                }}
                              >
                                {item.text1}
                              </Text>
                              <Text style={styles.listtext}>{item.text2}</Text>
                              <Text style={styles.listtext}>{item.text3}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.item1}>
                          <TouchableOpacity
                            onPress={() => {
                              index === 2
                                ? navigation.navigate(item.navkey, {
                                    status: "Order",
                                  })
                                : navigation.navigate(item.navkey);
                            }}
                          >
                            <View
                              style={{
                                marginTop: 10,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Image source={item.img} />
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 11,
                                  color: Color.text_color,
                                  fontWeight: "800",
                                }}
                              >
                                {item.text1}
                              </Text>
                              <Text style={styles.listtext}>{item.text2}</Text>
                              <Text style={styles.listtext}>{item.text3}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
          {/* <Text>HomeScreen</Text>
      <SvgIcon onPress={() => { navigation.push(Screen.LoginScreen) }} Icon={Images.HomeSvg} height={25} width={25} /> */}
          {/* <AppLoader/> */}
        </View>
      </AppScrollview>
    </AppContainer>
  );
};

export default HomeScreen;
