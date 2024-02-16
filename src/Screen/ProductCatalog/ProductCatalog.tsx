import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppContainer,
} from "../../Component";
import {
  Color,
  Const,
  Images,
  Loader,
  Responsive,
  Screen
} from "../../Helper";
import { ApiEndPoints } from "../../NetworkCall";
import * as OdooApi from "../OdooApi";
import styles from "./ProductCatalogstyle";
interface ProductCatalogProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const ProductCatalog = (props: ProductCatalogProps) => {
  const { navigation, text, commonActions } = props;
  const [customerdata, setcustomerdata] = useState([]);
  const [prosearch, setprosearch] = useState("");
  


  useEffect(() => {
    Showproduclist();
  }, []);

  async function searchRead1(e: any) {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword")

    if (uid) {
      const searchCriteria = [["name", "ilike", e], ["sale_ok", "=", true]];
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
              "product.template",
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
          console.log("Product details:", result);
          console.log("Product catelog:", result);
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
            navigation.navigate(Screen.CatalogDetails, {
              product: item?.id,
              img: item?.image,
              discrption: item?.product_description,
              title: item?.name,
              image_list: item?.image_list,
              attributelineids: item?.attribute_values,
              colorcode: item?.color_code,
              pdf: item?.catelog_pdf
            });
          }}
        >
          <Image
            resizeMode="stretch"
            source={{ uri: `data:image/png;base64,${item?.image}` }}
            style={{
              width: Responsive.widthPx(93),
              height: Responsive.heightPx(35),
              alignSelf: "center",
              borderRadius: Responsive.widthPx(1),
              marginTop: Responsive.heightPx(3),
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
            {item?.name}
          </Text>
          <View
            style={{
              marginTop: Responsive.heightPx(1),
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
          <View style={styles.item} testID="search-results">
            <View>
              <TouchableOpacity
                onPress={() => {
                  searchRead1();
                }}
                testID="search-button"
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
                    }}
                    resizeMode="contain"
                    source={Images.crossicon}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <FlatList
            data={customerdata}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
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

export default connect(null, mapDispatchToProps)(ProductCatalog);