import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import {
  ImageSourcePropType,
  TouchableWithoutFeedback,
  View,
} from "react-native";

declare interface CardProps {
  image: ImageSourcePropType;
  rating: string;
  productId: string;
  className: string;
}

const HomeScanCard = ({ image, rating, className, productId }: CardProps) => {
  const router = useRouter();
  return (
    <TouchableWithoutFeedback
      onPress={() => router.push(`/(root)/home/product-details/${productId}`)}
    >
      <View
        className={`mr-5 flex items-center justify-center relative p-3 w-[100px] rounded-[8px] ${className}`}
      >
        <CroupierImage
          source={images.scanGradient}
          className="w-[100px] h-[170px] rounded-[8px] absolute bottom-0 top-0 right-0 left-0"
        />

        <CroupierImage source={image} className="w-[80px] h-[128px]" />

        <View className="absolute bottom-3 left-3 flex flex-row items-center">
          <InterSemiboldText text={rating} className="text-white text-[12px]" />
          <CroupierImage source={icons.star} className="w-[14px] h-[14px]" />
        </View>

        <CroupierImage
          source={images.croupierScore}
          className="w-[50px] h-[50px] absolute bottom-3 right-3 "
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScanCard;
