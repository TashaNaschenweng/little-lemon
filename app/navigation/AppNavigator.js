import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Home"
      component={HomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Profile"
      component={ProfileScreen}
    />
  </Stack.Navigator>
);

export default AppNavigator;
