import { Text, View } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useAuth from "../auth/useAuth";
import { validateEmail, validateName } from "../utils";
import userModel from "../models";

import Header from "../components/Header";
import FormField from "../components/forms/FormField";
import Button from "../components/forms/Button";

import defaultStyles from "../theme/styles";

const RegisterScreen = ({ navigation }) => {
  const [user, setUser] = useState(userModel);
  const [runValidation, setRunValidation] = useState(false);

  const auth = useAuth();

  const isFirstNameValid = validateName(user?.firstName);
  const isLastNameValid = validateName(user?.lastName);
  const isEmailValid = validateEmail(user?.email);
  const isPasswordValid = validateName(user?.password);

  const updateUserInfo = (key, value) => {
    setUser((userInfo) => ({
      ...userInfo,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setRunValidation(true);

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid
    )
      return;

    auth.upsertUser(user);

    if (!user) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <View style={defaultStyles.viewContainer}>
      <Header navigation={navigation} />

      <KeyboardAwareScrollView style={defaultStyles.contentContainer}>
        <Text style={defaultStyles.textSubTitle}>Let us get to know you</Text>

        <FormField
          label={"First Name"}
          value={user.firstName}
          autoCorrect={false}
          onChangeText={(value) => updateUserInfo("firstName", value)}
          error={
            runValidation && !isFirstNameValid
              ? "At least one character is required."
              : ""
          }
        />

        <FormField
          label={"Last Name"}
          value={user.lastName}
          autoCorrect={false}
          onChangeText={(value) => updateUserInfo("lastName", value)}
          error={
            runValidation && !isLastNameValid
              ? "At least one character is required."
              : ""
          }
        />

        <FormField
          label={"E-mail"}
          value={user.email}
          onChangeText={(value) => updateUserInfo("email", value)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          error={
            runValidation && !isEmailValid
              ? user.email.length
                ? "E-mail is invalid"
                : "E-mail is required"
              : ""
          }
        />

        <FormField
          label={"Password"}
          value={user.password}
          onChangeText={(value) => updateUserInfo("password", value)}
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
          autoCapitalize="none"
          error={
            runValidation && !isPasswordValid
              ? "At least one character is required."
              : ""
          }
        />

        <Button
          title="Register"
          style={[defaultStyles.btnPrimary, { marginVertical: 15 }]}
          textColor={defaultStyles.colors.dark}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;
