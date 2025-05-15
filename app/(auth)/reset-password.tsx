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
    token: "",
    password: "",
    confirmPassword: "",
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          token: form.token,
          password: form.password,
        };

        if (form.password !== form.confirmPassword) {
          helpers.openNotification({
            message: "Passwords do not match",
            type: "error",
          });
          return;
        }

        const response = await auth.resetPassword(payload);

        helpers.openNotification({
          message: response.message,
          type: "success",
        });

        router.replace("/reset-password-success");
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
            contentContainerClassName="h-full"
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

            <View className="flex flex-col justify-center h-full">
              <InterSemiboldText
                text="NEW PASSWORD"
                className="text-accent-2 tracking-[1.2px] mb-2"
              />

              <InterBoldText
                text="Enter your new and secure password"
                className="text-[28px] mb-[80px]"
              />

              <CustomInputField
                label="Token"
                className="mb-[32px]"
                value={form.token}
                onChangeText={(text) => setForm({ ...form, token: text })}
              />

              <CustomInputField
                label="New password"
                className="mb-[32px]"
                value={form.password}
                secureTextEntry={true}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />

              <CustomInputField
                label="Confirm new password"
                className="mb-[100px]"
                value={form.confirmPassword}
                secureTextEntry={true}
                onChangeText={(text) =>
                  setForm({ ...form, confirmPassword: text })
                }
              />

              <CustomButton
                title="Continue"
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={() => handleSubmit()}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
