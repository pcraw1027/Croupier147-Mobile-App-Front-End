import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
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

const WaitlistSuccessPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="px-[35px] bg-green-light">
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
                source={images.waitlistSuccess}
                className="w-[222px] h-[222px] mb-[32px]"
              />
              <InterBoldText
                text="Submission received"
                className="text-[28px] text-center mb-[20px]"
              />

              <View className="flex items-center justify-center mb-[44px]  w-[75%]">
                <InterMediumText
                  text="Thanks for joining the waitlist! An invite code will be sent to the email you provided."
                  className="text-[16px] text-text-dark text-center leading-[24px]"
                />
              </View>

              <CustomButton
                title="Got it, Thank you"
                className="bg-white"
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

export default WaitlistSuccessPage;
