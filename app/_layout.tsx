import { useFonts } from "expo-font";
import { Stack, useRootNavigation, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import constants from "@/config/constants";
import { ApiProvider } from "@/config/context/ApiContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

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
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApiProvider>
      <AuthNavigator />
    </ApiProvider>
  );
}
function AuthNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const navigation = useRootNavigation();

  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [navReady, setNavReady] = useState(false);

  // ---- Token validator ------------------------------------------------
  const validateToken = async () => {
    try {
      const raw = await AsyncStorage.getItem(constants.COOKIES.key);
      if (!raw) {
        setIsValidToken(false);
        return;
      }

      let token: string;
      try {
        token = JSON.parse(raw);
      } catch {
        token = raw;
      }

      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp > now) {
        setIsValidToken(true);
      } else {
        await AsyncStorage.removeItem(constants.COOKIES.key);
        setIsValidToken(false);
      }
    } catch {
      await AsyncStorage.removeItem(constants.COOKIES.key);
      setIsValidToken(false);
    }
  };

  // ---- 1. Validate on mount (UNCONDITIONAL) -------------------------
  useEffect(() => {
    validateToken();
  }, []);

  // ---- 2. Re-validate on route change (UNCONDITIONAL) ---------------
  useEffect(() => {
    if (isValidToken !== null) validateToken();
  }, [segments]);

  // ---- 3. Navigation ready (UNCONDITIONAL) --------------------------
  useEffect(() => {
    if (!navigation) return;
    const unsub = navigation.addListener?.("state", () => setNavReady(true));
    return unsub;
  }, [navigation]);

  // ---- 4. REDIRECT LOGIC (UNCONDITIONAL useEffect) ------------------
  useEffect(() => {
    if (!navReady || isValidToken === null) return;

    const inAuth = segments[0] === "(auth)";
    const inRoot = segments[0] === "(root)";

    if (isValidToken && !inRoot) {
      router.replace("/(root)/(tabs)/home");
    } else if (!isValidToken && !inAuth) {
      router.replace("/");
    }
  }, [isValidToken, navReady, segments, router]);

  // ---- 5. EARLY RETURN (AFTER ALL HOOKS) ----------------------------
  if (isValidToken === null) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ---- 6. Render Stack ---------------------------------------------
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: "fade",
          animationDuration: 0,
        }}
      />
      <Stack.Screen name="(root)" />
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
