import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import {
  ImageSourcePropType,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface IProp {
  title: string;
  rating: string;
  company: string;
  image: ImageSourcePropType;
  scanCount?: string;
  productId?: string;
  className: string;
}

const ProductScanCard = ({
  title,
  rating,
  company,
  image,
  scanCount,
  productId,
  className,
}: IProp) => {
  const router = useRouter();
  return (
    <TouchableWithoutFeedback
      onPress={() => router.push(`/(root)/home/product-details/${productId}`)}
    >
      <View className="bg-white rounded-[14px] px-[14px] py-[14px] mb-[30px] flex flex-row justify-between items-end">
        <View className="flex flex-row">
          <View
            className={`w-[85px] h-[85px] flex items-center justify-center  rounded-[5px] mr-[14px] ${className}`}
          >
            <CroupierImage source={image} className="w-[58px] h-[75px]" />
          </View>

          <View className="">
            <InterSemiboldText
              text={title}
              className="text-text-dark text-[16px] pb-[4px] w-[230px]"
              numberOfLines={1}
            />

            <View className="flex flex-row items-end justify-between">
              <View>
                <InterSemiboldText
                  text={company}
                  className="text-text-neutral text-[14px] pb-[5px]"
                />
                <View className="bg-green-light px-[14px] py-[4px] rounded-[4px] mb-[4px]">
                  <InterMediumText
                    text={`${scanCount} Scans`}
                    className="text-accent-2 text-[12px]"
                  />
                </View>
                <View className="flex flex-row">
                  <InterMediumText
                    text={rating}
                    className="text-[12px] text-text-neutral"
                  />
                  <CroupierImage
                    source={icons.star}
                    className="w-[14px] h-[14px]"
                  />
                </View>
              </View>

              <View>
                <CroupierImage
                  source={images.croupierScore}
                  className="w-[56px] h-[56px]"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductScanCard;
