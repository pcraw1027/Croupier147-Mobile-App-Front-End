import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterText from "@/components/common/components/Text/InterText";
import { images } from "@/icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPasswordSuccessPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="px-[35px] bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="h-full"
          >
            <View className="flex flex-col justify-center items-center h-full">
              <CroupierImage
                source={images.threeDlock}
                className="w-[140px] h-[140px] mb-[32px]"
              />
              <InterBoldText
                text="Action successful"
                className="text-[28px] text-center mb-[20px]"
              />

              <View className="flex items-center justify-center mb-[44px]  w-[75%]">
                <InterText
                  text="Your password has been updated. You can now restore access with your new password."
                  className="text-[16px] text-text-neutral text-center leading-[24px]"
                />
              </View>

              <CustomButton
                title="Back to sign in"
                className="bg-green-light"
                onPress={() => router.dismissTo("/(auth)/sign-in")}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default ResetPasswordSuccessPage;
