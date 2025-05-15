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
        tabBarInactiveTintColor: "#B8BBB5",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "InterSemibold",
        },
        tabBarStyle: {
          height: 100,
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
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.homeInactive}
              activeIcon={icons.homeActive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.scanInactive}
              activeIcon={icons.scanActive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.searchInactive}
              activeIcon={icons.searchActive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              inactiveIcon={icons.profileInactive}
              activeIcon={icons.profileActive}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
