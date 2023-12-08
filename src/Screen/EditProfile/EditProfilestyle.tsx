import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // padding: 10,
    // justifyContent: "center",
  },
  topcontener: {
    width: Responsive.widthPx(80),
    alignItems: "center",
    justifyContent: "center",
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
  },
  labeltext: { color: Color.black },
  Country: {
    marginBottom: 5,
  },
  headingtext: {
    color: Color.text_color,
    fontWeight: "bold",
  },
  subheadingtext: { color: Color.text_color },
  emailview: { flexDirection: "row", alignItems: "center" },
  emailview1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Responsive.heightPx(4),
  },
  orderview: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Responsive.heightPx(4),
    width: Responsive.widthPx(90),
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
});

export default styles;
