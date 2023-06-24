import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";

import { mask } from "react-native-mask-text";

import useAuth from "../auth/useAuth";
import { validateEmail, validateName } from "../utils";

import Header from "../components/Header";
import Button from "../components/forms/Button";
import FormField from "../components/forms/FormField";

import defaultStyles from "../theme/styles";

const ProfileScreen = ({ navigation }) => {
  const { user, setUser, getUser, upsertUser, logout } = useAuth();
  const [savedChanges, setSavedChanges] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [runValidation, setRunValidation] = useState(false);

  const isFirstNameValid = validateName(user?.firstName);
  const isLastNameValid = validateName(user?.lastName);
  const isEmailValid = validateEmail(user?.email);
  const isPasswordValid = validateName(user?.password);

  const handleSubmit = async () => {
    setRunValidation(true);

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid
    )
      return;

    upsertUser(user);
    setSavedChanges(true);
    setHasUnsavedChanges(false);

    if (!user) {
      setError("An unexpected error occurred.");
      return;
    }
  };

  const updateUserInfo = (key, value) => {
    setUser((userInfo) => ({
      ...userInfo,
      [key]: value,
    }));
    setHasUnsavedChanges(true);
  };

  const discardChanges = async () => {
    getUser();
    setHasUnsavedChanges(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUser((userInfo) => ({
        ...userInfo,
        ["avatar"]: result.assets[0].uri,
      }));
      setHasUnsavedChanges(true);
    }
  };

  const removeImage = () => {
    setUser((userInfo) => ({
      ...userInfo,
      ["avatar"]: "",
    }));
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          return;
        }

        e.preventDefault();

        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              onPress: () => {
                getUser();
                setHasUnsavedChanges(false);
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );

  return (
    <View style={defaultStyles.viewContainer}>
      <Header navigation={navigation} backVisible={true} />
      <KeyboardAwareScrollView style={defaultStyles.contentContainer}>
        <View style={defaultStyles.contentContainer}>
          {savedChanges && (
            <View style={defaultStyles.msgSuccess}>
              <Text style={defaultStyles.message}>
                Profile has been updated
              </Text>
            </View>
          )}
          <Text style={defaultStyles.textSectionTitle}>
            Personal Information
          </Text>
          <Text style={styles.text}>Avatar</Text>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarImage}>
                <Text style={styles.avatarText}>
                  {user?.firstName && Array.from(user.firstName)[0]}
                  {user?.lastName && Array.from(user.lastName)[0]}
                </Text>
              </View>
            )}
            <View style={styles.avatarButtonContainer}>
              <Button
                style={defaultStyles.btnSecondary}
                textStyle={defaultStyles.btnSecondaryText}
                textColor={defaultStyles.colors.white}
                title="Change"
                onPress={pickImage}
              />

              <Button
                style={defaultStyles.btnOutline}
                textStyle={defaultStyles.btnSecondaryText}
                textColor={defaultStyles.colors.primaryGreen}
                title="Remove"
                onPress={removeImage}
              />
            </View>
          </View>
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
              runValidation && !isFirstNameValid
                ? "At least one character is required."
                : ""
            }
          />
          <FormField
            label={"E-mail"}
            value={user.email}
            onChangeText={(value) => updateUserInfo("email", value)}
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            error={runValidation && !isEmailValid ? "E-mail is invalid" : ""}
          />
          <FormField
            label={"Phone"}
            value={user.phoneNumber}
            onChangeText={(value) =>
              updateUserInfo("phoneNumber", mask(value, "(999) 999-9999"))
            }
            autoCorrect={false}
          />

          <Text style={defaultStyles.textSectionTitle}>
            E-mail Notifications
          </Text>
          <View style={styles.container}>
            <Checkbox
              style={styles.checkbox}
              value={user.orderStatuses}
              onValueChange={(value) => updateUserInfo("orderStatuses", value)}
              color={defaultStyles.colors.primaryGreen}
            />
            <Text style={styles.textFieldLabel}>Order Statuses</Text>
          </View>
          <View style={styles.container}>
            <Checkbox
              style={styles.checkbox}
              value={user.specialOffers}
              onValueChange={(value) => updateUserInfo("specialOffers", value)}
              color={defaultStyles.colors.primaryGreen}
            />
            <Text style={styles.textFieldLabel}>Special Offers</Text>
          </View>
          <View style={styles.container}>
            <Checkbox
              style={styles.checkbox}
              value={user.passwordChanges}
              onValueChange={(value) =>
                updateUserInfo("passwordChanges", value)
              }
              color={defaultStyles.colors.primaryGreen}
            />
            <Text style={styles.textFieldLabel}>Password Changes</Text>
          </View>
          <View style={styles.container}>
            <Checkbox
              style={styles.checkbox}
              value={user.newsletter}
              onValueChange={(value) => updateUserInfo("newsletter", value)}
              color={defaultStyles.colors.primaryGreen}
            />
            <Text style={styles.textFieldLabel}>Newsletter</Text>
          </View>
          <View style={[styles.container, styles.buttonContainer]}>
            <Button
              title="Discard changes"
              style={[defaultStyles.btnOutline, { width: "50%" }]}
              textStyle={defaultStyles.btnSecondaryText}
              textColor={defaultStyles.colors.primaryGreen}
              onPress={discardChanges}
            />
            <Button
              title="Save changes"
              style={[defaultStyles.btnSecondary, { width: "50%" }]}
              textStyle={defaultStyles.btnSecondaryText}
              textColor={defaultStyles.colors.white}
              onPress={handleSubmit}
            />
          </View>
          <Button
            title="Logout"
            style={[defaultStyles.btnPrimary, { marginBottom: 50 }]}
            textColor={defaultStyles.colors.dark}
            onPress={logout}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarButtonContainer: {
    flexDirection: "row",
    flex: "1",
    margin: 15,
    padding: 15,
  },
  avatarButtons: {
    flexDirection: "row",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#81D3C4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: defaultStyles.colors.white,
    padding: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  container: {
    flexDirection: "row",
    marginVertical: 5,
  },
});

export default ProfileScreen;
