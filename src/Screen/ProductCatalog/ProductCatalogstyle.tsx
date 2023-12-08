import { StyleSheet, Dimensions } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  //   Banner Style

  bannerItem: {
    width: Dimensions.get("window").width,
    // height: Responsive.heightPx(20), // Adjust the height as needed
    // backgroundColor: "yellow",
    // alignSelf: "center",
  },

  paginationContainer: {
    height: 10,
    width: 10,
    // paddingHorizontal: 10,
    // backgroundColor: "red",
    // marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    // backgroundColor: "red",
  },
  inactivePaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.5,
    // backgroundColor: "red",
  },
  //   //////////

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
  item: {
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
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});

export default styles;
