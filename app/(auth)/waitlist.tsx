import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import { icons } from "@/icons";
import logger from "@/logger.config";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
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

const WaitlistPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email1: "",
    firstName: "",
    lastName: "",
    country: "",
    postalCode: "",
    email2: "",
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        // const payload = {
        //   user: {
        //     email: user.email,
        //     password: user.password,
        //     username: user.username,
        //     country: user.country,
        //     postal_code: user.postalCode,
        //     invite_code: user.inviteCode,
        //   },
        // };

        // const response = await auth.register(payload);

        // helpers.openNotification({
        //   message: response.message,
        //   type: "success",
        // });

        router.replace("/(root)/(tabs)/home");
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
    <SafeAreaView className="px-[25px] bg-white h-full">
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

      <View className="flex flex-row items-center justify-between mb-[30px]">
        <TouchableOpacity onPress={() => router.back()}>
          <CroupierImage
            source={icons.backIcon}
            className="w-[40px] h-[40px]"
          />
        </TouchableOpacity>

        <InterSemiboldText
          text="JOIN WAITLIST"
          className="text-accent-2 text-[14px] tracking-[1.6px]"
        />

        <View className="w-[20px]" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <InterBoldText
            text="Join our waitlist to get future access"
            className="text-[28px] mb-[36px]"
          />

          <View className="flex flex-row items-center mb-[24px]">
            <InterMediumText
              text="Tell us who invited you"
              className="text-[16px] mr-2"
            />

            <View className="h-[1px] w-full bg-stroke" />
          </View>

          <CustomInputField
            label="Their email address"
            className="mb-[40px]"
            value={form.email1}
            onChangeText={(text) => setForm({ ...form, email1: text })}
          />

          <View className="flex flex-row items-center mb-[24px]">
            <InterMediumText
              text="Tell us about you"
              className="text-[16px] mr-2"
            />

            <View className="h-[1px] w-full bg-stroke" />
          </View>

          <View className="mb-[24px] flex flex-row gap-x-[12px]">
            <CustomInputField
              label="First name"
              className="flex-1"
              value={form.firstName}
              onChangeText={(text) => setForm({ ...form, firstName: text })}
            />

            <CustomInputField
              label="Last name"
              className="flex-1"
              value={form.lastName}
              onChangeText={(text) => setForm({ ...form, lastName: text })}
            />
          </View>

          <View className="mb-[24px] flex flex-row gap-x-[12px]">
            <CustomInputField
              label="Country"
              className="flex-1"
              value={form.country}
              onChangeText={(text) => setForm({ ...form, country: text })}
            />

            <CustomInputField
              label="Postal code"
              className="flex-1"
              value={form.postalCode}
              onChangeText={(text) => setForm({ ...form, postalCode: text })}
            />
          </View>

          <CustomInputField
            label="Your email address"
            className="mb-[100px]"
            value={form.email2}
            onChangeText={(text) => setForm({ ...form, email2: text })}
          />

          <CustomButton
            disabled={isSubmitting}
            loading={isSubmitting}
            title="Submit"
            onPress={() => router.push("/(auth)/waitlist-success")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default WaitlistPage;
