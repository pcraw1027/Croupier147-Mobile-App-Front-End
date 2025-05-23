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

const UploadSuccessPage = () => {
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
                source={images.check}
                className="w-[222px] h-[222px] mb-[32px]"
              />
              <InterBoldText
                text="Upload successful"
                className="text-[28px] text-center mb-3"
              />

              <View className="flex items-center justify-center mb-[44px]">
                <InterMediumText
                  text=" We appreciate you taking the time to help expand our database and support our growing community. Our team will review and add the product soon."
                  className="text-[16px] text-text-dark text-center leading-[24px]"
                />
              </View>

              <CustomButton
                title="Got it, Thank you"
                className="bg-white"
                onPress={() => router.replace("/(root)/(tabs)/home")}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default UploadSuccessPage;
