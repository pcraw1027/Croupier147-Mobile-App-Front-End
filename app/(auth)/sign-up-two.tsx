import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import auth from "@/config/services/auth";
import useStore from "@/config/store";
import { icons } from "@/icons";
import logger from "@/logger.config";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

const SignUpTwoPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  const validatePassword = (password: string) => {
    setPasswordValidations({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[@#$%^&+=!]/.test(password),
    });
  };

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleInputChange = (field: string, value: string) => {
    setUser({ [field]: value });
  };

  const verifyUsername = async () => {
    try {
      setLoading(true);

      await auth.verifyUsername(user.username);

      router.push("/(auth)/sign-up-three");
    } catch (error: any) {
      console.log(error.message);
      helpers.openNotification({
        message: error.message,
        type: "error",
      });
      return logger(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (form.password !== form.confirmPassword) {
      helpers.openNotification({
        message: "Passwords do not match",
        type: "error",
      });

      return;
    }

    if (
      passwordValidations.digit == false ||
      passwordValidations.length == false ||
      passwordValidations.lowercase == false ||
      passwordValidations.specialChar == false ||
      passwordValidations.uppercase == false
    ) {
      helpers.openNotification({
        message: "Passwords do not meet requirements",
        type: "error",
      });

      return;
    }

    verifyUsername();
  };

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
            paddingHorizontal: 25,
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-[50px]">
            <TouchableOpacity onPress={() => router.back()}>
              <CroupierImage
                source={icons.backIcon}
                className="w-[40px] h-[40px] mt-4"
              />
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <View className="flex flex-row items-center justify-between mb-2">
              <InterSemiboldText
                text="CREATE PASSWORD"
                className="text-accent-2 tracking-[1.2px]"
              />
              <InterSemiboldText
                text="2/3"
                className="text-accent-2 tracking-[1.2px]"
              />
            </View>
            <InterBoldText
              text="Enter an invite code to unlock full access"
              className="text-[28px] mb-[32px]"
            />

            <CustomInputField
              label="Your username"
              className="mb-[32px]"
              value={user.username}
              onChangeText={(text) => handleInputChange("username", text)}
            />

            <CustomInputField
              label="Enter password"
              secureTextEntry={true}
              className="mb-[32px]"
              value={form.password}
              onChangeText={(text) => {
                setForm({ ...form, password: text });
                handleInputChange("password", text);
                validatePassword(text);
              }}
            />

            <CustomInputField
              label="Re-enter password"
              secureTextEntry={true}
              className="mb-[8px]"
              value={form.confirmPassword}
              onChangeText={(text) =>
                setForm({ ...form, confirmPassword: text })
              }
            />

            <View className="mb-[80px] ml-[8px]">
              <InterMediumText
                text="Minimum of 8 characters"
                className={`text-[12px] mb-[2px] ${
                  passwordValidations.length
                    ? "text-accent-2"
                    : "text-text-muted"
                }`}
              />
              <InterMediumText
                text="At least one UPPERCASE and LOWERCASE character"
                className={`text-[12px] mb-[2px] ${
                  passwordValidations.uppercase && passwordValidations.lowercase
                    ? "text-accent-2"
                    : "text-text-muted"
                }`}
              />
              <InterMediumText
                text="At least one DIGIT and SPECIAL character from @#$%^+=!"
                className={`text-[12px] ${
                  passwordValidations.digit && passwordValidations.specialChar
                    ? "text-accent-2"
                    : "text-text-muted"
                }`}
              />
            </View>

            <CustomButton
              title="Continue"
              loading={loading}
              disabled={
                (form.username.length <= 0 && form.password.length <= 0) ||
                loading
              }
              onPress={handleContinue}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default SignUpTwoPage;
