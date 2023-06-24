import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import Constants from "expo-constants";

import useAuth from "../auth/useAuth";

import Header from "../components/Header";
import defaultStyles from "../theme/styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={defaultStyles.viewContainer}>
      <Header navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
});

export default HomeScreen;
