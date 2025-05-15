import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import auth from "@/config/services/auth";
import { icons } from "@/icons";
import logger from "@/logger.config";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
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

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          email: form.email,
        };
        const response = await auth.forgotPassword(payload);

        helpers.openNotification({
          message: response.message,
          type: "success",
        });

        router.push("/reset-password");
      } catch (error: any) {
        helpers.openNotification({
          message: error.message,
          type: "error",
        });
        return logger(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { handleSubmit, isSubmitting } = formik;

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
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <CroupierImage
                source={icons.backIcon}
                className="w-[40px] h-[40px]"
              />
            </TouchableOpacity>

            <View className="">
              <InterSemiboldText
                text="FORGOT PASSWORD"
                className="text-accent-2 tracking-[1.2px] mb-2"
              />

              <InterBoldText
                text="Enter your email to reset password"
                className="text-[28px] mb-[80px]"
              />

              <CustomInputField
                label="Email address"
                keyboardType="email-address"
                className="mb-[64px]"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />

              <CustomButton
                title="Continue"
                className="mb-[70px]"
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={() => handleSubmit()}
              />
            </View>

            <TouchableWithoutFeedback onPress={() => router.back()}>
              <View className="flex flex-row items-center justify-center">
                <InterSemiboldText
                  text="Remember password? "
                  className="text-[16px] text-text-neutral"
                />
                <InterSemiboldText
                  text="Sign in"
                  className="text-[16px] text-accent-2"
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
