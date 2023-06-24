import { View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import userStorage from "./app/store/userStorage";
import { navigationRef } from "./app/navigation/rootNavigation";
import AuthContext from "./app/auth/context";

import RegisterScreen from "./app/screens/RegisterScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";

import defaultStyles from "./app/theme/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await userStorage.getUser();
    if (user) setUser(user);
  };

  const getFonts = () =>
    Font.loadAsync({
      "Karla-Regular": require("./app/assets/fonts/Karla-Regular.ttf"),
      "Karla-Medium": require("./app/assets/fonts/Karla-Medium.ttf"),
      "Karla-Bold": require("./app/assets/fonts/Karla-Bold.ttf"),
      "Karla-ExtraBold": require("./app/assets/fonts/Karla-ExtraBold.ttf"),
      "MarkaziText-Regular": require("./app/assets/fonts/MarkaziText-Regular.ttf"),
      "MarkaziText-Medium": require("./app/assets/fonts/MarkaziText-Medium.ttf"),
    });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreUser();
        await getFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        setFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsloaded]);

  if (!appIsReady || !fontsloaded) {
    return null;
  }

  return (
    <View style={defaultStyles.appContainer} onLayout={onLayoutRootView}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            {user ? (
              <>
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
              </>
            ) : (
              <Stack.Screen
                options={{ headerShown: false }}
                name="Register"
                component={RegisterScreen}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}
