import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomCheckbox from "@/components/common/components/CustomCheckbox";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import constants from "@/config/constants";
import auth from "@/config/services/auth";
import useStore from "@/config/store";
import { icons } from "@/icons";
import logger from "@/logger.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
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

const SignUpThreePage = () => {
  const router = useRouter();
  const [isChecked, setChecked] = useState(true);

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleInputChange = (field: string, value: string) => {
    setUser({ [field]: value });
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          user: {
            email: user.email,
            password: user.password,
            username: user.username,
            country: user.country,
            postal_code: user.postalCode,
            invite_code: user.inviteCode,
          },
        };

        const response = await auth.register(payload);

        await AsyncStorage.setItem(
          constants.COOKIES.key,
          JSON.stringify(response.token)
        );

        await AsyncStorage.setItem("user-email", JSON.stringify(user.email));

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
              <View className="flex flex-row items-center justify-between mb-2">
                <InterSemiboldText
                  text="CUSTOMIZATION"
                  className="text-accent-2 tracking-[1.2px]"
                />
                <InterSemiboldText
                  text="3/3"
                  className="text-accent-2 tracking-[1.2px]"
                />
              </View>
              <InterBoldText
                text="Help us personalize your CR147 experience"
                className="text-[28px] mb-[80px]"
              />

              <CustomInputField
                label="Country"
                className="mb-[32px]"
                value={user.country}
                onChangeText={(text) => handleInputChange("country", text)}
              />

              <CustomInputField
                label="Postal code"
                className="mb-[40px]"
                value={user.postalCode}
                onChangeText={(text) => handleInputChange("postalCode", text)}
              />

              <CustomCheckbox
                label="Yes, I want to receive personalized notifications on latest CR147 updates"
                className="mb-[60px]"
                isChecked={isChecked}
                setChecked={setChecked}
              />

              <CustomButton
                disabled={isSubmitting}
                loading={isSubmitting}
                title="Create account"
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

export default SignUpThreePage;
