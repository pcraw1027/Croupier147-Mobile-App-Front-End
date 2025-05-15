import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="home/top-scans" options={{ headerShown: false }} />
      <Stack.Screen name="home/my-scans" options={{ headerShown: false }} />
      <Stack.Screen
        name="home/highlight-details"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home/product-details/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home/company-profile"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
