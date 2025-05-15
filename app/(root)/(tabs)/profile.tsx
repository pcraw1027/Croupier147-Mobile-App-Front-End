import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import HomeAppbar from "@/components/pageComponent/Home/HomeAppbar";
import constants from "@/config/constants";
import auth from "@/config/services/auth";
import { icons } from "@/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await auth.userProfile();

      setUsername(response.user_profile.username);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(constants.COOKIES.key);

    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="bg-white-alt">
      <HomeAppbar title="Profile" />

      <ScrollView className="px-[10px]" contentContainerClassName="pb-[70px]">
        <View className="flex flex-row items-center bg-white px-[24px] py-[32px] rounded-[8px] mb-8">
          <View className="w-[80px] h-[80px] flex items-center justify-center bg-pry rounded-[12px] mr-[20px]">
            <InterBoldText text="L" className="text-green-light text-[32px]" />
          </View>
          <View>
            <InterBoldText
              text={`@${username}`}
              className="text-[20px] mb-[10px]"
            />
            <InterSemiboldText
              text="First name"
              className="text-text-muted text-[16px]"
            />
          </View>
        </View>

        <View className="mb-[32px]">
          <InterSemiboldText
            text="Personal"
            className="text-[16px] text-text-neutral mb-[10px]"
          />

          <View className="bg-white py-[16px] px-[12px] rounded-[12px]">
            <View className="flex flex-row items-center justify-between mb-[16px]">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.profileIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="Profile Information"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>

            <View className="flex flex-row items-center justify-between mb-[16px]">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.activitiesIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="My Activities"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>

            <View className="flex flex-row items-center justify-between mb-[16px]">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.personalisationIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="Personalization"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>

            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.invitesIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="User Invites"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>
          </View>
        </View>

        <View className="mb-[32px]">
          <InterSemiboldText
            text="Security"
            className="text-[16px] text-text-neutral mb-[10px]"
          />

          <View className="bg-white py-[16px] px-[12px] rounded-[12px]">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.changePasswordIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="Change Password"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>
          </View>
        </View>

        <View className="mb-[54px]">
          <InterSemiboldText
            text="Croupier147"
            className="text-[16px] text-text-neutral mb-[10px]"
          />

          <View className="bg-white py-[16px] px-[12px] rounded-[12px]">
            <View className="flex flex-row items-center justify-between mb-[16px]">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.aboutUsIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="About us"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>

            <View className="flex flex-row items-center justify-between mb-[16px]">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.legalIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="Legal"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>

            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <CroupierImage
                  source={icons.contactUsIcon}
                  className="w-[34px] h-[34px]"
                />
                <InterSemiboldText
                  text="Contact us"
                  className="text-[16px] ml-[8px]"
                />
              </View>

              <CroupierImage
                source={icons.grayArrowRight}
                className="w-[20px] h-[20px]"
              />
            </View>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={logout}>
          <View className="flex flex-row items-center justify-center">
            <CroupierImage
              source={icons.logoutIcon}
              className="w-[28px] h-[28px] mr-[10px]"
            />
            <InterSemiboldText
              text="Log out"
              className="text-red text-[16px]"
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
