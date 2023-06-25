import { StyleSheet, Text, TextInput } from "react-native";

import ErrorMessage from "./ErrorMessage";

import defaultStyles from "../../theme/styles";

const FormField = ({ label, value, onChangeText, error, ...otherProps }) => {
  return (
    <>
      <Text style={styles.textFieldLabel}>{label}</Text>
      <TextInput
        style={styles.inputField}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        {...otherProps}
      />
      <ErrorMessage error={error} isVisible={error?.length} />
    </>
  );
};

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: defaultStyles.colors.white,
    borderColor: defaultStyles.colors.medium,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    width: "100%",
    marginBottom: 10,
    paddingLeft: 10,
  },
  textFieldLabel: {
    fontSize: 16,
    fontFamily: "Karla-Regular",
    color: defaultStyles.colors.dark,
    textAlign: "left",
    paddingBottom: 2,
    marginTop: 10,
  },
});

export default FormField;
