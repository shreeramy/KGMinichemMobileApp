import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Alert,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import React, { Component, useRef, useState } from "react";
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
// import { launchImageLibrary } from "react-native-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import BottomSheet from "react-native-bottomsheet";
import CountryPicker from "react-native-country-picker-modal";
import RBSheet from "react-native-raw-bottom-sheet";
import RNFetchBlob from "rn-fetch-blob"; // Import RNFetchBlob for handling file operations
import { Dropdown } from "react-native-element-dropdown";
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import { useEffect } from "react";
import styles from "./Profilestyle";
import { callOdooMethod } from "../OdooApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";

interface ProfileProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const Profile = (props: ProfileProps) => {
  const { navigation, text, commonActions, route } = props;
  const refRBSheet: any = useRef();
  const [name, setname] = useState(
    route?.params?.cutname ? route?.params?.cutname : ""
  );
  const [Email, setEmail] = useState(
    route?.params?.cutemail ? route?.params?.cutemail : ""
  );
  const [Mobile, setMobile] = useState(
    route?.params?.custphone ? route?.params?.custphone : ""
  );
  const [gstNumber, setgstNumber] = useState("");
  const [Address, setAddress] = useState(
    route?.params?.custaddr ? route?.params?.custaddr : ""
  );
  const [cunState, setcunState] = useState("");
  const [City, setCity] = useState("");
  const [Pincode, setPincode] = useState("");
  const [imgage, setImage] = useState("");
  const [mageObject, setImageObject] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [country, setCountry] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [profile, setProfile] = React.useState("");
  const [imageSource, setImageSource] = useState(null);
  const [callingCode, setCallingCode] = useState();
  const [baseimg, setbaseimg] = useState();
  const [value, setValue] = useState(null);
  const [countrysendvalue, setsendvalue] = useState(null);
  const [customerdata, setcustomerdata] = useState([]);
  const [countrydata, setcountrydata] = useState([]);
  const [statelist, setstatelist] = React.useState([]);
  const customeralldata = route?.params?.allcustmData;
  console.log(">>?>...///", customeralldata);
  const [roll, setroll] = React.useState("");
  const userId = route?.params?.useridsend;
  const username = route?.params?.cutname;
  const useremal = route?.params?.cutemail;
  const usermob = route?.params?.custphone;
  const userAddress = route?.params?.custaddr;
  const userparam = route?.params?.parametrt;
  // const usering = route?.params?.usering;
  const [usering, setIusering] = useState(route?.params?.usering);
  const [imagepath, setIMagespath] = React.useState(
    route?.params?.usering ? route?.params?.usering : null
  );
  useEffect(() => {
    getcountrylist();
    // getstatelist();
  }, []);

  console.log("routeuserId??>>>>///", userId, username);

