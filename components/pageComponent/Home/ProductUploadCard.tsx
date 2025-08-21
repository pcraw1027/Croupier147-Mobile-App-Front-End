import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { images } from "@/icons";
import { useRouter } from "expo-router";
import moment from "moment";
import {
  ImageSourcePropType,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface IProp {
  title: string;
  company: string;
  image: ImageSourcePropType;
  uploadDate?: string;
  status?: boolean;
  productId?: number;
  className: string;
}

const ProductUploadCard = ({
  title,
  company,
  image,
  uploadDate,
  status,
  productId,
  className,
}: IProp) => {
  const router = useRouter();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (productId) {
          router.push(`/home/product-details/${productId}`);
        }
      }}
    >
      <View className="bg-white rounded-[14px] px-[0.875rem] py-[0.875rem] mb-[30px] flex flex-row justify-between items-end">
        <View className="flex flex-row items-center">
          <View
            className={`w-[5.3125rem] h-[5.3125rem] flex items-center justify-center  rounded-[5px] mr-[0.875rem] ${className}`}
          >
            <CroupierImage source={image} className="w-full h-full" />
          </View>

          <View className="flex-1">
            <InterSemiboldText
              text={title}
              className="text-text-dark text-base pb-[4px] w-[100%]"
              numberOfLines={1}
            />

            <View className="flex flex-row items-end justify-between">
              <View>
                <InterSemiboldText
                  text={company}
                  className="text-text-neutral text-sm pb-[5px]"
                />
                <View className="bg-green-light px-[10px] py-[4px] rounded-[4px]">
                  <InterMediumText
                    text={`Uploaded ${moment(uploadDate).format(
                      "MMM D, YYYY"
                    )}`}
                    className="text-accent-2 text-xs"
                  />
                </View>
              </View>

              {status ? (
                <View className="flex items-end gap-y-1">
                  <CroupierImage
                    source={images.croupierScore}
                    className="w-[3.5rem] h-[3.5rem]"
                  />
                  <View className="flex flex-row items-center gap-x-1">
                    <View className="w-2 h-2 bg-accent-2 rounded-full" />
                    <InterMediumText
                      text="Resolved"
                      className="text-text-neutral text-xs"
                    />
                  </View>
                </View>
              ) : (
                <View className="flex flex-row items-center gap-x-1">
                  <View className="w-2 h-2 bg-amber rounded-full" />
                  <InterMediumText
                    text="Pending"
                    className="text-text-neutral text-xs"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductUploadCard;
