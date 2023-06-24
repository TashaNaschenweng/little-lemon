import { Text, TextInput } from "react-native";

import defaultStyles from "../../theme/styles";
import ErrorMessage from "./ErrorMessage";

const FormField = ({ label, value, onChangeText, error, ...otherProps }) => {
  return (
    <>
      <Text style={defaultStyles.textFieldLabel}>{label}</Text>
      <TextInput
        style={defaultStyles.inputField}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        {...otherProps}
      />
      <ErrorMessage error={error} isVisible={error?.length} />
    </>
  );
};

export default FormField;
