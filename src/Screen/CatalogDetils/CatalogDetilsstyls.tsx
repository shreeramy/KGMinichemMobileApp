import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topcontener: {
    width: Responsive.widthPx(80),
    alignItems: "center",
    justifyContent: "center",


  },
  signdot: {

    width: Responsive.widthPx(80),
    flexDirection: "row",
    alignItems: "flex-end",
    height: Responsive.heightPx(5),
    marginLeft: Responsive.widthPx(5),
  },
  logoimg: {

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

    justifyContent: "space-between",
  },
  item: {


    alignItems: "center",
    margin: 5,
    borderRadius: 5,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,


    width: Responsive.widthPx(45),
    height: Responsive.heightPx(17),

    padding: 5,
  },
  item1: {
    width: 100,
    height: 100,

    borderRadius: 8,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
