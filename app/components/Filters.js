import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import defaultStyles from "../theme/styles";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onChange(index);
          }}
          style={[
            {
              flex: 1 / sections.length,
              backgroundColor: selections[index]
                ? defaultStyles.colors.primaryGreen
                : defaultStyles.colors.medium,
            },
            styles.button,
          ]}>
          <View>
            <Text
              style={{
                fontFamily: "Karla-ExtraBold",
                color: selections[index]
                  ? defaultStyles.colors.light
                  : defaultStyles.colors.dark,
              }}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 9,
    marginRight: 15,
  },
});

export default Filters;
