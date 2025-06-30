import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterWrappedText from "@/components/common/components/Text/InterWrappedText";
import helpers from "@/components/common/utils/helper";
import HomeHightlightCard from "@/components/pageComponent/Home/HomeHighlightCard";
import product, { IProduct } from "@/config/services/product";
import search from "@/config/services/search";
import { icons, images } from "@/icons";
import logger from "@/logger.config";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
  const { id, fromSearch } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [productDetails, setProductDetails] = useState<IProduct>();

  const snapPoints = useMemo(() => ["80%"], []);
  const croupierScoreBottomSheetModalRef = useRef<any>(null);
  const alternativeProductBottomSheetModalRef = useRef<any>(null);
  const diversitySnapshotBottomSheetModalRef = useRef<any>(null);

  useEffect(() => {
    diversitySnapshotBottomSheetModalRef.current?.snapToIndex(0);
  }, [diversitySnapshotBottomSheetModalRef]);

  useFocusEffect(
    useCallback(() => {
      getProductDetails();
    }, [id])
  );

  useEffect(() => {
    if (fromSearch === "true") {
      incrementProductSearch();
    }
  }, [fromSearch, id]);

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

  const incrementProductSearch = async () => {
    try {
      await search.incrementProductSearch(id.toString());
    } catch (error: any) {
      helpers.openNotification({
        message: error.message,
        type: "error",
      });
      return logger(error);
    }
  };

  const handleShowCroupierScoreBottomsheet = useCallback(() => {
    croupierScoreBottomSheetModalRef.current?.present();
  }, []);

  const handleHideCroupierScoreBottomsheet = useCallback(() => {
    croupierScoreBottomSheetModalRef.current?.dismiss();
  }, []);

  const handleShowAlternativeProductBottomsheet = useCallback(() => {
    alternativeProductBottomSheetModalRef.current?.present();
  }, []);

  const handleHideAlternativeProductBottomsheet = useCallback(() => {
    alternativeProductBottomSheetModalRef.current?.dismiss();
  }, []);

  const handleShowDiversitySnapshotBottomsheet = useCallback(() => {
    diversitySnapshotBottomSheetModalRef.current?.present();
  }, []);

  const handleHideDiversitySnapshotBottomsheet = useCallback(() => {
    diversitySnapshotBottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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

                    <TouchableWithoutFeedback onPress={() => router.back()}>
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
                      onPress={() => {
                        if (!productDetails?.product?.company_id) {
                          helpers.openNotification({
                            message: "Company not found",
                            type: "error",
                          });
                        } else {
                          router.push(
                            `/(root)/home/company-profile/${productDetails?.product?.company_id}`
                          );
                        }
                      }}
                    >
                      <View className="flex flex-row items-center">
                        <InterSemiboldText
                          text="Company: "
                          className="text-base text-text-dark"
                        />
                        <View className="flex flex-row items-center">
                          <InterSemiboldText
                            text={productDetails?.company_name ?? "-"}
                            className="text-accent-2 text-lg"
                          />
                          <CroupierImage
                            source={icons.arrowRight}
                            className="w-2.5 h-2.5 ml-1"
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                      onPress={() => handleShowCroupierScoreBottomsheet()}
                    >
                      <View>
                        <CroupierImage
                          source={images.croupierScore}
                          className="w-20 h-20"
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <View className="px-6 mb-5">
                    <View className="flex flex-row items-center mb-2">
                      <View
                        className={`w-[180px] h-[180px] flex items-center justify-center rounded-[8px] mr-[16px] bg-white border border-stroke`}
                      >
                        <CroupierImage
                          source={{
                            uri: productDetails?.product_variants[0]?.media[0]
                              ?.file?.url,
                          }}
                          className="w-[120px] h-[160px]"
                          resizeMode="contain"
                        />
                      </View>

                      <View>
                        <View className="mb-6">
                          <InterSemiboldText
                            text="SCANS"
                            className="text-xs text-text-neutral mb-1"
                          />
                          <InterSemiboldText
                            text={productDetails?.scans?.toString() ?? "0"}
                            className="text-base"
                          />
                        </View>

                        <View className="mb-6">
                          <InterSemiboldText
                            text="SEARCHES"
                            className="text-xs text-text-neutral mb-1"
                          />
                          <InterSemiboldText
                            text={
                              productDetails?.product?.searches?.toString() ??
                              "0"
                            }
                            className="text-base"
                          />
                        </View>

                        <View>
                          <InterSemiboldText
                            text="BARCODE"
                            className="text-xs text-text-neutral mb-1"
                          />
                          <InterSemiboldText
                            text={
                              productDetails?.product_variants[0]
                                ?.product_variant?.barcode ?? ""
                            }
                            className="text-base"
                          />
                        </View>
                      </View>
                    </View>

                    <View className="flex flex-row">
                      <Text
                        style={{
                          fontFamily: "InterMedium",
                        }}
                        className="text-base text-text-neutral flex-1"
                        numberOfLines={!showMore ? 1 : undefined}
                      >
                        {productDetails?.product?.description ?? ""}
                        {showMore && (
                          <Text
                            onPress={() => setShowMore(!showMore)}
                            style={{
                              fontFamily: "InterMedium",
                            }}
                            className="text-base text-accent-2 "
                          >
                            {" See less"}
                          </Text>
                        )}
                      </Text>
                      {!showMore && (
                        <TouchableOpacity
                          onPress={() => setShowMore(!showMore)}
                        >
                          <InterSemiboldText
                            text=" See more"
                            className="text-base text-accent-2"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  <TouchableWithoutFeedback
                    onPress={() =>
                      router.push(
                        `/(root)/home/product-ratings/${productDetails?.product_variants[0]?.product_variant?.product_id}`
                      )
                    }
                  >
                    <View className="px-6 mb-5">
                      <InterSemiboldText
                        text="Product Ratings"
                        className="text-lg mb-1"
                      />
                      <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center">
                          <InterSemiboldText
                            text={
                              productDetails?.review_stats?.average_ratings?.toFixed(
                                1
                              ) ?? "0"
                            }
                            className="text-base text-accent-2 mr-1"
                          />
                          <View className="flex flex-row items-center mr-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                              let icon;
                              if (
                                (productDetails?.review_stats
                                  ?.average_ratings ?? 0) >= star
                              ) {
                                icon = icons.star;
                              } else if (
                                (productDetails?.review_stats
                                  ?.average_ratings ?? 0) >=
                                star - 0.5
                              ) {
                                icon = icons.starHalf; // Half star
                              } else {
                                icon = icons.starOutlined; // Empty star
                              }

                              return (
                                <CroupierImage
                                  key={star}
                                  source={icon}
                                  className="w-[20px] h-[20px]"
                                />
                              );
                            })}
                          </View>
                          <InterSemiboldText
                            text={`(${productDetails?.review_stats?.total_ratings})`}
                            className="text-base text-text-neutral"
                          />
                        </View>

                        <InterSemiboldText
                          text={`Reviews(${productDetails?.review_stats?.total_reviews})`}
                          className="text-base text-text-neutral"
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress={() => handleShowDiversitySnapshotBottomsheet()}
                  >
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
                  </TouchableWithoutFeedback>

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
                      <TouchableOpacity
                        onPress={() =>
                          handleShowAlternativeProductBottomsheet()
                        }
                      >
                        <CroupierImage
                          source={images.comingSoonProduct}
                          className="w-[6.25rem] h-[8rem] mr-3"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          handleShowAlternativeProductBottomsheet()
                        }
                      >
                        <CroupierImage
                          source={images.comingSoonProduct}
                          className="w-[6.25rem] h-[8rem] mr-3"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          handleShowAlternativeProductBottomsheet()
                        }
                      >
                        <CroupierImage
                          source={images.comingSoonProduct}
                          className="w-[6.25rem] h-[8rem] mr-3"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          handleShowAlternativeProductBottomsheet()
                        }
                      >
                        <CroupierImage
                          source={images.comingSoonProduct}
                          className="w-[6.25rem] h-[8rem] mr-3"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          handleShowAlternativeProductBottomsheet()
                        }
                      >
                        <CroupierImage
                          source={images.comingSoonProduct}
                          className="w-[6.25rem] h-[8rem] mr-3"
                        />
                      </TouchableOpacity>
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

              {/* CROUPIER SCORE */}
              <BottomSheetModal
                ref={croupierScoreBottomSheetModalRef}
                handleIndicatorStyle={{
                  backgroundColor: "#DDE3E0",
                  width: 100,
                  height: 8,
                }}
                backgroundStyle={{
                  backgroundColor: "#ffffff",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                android_keyboardInputMode="adjustResize"
                onDismiss={handleHideCroupierScoreBottomsheet}
                enablePanDownToClose={false}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                    pressBehavior="close"
                    {...props}
                  />
                )}
              >
                <BottomSheetScrollView
                  style={{ maxHeight: Dimensions.get("window").height * 0.8 }}
                >
                  <View className="pt-3 px-5 pb-8">
                    <InterWrappedText
                      text="The Croupier score reflects the measurable diversity performance of commercial entities *on a scale of 100*."
                      className="mb-5"
                    />
                    <InterMediumText
                      text="The score will be calculated from company data related to:"
                      className="text-text-neutral text-base"
                    />
                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text={` \u2022 `}
                        className="text-text-neutral text-base"
                      />
                      <InterMediumText
                        text="employment demographics"
                        className="text-text-neutral text-base"
                      />
                    </View>
                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text={` \u2022 `}
                        className="text-text-neutral text-base"
                      />
                      <InterMediumText
                        text="supply chain composition"
                        className="text-text-neutral text-base"
                      />
                    </View>
                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text={` \u2022 `}
                        className="text-text-neutral text-base"
                      />
                      <InterMediumText
                        text="marketing and advertising messages"
                        className="text-text-neutral text-base"
                      />
                    </View>
                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text={` \u2022 `}
                        className="text-text-neutral text-base"
                      />
                      <InterMediumText
                        text="transparency and openness"
                        className="text-text-neutral text-base"
                      />
                    </View>
                    <View className="flex flex-row items-center">
                      <InterMediumText
                        text={` \u2022 `}
                        className="text-text-neutral text-base"
                      />
                      <InterMediumText
                        text="consumer generated insights"
                        className="text-text-neutral text-base"
                      />
                    </View>
                  </View>
                </BottomSheetScrollView>
              </BottomSheetModal>

              {/* ALTERNATIVE PRODUCTS */}
              <BottomSheetModal
                ref={alternativeProductBottomSheetModalRef}
                handleIndicatorStyle={{
                  backgroundColor: "#DDE3E0",
                  width: 100,
                  height: 8,
                }}
                backgroundStyle={{
                  backgroundColor: "#ffffff",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                android_keyboardInputMode="adjustResize"
                onDismiss={handleHideAlternativeProductBottomsheet}
                enablePanDownToClose={false}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                    pressBehavior="close"
                    {...props}
                  />
                )}
              >
                <BottomSheetScrollView
                  style={{ maxHeight: Dimensions.get("window").height * 0.8 }}
                >
                  <View className="pt-3 px-5 pb-8">
                    <InterSemiboldText
                      text="Alternative Products"
                      className="mb-5 text-2xl"
                    />
                    <InterWrappedText
                      text="The Alternative products feature provides a list of similar products ranked by quality rating and produced by companies with high diversity score.  Alternative products are only recommended when the user selected product is produced by a poor scoring company."
                      className="leading-6"
                    />
                  </View>
                </BottomSheetScrollView>
              </BottomSheetModal>

              {/* DIVERSITY SNAPSHOT */}
              <BottomSheetModal
                snapPoints={snapPoints}
                ref={diversitySnapshotBottomSheetModalRef}
                handleIndicatorStyle={{
                  backgroundColor: "#DDE3E0",
                  width: 100,
                  height: 8,
                }}
                backgroundStyle={{
                  backgroundColor: "#ffffff",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                android_keyboardInputMode="adjustResize"
                onDismiss={handleHideDiversitySnapshotBottomsheet}
                enablePanDownToClose={false}
                backdropComponent={(props) => (
                  <BottomSheetBackdrop
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                    pressBehavior="close"
                    {...props}
                  />
                )}
              >
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                  <View className="pt-3">
                    <View className="px-5">
                      <InterSemiboldText
                        text="Company Diversity Snapshot"
                        className="mb-5 text-2xl"
                      />
                      <InterWrappedText
                        text="This snapshot provides a high-level assessment of the health of a company’s diversity efforts. Further research and company-provided data may impact the status of these indicators."
                        className="mb-5 leading-6"
                      />
                    </View>

                    <View className="flex flex-row">
                      <View className="bg-green-light w-1/3 px-5 flex items-center justify-center">
                        <InterSemiboldText
                          text="Data Transparency"
                          className="text-sm"
                        />
                      </View>

                      <View className="w-2/3">
                        <View className="bg-green-alt p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Poor"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-red rounded-full" />
                          </View>
                          <InterMediumText
                            text="No public diversity information."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-white p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Average"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-amber rounded-full" />
                          </View>
                          <InterMediumText
                            text="Some diversity-oriented information publicly available."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-green-alt p-5">
                          <View className="flex flex-row items-center gap-x-2">
                            <InterSemiboldText
                              text="Good"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-accent-2 rounded-full" />
                          </View>
                          <InterMediumText
                            text="Some diversity-oriented information publicly available."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                      </View>
                    </View>

                    <View className="flex flex-row">
                      <View className="bg-green-alt w-1/3 pl-5 flex items-center justify-center">
                        <InterSemiboldText
                          text="Internal Culture & Identity"
                          className="text-sm"
                        />
                      </View>

                      <View className="w-2/3">
                        <View className="bg-white p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Poor"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-red rounded-full" />
                          </View>
                          <InterMediumText
                            text="No communication of diverse culture within the company."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-green-alt p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Average"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-amber rounded-full" />
                          </View>
                          <InterMediumText
                            text="Some implicit communication of diverse culture within the company."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-white p-5">
                          <View className="flex flex-row items-center gap-x-2">
                            <InterSemiboldText
                              text="Good"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-accent-2 rounded-full" />
                          </View>
                          <InterMediumText
                            text="Explicit communication of diverse culture within the company."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                      </View>
                    </View>

                    <View className="flex flex-row">
                      <View className="bg-green-light w-1/3 px-5 flex items-center justify-center">
                        <InterSemiboldText
                          text="Mgmt/Board Composition"
                          className="text-sm"
                        />
                      </View>

                      <View className="w-2/3">
                        <View className="bg-green-alt p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Poor"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-red rounded-full" />
                          </View>
                          <InterMediumText
                            text="Little or no diversity within company leadership."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-white p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Average"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-amber rounded-full" />
                          </View>
                          <InterMediumText
                            text="Diversity approaching the national demographic average."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-green-alt p-5">
                          <View className="flex flex-row items-center gap-x-2">
                            <InterSemiboldText
                              text="Good"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-accent-2 rounded-full" />
                          </View>
                          <InterMediumText
                            text="Diversity on or above the national demographic average."
                            className="text-sm text-text-neutral"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </BottomSheetScrollView>
              </BottomSheetModal>

              <StatusBar barStyle={"dark-content"} />
            </View>
          )}
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ProductDetailsPage;
