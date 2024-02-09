import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    
    
  },
  headerview: {
    
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
    
    justifyContent: "space-between",
  },
  orderlineview: {
    borderWidth: 1,
    width: Responsive.widthPx(93),
    
    
    
    borderRadius: Responsive.widthPx(2),
    borderColor: Color.botton_Color,
    marginTop: Responsive.heightPx(3),
    marginBottom: Responsive.heightPx(3),
  },
  item: {
    
    width: Responsive.widthPx(90),
    alignItems: "center",
    
    
    borderRadius: Responsive.widthPx(5),
  },
  item1: {
    padding: 20,
    
    
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
