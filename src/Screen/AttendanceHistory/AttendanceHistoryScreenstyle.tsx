import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  item: {
    padding: 15,
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
    backgroundColor: "#fff",
    width: Responsive.widthPx(90),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Responsive.widthPx(2),
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
  listtext: { color: Color.text_color },
  listheadingtext: { color: Color.text_color, fontWeight: "900", fontSize: 15 },
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
    backgroundColor: "#fff",
    width: Responsive.widthPx(90),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: Responsive.widthPx(5),
  },
  attendanceview: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    width: Responsive.widthPx(45),
    justifyContent: "space-around",
  },
});

export default styles;
