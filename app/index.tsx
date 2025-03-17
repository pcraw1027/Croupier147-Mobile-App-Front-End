import { icons } from "@/constants";
import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InitialScreen() {
  return (
    <SafeAreaView className="flex h-screen items-center justify-center bg-white">
      <Text className="text-red font-bold font-Inter text-4xl mb-5">
        Croupier
      </Text>
      <Image source={icons.croupierLogo} className="w-16 h-16" />
    </SafeAreaView>
  );
}
