import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
  },
  topcontener: {
    width: Responsive.widthPx(100),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    
    
  },
  logoimg: {
    
    width: Responsive.widthPx(80),
    flexDirection: "row",
    alignItems: "flex-end",
    height: Responsive.heightPx(10),
    marginLeft: Responsive.widthPx(5),
  },
  btnview: {
    width: Responsive.widthPx(90),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  btntextview: {
    backgroundColor: "#3A474A",
    width: Responsive.widthPx(75),
    alignItems: "center",
    justifyContent: "center",
    padding: Responsive.heightPx(2),
    borderRadius: Responsive.widthPx(3),
  },
  btntextview1: {
    
    width: Responsive.widthPx(35),
    alignItems: "center",
    justifyContent: "center",
    padding: Responsive.heightPx(2),
    borderRadius: Responsive.widthPx(3),
  },
  btntext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  btntext1: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
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
    
    
    width: Responsive.widthPx(27),
    height: Responsive.heightPx(17),
    backgroundColor: "#9C7257",
    padding: 5,
  },
  item1: {
    
    
    alignItems: "center",
    margin: 5,
    borderRadius: 2,
    
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    
    borderWidth: 0.1,
    width: Responsive.widthPx(27),
    height: Responsive.heightPx(17),
    padding: 5,
    
  },
  listtext: { textAlign: "center", fontSize: 11, color: Color.text_color },
  listtext1: { textAlign: "center", color: "#fff", fontSize: 11 },
  checlout: { fontSize: 15, color: "#fff", fontWeight: "900" },
  showtime: { color: "#fff" },
});

export default styles;
