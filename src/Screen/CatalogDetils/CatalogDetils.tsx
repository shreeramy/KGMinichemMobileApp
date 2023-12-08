import { Text, StyleSheet, View, Image, ImageBackground } from "react-native";
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
import styles from "./CatalogDetilsstyls";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import axios from "axios";
import { color } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";

interface CatalogDetilsProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const CatalogDetils = (props: CatalogDetilsProps) => {
  const { navigation, text, commonActions, route } = props;
  const [getitem, setgetitem] = useState("");

  const [attribute_line_ids, setattribute_line_ids] = useState(
    route?.params?.attributelineids
  );
  const [imagelist, setimagelist] = useState(route?.params?.image_list);
  ("");

  const proimag = route?.params?.img;
  const atribute_color_code = route?.params?.colorcode;
  const proId = route?.params?.product;
  const dicreptiion = route?.params?.discrption;
  const titl = route?.params?.title;
  // const attribute_line_ids = route?.params?.attributelineids;
  const textvalue = getitem;
  // const textsArray = textvalue?.split(", ");
  const textsArray = textvalue;

  const renderItem = ({ item }) => (
    <View style={styles.item1}>
      <TouchableOpacity
        onPress={() => navigation.navigate(Screen.ShowOrderScreen)}
      >
        <View>
          <View
            style={{
              // width: Responsive.widthPx(25),
              backgroundColor: atribute_color_code,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: Responsive.widthPx(4),
              borderRadius: Responsive.widthPx(3),
              height: Responsive.heightPx(7),
            }}
          >
            <Text
              style={{
                color: Color.white,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {console.log(">>??..", item)}
              {item}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <AppContainer>
      <View style={styles.container}>
        <View style={styles.topcontener}>
          <ImageBackground
            resizeMode="stretch"
            borderBottomLeftRadius={5}
            borderBottomRightRadius={5}
            style={{
              top: 0,
              height: Responsive.heightPx(28),
              width: Responsive.widthPx(100),
              // backgroundColor: "red",
            }}
            // source={Images.catelogBanner}
            source={{ uri: `data:image/png;base64,${proimag}` }}
          >
            <View style={{ marginTop: Responsive.heightPx(5) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // backgroundColor: "red",
                  width: Responsive.widthPx(90),
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
              </View>
            </View>
          </ImageBackground>

          <View
            style={{
              width: Responsive.widthPx(90),
              marginTop: Responsive.heightPx(2),
            }}
          >
            <View style={{}}>
              <FlatList
                data={attribute_line_ids}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: atribute_color_code,
                }}
              >
                {titl}
              </Text>
            </View>
            <View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Color.text_color,
                    fontWeight: "bold",
                  }}
                >
                  Description
                </Text>
                <Text
                  style={{
                    color: "gray",
                    textAlign: "left",
                    alignItems: "flex-start",
                    marginTop: 10,
                  }}
                >
                  {dicreptiion?.toString()?.replace(/<[^>]+>/g, "")}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            alignSelf: "center",
            width: Responsive.widthPx(90),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(Screen.ProductCatalog)}
          >
            <Text style={{ fontSize: 15, color: Color.text_color }}>
              More images
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View> */}
        <FlatList
          data={imagelist}
          numColumns={2}
          style={{ marginBottom: 20, marginTop: 5 }}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.item}>
                <View
                  style={{
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "red",
                  }}
                >
                  {item ? (
                    <Image
                      style={{
                        width: Responsive.widthPx(44),
                        height: Responsive.heightPx(17),
                        borderRadius: Responsive.widthPx(4),
                      }}
                      resizeMode="cover"
                      source={{
                        uri: `data:image/png;base64,${item}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={{
                        width: Responsive.widthPx(44),
                        height: Responsive.heightPx(17),
                        borderRadius: Responsive.widthPx(4),
                      }}
                      resizeMode="contain"
                      source={Images.noimg}
                    />
                  )}
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
      {/* </View> */}
      {/* </AppScrollview> */}
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(CatalogDetils);
