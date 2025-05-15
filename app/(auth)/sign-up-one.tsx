import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import auth from "@/config/services/auth";
import useStore from "@/config/store";
import { icons } from "@/icons";
import logger from "@/logger.config";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

const SignUpOnePage = () => {
  const router = useRouter();

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.inviteCode.length == 8) {
      verifyInviteCode();
    }
  }, [user.inviteCode]);

  const handleInputChange = (field: string, value: string) => {
    setUser({ [field]: value });
  };

  const verifyInviteCode = async () => {
    try {
      setLoading(true);
      const response = await auth.verifyCode(user.inviteCode);

      setUser({
        ...user,
        email: response.email,
      });
    } catch (error: any) {
      helpers.openNotification({
        message: error.message,
        type: "error",
      });
      return logger(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="px-[25px] bg-white">
      <ToastManager
        showCloseIcon={false}
        duration={5000}
        animationStyle="upInUpOut"
        animationOutTiming={500}
        animationInTiming={500}
        width={300}
        textStyle={{
          fontSize: 12,
          fontFamily: "Inter-Medium",
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="flex flex-col justify-between h-full"
          >
            <View className="flex flex-row items-center justify-end">
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <CroupierImage
                  source={icons.closeIcon}
                  className="w-[40px] h-[40px]"
                />
              </TouchableOpacity>
            </View>

            <View className="">
              <View className="flex flex-row items-center justify-between mb-2">
                <InterSemiboldText
                  text="CREATE ACCOUNT"
                  className="text-accent-2 tracking-[1.2px]"
                />
                <InterSemiboldText
                  text="1/3"
                  className="text-accent-2 tracking-[1.2px]"
                />
              </View>
              <InterBoldText
                text="Enter an invite code to unlock full access"
                className="text-[28px] mb-2"
              />
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
                className="mb-[40px]"
              >
                <View className="flex flex-row">
                  <InterSemiboldText
                    text="Don’t have an invite code? "
                    className="text-[16px] text-text-neutral"
                  />
                  <InterSemiboldText
                    text="Join waitlist"
                    className="text-[16px] text-accent-2"
                  />
                </View>
              </TouchableOpacity>

              <CustomInputField
                label="Invitation code"
                keyboardType="number-pad"
                className="mb-[4px]"
                maxLength={8}
                value={user.inviteCode}
                onChangeText={(text) => handleInputChange("inviteCode", text)}
              />
              {loading && (
                <View className="flex flex-row justify-end">
                  <ActivityIndicator color="#0B9444" />
                </View>
              )}

              <CustomInputField
                label="Email address"
                keyboardType="email-address"
                className="mb-[120px] mt-[32px]"
                value={user.email}
                disabled={true}
                onChangeText={(text) => handleInputChange("email", text)}
              />

              <CustomButton
                title="Continue"
                className="mb-[80px]"
                onPress={() => router.push("/(auth)/sign-up-two")}
              />

              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <View className="flex flex-row items-center justify-center">
                  <InterSemiboldText
                    text="Already registered? "
                    className="text-[16px] text-text-neutral"
                  />
                  <InterSemiboldText
                    text="Sign in"
                    className="text-[16px] text-accent-2"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default SignUpOnePage;
