import { icons } from "@/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  inactiveIcon,
  activeIcon,
  focused,
}: {
  inactiveIcon: ImageSourcePropType;
  activeIcon: ImageSourcePropType;
  focused: boolean;
}) => (
  <View>
    <Image
      source={focused ? activeIcon : inactiveIcon}
      resizeMode="contain"
      className="w-[24px] h-[24px]"
    />
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#0B9444",
        tabBarInactiveTintColor: "#7D8277",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "InterSemibold",
        },
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarAllowFontScaling: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.homeInactiveDark}
              activeIcon={icons.homeActive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarAllowFontScaling: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.scanInactiveDark}
              activeIcon={icons.scanActive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarAllowFontScaling: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.searchInactiveDark}
              activeIcon={icons.searchActive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarAllowFontScaling: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.profileInactiveDark}
              activeIcon={icons.profileActive}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
