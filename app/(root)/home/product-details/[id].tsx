import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import HomeHightlightCard from "@/components/pageComponent/Home/HomeHighlightCard";
import product, { IProduct } from "@/config/services/product";
import { icons, images } from "@/icons";
import logger from "@/logger.config";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

const bgColors = [
  "bg-blue-light",
  "bg-green-light",
  "bg-red-light",
  "bg-purple-light",
  "bg-amber-light",
];

const getRandomBg = () => bgColors[Math.floor(Math.random() * bgColors.length)];

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [productDetails, setProductDetails] = useState<IProduct>();

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const getProductDetails = async () => {
    try {
      setLoading(true);

      const response = await product.productDetails(id.toString());

      setProductDetails(response);
    } catch (error: any) {
      helpers.openNotification({
        message: error.message,
        type: "error",
      });
      return logger(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <ToastManager
        showCloseIcon={false}
        duration={5000}
        animationStyle="upInUpOut"
        animationOutTiming={500}
        animationInTiming={500}
        width={300}
        textStyle={{
          fontSize: 12,
          fontFamily: "Inter-Medium",
        }}
      />
      {loading ? (
        <View className="flex items-center justify-center h-[90vh]">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View className="bg-white flex flex-col h-screen mt-5">
            <ScrollView
              contentContainerClassName="pb-[150px]"
              showsVerticalScrollIndicator={false}
            >
              <View className="flex flex-row items-start justify-between px-6 mb-2">
                <View className="flex-1 mr-10">
                  <InterSemiboldText
                    text={productDetails?.product.name ?? ""}
                    className="text-2xl text-pry"
                    numberOfLines={2}
                  />
                  <InterSemiboldText
                    text={productDetails?.product.size ?? ""}
                    className="text-text-neutral text-sm"
                  />
                </View>

                <TouchableWithoutFeedback
                  onPress={() => router.dismissTo("/(root)/(tabs)/home")}
                >
                  <View>
                    <CroupierImage
                      source={icons.closeIcon}
                      className="w-10 h-10"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View className="pl-6 pr-4 flex flex-row items-center justify-between mb-2">
                <TouchableWithoutFeedback
                  onPress={() => router.push("/(root)/home/company-profile")}
                >
                  <View className="flex flex-row items-center">
                    <InterSemiboldText
                      text="Company: "
                      className="text-base text-text-dark"
                    />
                    <View className="flex flex-row items-center">
                      <InterSemiboldText
                        text=""
                        className="text-accent-2 text-lg"
                      />
                      <CroupierImage
                        source={icons.arrowRight}
                        className="w-2.5 h-2.5 ml-1"
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <CroupierImage
                  source={images.croupierScore}
                  className="w-20 h-20"
                />
              </View>

              <View className="px-6 mb-5">
                <View className="flex flex-row items-center mb-2">
                  <View
                    className={`w-[180px] h-[180px] flex items-center justify-center rounded-[8px] mr-[16px] ${getRandomBg()}`}
                  >
                    <CroupierImage
                      source={{
                        uri: productDetails?.product_variants[0]?.media[0]?.file
                          ?.url,
                      }}
                      className="w-[88px] h-[160px]"
                      resizeMode="cover"
                    />
                  </View>

                  <View>
                    <View className="mb-6">
                      <InterSemiboldText
                        text="SCANS"
                        className="text-xs text-text-neutral mb-1"
                      />
                      <InterSemiboldText text="0" className="text-base" />
                    </View>

                    <View className="mb-6">
                      <InterSemiboldText
                        text="SEARCHES"
                        className="text-xs text-text-neutral mb-1"
                      />
                      <InterSemiboldText text="0" className="text-base" />
                    </View>

                    <View>
                      <InterSemiboldText
                        text="BARCODE"
                        className="text-xs text-text-neutral mb-1"
                      />
                      <InterSemiboldText
                        text={
                          productDetails?.product_variants[0]?.product_variant
                            ?.barcode ?? ""
                        }
                        className="text-base"
                      />
                    </View>
                  </View>
                </View>

                <View className="flex flex-row">
                  <InterMediumText
                    text={productDetails?.product?.description ?? ""}
                    className="text-base text-text-neutral flex-1"
                    numberOfLines={!showMore ? 1 : undefined}
                  />
                  {!showMore && (
                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                      <InterSemiboldText
                        text={showMore ? "show less" : "learn more"}
                        className="text-base text-accent-2"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View className="px-6 mb-5">
                <InterSemiboldText
                  text="Product Ratings"
                  className="text-lg mb-1"
                />
                <View className="flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center">
                    <InterSemiboldText
                      text="0"
                      className="text-base text-accent-2 mr-1"
                    />
                    <View className="flex flex-row items-center mr-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <CroupierImage
                          key={star}
                          source={icons.starOutlined}
                          className="w-[20px] h-[20px]"
                        />
                      ))}
                    </View>
                    <InterSemiboldText
                      text="(0)"
                      className="text-base text-text-neutral"
                    />
                  </View>

                  <InterSemiboldText
                    text="Reviews(0)"
                    className="text-base text-text-neutral"
                  />
                </View>
              </View>

              <View className="px-6 mb-5">
                <InterSemiboldText
                  text="Company Diversity Snapshot"
                  className="text-lg mb-2"
                />
                <View className="bg-white-alt border-[0.5px] border-stroke p-[16px] rounded-[8px]">
                  <View className="flex flex-row items-center justify-between mb-2">
                    <InterSemiboldText
                      text="Data transparency"
                      className="text-base text-text-neutral"
                    />

                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text="Average"
                        className="text-xs text-text-neutral mr-2"
                      />
                      <View className="w-3 h-3 bg-amber rounded-full" />
                    </View>
                  </View>

                  <View className="flex flex-row items-center justify-between mb-2">
                    <InterSemiboldText
                      text="Internal Culture & Identity"
                      className="text-base text-text-neutral"
                    />

                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text="Good"
                        className="text-xs text-text-neutral mr-2"
                      />
                      <View className="w-3 h-3 bg-accent-2 rounded-full" />
                    </View>
                  </View>

                  <View className="flex flex-row items-center justify-between mb-2">
                    <InterSemiboldText
                      text="Mgmt/Board Composition"
                      className="text-base text-text-neutral"
                    />

                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text="Poor"
                        className="text-xs text-text-neutral mr-2"
                      />
                      <View className="w-3 h-3 bg-red rounded-full" />
                    </View>
                  </View>
                </View>
              </View>

              <View>
                <View className="px-6 flex flex-row items-center justify-between mb-2">
                  <InterSemiboldText
                    text="Alternative Products"
                    className="text-lg"
                  />
                  <InterSemiboldText
                    text="See all"
                    className="text-base text-accent-2"
                  />
                </View>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="flex flex-row  px-6 mb-8"
                >
                  <CroupierImage
                    source={images.comingSoonProduct}
                    className="w-[6.25rem] h-[8rem] mr-3"
                  />
                  <CroupierImage
                    source={images.comingSoonProduct}
                    className="w-[6.25rem] h-[8rem] mr-3"
                  />
                  <CroupierImage
                    source={images.comingSoonProduct}
                    className="w-[6.25rem] h-[8rem] mr-3"
                  />
                  <CroupierImage
                    source={images.comingSoonProduct}
                    className="w-[6.25rem] h-[8rem] mr-3"
                  />
                  <CroupierImage
                    source={images.comingSoonProduct}
                    className="w-[6.25rem] h-[8rem] mr-3"
                  />
                  <CroupierImage
                    source={images.comingSoonProduct}
                    className="w-[6.25rem] h-[8rem]"
                  />
                </ScrollView>
              </View>

              <View className="px-6 mb-5">
                <View className="flex flex-row items-center mb-3">
                  <InterSemiboldText
                    text="Quick Links"
                    className="text-lg mr-3"
                  />
                  <View className="bg-red-light py-1 px-2.5 rounded-full">
                    <InterMediumText
                      text="Coming Soon"
                      className="text-xs text-red"
                    />
                  </View>
                </View>

                <View className="flex flex-row items-center mb-2">
                  <InterMediumText
                    text="TV Commercials"
                    className="text-base text-accent-2 mr-2"
                  />
                  <CroupierImage
                    source={icons.arrowDiagonalRight}
                    className="w-6 h-6"
                  />
                </View>

                <View className="flex flex-row items-center mb-2">
                  <InterMediumText
                    text="Print Advertising"
                    className="text-base text-accent-2 mr-2"
                  />
                  <CroupierImage
                    source={icons.arrowDiagonalRight}
                    className="w-6 h-6"
                  />
                </View>

                <View className="flex flex-row items-center">
                  <InterMediumText
                    text="Print Media"
                    className="text-base text-accent-2 mr-2"
                  />
                  <CroupierImage
                    source={icons.arrowDiagonalRight}
                    className="w-6 h-6"
                  />
                </View>
              </View>

              <View>
                <View className="px-6 mb-3">
                  <InterSemiboldText
                    text="Croupier Highlights"
                    className="text-lg"
                  />
                </View>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="flex flex-row px-[25px]"
                >
                  <HomeHightlightCard />
                  <HomeHightlightCard />
                  <HomeHightlightCard />
                </ScrollView>
              </View>
            </ScrollView>
          </View>

          <StatusBar barStyle={"dark-content"} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductDetailsPage;