  const imageFilePath = imagepath?.path;
  console.log(">>>imageF>>>>", imageFilePath);
  const onPickImage = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: ["Open Camera", "Select Gallery", "Cancel"],
        cancelButtonIndex: 3,
      },
      (value) => {
        if (value === 0) {
          ImagePicker.openCamera({
            mediaType: "photo",
            width: 300,
            height: 400,
            cropping: true,
          }).then((imagepath) => {
            setIMagespath(imagepath);
          });
        } else if (value === 1) {
          launchImageLibrary(
            {
              mediaType: "photo",
              includeBase64: false,
            },
            (response) => {
              if (response) {
                if (response.didCancel) {
                  // User canceled the image selection
                } else {
                  const imagedata = response.assets[0];
                  setIMagespath({
                    path: imagedata?.uri,
                    ...imagedata,
                  });
                  // Imageuploade(imagedata);
                }
              }
            }
          );
        }
      }
    );
  };

  // Define the authenticate function
  async function handleCreatePartner(e: any) {
    const uid = await AsyncStorage.getItem("userId");

    // Loader.isLoading(true);

    // Load the image file
    if (!imagepath) {
      Alert.alert("KG-Minichem", "Please select your profile picture");
      return;
    }

    Loader.isLoading(true);

    const imageResponse = await RNFetchBlob.fs.readFile(
      imageFilePath,
      "base64"
    );
    console.log("jhc>>//", setbaseimg(imageResponse));

    const userData = {
      name: name,
      email: Email,
      phone: Mobile,
      street: Address,
      city: City,
      state_id: value,
      zip: Pincode,
      country_id: Number(countrysendvalue),
      vat: gstNumber,
      image_1920: imageResponse,
    };

    if (uid) {
      const searchCriteria = [["id", "!=", 0]];

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
              "res.partner", // Replace with the desired model name
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
        Utility.showSuccessToast("profile created successfully");
        navigation.navigate(Screen.ProductCatalog);
        const customdata = responseData.result;
        setcustomerdata(customdata);
        console.log("search_read result::???", responseData.result);
      } else {
        Loader.isLoading(false);
        Utility.showSuccessToast("profile not created");
        console.error("search_read error://..", responseData.error);
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  const editUser = async () => {
    let userData = {};
    console.log(">>>>>>.13246??>>");
    const uid = await AsyncStorage.getItem("userId");
    // Loader.isLoading(true);
    // Load the image file
    // if (!imagepath) {
    //   Alert.alert("KG-Minichem", "Please select your profile picture");
    //   return;
    // }
    if (imageFilePath) {
      console.log(">>>imageF>>>>111000", imageFilePath);
      const imageResponse = await RNFetchBlob.fs.readFile(
        imageFilePath,
        "base64"
      );
      userData.image_1920 = imageResponse;
      console.log("i>>>>/", imageResponse);
    }
    // Loader.isLoading(true);

    console.log(">>>route?.../..", route?.params?.usering);
    console.log(">>>route????...///");
    if (route?.params?.cutname) {
      userData.name = name;
    }
    if (route?.params?.cutemail) {
      userData.email = Email;
    }
    if (route?.params?.custphone) {
      userData.phone = Mobile;
    }
    if (route?.params?.custaddr) {
      userData.street = Address;
    }
    userData.city = City;
    userData.state_id = Number(value);
    userData.zip = Pincode;
    userData.country_id = Number(countrysendvalue);
    userData.vat = gstNumber;
    console.log("<>>>??>//???...", userData);

    console.log("user>>>>.", userData);
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
            args: [
              ApiEndPoints.odooDatabase,
              uid,
              "admin",
              "res.partner", // Replace with the desired model name
              "write",
              [userId],
              { values: userData },
            ],
          },
        }),
      });

      const responseData = await response.json();
      console.log("search>>>>.", responseData.result);
      if (responseData.result) {
        Loader.isLoading(false);
        Utility.showSuccessToast("profile Edited successfully");
        navigation.navigate(Screen.NewCreateOrderScreen, {
          sendcustomerId: userId,
          sendcustomerName: username,
        });
        const customdata = responseData.result;
        setcustomerdata(customdata);
        console.log("search_read result_Editapi..", responseData.result);
      } else {
        Loader.isLoading(false);
        Utility.showDangerToast("profile not Edited");
        console.error("search_read error://..", responseData.error);
        return null;
      }
      Loader.isLoading(false);
      return responseData.result;
    }

    return null;
  };

  // with callOdooMethod
  // const editUser = async () => {
  //   try {
  //     const uid = await AsyncStorage.getItem("userId");

  //     if (!uid) {
  //       console.error("User ID not found");
  //       return null;
  //     }

  //     let userData = {};

  //     if (imageFilePath) {
  //       const imageResponse = await RNFetchBlob.fs.readFile(
  //         imageFilePath,
  //         "base64"
  //       );
  //       userData.image_1920 = imageResponse;
  //     }

  //     if (route?.params?.cutname) {
  //       userData.name = name;
  //     }
  //     if (route?.params?.cutemail) {
  //       userData.email = Email;
  //     }
  //     if (route?.params?.custphone) {
  //       userData.phone = Mobile;
  //     }
  //     if (route?.params?.custaddr) {
  //       userData.street = Address;
  //     }

  //     userData.city = City;
  //     userData.state_id = Number(value);
  //     userData.zip = Pincode;
  //     userData.country_id = Number(countrysendvalue);
  //     userData.vat = gstNumber;

  //     console.log("<>>>??>//???...", userData);

  //     const response = await callOdooMethod(
  //       uid,
  //       "res.partner",
  //       "write",
  //       [userId],
  //       { values: userData }
  //     );

  //     console.log("search>>>>.", response.result);

  //     if (response.result) {
  //       Loader.isLoading(false);
  //       Utility.showSuccessToast("Profile edited successfully");
  //       navigation.navigate(Screen.NewCreateOrderScreen);
  //       setcustomerdata(response.result);
  //       console.log("search_read result_Editapi..", response.result);
  //     } else {
  //       Loader.isLoading(false);
  //       Utility.showDangerToast("Profile not edited");
  //       console.error("search_read error://..", response.error);
  //     }

  //     return response.result;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return null;
  //   }
  // };

  async function getcountrylist() {
    const uid = await AsyncStorage.getItem("userId");
   // Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
      const countryData = await callOdooMethod(
        uid,
        "res.country", // Replace with the desired model name
        "search_read",
        [searchCriteria],
        {}
      );

      if (countryData) {
       // Loader.isLoading(false);
        console.error("get>>>>.???", countryData);
        setcountrydata(countryData);
      } else {
        //Loader.isLoading(false);
        console.error("search_read error://..");
      }
    }
  }

  async function getstatelist(stateid: any) {
    const uid = await AsyncStorage.getItem("userId");
    Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [["country_id", "=", stateid]];
      const statedata = await callOdooMethod(
        uid,
        "res.country.state", // Replace with the desired model name
        "search_read",
        [searchCriteria],
        {}
      );

      if (statedata) {
        Loader.isLoading(false);
        console.error("get>>>??/...??//", statedata);
        setstatelist(statedata);
      } else {
        Loader.isLoading(false);
        console.error("search_read error://..");
      }
    }
  }

  return (
    <AppContainer>
      <AppScrollview>
        <View style={styles.container}>
          <View style={styles.topcontener}>
            {/* <View> */}
            <ImageBackground
              resizeMode="stretch"
              borderBottomLeftRadius={15}
              borderBottomRightRadius={15}
              style={{
                height: Responsive.heightPx(30),
                width: Responsive.widthPx(100),
              }}
              source={Images.drawerbackground}
            >
              <View style={{ marginTop: Responsive.heightPx(5) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "red",
                    width: Responsive.widthPx(55),
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack(null)}>
                      <Image
                        style={{
                          width: Responsive.widthPx(10),
                          height: Responsive.heightPx(8),
                          tintColor: "#fff",
                        }}
                        resizeMode="contain"
                        source={Images.blackbacicon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                  >
                    Profile
                  </Text>
                </View>
                <View style={{ alignSelf: "center" }}>
                  {usering ? (
                    <ImageBackground
                      borderRadius={60}
                      resizeMode="cover"
                      style={{
                        height: Responsive.heightPx(11),
                        width: Responsive.widthPx(22),
                      }}
                      source={{
                        uri: `data:image/png;base64,${usering}`,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // onGallery();
                          onPickImage();
                        }}
                      >
                        <View
                          style={{
                            // backgroundColor: "red",
                            height: Responsive.heightPx(9),
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            width: Responsive.widthPx(22),
                          }}
                        >
                          <Image source={Images.camera} />
                        </View>
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      borderRadius={60}
                      resizeMode="cover"
                      style={{
                        height: Responsive.heightPx(11),
                        width: Responsive.widthPx(22),
                      }}
                      source={
                        imagepath ? { uri: imagepath?.path } : Images.draewuser
                      }
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // onGallery();
                          onPickImage();
                        }}
                      >
                        <View
                          style={{
                            // backgroundColor: "red",
                            height: Responsive.heightPx(9),
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            width: Responsive.widthPx(22),
                          }}
                        >
                          <Image source={Images.camera} />
                        </View>
                      </TouchableOpacity>
                    </ImageBackground>
                  )}
                </View>

                {/* <TouchableOpacity onPress={onPickImage}>
                  {imagepath ? (
                    <Image
                      source={
                        imagepath ? { uri: imagepath?.path } : Images.camera
                      }
                      style={{
                        width: Responsive.widthPx(50),
                        height: Responsive.heightPx(50),
                      }}
                    />
                  ) : (
                    <Image
                      source={Images.draweruser}
                      resizeMode="contain"
                      style={{
                        width: Responsive.widthPx(50),
                        height: Responsive.heightPx(50),
                      }}
                    />
                  )}
                </TouchableOpacity> */}
              </View>
            </ImageBackground>
            {/* </View> */}
          </View>
          {/* <View style={styles.signdot}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign In</Text>
            <SvgIcon Icon={Images.logndots} height={55} width={50} />
          </View> */}

          <View style={{ marginTop: Responsive.heightPx(4) }}>
            <View style={styles.textinputstyle}>
              {/* <View>
                <RBSheet
                  ref={refRBSheet}
                  height={300}
                  openDuration={250}
                  customStyles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: Color.black,
                      borderTopLeftRadius: 10,
                    },
                  }}
                >
                  <YourOwnComponent />
                </RBSheet>
              </View> */}

              <Text style={styles.labeltext}>Name</Text>
              <AppTextInput
                // userimg={true}
                value={name}
                // keyboardType={"email-address"}
                onChangeText={(name: any) => {
                  setname(name);
                }}
                placeHolder={"Name"}
              />
            </View>
            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>Email</Text>
              <AppTextInput
                // userimg={true}
                value={Email ? Email : useremal}
                keyboardType={"email-address"}
                onChangeText={(email: any) => {
                  setEmail(email);
                }}
                placeHolder={"Email"}
              />
            </View>
            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>Mobile</Text>
              <AppTextInput
                maxLength={10}
                // userimg={true}
                value={Mobile ? Mobile : usermob}
                keyboardType={"number-pad"}
                onChangeText={(Mobile: any) => {
                  setMobile(Mobile);
                }}
                placeHolder={"Mobile"}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>GST Number</Text>
              <AppTextInput
                // userimg={true}
                value={gstNumber}
                // keyboardType={"email-address"}
                onChangeText={(gstNumber: any) => {
                  setgstNumber(gstNumber);
                }}
                placeHolder={"GST Number"}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>Address</Text>
              <AppTextInput
                // userimg={true}
                value={Address ? Address : userAddress}
                // keyboardType={"email-address"}
                onChangeText={(Address: any) => {
                  setAddress(Address);
                }}
                placeHolder={"Address"}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>Country</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countrydata}
                search
                maxHeight={300}
                labelField="display_name"
                valueField="id"
                placeholder="Select Country"
                searchPlaceholder="Search..."
                value={countrysendvalue}
                onChange={(item) => {
                  setsendvalue(item?.id), getstatelist(item?.id);
                }}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>State</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={statelist}
                search
                maxHeight={300}
                labelField="display_name"
                valueField="id"
                placeholder="Select state"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.id);
                }}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>Pin code</Text>
              <AppTextInput
                // userimg={true}
                value={Pincode}
                // keyboardType={"email-address"}
                onChangeText={(Pincode: any) => {
                  setPincode(Pincode);
                }}
                placeHolder={"Pin code"}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>City</Text>
              <AppTextInput
                // userimg={true}
                value={City}
                // keyboardType={"email-address"}
                onChangeText={(City: any) => {
                  setCity(City);
                }}
                placeHolder={"City"}
              />
            </View>
          </View>
          <AppButton
            label={"Save Changes & Create Order"}
            // containerStyle={styles.btnsyle}
            onPress={() => {
              userparam ? editUser() : handleCreatePartner();
              // editUser();
            }}
          />
        </View>
      </AppScrollview>
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Profile);
