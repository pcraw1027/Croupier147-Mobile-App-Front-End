import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { ICompany } from "@/config/services/company";
import { icons } from "@/icons";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
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

const AddInvitePage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<ICompany>();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    postalCode: "",
  });

  useFocusEffect(
    useCallback(() => {
      //   getCompanyDetails();
    }, [id])
  );

  //   const getCompanyDetails = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await company.companyDetails(id.toString());

  //       setCompanyDetails(response);
  //     } catch (error: any) {
  //       helpers.openNotification({
  //         message: error.message,
  //         type: "error",
  //       });
  //       return logger(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <SafeAreaView className="bg-white">
      {loading ? (
        <View className="flex items-center justify-center h-[90vh]">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View className="flex flex-row items-center justify-between mb-[60px] px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <CroupierImage
                source={icons.backIcon}
                className="w-[40px] h-[40px]"
              />
            </TouchableOpacity>

            <InterSemiboldText
              text="Add New Invite"
              className="text-pry text-2xl"
            />

            <View className="w-[20px]" />
          </View>
          <View className="bg-white flex flex-col h-screen px-5">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerClassName="pb-[150px]"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <CustomInputField
                  label="First name"
                  className="mb-[30px]"
                  value={form.firstName}
                  onChangeText={(text) => setForm({ ...form, firstName: text })}
                />

                <CustomInputField
                  label="Last name"
                  className="mb-[30px]"
                  value={form.lastName}
                  onChangeText={(text) => setForm({ ...form, lastName: text })}
                />

                <CustomInputField
                  label="Email"
                  className="mb-[30px]"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                />

                <CustomInputField
                  label="Country"
                  className="mb-[30px]"
                  value={form.country}
                  onChangeText={(text) => setForm({ ...form, country: text })}
                />

                <CustomInputField
                  label="Postal code"
                  className="mb-[80px]"
                  value={form.postalCode}
                  onChangeText={(text) =>
                    setForm({ ...form, postalCode: text })
                  }
                />

                <CustomButton
                  title="Send invite now"
                  onPress={() =>
                    router.push("/profile/user-invites/invite-success")
                  }
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </View>

          <StatusBar barStyle={"dark-content"} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddInvitePage;
