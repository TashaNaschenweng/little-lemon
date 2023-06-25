import { Image, StyleSheet, Text, View } from "react-native";

import defaultStyles from "../theme/styles";

const MenuItem = ({ name, price, description, imageUrl }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
    <Image
      style={styles.image}
      source={{
        uri: imageUrl,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: defaultStyles.colors.medium,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: "Karla-Bold",
    fontSize: 20,
    color: defaultStyles.colors.black,
    paddingBottom: 5,
  },
  description: {
    fontFamily: "Karla-Medium",
    color: defaultStyles.colors.dark,
    paddingRight: 5,
  },
  price: {
    fontFamily: "Karla-Medium",
    fontSize: 20,
    color: defaultStyles.colors.secondarySalmon,
    paddingTop: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default MenuItem;
