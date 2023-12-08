import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    // padding: 10,
    // justifyContent: "center",
  },
  topcontener: {
    width: Responsive.widthPx(80),
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    // height: Responsive.heightPx(20),
    // backgroundColor: "red",
  },
  signdot: {
    // backgroundColor: "yellow",
    width: Responsive.widthPx(80),
    flexDirection: "row",
    alignItems: "flex-end",
    height: Responsive.heightPx(5),
    marginLeft: Responsive.widthPx(5),
  },
  logoimg: {
    // backgroundColor: "yellow",
    width: Responsive.widthPx(80),
    flexDirection: "row",
    alignItems: "flex-end",
    height: Responsive.heightPx(10),
    marginLeft: Responsive.widthPx(5),
  },
  dotimg: {
    width: Responsive.widthPx(15),
    height: Responsive.heightPx(10),
  },
  textinputstyle: {
    marginTop: Responsive.heightPx(2),
    // backgroundColor: "red",
    width: Responsive.widthPx(90),
    alignSelf: "center",
  },
  labeltext: { color: Color.text_color, fontSize: 14 },
  Country: {
    marginBottom: 5,
  },
  btnsyle: {},
  //////////////////////////////
  dropdown: {
    // height: 40,
    // borderColor: "red",
    borderWidth: 0.1,
    // borderRadius: 8,
    paddingHorizontal: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: Responsive.heightPx(2),
    // elevation: 1,

    // width: Responsive.widthPx(90),
    height: Responsive.widthPx(15),
    borderRadius: Responsive.widthPx(1),
    // flexDirection: "row",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // marginTop: Responsive.heightPx(2),
    // elevation: 5,
    // // borderWidth: 1,
    // // borderColor: Color.text_input_borderColor,
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center",
    // backgroundColor: "#fff",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
