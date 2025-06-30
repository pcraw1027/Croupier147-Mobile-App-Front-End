import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { icons } from "@/icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ActivitiesPage = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-white-alt h-screen px-5">
      <View className="flex flex-row items-center justify-between mt-3 mb-[30px]">
        <TouchableOpacity onPress={() => router.back()}>
          <CroupierImage
            source={icons.backIcon}
            className="w-[40px] h-[40px]"
          />
        </TouchableOpacity>

        <InterSemiboldText text="My Activities" className="text-pry text-2xl" />

        <View className="w-[20px]" />
      </View>

      <TouchableWithoutFeedback onPress={() => router.push("/home/my-scans")}>
        <View className="bg-white flex flex-row items-center justify-between rounded-[12px] px-5 py-4 mb-[20px]">
          <View className="flex flex-row items-center gap-3">
            <CroupierImage
              source={icons.boxScan}
              className="w-[34px] h-[34px]"
            />
            <InterSemiboldText text="My Scans" className="text-[16px]" />
          </View>
          <CroupierImage
            source={icons.grayArrowRight}
            className="w-[20px] h-[20px]"
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => router.push("/profile/activities/my-uploads")}
      >
        <View className="bg-white flex flex-row items-center justify-between rounded-[12px] px-5 py-4 mb-[20px]">
          <View className="flex flex-row items-center gap-3">
            <CroupierImage
              source={icons.boxUpload}
              className="w-[34px] h-[34px]"
            />
            <InterSemiboldText text="My Uploads" className="text-[16px]" />
          </View>
          <CroupierImage
            source={icons.grayArrowRight}
            className="w-[20px] h-[20px]"
          />
        </View>
      </TouchableWithoutFeedback>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default ActivitiesPage;
