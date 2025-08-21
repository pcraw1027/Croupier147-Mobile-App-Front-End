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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
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

  // 69890140

  return (
    <SafeAreaView className="flex-1 bg-white">
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
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-[25px]">
            <View className="flex flex-row items-center justify-end mb-[50px]">
              <TouchableOpacity onPress={() => router.back()}>
                <CroupierImage
                  source={icons.closeIcon}
                  className="w-[40px] h-[40px]"
                />
              </TouchableOpacity>
            </View>

            <View className="mt-4">
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
                onPress={() => router.push("/(auth)/waitlist")}
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
                className="mb-[100px] mt-[32px]"
                value={user.email}
                disabled={true}
                onChangeText={(text) => handleInputChange("email", text)}
              />

              <CustomButton
                title="Continue"
                disabled={user.email.length <= 0}
                className="mb-[32px]"
                onPress={() => router.push("/(auth)/sign-up-two")}
              />

              <TouchableOpacity onPress={() => router.back()}>
                <View className="flex flex-row items-center justify-center mb-[20px]">
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default SignUpOnePage;
