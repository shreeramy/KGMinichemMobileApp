import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Color } from "../../Helper";

export default function OrderFilterScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.viewStyle}>
        <Text style={styles.textStyle}>first</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewStyle}>
        <Text style={styles.textStyle}>second</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewStyle}>
        <Text style={styles.textStyle}>third</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewStyle}>
        <Text style={styles.textStyle}>fourth</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    width: "30%",
    height: "6%",
    backgroundColor: Color.botton_Color,
    borderRadius: 15,
    left: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: Color.white,
  },
});
