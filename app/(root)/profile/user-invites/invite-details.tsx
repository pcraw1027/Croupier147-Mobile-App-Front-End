import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { ICompany } from "@/config/services/company";
import { icons } from "@/icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const InviteDetailsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const deleteBottomsheetRef = useRef<any>(null);
  const snapPoints = useMemo(() => ["100%"], []);

  const [loading, setLoading] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<ICompany>();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    postalCode: "",
    inviteCode: "",
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

  const handleShowDeleteBottomsheet = useCallback(() => {
    deleteBottomsheetRef.current?.present();
  }, []);

  const handleHideDeleteBottomsheet = useCallback(() => {
    deleteBottomsheetRef.current?.dismiss();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
                  text="Invite Details"
                  className="text-pry text-2xl"
                />

                <TouchableWithoutFeedback
                  onPress={() => handleShowDeleteBottomsheet()}
                >
                  <View>
                    <InterSemiboldText
                      text="Delete"
                      className="text-red text-[16px]"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View className="bg-white flex flex-col h-screen px-5">
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    <CustomInputField
                      label="Invite code"
                      className="mb-[30px]"
                      value={form.inviteCode}
                      onChangeText={(text) =>
                        setForm({ ...form, inviteCode: text })
                      }
                    />

                    <CustomInputField
                      label="First name"
                      className="mb-[30px]"
                      value={form.firstName}
                      onChangeText={(text) =>
                        setForm({ ...form, firstName: text })
                      }
                    />

                    <CustomInputField
                      label="Last name"
                      className="mb-[30px]"
                      value={form.lastName}
                      onChangeText={(text) =>
                        setForm({ ...form, lastName: text })
                      }
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
                      onChangeText={(text) =>
                        setForm({ ...form, country: text })
                      }
                    />

                    <CustomInputField
                      label="Postal code"
                      className="mb-[40px]"
                      value={form.postalCode}
                      onChangeText={(text) =>
                        setForm({ ...form, postalCode: text })
                      }
                    />

                    <CustomButton
                      title="Save changes"
                      className="mb-[40px]"
                      onPress={() => router.back()}
                    />

                    <View className="flex flex-row items-center justify-center">
                      <CroupierImage
                        source={icons.mail}
                        className="w-[28px] h-[28px] mr-2"
                      />
                      <InterSemiboldText
                        text="Resend invite"
                        className="text-accent-2 text-[16px]"
                      />
                    </View>
                  </ScrollView>
                </KeyboardAvoidingView>
              </View>

              {/* DELETE INVITE */}
              <BottomSheetModal
                ref={deleteBottomsheetRef}
                handleIndicatorStyle={{
                  height: 0,
                }}
                backgroundStyle={{
                  backgroundColor: "#ffffff",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
                onDismiss={handleHideDeleteBottomsheet}
                enablePanDownToClose={false}
                enableHandlePanningGesture={false}
                enableContentPanningGesture={false}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                    pressBehavior="close"
                    {...props}
                  />
                )}
              >
                <BottomSheetView>
                  <View className="px-6 py-10 h-[345px]">
                    <InterSemiboldText
                      text="Delete Invite"
                      className="text-center text-[24px] mb-[24px]"
                    />
                    <InterMediumText
                      text="Are you sure you want to delete this user invite? All the information will be lost and this action can not be undone."
                      className="text-center text-[16px] text-text-neutral leading-7 mb-[50px]"
                    />

                    <View className="flex flex-row items-center gap-x-[30px]">
                      <CustomButton
                        title="Do nothing"
                        className="bg-green-light flex-1"
                        onPress={() => handleHideDeleteBottomsheet()}
                      />
                      <CustomButton title="Delete invite" className="flex-1" />
                    </View>
                  </View>
                </BottomSheetView>
              </BottomSheetModal>

              <StatusBar barStyle={"dark-content"} />
            </View>
          )}
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default InviteDetailsPage;
