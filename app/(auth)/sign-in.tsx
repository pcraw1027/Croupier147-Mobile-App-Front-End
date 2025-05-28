import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import constants from "@/config/constants";
import auth from "@/config/services/auth";
import { icons } from "@/icons";
import logger from "@/logger.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
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

const SignInPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    AsyncStorage.getItem("user-email").then((storedEmail) => {
      if (storedEmail) {
        setForm({ ...form, email: JSON.parse(storedEmail) });
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          email: form.email,
          password: form.password,
        };
        const response = await auth.login(payload);

        await AsyncStorage.setItem(
          constants.COOKIES.key,
          JSON.stringify(response.token)
        );

        await AsyncStorage.setItem("user-email", JSON.stringify(form.email));

        helpers.openNotification({
          message: response.message,
          type: "success",
        });

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex flex-col justify-between h-full"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-row items-center justify-end">
            <TouchableOpacity
              onPress={() => {
                router.replace("/");
              }}
            >
              <CroupierImage
                source={icons.closeIcon}
                className="w-[40px] h-[40px]"
              />
            </TouchableOpacity>
          </View>
          <View className="">
            <InterBoldText
              text="Sign in to continue"
              className="text-[28px] mb-[40px]"
            />
            <CustomInputField
              label="Email address"
              keyboardType="email-address"
              className="mb-[32px]"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />

            <CustomInputField
              label="Password"
              secureTextEntry={true}
              className="mb-[8px]"
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            <TouchableWithoutFeedback
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <View className="flex flex-row items-center justify-end mb-[100px] pr-[20px]">
                <InterSemiboldText
                  text="Forgot password?"
                  className="text-accent-2 text-[14px]"
                />
              </View>
            </TouchableWithoutFeedback>

            <CustomButton
              loading={isSubmitting}
              disabled={isSubmitting}
              title="Sign in"
              className="mb-[80px]"
              onPress={() => handleSubmit()}
            />

            <View className="flex flex-row items-center justify-center">
              <Link href="/(auth)/sign-up-one">
                <InterSemiboldText
                  text="Don't have an account? "
                  className="text-[16px] text-text-neutral"
                />
                <InterSemiboldText
                  text="Sign up"
                  className="text-[16px] text-accent-2"
                />
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default SignInPage;
