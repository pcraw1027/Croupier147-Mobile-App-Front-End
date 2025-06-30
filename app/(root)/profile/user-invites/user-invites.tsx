import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { ICompany } from "@/config/services/company";
import { icons } from "@/icons";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserInvitesPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<ICompany>();

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
    <SafeAreaView className="bg-white-alt">
      {loading ? (
        <View className="flex items-center justify-center h-[90vh]">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View className="flex flex-row items-center justify-between mb-[30px] px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <CroupierImage
                source={icons.backIcon}
                className="w-[40px] h-[40px]"
              />
            </TouchableOpacity>

            <InterSemiboldText
              text="User Invites"
              className="text-pry text-2xl"
            />

            <TouchableOpacity
              onPress={() => router.push("/profile/user-invites/add-invite")}
            >
              <InterSemiboldText
                text="Add new"
                className="text-accent-2 text-[16px]"
              />
            </TouchableOpacity>
          </View>
          <View className="bg-white-alt flex flex-col h-screen">
            <ScrollView
              contentContainerClassName="pb-[150px]"
              showsVerticalScrollIndicator={false}
            >
              {false && (
                <View className="flex items-center justify-center h-[80vh]">
                  <InterMediumText
                    text="Invite your friends to join the Croupier147 app and help them discover all the insights you love."
                    className="text-text-neutral text-[16px] text-center w-[76%] leading-7 mb-[32px]"
                  />

                  <CustomButton
                    title="Add new"
                    className="!w-[200px]"
                    onPress={() =>
                      router.push("/(root)/profile/user-invites/add-invite")
                    }
                  />
                </View>
              )}

              {true && (
                <View className="px-5">
                  <View className="bg-white shadow-stats-card rounded-[8px] py-[18px] px-[16px] mb-[36px] flex flex-row items-start justify-between">
                    <View>
                      <InterSemiboldText
                        text="Peter Doe"
                        className="text-[16px] mb-1"
                      />
                      <InterMediumText
                        text="peterdoe@gmail.com"
                        className="text-text-neutral text-[16px]"
                      />
                    </View>
                    <View className="bg-green-light py-[4px] px-[10px] rounded-full">
                      <InterMediumText
                        text="Joined"
                        className="text-accent-2"
                      />
                    </View>
                  </View>

                  <TouchableWithoutFeedback
                    onPress={() =>
                      router.push("/profile/user-invites/invite-details")
                    }
                  >
                    <View className="bg-white shadow-stats-card rounded-[8px] py-[18px] px-[16px] mb-[36px] flex flex-row items-start justify-between">
                      <View>
                        <InterSemiboldText
                          text="Jane Doe"
                          className="text-[16px] mb-1"
                        />
                        <InterMediumText
                          text="janedoe@gmail.com"
                          className="text-text-neutral text-[16px] mb-3"
                        />
                        <View className="flex flex-row items-center">
                          <InterSemiboldText
                            text="Invite Details"
                            className="text-accent-2 text-[16px] mr-1"
                          />
                          <CroupierImage
                            source={icons.arrowRight}
                            className="w-[12px] h-[12px]"
                          />
                        </View>
                      </View>
                      <View className="bg-amber-light py-[4px] px-[10px] rounded-full">
                        <InterMediumText
                          text="Pending"
                          className="text-amber"
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                  <View className="bg-white shadow-stats-card rounded-[8px] py-[18px] px-[16px] mb-[36px] flex flex-row items-start justify-between">
                    <View>
                      <InterSemiboldText
                        text="Jane Doe"
                        className="text-[16px] mb-1"
                      />
                      <InterMediumText
                        text="janedoe@gmail.com"
                        className="text-text-neutral text-[16px] mb-3"
                      />
                      <View className="flex flex-row items-center">
                        <InterSemiboldText
                          text="Invite Details"
                          className="text-accent-2 text-[16px] mr-1"
                        />
                        <CroupierImage
                          source={icons.arrowRight}
                          className="w-[12px] h-[12px]"
                        />
                      </View>
                    </View>
                    <View className="bg-amber-light py-[4px] px-[10px] rounded-full">
                      <InterMediumText text="Pending" className="text-amber" />
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>

          <StatusBar barStyle={"dark-content"} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserInvitesPage;
