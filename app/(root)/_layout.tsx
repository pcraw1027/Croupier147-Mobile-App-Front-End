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
        name="home/product-ratings/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home/company-profile/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home/company-ratings/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scan/upload-product-one"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scan/upload-product-two"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scan/upload-success"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
