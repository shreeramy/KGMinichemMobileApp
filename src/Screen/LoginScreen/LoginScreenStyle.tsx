import { StyleSheet } from "react-native";
import { Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  topcontener: {
    width: Responsive.widthPx(80),
    alignItems: "center",
    justifyContent: "center",
    height: Responsive.heightPx(20),
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
    marginTop: Responsive.heightPx(5),
  },
});

export default styles;
