import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/InterRegular.ttf"),
    InterMedium: require("../assets/fonts/InterMedium.ttf"),
    InterSemiBold: require("../assets/fonts/InterSemibold.ttf"),
    InterBold: require("../assets/fonts/InterBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: "fade",
          animationDuration: 0,
        }}
      />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
          animation: "fade",
          animationDuration: 0,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
