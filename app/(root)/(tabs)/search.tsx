import CroupierImage from "@/components/common/components/CroupierImage";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import HomeAppbar from "@/components/pageComponent/Home/HomeAppbar";
import { icons, images } from "@/icons";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <SafeAreaView className="bg-white">
      <HomeAppbar title="Search" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex items-center justify-center h-full px-5">
            <CroupierImage
              source={images.searchIllustration}
              className="w-[240px] h-[220px] mb-[20px]"
            />

            <InterMediumText
              text="Looking for a specific product or company? Use the search bar to find items by product or company name."
              className="text-center text-[16px] text-text-neutral mb-[24px]"
            />

            <CustomInputField
              value={searchText}
              onChangeText={(value) => setSearchText(value)}
              label="Search product or company"
              className="mb-[40px]"
            />

            <View className="flex flex-row justify-center items-center">
              <CroupierImage
                source={icons.filterIcon}
                className="w-[28px] h-[28px]"
              />
              <InterSemiboldText
                text="Customize Results"
                className="text-[16px] text-accent-2 ml-[10px]"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
