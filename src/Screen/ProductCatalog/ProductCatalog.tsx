import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
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
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import styles from "./ProductCatalogstyle";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
import * as OdooApi from "../OdooApi";
interface ProductCatalogProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const ProductCatalog = (props: ProductCatalogProps) => {
  const { navigation, text, commonActions } = props;
  const [discr, setdiscr] = useState("");

  const data = [
    {
      text1: "Customer",
      text2: "12",
      text3: "0% since last period",
      img: Images.listimg1,
    },
    {
      text1: "Quotation",
      text2: "8",
      text3: "0% since last period",
      img: Images.listimg2,
    },
    {
      text1: "Order",
      text2: "10",
      text3: "0% since last period",
      img: Images.listimg3,
    },
    {
      text1: "Attandance",
      text2: "24",
      text3: "0% since last period",
      img: Images.listimg4,
    },
    {
      text1: "Products",
      text2: "2",
      text3: "0% since last period",
      img: Images.listimg5,
    },

    // Add more items as needed
  ];
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [customerdata, setcustomerdata] = useState([]);
  const [atributename, setatributename] = useState([]);
  const [prosearch, setprosearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [offsetdata, setoffsetdata] = useState(0);
  // const htmlContent = discrp;
  const [noMoreData, setNoMoreData] = useState(false);
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    retrieveData();
    Showproduclist();
  }, []);

  const barcodeData =
    "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";

  // ****************************************************************************
  // Wroking code
  async function searchRead1(e: any) {
    const uid = await AsyncStorage.getItem("userId");
    // Loader.isLoading(true);

    if (uid) {
      const searchCriteria = [["name", "ilike", e]];
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
              "product.template", // Replace with the desired model name
              "search_read",
              [searchCriteria],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();

      if (responseData.result) {
        Loader.isLoading(false);
        const customdata = responseData.result;
        setcustomerdata(customdata);
        console.log("search_read result:::::", responseData.result);
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  const Showproduclist = async () => {
    try {
      Loader.isLoading(true);

      const uid = await AsyncStorage.getItem("userId");
      const searchCriteria = [["id", "=", 0]];

      if (uid) {
        const result = await OdooApi.get_all_product_details(
          uid,
          searchCriteria
        );

        if (result) {
          setcustomerdata(result);
          // Handle the result as needed, for example:
          console.log("Product details:", result);
        } else {
          console.error("Error fetching product details");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      Loader.isLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.bannerItem}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate(Screen.CatalogDetils, {
              product: item?.id,
              img: item?.image,
              discrption: item?.product_description,
              title: item?.name,
              image_list: item?.image_list,
              attributelineids: item?.attribute_values,
              colorcode: item?.color_code,
            });
          }}
        >
          <Image
            resizeMode="stretch"
            // source={item.image}
            // source={{ uri: `data:image/png;base64,${barcodeData}` }}
            source={{ uri: `data:image/png;base64,${item?.image}` }}
            style={{
              width: Responsive.widthPx(93),
              height: Responsive.heightPx(35),
              alignSelf: "center",
              borderRadius: Responsive.widthPx(1),
              marginTop: Responsive.heightPx(3),
              // backgroundColor: "red",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Responsive.widthPx(90),
            alignSelf: "center",
            marginTop: Responsive.heightPx(1),
          }}
        >
          <Text
            style={{
              color: Color.text_color,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {/* {item.image_1920} */}
            {item?.name}
          </Text>
          <View
            style={{
              marginTop: Responsive.heightPx(1),
              // backgroundColor: "red",
              marginBottom: Responsive.heightPx(1),
            }}
          >
            <Text style={{ color: "gray" }}>
              {item?.description?.toString()?.replace(/<[^>]+>/g, "")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppScrollview>
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
                Products
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  searchRead1();
                }}
              >
                <Image
                  style={{ width: Responsive.widthPx(10) }}
                  resizeMode="contain"
                  source={Images.Search}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                style={{
                  padding: 2,
                  // backgroundColor: "red",
                  height: Responsive.heightPx(5),
                  width: Responsive.widthPx(65),
                  color: Color.text_color,
                  marginLeft: 10,
                }}
                value={prosearch}
                onChangeText={(prosearch: any) => {
                  setprosearch(prosearch);
                  searchRead1(prosearch);
                }}
                placeholderTextColor={Color.text_color}
                placeholder="Search"
              />
            </View>

            {prosearch.length > 0 ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setprosearch("");
                    Showproduclist();
                  }}
                >
                  <Image
                    style={{
                      width: Responsive.widthPx(5),
                      height: Responsive.heightPx(4),
                      // backgroundColor: "red",
                    }}
                    resizeMode="contain"
                    source={Images.crossicon}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {/* <View style={{ flex: 1 }}>
            <Carousel
              data={customerdata}
              renderItem={renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              onSnapToItem={(index) => setActiveSlide(index)}
              loop={true}
            />
          </View> */}
          {/* <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <Carousel
              data={bannerData}
              renderItem={renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              onSnapToItem={(index) => setActiveSlide(index)}
              loop={true}
            />
            <View style={{}}>
              <Pagination
                dotsLength={bannerData.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor="blue" // Change the color of the active dot as needed
                inactiveDotColor={Color.botton_Color} // Change the color of inactive dots as needed
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.inactivePaginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
          </View> */}

          <FlatList
            data={customerdata}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            // onEndReached={onendreached}
            // onEndReached={onEndReached}
            // onEndReachedThreshold={0.1} // Adjust as needed
            // ListFooterComponent={() =>
            //   loading ? (
            //     <ActivityIndicator size="large" color="#0000ff" />
            //   ) : null
            // }
          />

          {/* {loading ? (
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                width: Responsive.widthPx(100),
              }}
            >
              <ActivityIndicator color="red" />
            </View>
          ) : null} */}
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

export default connect(null, mapDispatchToProps)(ProductCatalog);
