import { Text, TouchableOpacity } from "react-native";

import defaultStyles from "../../theme/styles";

const Button = ({ style, textStyle, textColor, title, onPress }) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.btnPrimary, style]}
      onPress={onPress}>
      <Text
        style={[defaultStyles.btnPrimaryText, textStyle, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
