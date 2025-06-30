import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up-one" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up-two" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up-three" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
      <Stack.Screen
        name="reset-password-success"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="waitlist" options={{ headerShown: false }} />
      <Stack.Screen name="waitlist-success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
