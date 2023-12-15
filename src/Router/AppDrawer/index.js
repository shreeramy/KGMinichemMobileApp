import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
// import { Image } from 'react-native-elements/dist/image/Image'

import {
  Color,
  Fonts,
  Images,
  Responsive,
  Screen,
  Storage,
} from "../../Helper";
import { ApiEndPoints, ApiServices } from "../../NetworkCall";

const drawerList = [
  // {
  //   key: Screen.HomeScreen,
  //   name: "Home",
  //   headingicon: Images.activehome,
  // },
  {
    key: Screen.CustomerScreen,
    name: "Customer",
    headingicon: Images.DrawerCustomer,
  },
  {
    key: Screen.ProductCatalog,
    name: "Product catalog",
    headingicon: Images.Productcatalog,
  },
  {
    key: Screen.AttendanceHistoryScreen,
    name: "Attendance",
    headingicon: Images.Attendance,
  },
  // {
  //   key: Screen.LiveLocationScreen,
  //   name: "Real time location track",
  //   headingicon: Images.Realtimelocationtrack,
  // },
  {
    key: Screen.ShowOrderScreen,
    name: "Order",
    headingicon: Images.Order,
  },
  {
    key: Screen.HomeScreen,
    name: "Order status & notification",
    headingicon: Images.Orderstatus,
  },
];
const AppDrawer = ({ ...props }) => {
  const [profiledata, setProfiledata] = React.useState("");
  const [customerdata, setcustomerdata] = React.useState([]);
  React.useEffect(() => {
    //  Loader.isLoading(false)
    const abortController = new AbortController();
    props.navigation.addListener("focus", () => {
      // userinfo()
    });
    return () => {
      abortController.abort();
    };
  }, []);

  const userinfo = () => {
    ApiServices("get", false, ApiEndPoints.user_info).then((response) => {
      if (response.data.success == true) {
        setProfiledata(response.data.result);
      }
      //  console.log("this is profile data>>>>>>>@@@@@@@@?????????",profiledata)
    });
  };
  const onPressDrawer = (key) => {
    props.navigation.push(key);
  };

  const renderItem = ({ item }) => {
    return (
      // <>
      //   {
      //   profiledata.is_provider == 1 ?
      //     <TouchableOpacity style={styles.listContainer} onPress={() => { onPressDrawer(item.key) }}>
      //       <Text style={styles.textStyle}>{item.name}</Text>
      //     </TouchableOpacity>
      //   :
      //     // listHiden({item})

      //   item.name != 'All Requests' && item.name != 'My Requests' ?
      //     <TouchableOpacity style={styles.listContainer} onPress={() => { onPressDrawer(item.key) }}>
      //       <Text style={styles.textStyle}>{item.name}</Text>
      //     </TouchableOpacity>
      //   :
      //   null
      //   }
      // </>
      <View>
        <TouchableOpacity
          style={styles.listContainer}
          onPress={() => {
            onPressDrawer(item.key);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: Responsive.heightPx(6),
            }}
          >
            <Image
              source={item.headingicon}
              style={{
                width: Responsive.widthPx(7),
                height: Responsive.widthPx(7),
              }}
              resizeMode={"contain"}
            />
            <Text style={styles.textStyle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  React.useEffect(() => {
    retrieveData();
  }, []);

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

  const odooHost = "http://kg.wangoes.com";
  const odooDatabase = "kg.wangoes.com";
  const jsonRpcEndpoint = `${odooHost}/jsonrpc`;
  const odooPassword = "admin";

  const logout = async () => {
    try {
      // await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      props.navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Error clearing user session:", error);
    }
  };
  return (
    <ImageBackground source={Images.profilebgsummary} style={styles.container}>
      {/* <View style={styles.viewline} /> */}
      <ImageBackground
        resizeMode="cover"
        borderBottomLeftRadius={15}
        borderBottomRightRadius={15}
        style={{ height: Responsive.heightPx(20) }}
        source={Images.drawerbackground}
      >
        <View style={styles.profileNameview}>
          <View style={styles.imagenameView}>
            <View style={styles.imageView}>
              {customerdata[0]?.image_1920 ? (
                <Image
                  source={{
                    uri: `data:image/png;base64,${customerdata[0]?.image_1920}`,
                  }}
                  style={styles.imageStyle}
                />
              ) : (
                <Image source={Images.draweruser} style={styles.imageStyle} />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.nameTitlestyle}>
                {customerdata[0]?.name}
                {/* {profiledata.first_name} {profiledata.last_name} */}
              </Text>
              <Text style={{ color: "#fff" }}>
                {customerdata[0]?.email}
                {/* {profiledata.first_name} {profiledata.last_name} */}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.profileDetails}>
        <View style={{}}>
          <FlatList
            data={drawerList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(_, index) => `drawer${index}`}
          />
          {/* <TouchableOpacity
            style={styles.listContainer}
            onPress={() => props.navigation.navigate('EnquiryScreen', { userid: profiledata.id })}
          >
            <Text style={styles.textStyle}>Enquiry</Text>
          </TouchableOpacity> */}
          <View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // marginLeft: 5,
                marginTop: 12,
              }}
            >
              <Image source={Images.LogOut} />
              <TouchableOpacity
                style={styles.listContainer}
                onPress={() => logout()}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  listContainer: {
    // paddingTop: 5
    // paddingLeft: 30
    // margin:
    // marginTop: 10,
  },
  listContainer1: {
    // paddingTop: 5
    // paddingLeft: 30
    // margin:
    backgroundColor: "red",
  },
  container: {
    height: Responsive.heightPx(100),
  },
  profileDetails: {
    marginLeft: Responsive.widthPx(5),
    height: Responsive.widthPx(116),
    // backgroundColor: "red",
    marginTop: Responsive.heightPx(4),
  },
  viewline: {
    height: Responsive.widthPx(13),
    // backgroundColor: "red",
  },
  profileNameview: {
    height: Responsive.widthPx(30),
    // backgroundColor: "red",
  },
  imageStyle: {
    width: Responsive.widthPx(20),
    height: Responsive.widthPx(20),
    borderRadius: 100,
    // backgroundColor: "red"
  },
  imageView: {
    width: Responsive.widthPx(22),
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
  imagenameView: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    padding: 8,
    height: Responsive.heightPx(18),
  },
  nameTitlestyle: {
    color: Color.white,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: Responsive.font(4.5),
    width: Responsive.widthPx(40),
  },
  textStyle: {
    fontSize: Responsive.font(4),
    color: Color.text_color,
    fontFamily: Fonts.Poppins_Medium,
    marginLeft: 10,
  },
});
