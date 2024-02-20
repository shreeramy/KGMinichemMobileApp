import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer } from '../../Component';
import { Color, Const, Images, Loader, Responsive, Screen } from '../../Helper';
import { ApiEndPoints } from '../../NetworkCall';
import * as OdooApi from '../OdooApi';
import styles from './CustomerScreenstyle';
interface CustomerScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const CustomerScreen = (props: CustomerScreenProps) => {
  const { navigation, text, commonActions } = props;
  const [customerdata, setcustomerdata] = useState([]);
  const [prosearch, setprosearch] = useState("");
  const [page, setPage] = useState(1);


  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [apiCall, setApicall] = useState(false);

  useEffect(() => {
    searchReadData();
  }, []);

  async function searchRead1(e: any) {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");

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
              odooPassword,
              "res.partner",
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
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }
    }

    return null;
  }

  const searchReadData = async (pageNumber) => {
    try {
      setLoading(true);
      const uid = await AsyncStorage.getItem("userId");
      const uIDInt = parseInt(uid)
      console.log("uIDInt", uIDInt)

      if (uIDInt && !noMoreData) {
        const searchCriteria = [["id", "!=", 0], ["create_uid", "=", uIDInt]];
        const fields = ["id", "name", "image_512", "mobile", "email", "vat", "country_id", "state_id", "street", "zip", "city"]
        const list = ["id"];

        const limit = 10;
        const offset = (pageNumber - 1) * 10;

        const searchData = await OdooApi.searchRead(
          uIDInt,
          "res.partner",
          searchCriteria,
          limit,
          offset,
          fields
        );
        console.log("searchData in custenerrfhbadsjkhj====>", searchData)
        if (searchData && searchData.length <= 10) {
          setNoMoreData(true)
        }
        if (searchData) {
          setcustomerdata((prevData: any) => {
            if (pageNumber === 1) {
              return [...searchData];
            } else {
              const uniqueData = searchData.filter(
                (item: any) =>
                  !prevData.some((existingItem) => existingItem.id === item.id)
              );
              return [...prevData, ...uniqueData];
            }
          });
        } else {
          console.error("searchRead error://..");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onendreached = () => {;
    if (apiCall) {
    } else {
      if (!loading && !noMoreData) {
        setPage((prevPage) => prevPage + 1);
        searchReadData(page + 1);
      }
    }

  };

  useEffect(() => {
    const fetchCachedData = async () => {
      const cachedData = await AsyncStorage.getItem("cachedCustomerData");

      if (cachedData) {
      } else {
        searchReadData(page);
      }
    };

    fetchCachedData();
  }, []); 

  useEffect(() => {
    AsyncStorage.setItem("cachedCustomerData", JSON.stringify(customerdata));
  }, [customerdata]);


  
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
              Customer
            </Text>
          </View>
        </View>
        <View style={styles.item1}>
          <View>
            <TouchableOpacity
              onPress={() => {
                searchRead1(prosearch);
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
                height: Responsive.heightPx(5),
                width: Responsive.widthPx(65),
                color: Color.text_color,
                marginLeft: 10,
              }}
              value={prosearch}
              onChangeText={(prosearch: any) => {
                setprosearch(prosearch);
                setApicall(true);
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
                  setApicall(false);
                  searchReadData();
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Screen.EditProfile, { user: item })
              }
              style={{}}
            >
              <View style={styles.item}>
                <View>
                  <Image
                    style={{
                      width: Responsive.widthPx(5),
                      height: Responsive.heightPx(5),
                    }}
                    resizeMode="contain"
                    source={{
                      uri: `data:image/png;base64,${item?.image_512}`,
                    }}
                  />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.listtext}>{item.name}</Text>
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Image resizeMode="contain" source={Images.Call} />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.listtext}>{item.mobile}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onEndReached={onendreached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
        <View
          style={{
            width: Responsive.widthPx(90),
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate(Screen.Profile)}>
            <View
              style={{
                backgroundColor: Color.botton_Color,
                borderRadius: Responsive.widthPx(20),
                width: Responsive.widthPx(10),
                height: Responsive.heightPx(5),
                justifyContent: "center",
                alignItems: "center",
                padding: 25,
                bottom: Responsive.heightPx(3),
              }}
            >
              <Image
                style={{
                  width: Responsive.widthPx(8),
                  height: Responsive.heightPx(8),
                }}
                resizeMode="contain"
                source={Images.Plus}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(CustomerScreen);
