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

const InviteSuccessPage = () => {
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
                source={images.inviteSuccess}
                className="w-[222px] h-[222px] mb-[32px]"
              />
              <InterBoldText
                text="Invitation sent"
                className="text-[28px] text-center mb-[20px]"
              />

              <InterMediumText
                text="Your invitation has been sent successfully. We will notify Anthony via the email you provided."
                className="text-[16px] text-text-dark text-center leading-[24px] w-[85%] mb-[44px]"
              />

              <CustomButton
                title="Got it, Thank you"
                className="bg-white"
                onPress={() =>
                  router.dismissTo("/(root)/profile/user-invites/user-invites")
                }
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default InviteSuccessPage;
