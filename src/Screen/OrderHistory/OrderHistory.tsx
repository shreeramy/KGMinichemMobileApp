import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";
import { SvgIcon } from "../../Component/SvgIcons";
import { Color, Const, Images, Loader, Responsive, Screen } from "../../Helper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import { useEffect } from "react";
import styles from "./OrderHistoryStyle";

interface OrderHistoryProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const OrderHistory = (props: OrderHistoryProps) => {
  const { navigation, text, commonActions } = props;
  const [email, setemail] = useState("");
  const data = [
    {
      text1: "Red clay",
      text2: "Lorem Ipsum",
      text3: "Pending",
      img: Images.listimg1,
      colors: "#E73C31",
    },
    {
      text1: "White clay",
      text2: "Lorem Ipsum",
      text3: "Arrived",
      img: Images.listimg2,
      colors: "#0DD157",
    },
    {
      text1: "Red clay",
      text2: "Lorem Ipsum",
      text3: "Processing",
      img: Images.listimg3,
      colors: "#C67C4E",
    },
    {
      text1: "White clay",
      text2: "Lorem Ipsum",
      text3: "Arrived",
      img: Images.listimg4,
      colors: "#0DD157",
    },
    {
      text1: "Red clay",
      text2: "Lorem Ipsum",
      text3: "Pending",
      img: Images.listimg5,
      colors: "#E73C31",
    },
  ];

  return (
    <AppContainer>
      {/* <AppScrollview> */}
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
              Order History
            </Text>
          </View>
          {/* <View style={styles.headerview1}>
            <TouchableOpacity>
              <Image resizeMode="contain" source={Images.Delete} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{
                  marginLeft: 10,
                }}
                resizeMode="contain"
                source={Images.Edit}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{
                  marginLeft: 10,
                }}
                resizeMode="contain"
                source={Images.Filter}
              />
            </TouchableOpacity>
          </View> */}
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // <TouchableOpacity onPress={() => {}} style={{}}>
            <View style={styles.item}>
              <View>
                <Image
                  style={{
                    width: Responsive.widthPx(20),
                    height: Responsive.heightPx(10),
                    //   backgroundColor: "red",
                    borderRadius: Responsive.widthPx(3),
                  }}
                  resizeMode="contain"
                  source={Images.catelogBanner}
                />
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.listtextheading}>{item.text1}</Text>
                {/* <View style={{}}> */}
                <Text style={styles.listtext}>{item.text2}</Text>
                <View
                  style={{
                    // marginLeft: 5,
                    backgroundColor: item.colors,
                    padding: Responsive.widthPx(1.5),
                    borderRadius: Responsive.widthPx(5),
                    width: Responsive.widthPx(30),
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Text style={styles.listtext1}>{item.text3}</Text>
                </View>
              </View>
              {/* </View> */}
            </View>
            // </TouchableOpacity>
          )}
        />
      </View>
      {/* </AppScrollview> */}
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(OrderHistory);
