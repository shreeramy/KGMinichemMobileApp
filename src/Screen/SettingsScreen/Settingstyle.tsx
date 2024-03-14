import { StyleSheet } from "react-native";
import { Color, Responsive } from "../../Helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: 300,
      },
      input: {
        flex: 1,
      },
    iconContainer: {
        position: 'absolute',
        right: 10,
      },
      icon: {
        width: 24,
        height: 24,
      },
});

export default styles;
