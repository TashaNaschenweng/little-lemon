import { View, Text, Image, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

import defaultStyles from "../theme/styles";

const Banner = ({ searchText, handleSearchChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Little Lemon</Text>

      <View style={styles.heroContainer}>
        <View style={styles.content}>
          <Text style={styles.subTitle}>Chicago</Text>
          <Text style={styles.text}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("../assets/images/hero-image.png")}
        />
      </View>
      <Searchbar
        onChangeText={handleSearchChange}
        value={searchText}
        style={styles.searchBar}
        iconColor={defaultStyles.colors.medium}
        elevation={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primaryGreen,
    padding: 15,
  },
  mainTitle: {
    fontFamily: "MarkaziText-Medium",
    fontSize: 54,
    color: defaultStyles.colors.primaryYellow,
  },
  subTitle: {
    fontFamily: "MarkaziText-Medium",
    fontSize: 30,
    color: defaultStyles.colors.white,
  },
  text: {
    fontFamily: "Karla-Regular",
    fontSize: 18,
    color: defaultStyles.colors.white,
    paddingRight: 20,
  },
  heroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  searchBar: {
    backgroundColor: defaultStyles.colors.white,
    borderColor: defaultStyles.colors.medium,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    width: "100%",
    marginBottom: 10,
    marginTop: 30,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

export default Banner;
