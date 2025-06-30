import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import auth from "@/config/services/auth";
import profile from "@/config/services/profile";
import { icons } from "@/icons";
import logger from "@/logger.config";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

const PersonalizationPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    country: "",
    postalCode: "",
  });
  const [isAppEnabled, setIsAppEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await auth.userProfile();

      setForm({
        country: response.user_profile.country,
        postalCode: response.user_profile.postal_code,
      });
      setIsAppEnabled(response.user_profile.app_notify_on || false);
      setIsEmailEnabled(response.user_profile.email_notify_on || false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          country: form.country,
          postal_code: form.postalCode,
          app_notify_on: isAppEnabled,
          email_notify_on: isEmailEnabled,
        };

        await profile.updateProfile(payload);

        helpers.openNotification({
          message: "Personalization updated successfully",
          type: "success",
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

  return (
    <SafeAreaView className="bg-white-alt">
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
          text="Personalization"
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
            <View className="pt-[30px]">
              <CustomInputField
                label="Country"
                value={form.country}
                onChangeText={(text) => {
                  setForm({ ...form, country: text });
                }}
                className="mb-[32px]"
              />

              <CustomInputField
                label="Postal code"
                value={form.postalCode}
                onChangeText={(text) => {
                  setForm({ ...form, postalCode: text });
                }}
                className="mb-[56px]"
              />

              <InterMediumText
                text="Customize your app and email notifications about CR147 updates"
                className="text-[16px] text-text-neutral leading-6 mb-[40px]"
              />

              <View className="flex flex-row items-center justify-between mb-[32px]">
                <InterSemiboldText
                  text="App notifications"
                  className="text-[16px]"
                />
                <Switch
                  trackColor={{ false: "#ffffff", true: "#0B9444" }}
                  thumbColor={isAppEnabled ? "#ffffff" : "#ffffff"}
                  onValueChange={() => setIsAppEnabled(!isAppEnabled)}
                  value={isAppEnabled}
                />
              </View>

              <View className="flex flex-row items-center justify-between">
                <InterSemiboldText
                  text="Email notifications"
                  className="text-[16px]"
                />
                <Switch
                  trackColor={{ false: "#ffffff", true: "#0B9444" }}
                  thumbColor={isEmailEnabled ? "#ffffff" : "#ffffff"}
                  onValueChange={() => setIsEmailEnabled(!isEmailEnabled)}
                  value={isEmailEnabled}
                />
              </View>
            </View>

            <CustomButton
              title="Save Changes"
              disabled={isSubmitting}
              loading={isSubmitting}
              onPress={() => handleSubmit()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default PersonalizationPage;
