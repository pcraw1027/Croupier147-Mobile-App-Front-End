import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterText from "@/components/common/components/Text/InterText";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import { TouchableWithoutFeedback, View } from "react-native";

const HomeHightlightCard = () => {
  const router = useRouter();
  return (
    <TouchableWithoutFeedback
      onPress={() => router.push("/home/highlight-details")}
    >
      <View className="bg-green-alt p-[10px] rounded-[12px] w-[200px] mr-6">
        <CroupierImage
          source={images.highlight}
          className="w-[180px] h-[120px] rounded-[8px] mb-3"
        />

        <InterSemiboldText
          text="Wealth Gap: Understanding the Growing Wealth Gap in the U.S"
          className="text-[14px] mb-3"
        />

        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            <CroupierImage
              source={icons.clock}
              className="w-[12px] h-[12px] mr-1"
            />
            <InterText text="3 mins" className="text-[12px]" />
          </View>

          <View className="flex flex-row items-center">
            <CroupierImage
              source={icons.calendar}
              className="w-[12px] h-[12px] mr-1"
            />
            <InterText text="19 Mar, 2024" className="text-[12px]" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeHightlightCard;
