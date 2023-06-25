import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import useAuth from "../auth/useAuth";

import defaultStyles from "../theme/styles";

const Header = ({ navigation, backVisible }) => {
  const { user } = useAuth();

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.back}
        onPress={() => navigation.navigate("Home")}>
        {backVisible && (
          <FontAwesome5
            name="chevron-circle-left"
            size={40}
            color={defaultStyles.colors.primaryGreen}
          />
        )}
      </Pressable>

      <Image
        style={styles.logo}
        source={require("../assets/logo/logo-little-lemon-horizontal.png")}
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
      {!user ? (
        <View style={styles.avatarContainer}></View>
      ) : (
        <Pressable
          style={styles.avatarContainer}
          onPress={() => navigation.navigate("Profile")}>
          {user && user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarImage}>
              <Text style={styles.avatarText}>
                {user.firstName && Array.from(user.firstName)[0]}
                {user.lastName && Array.from(user.lastName)[0]}
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: defaultStyles.colors.light,
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  back: {
    flex: 1,
    position: "absolute",
    left: 10,
    top: 17,
  },
  avatarContainer: {
    flex: 1,
    position: "absolute",
    right: 10,
    top: 10,
  },
  avatarImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#81D3C4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Karla-Bold",
    fontSize: 24,
    color: defaultStyles.colors.white,
  },
});
export default Header;
