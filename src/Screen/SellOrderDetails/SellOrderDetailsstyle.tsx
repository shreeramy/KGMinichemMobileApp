import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    color: Color.text_color,
  },
  modalContainer: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
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
    justifyContent: "space-between",
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
  orderlineview: {
    borderWidth: 1,
    width: Responsive.widthPx(93),
    borderRadius: Responsive.widthPx(2),
    borderColor: Color.botton_Color,
    marginTop: Responsive.heightPx(3),
    marginBottom: Responsive.heightPx(3),
  },
  headerview: {
    marginTop: Responsive.heightPx(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Responsive.widthPx(90),
  },
  headerview1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listtextheading: { color: Color.text_color, fontWeight: "600", fontSize: 15 },
  listtext: { color: Color.text_color, fontSize: 15 },
  listtextCell: { color: Color.text_color, fontWeight: "600",fontSize: 13,textAlignVertical:"center",textAlign:"center" },

  listtext1: { color: Color.white },
  nameview: {
    width: Responsive.widthPx(90),
    marginTop: Responsive.heightPx(3),
  },
});

export default styles;
