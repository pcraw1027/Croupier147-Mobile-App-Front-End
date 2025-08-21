import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterText from "@/components/common/components/Text/InterText";
import { icons } from "@/icons";
import { router } from "expo-router";
import {
  ImageSourcePropType,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface IProps {
  image: ImageSourcePropType;
  title: string;
  date: string;
  time: string;
}

const InitialScreenHighlightCard = ({ image, title, date, time }: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => router.replace("/(auth)/sign-in")}>
      <View className="bg-white-alt p-[10px] rounded-[12px] w-[200px] mr-6">
        <CroupierImage
          source={image}
          className="w-[180px] h-[120px] rounded-[8px] mb-3"
        />

        <InterSemiboldText text={title} className="text-[14px] mb-3" />

        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            <CroupierImage
              source={icons.clock}
              className="w-[12px] h-[12px] mr-1"
            />
            <InterText text={`${time} mins`} className="text-[12px]" />
          </View>

          <View className="flex flex-row items-center">
            <CroupierImage
              source={icons.calendar}
              className="w-[12px] h-[12px] mr-1"
            />
            <InterText text={date} className="text-[12px]" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InitialScreenHighlightCard;
