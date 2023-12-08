import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  item: {
    // padding: 2,
    // marginVertical: 8,
    // backgroundColor: "blue",
    // width: Responsive.widthPx(90),
    // alignItems: "center",
    // flexDirection: "row",
    // borderRadius: Responsive.widthPx(5),
    // justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around",
    width: Responsive.widthPx(95),
    // padding: 3,
    // marginTop: Responsive.heightPx(1),
  },
  headerview: {
    // marginTop: Responsive.heightPx(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Responsive.widthPx(90),
  },
  headerview1: {
    marginTop: Responsive.heightPx(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: Responsive.widthPx(90),
  },
  listtextheading: { color: Color.text_color, fontWeight: "500" },
  listtext: { color: Color.text_color },
  listtext1: { color: Color.white },

  textinputstyle: {
    marginTop: Responsive.heightPx(2),
  },
  labeltext: { color: Color.black, fontSize: 15, fontWeight: "600" },
  item1: {
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#ddd",
    width: Responsive.widthPx(90),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(2),
  },
  modalContainer: {
    backgroundColor: "white", // You can adjust the background color
    padding: 20,
    borderRadius: 10,
  },
  orderlineview: {
    borderWidth: 1,
    width: Responsive.widthPx(80),
    // justifyContent: "center",
    // alignItems: "center",
    // height: Responsive.heightPx(25),
    borderRadius: Responsive.widthPx(2),
    borderColor: Color.botton_Color,
    marginTop: Responsive.heightPx(3),
    marginBottom: Responsive.heightPx(3),
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    color: Color.text_color,
  },
  textInput1: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 12,
    borderRadius: 5,
    color: Color.text_color,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  losttextwid: {
    // backgroundColor: "red",
    width: Responsive.widthPx(18),
  },
  losttextwid1: {
    // backgroundColor: "red",
    width: Responsive.widthPx(16),
  },
  deletview: {
    // backgroundColor: "red",
    flexDirection: "row",
    width: Responsive.widthPx(15),
    alignItems: "center",
  },
});

export default styles;
