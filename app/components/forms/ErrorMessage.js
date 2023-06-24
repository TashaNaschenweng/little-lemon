import { StyleSheet, Text } from "react-native";

const ErrorMessage = ({ error, isVisible = false }) => {
  if (!error || !isVisible) return null;

  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default ErrorMessage;
