import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import BottomSheet from "react-native-bottomsheet";
import { Dropdown } from "react-native-element-dropdown";
import RNFS from 'react-native-fs';
import ImagePicker from "react-native-image-crop-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppButton,
  AppContainer,
  AppScrollview,
  AppTextInput
} from "../../Component";
import {
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility
} from "../../Helper";
import { ApiEndPoints } from "../../NetworkCall";
import { callOdooMethod } from "../OdooApi";
import styles from "./Profilestyle";

interface ProfileProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const Profile = (props: ProfileProps) => {
  const { navigation, text, commonActions, route } = props;
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
  const [City, setCity] = useState("");
  const [Pincode, setPincode] = useState("");
  const [value, setValue] = useState(null);
  const [countrysendvalue, setsendvalue] = useState(null);
  const [customerdata, setcustomerdata] = useState([]);
  const [countrydata, setcountrydata] = useState([]);
  const [statelist, setstatelist] = React.useState([]);
  const userId = route?.params?.useridsend;
  const username = route?.params?.cutname;
  const useremal = route?.params?.cutemail;
  const usermob = route?.params?.custphone;
  const userAddress = route?.params?.custaddr;
  const userparam = route?.params?.parametrt;
  const [usering, setIusering] = useState(route?.params?.usering);
  const [imagepath, setIMagespath] = React.useState(
    route?.params?.usering ? route?.params?.usering : null
  );

  useEffect(() => {
    getcountrylist();
  }, []);

  const imageFilePath = imagepath?.path;
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
                } else {
                  const imagedata = response?.assets[0];
                  setIMagespath({
                    path: imagedata?.uri,
                    ...imagedata,
                  });
                }
              }
            }
          );
        }
      }
    );
  };

  async function handleCreatePartner() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    if (!imagepath) {
      Alert.alert("KG-Minichem", "Please select your profile picture");
      return;
    }

    Loader.isLoading(true);
    let imageResponse = await RNFS.readFile(imagepath?.path, 'base64').then(res => { return res });

    const userData = {
      name: name,
      email: Email,
      mobile: Mobile,
      street: Address,
      city: City,
      state_id: value,
      zip: Pincode,
      country_id: Number(countrysendvalue),
      vat: gstNumber,
      image_1920: imageResponse,
      image_512: imageResponse,
    };

    if (uid !== null) {
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
              odooPassword,
              "res.partner", 
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
        navigation.navigate(Screen.NewCreateOrderScreen, {
          sendcustomerId: responseData.result,
          sendcustomerName: userData.name,
        });
        const customdata = responseData.result;
        setcustomerdata(customdata);
        console.log("search_read result::???", responseData.result);
      } else {
        Loader.isLoading(false);
        Utility.showDangerToast("profile not created");
        console.error("ProfileCreateError------->", responseData.error);
        return null;
      }
    }

    return null;
  }

  const editUser = async () => {
    let userData = {};
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    if (imageFilePath) {
      let imageResponse = await RNFS.readFile(imagepath?.path, 'base64').then(res => { return res });
      userData.image_1920 = imageResponse;
    }
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
              odooPassword,
              "res.partner", 
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
        Utility.showDangerToast("Profile not Edited");
        console.error("ProfileEditError-------", responseData.error);
        return null;
      }
      Loader.isLoading(false);
      return responseData.result;
    }

    return null;
  };

  async function getcountrylist() {
    const uid = await AsyncStorage.getItem("userId");
    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
      const countryData = await callOdooMethod(
        uid,
        "res.country",
        "search_read",
        [searchCriteria],
        {}
      );

      if (countryData) {
        setcountrydata(countryData);
      } else {
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
        "res.country.state",
        "search_read",
        [searchCriteria],
        {}
      );

      if (statedata) {
        Loader.isLoading(false);
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

                          onPickImage();
                        }}
                      >
                        <View
                          style={{
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

                          onPickImage();
                        }}
                      >
                        <View
                          style={{
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


              </View>
            </ImageBackground>

          </View>


          <View style={{ marginTop: Responsive.heightPx(4) }}>
            <View style={styles.textinputstyle}>


              <Text style={styles.labeltext}>Name</Text>
              <AppTextInput
                value={name}
                onChangeText={(name: any) => {
                  setname(name);
                }}
                placeHolder={"Name"}
              />
            </View>
            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>Email</Text>
              <AppTextInput
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
                value={gstNumber}

                onChangeText={(gstNumber: any) => {
                  setgstNumber(gstNumber);
                }}
                placeHolder={"GST Number"}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>Address</Text>
              <AppTextInput
                value={Address ? Address : userAddress}
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
                value={Pincode}
                onChangeText={(Pincode: any) => {
                  setPincode(Pincode);
                }}
                placeHolder={"Pin code"}
              />
            </View>

            <View style={styles.textinputstyle}>
              <Text style={styles.labeltext}>City</Text>
              <AppTextInput
                value={City}
                onChangeText={(City: any) => {
                  setCity(City);
                }}
                placeHolder={"City"}
              />
            </View>
          </View>
          <AppButton
            label={"Save Changes & Create Order"}
            onPress={() => {
              userparam ? editUser() : handleCreatePartner();
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

// export default Profile