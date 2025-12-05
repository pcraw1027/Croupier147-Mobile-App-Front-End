import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="home/top-scans" options={{ headerShown: false }} />
      <Stack.Screen name="home/my-scans" options={{ headerShown: false }} />
      <Stack.Screen name="home/recent-scans" options={{ headerShown: false }} />
      <Stack.Screen
        name="home/highlights/article-one"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home/highlights/article-two"
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
        name="home/parent-company-profile/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home/subsidiary-company-profile/[id]"
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
      <Stack.Screen
        name="profile/user-invites/user-invites"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/user-invites/add-invite"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/user-invites/invite-success"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/user-invites/invite-details"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/profile-information/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/personalization/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/change-password/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/activities/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile/activities/my-uploads"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
