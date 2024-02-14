import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment-timezone';
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { AppContainer, AppHeader } from "../../Component";
import {
  Color,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
import { ApiEndPoints } from "../../NetworkCall";
import styles from "./HomeScreenStyles";
interface HomeScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}
const HomeScreen = (props: HomeScreenProps) => {
  const { navigation, text, commonActions } = props;

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

  ];
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [toggleForTimer, setToggleForTimer] = useState(false)
  const [loginTime, setLoginTime] = useState<Date | null>(null);
  const [totalLoggedInTime, setTotalLoggedInTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [showtime, setshowtime] = useState("");
  const [showdate, setshowdate] = useState(moment().format('DD-MM-YYYY') || "");
  const [emplotId, setemplotId] = useState();
  const [customerdata, setcustomerdata] = React.useState([]);
  const [attendanceId, setattendanceId] = useState();
  const [lastCheckout, setLastCheckout] = useState<string>('')
  const [lastCheckoutDate, setLastCheckoutDate] = useState<string>('')
  const [lastCheckinDate, setLastCheckinDate] = useState<string>('')
  const [lastCheckoutFromEmploy, setLastCheckoutFromEmploy] = useState<string>('')
  const [lastCheckIn, setLastCheckedIn] = useState<string>('')

  const odooHost = "http://kg.wangoes.com";
  const odooDatabase = "kg.wangoes.com";
  const jsonRpcEndpoint = `${odooHost}/jsonrpc`;


  async function searchRead1() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    console.log("uid", uid)
    if (uid) {
      const searchCriteria = [["id", "=", uid]];
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
              odooPassword,
              "res.users", 
              "search_read",
              [
                searchCriteria,
                [
                  "id",
                  "login",
                  "name",
                  "last_check_in",
                  "last_check_out",
                  "attendance_id",
                  "employee_id"
                ],
              ],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();
      console.log("search_rea>>> in home screen", responseData.result);
      if (responseData.result) {
        const customdata = responseData.result;
        setemplotId(responseData.result[0].employee_id[0])
        setattendanceId(responseData.result[0].attendance_id[0])

        if (responseData.result[0].last_check_out === false && responseData.result[0].last_check_in === false) {
          setLoggedIn(true)
          setLastCheckout("00:00:00")
          setLastCheckedIn("00:00:00")
        } else if (responseData.result[0].last_check_out === false) {
          setLoggedIn(false)
        } else if (responseData.result[0].last_check_out !== false) {
          setLoggedIn(true)
        }
        const lastLocalCheckoutTime = moment(responseData.result[0].last_check_out).add({ hours: 5, minutes: 30 }).format('hh:mm:ss')
        const lastLocalCheckinTime = moment(responseData.result[0].last_check_in).add({ hours: 5, minutes: 30 }).format('hh:mm:ss')
        if (responseData.result[0].last_check_out === false && responseData.result[0].last_check_in === false) {

          setLastCheckout("00:00:00")
          setLastCheckedIn("00:00:00")
        } else {
          setLastCheckout(lastLocalCheckoutTime)
          setLastCheckedIn(lastLocalCheckinTime)
        }

        setLastCheckinDate(responseData.result[0].last_check_in)
        setLastCheckoutDate(responseData.result[0].last_check_out)
        setcustomerdata(customdata);
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }

    }

    return null;
  }

  useEffect(() => {
    searchRead1()
  }, []);

  useEffect(() => {
    retrieveData();
  }, []);

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
    if (loggedIn === false) {
      startTimer();
      setLoginTime(new Date());

    } else {
      stopTimer();
      if (loginTime) {
        const logoutTime: Date = new Date();
        const timeDifference = Math.floor((logoutTime.getTime() - loginTime.getTime()) / 1000);
        setTotalLoggedInTime(totalLoggedInTime + timeDifference);
      }

    }
  }, [!loggedIn]);

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

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const convertLocalTimeToUTCTime = () => {
    let date = new Date().toISOString();
    return date;
  };
  const resultUTC = convertLocalTimeToUTCTime()
  const formattedDateTimeFromUTC = moment.utc(resultUTC).format('YYYY-MM-DD HH:mm:ss');
  const formattedDateTime1 = formattedDateTimeFromUTC
  const senddatetime = formattedDateTimeFromUTC

  const [timeDifferenceInSeconds, setTimeDifferenceInSeconds] = useState<
    number | null
  >(null);
  const [totalSeconds11, settotalSeconds1] = useState<number | null>(null);
  function secondsToTime(secs: any) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      "h": hours + " hours",
      "m": minutes + " minutes",
      "s": seconds + " seconds"
    };
    return obj;
  }
  const calculateTimeDifference = () => {
    const attendanceTimeString = lastCheckIn !== 'false' && lastCheckIn
    const currentTimeString = moment.utc(resultUTC).local().format('YYYY-MM-DD HH:mm:ss');
    if (attendanceTimeString && currentTimeString) {
      const [hours1, minutes1, seconds1] = attendanceTimeString.split(":")
        .map(Number);
      const [hours2, minutes2, seconds2] = currentTimeString
        .split(":")
        .map(Number);

      const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
      const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

      const differenceInSeconds = (totalSeconds2 - totalSeconds1);
      setTimeDifferenceInSeconds(differenceInSeconds);
      settotalSeconds1(totalSeconds1);
      setTimeDifferenceInSeconds(totalSeconds2);


    } else {
    }
  };

  useEffect(() => {
    calculateTimeDifference();

    const intervalId = setInterval(() => {
      calculateTimeDifference();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function Createattandece() {
    await AsyncStorage.setItem(
      "formattedDateTime1",
      formattedDateTime1
    );

    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
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
              odooPassword,
              "hr.attendance",
              "create",
              [userData],
              {},
            ],
          },
        }),
      });
      const responseData = await response.json();
      console.log("responseData Createattandece::::", responseData);
      if (responseData.result) {
        Loader.isLoading(false);
        Utility.showSuccessToast("Clocked in successfully");
        const customdata = responseData.result;

        setLoggedIn(false);
        setToggleForTimer(true)
        const resultTime = moment.utc(resultUTC).tz('Asia/Kolkata').format('HH:mm:ss');
        const time12Hour = moment(resultTime, 'HH:mm:ss').format('hh:mm:ss');
        setshowtime(time12Hour)
        setshowdate(`${day}-${month}-${year}`);
        setattendanceId(customdata);
        await AsyncStorage.setItem("attendanceId", customdata.toString());


      } else {
        Loader.isLoading(false);
        Utility.showDangerToast("already clocked in , can't clocked in again");
        console.error("crea>>>>>", responseData.message);
        return null;
      }

    }

    return null;
  }

  async function editattandece() {
    const uid = await AsyncStorage.getItem("userId");
    const gettimedate = await AsyncStorage.getItem("formattedDateTime1");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    Loader.isLoading(true);

    const userData = {

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
              odooPassword,
              "hr.attendance", 
              "write",
              [attendanceId],
              { vals: userData },
            ],
          },
        }),
      });

      const responseData = await response.json();
      console.log("responseData for editattandece ::::", responseData);
      if (responseData.result) {
        Loader.isLoading(false);

        setLoggedIn(true);
        setToggleForTimer(false)
        const resultTime = moment.utc(resultUTC).tz('Asia/Kolkata').format('HH:mm:ss');
        const time12Hour = moment(resultTime, 'HH:mm:ss').format('hh:mm:ss');
        setshowtime(time12Hour)
        const customdata = responseData.result;
      } else {
        Loader.isLoading(false);
        console.error("search_read........../", responseData.error);
        return null;
      }

      return responseData.result;
    }

    return null;
  }

  async function getEmployeesId() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
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
              odooPassword,
              "hr.employee", 
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
        setLastCheckoutFromEmploy(customdata[0].last_check_out)
        customdata.forEach((element) => {
          setemplotId(element.id)
          setLastCheckout(element.last_check_out)
          setLastCheckedIn(element.last_check_in)
        });
      } else {
        Loader.isLoading(false);
        console.error("search_read error://..", responseData.error);
        return null;
      }
    }

    return null;
  }

  async function sendlatlong() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
      const userData = locationData;
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
              odooPassword,
              "hr.attendance",
              "create_location",
              [1, userData],
            ],
          },
        }),
      });
      const responseData = await response.json();
      if (responseData) {
        Loader.isLoading(false);
        const customdata = responseData.result;
      } else {
        Loader.isLoading(false);
        console.error("create faild:>>", responseData.error);
        return null;
      }

    }

    return null;
  }


  const checkoutfun = () => {
    return (
      <View>
        <View>
          {loggedIn ? (
            <View
              style={{
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
                      width: Responsive.widthPx(70),
                      height: Responsive.heightPx(19),
                      justifyContent: "flex-end",
                      alignItems: "center",
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
                    <Text style={styles.checlout}>Check In</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                height: Responsive.heightPx(25),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={editattandece}>
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

                      width: Responsive.widthPx(70),
                      height: Responsive.heightPx(19),
                      justifyContent: "flex-end",
                      alignItems: "center",

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
                    <Text style={styles.checlout}>Check Out</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
        
      <AppHeader
        {...props}
        isBackBtn={false}
        islogo={true}
        drawermenu={true}
        isRightImage={true}
      />
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
              {loggedIn === false ? 'Clocked in' : 'Clocked out'}
            </Text>
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
                {loggedIn ? (
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "800",
                      color: Color.black,
                    }}
                  >
                    {lastCheckout !== "false" ? lastCheckout : ''}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "800",
                      color: Color.black,
                    }}
                  >
                    {lastCheckIn !== "false" ? lastCheckIn : ''}
                  </Text>
                )}
              </View>
            )}
            {showdate ? (
              <Text style={{ color: Color.text_color }}>{showdate}</Text>
            ) : (
              <View>
                {!loggedIn ? (
                  <Text style={{ color: Color.text_color, fontSize: 18 }}>
                    {/* {getattendece[0]?.check_in.slice(0, 10)} */}
                    {lastCheckinDate !== "false" ? moment(lastCheckinDate?.slice(0, 10)).format(
                      "DD-MM-YYYY"
                    ) : null}
                  </Text>
                ) : (
                  <Text style={{ color: Color.text_color, fontSize: 18 }}>
                    {lastCheckoutDate !== "false" ? moment(lastCheckoutDate?.slice(0, 10)).format(
                      "DD-MM-YYYY"
                    ) : null}
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
        </View>
        <View
          style={{
            width: Responsive.widthPx(90),
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: Responsive.heightPx(2),
            flex: 1
          }}
        >

          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={index === 0 ? styles.item : styles.item1}>
                <TouchableOpacity onPress={() => navigation.navigate(item.navkey, { status: item.text1 })}>
                  <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Image source={item.img} />
                    <Text style={{ textAlign: "center", fontSize: 11, color: Color.text_color, fontWeight: "800" }}>
                      {item.text1}
                    </Text>
                    <Text style={styles.listtext}>{item.text2}</Text>
                    <Text style={styles.listtext}>{item.text3}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.text1}
          />
        </View>
      </View>
    </AppContainer>

  );
};

export default HomeScreen;
