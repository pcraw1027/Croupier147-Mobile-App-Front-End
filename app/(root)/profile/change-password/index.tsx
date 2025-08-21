import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import profile from "@/config/services/profile";
import { icons } from "@/icons";
import logger from "@/logger.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
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

const ChangePasswordPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          current_password: form.currentPassword,
          new_password: form.newPassword,
        };

        await profile.updatePassword(payload);

        await AsyncStorage.setItem(
          "user-password",
          JSON.stringify(form.newPassword)
        );

        helpers.openNotification({
          message: "Password updated successfully",
          type: "success",
        });

        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
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

  const handleSaveChanges = () => {
    if (form.newPassword !== form.confirmPassword) {
      helpers.openNotification({
        message: "Passwords do not match",
        type: "error",
      });

      return;
    }
    handleSubmit();
  };

  return (
    <SafeAreaView className="bg-white">
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

      <View className="flex flex-row items-center justify-between mt-3 mb-[30px] px-5">
        <TouchableOpacity onPress={() => router.back()}>
          <CroupierImage
            source={icons.backIcon}
            className="w-[40px] h-[40px]"
          />
        </TouchableOpacity>

        <InterSemiboldText
          text="Change Password"
          className="text-pry text-2xl"
        />

        <View className="w-[20px]" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="px-5"
          contentContainerClassName="pb-[70px]"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex justify-between h-[80vh]">
            <View className="py-[30px]">
              <CustomInputField
                label="Current password"
                value={form.currentPassword}
                onChangeText={(text) => {
                  setForm({ ...form, currentPassword: text });
                }}
                className="mb-[32px]"
                secureTextEntry={true}
              />

              <CustomInputField
                label="New password"
                value={form.newPassword}
                onChangeText={(text) => {
                  setForm({ ...form, newPassword: text });
                  validatePassword(text);
                }}
                className="mb-[32px]"
                secureTextEntry={true}
              />

              <CustomInputField
                label="Confirm new password"
                value={form.confirmPassword}
                onChangeText={(text) => {
                  setForm({ ...form, confirmPassword: text });
                }}
                className="mb-[10px]"
                secureTextEntry={true}
              />
              <View className="ml-2">
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
                    passwordValidations.uppercase &&
                    passwordValidations.lowercase
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
            </View>

            <CustomButton
              title="Save Changes"
              disabled={isSubmitting}
              loading={isSubmitting}
              onPress={() => handleSaveChanges()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default ChangePasswordPage;
