import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Color } from "../Helper";

interface AppContainerProps {
  isSafeArea?: boolean;
  isBottomSafeArea?: boolean;
  children?: any;
}

const AppContainer = (props: AppContainerProps) => {
  const { isBottomSafeArea, isSafeArea, children } = props;
  const TopComponent = isSafeArea ? SafeAreaView : View;
  const BottomComponent = isBottomSafeArea ? SafeAreaView : View;
  return (
    <View style={styles.container}>
      <TopComponent />
      <View style={styles.container}>{children}</View>
      <BottomComponent />
    </View>
  );
};

export default AppContainer;

AppContainer.defaultProps = {
  isSafeArea: true,
  isBottomSafeArea: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
});
