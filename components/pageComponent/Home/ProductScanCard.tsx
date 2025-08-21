import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import { TouchableWithoutFeedback, View } from "react-native";

interface IProp {
  title: string;
  rating: string;
  company: string;
  image: string;
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
      <View className="bg-white rounded-[14px] px-[0.875rem] py-[0.875rem] mb-[16px] flex flex-row justify-between items-end">
        <View className="flex flex-row items-center">
          <View
            className={`w-[5.3125rem] h-[7rem] flex items-center justify-center rounded-[5px] mr-[0.875rem] ${className}`}
          >
            {image ? (
              <CroupierImage
                source={{
                  uri: image,
                }}
                className="w-full h-full"
              />
            ) : (
              <CroupierImage
                source={images.defaultImage}
                className="w-full h-full"
              />
            )}
          </View>

          <View className="flex-1">
            <InterSemiboldText
              text={title}
              className="text-text-dark text-base pb-[4px] w-[230px]"
              numberOfLines={1}
            />

            <View className="flex flex-row items-end justify-between">
              <View className="flex flex-col items-start">
                <InterSemiboldText
                  text={company}
                  className="text-text-neutral text-sm pb-[5px]"
                />
                <View className="flex flex-row">
                  <View className="bg-green-light px-[14px] py-[4px] rounded-[4px] mr-[8px]">
                    <InterMediumText
                      text={`${scanCount} Scans`}
                      className="text-accent-2 text-xs"
                    />
                  </View>
                  <View className="flex flex-row bg-green-light px-[8px] py-[4px] rounded-[4px]">
                    <InterMediumText
                      text={+rating > 0 ? rating : "NR"}
                      className="text-xs text-text-neutral"
                    />
                    <CroupierImage
                      source={icons.star}
                      className="w-[14px] h-[14px]"
                    />
                  </View>
                </View>
              </View>

              <View>
                <CroupierImage
                  source={images.croupierScore}
                  className="w-[3.5rem] h-[3.5rem]"
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
