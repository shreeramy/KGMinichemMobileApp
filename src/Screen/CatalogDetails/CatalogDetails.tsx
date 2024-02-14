import React, { useState } from "react";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import {
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppContainer,
} from "../../Component";
import { Color, Const, Images, Responsive, Screen } from "../../Helper";
import styles from "./CatalogDetailsstyle";

interface CatalogDetilsProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const CatalogDetails = (props: CatalogDetilsProps) => {
  const { navigation, text, commonActions, route } = props;
  const [getitem, setgetitem] = useState("");

  const [attribute_line_ids, setattribute_line_ids] = useState(
    route?.params?.attributelineids
  );
  const [imagelist, setimagelist] = useState(route?.params?.image_list);
  ("");
  const proimag = route?.params?.img;
  const atribute_color_code = route?.params?.colorcode;
  const dicreptiion = route?.params?.discrption;
  const titl = route?.params?.title;
  const pdf = route?.params?.pdf;

  const renderItem = ({ item }) => (
    <View style={styles.item1}>
      <TouchableOpacity
        onPress={() => navigation.navigate(Screen.ShowOrderScreen)}
      >
        <View>
          <View
            style={{
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
            }}
            source={{ uri: `data:image/png;base64,${proimag}` }}
          >
            <View style={{ marginTop: Responsive.heightPx(5) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
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
              {pdf === false ?
                <View /> :
                <Pressable onPress={() => navigation.navigate(Screen.PdfViewer, { pdf })}>
                  <Image
                    style={{
                      width: Responsive.widthPx(8),
                      height: Responsive.heightPx(8),
                    }}
                    resizeMode="contain"
                    source={Images.pdf}
                  />
                </Pressable>
              }
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
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(CatalogDetails);