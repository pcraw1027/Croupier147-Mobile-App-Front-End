import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import { TouchableWithoutFeedback, View } from "react-native";

declare interface CardProps {
  image: string;
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
        className={`mr-5 flex items-center justify-center relative overflow-hidden p-3 w-[100px] rounded-[8px] ${className}`}
      >
        <CroupierImage
          source={images.scanGradient}
          resizeMode="cover"
          className="w-[100px] h-[120px] rounded-[8px] absolute bottom-0 right-0 left-0"
        />

        {image ? (
          <CroupierImage
            source={{
              uri: image,
            }}
            className="w-[115px] h-[128px]"
          />
        ) : (
          <CroupierImage
            source={images.defaultImage}
            className="w-[50px] h-[50px]"
          />
        )}

        <View className="absolute bottom-3 left-3 flex flex-row items-center">
          <InterSemiboldText text={rating} className="text-white text-[12px]" />
          <CroupierImage source={icons.star} className="w-[14px] h-[14px]" />
        </View>

        <CroupierImage
          source={images.croupierScore}
          className="w-[50px] h-[50px] absolute bottom-3 right-2"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScanCard;
