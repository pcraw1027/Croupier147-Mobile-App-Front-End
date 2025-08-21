import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
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
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

const ProfileInformationPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await auth.userProfile();

      setForm({
        username: response.user_profile.username,
        firstName: response.user_profile.first_name,
        lastName: response.user_profile.last_name,
        email: response.user_profile.email,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          first_name: form.firstName,
          last_name: form.lastName,
          username: form.username,
        };

        await profile.updateProfile(payload);

        helpers.openNotification({
          message: "Profile updated successfully",
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
    <SafeAreaView className="bg-white h-screen">
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
          text="Profile Information"
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
                label="Username"
                value={form.username}
                onChangeText={(text) => {
                  setForm({ ...form, username: text });
                }}
                className="mb-[32px]"
              />

              <CustomInputField
                label="First name"
                value={form.firstName}
                onChangeText={(text) => {
                  setForm({ ...form, firstName: text });
                }}
                className="mb-[32px]"
              />

              <CustomInputField
                label="Last name"
                value={form.lastName}
                onChangeText={(text) => {
                  setForm({ ...form, lastName: text });
                }}
                className="mb-[32px]"
              />

              <CustomInputField
                label="Email"
                value={form.email}
                onChangeText={(text) => {
                  setForm({ ...form, email: text });
                }}
                disabled
              />
            </View>

            <CustomButton
              title="Save Changes"
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={() => handleSubmit()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default ProfileInformationPage;
