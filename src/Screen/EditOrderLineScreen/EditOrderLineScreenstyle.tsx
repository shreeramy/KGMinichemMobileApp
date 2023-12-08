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
  listtext: { color: Color.text_color, fontSize: 15 },
  orderview: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Responsive.heightPx(4),
    width: Responsive.widthPx(90),
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  orderlineview: {
    borderWidth: 1,
    width: Responsive.widthPx(93),
    // justifyContent: "center",
    // alignItems: "center",
    // height: Responsive.heightPx(25),
    borderRadius: Responsive.widthPx(2),
    borderColor: Color.botton_Color,
    marginTop: Responsive.heightPx(3),
    marginBottom: Responsive.heightPx(3),
  },
  item: {
    // padding: 20,
    width: Responsive.widthPx(90),
    alignItems: "center",
    // justifyContent: "space-between",
    // flexDirection: "row",
    borderRadius: Responsive.widthPx(5),
  },
  item1: {
    padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    width: Responsive.widthPx(90),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Responsive.widthPx(4),
    marginTop: Responsive.heightPx(1),
  },
});

export default styles;
