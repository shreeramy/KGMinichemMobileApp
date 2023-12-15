import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component, useState } from "react";
import { Color, Const, Images, Loader, Responsive, Screen } from "../../Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as OdooApi from "../OdooApi";

interface EditOrderLineScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const EditOrderLineScreen = (props: EditOrderLineScreenProps) => {
  const { navigation, text, commonActions, route } = props;

  // State to hold the form values
  const [productName, setProductName] = useState(route.params.item.name);
  const [quantity, setQuantity] = useState(route.params.item.product_uom_qty);
  const [unitOfMeasure, setUnitOfMeasure] = useState(
    route.params.item.product_uom[1]
  );
  const [price, setPrice] = useState(route.params.item.price_unit);
  const [lineId, setLineId] = useState(route.params.item.id);
  const [productId, setProductId] = useState(route.params.item.product_id[0]);
  const [saleOrderId, setSaleOrderId] = useState(route.params.item.order_id[0]);

  const updateOrderLine1 = async (v, id) => {
    Loader.isLoading(true);
    const uid = await AsyncStorage.getItem("userId");

    let serverValues = [];
    let val = [
      1,
      lineId,
      {
        id: lineId,
        product_id: productId,
        product_uom_qty: parseFloat(quantity),
      },
    ];

    serverValues.push(val);

    if (uid) {
      const methodName = "write";
      const model = "sale.order"; // Replace with the desired model name

      const updateOrder = await OdooApi.callOdooMethod(
        uid,
        model,
        methodName,

        [saleOrderId, { order_line: serverValues }]
      );
      console.log("OrderUpdated---------->", serverValues);

      if (updateOrder) {
        Loader.isLoading(false);

        console.log("OrderUpdated", updateOrder);
        navigation.goBack();
      } else {
        Loader.isLoading(false);
        console.log("OrderUpdatedError---------->");
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.textStyle}>Product Name</Text>
        <TextInput
          style={styles.inputText}
          placeholder={"Enter product name"}
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />

        <Text style={styles.textStyle}>Qty</Text>
        <TextInput
          style={styles.inputText}
          placeholder={"Enter Qty"}
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(text)}
          keyboardType="numeric"
        />

        <Text style={styles.textStyle}>Unit of Measure</Text>
        <TextInput
          style={styles.inputText}
          placeholder={"Enter Unit of Measure"}
          value={unitOfMeasure.toString()}
          onChangeText={(text) => setUnitOfMeasure(text)}
        />

        {/* <Text style={styles.textStyle}>Price</Text>
        <TextInput
          style={styles.inputText}
          placeholder={"Enter price"}
          value={price.toString()}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        /> */}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            updateOrderLine1();
          }}
        >
          <Text style={{ fontSize: 20, color: Color.white }}>Update Order</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditOrderLineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
  },
  textStyle: {
    left: 20,
    marginVertical: 10,
  },
  buttonStyle: {
    width: "90%",
    height: 60,
    backgroundColor: Color.botton_Color,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 10,
  },
  inputText: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
  },
});
