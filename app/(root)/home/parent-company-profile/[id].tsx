import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterWrappedText from "@/components/common/components/Text/InterWrappedText";
import helpers from "@/components/common/utils/helper";
import HomeHightlightCard from "@/components/pageComponent/Home/HomeHighlightCard";
import company, { ICompany } from "@/config/services/company";
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
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ParentCompanyProfilePage = () => {
  const router = useRouter();
  const { id, fromSearch } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<ICompany>();

  const snapPoints = useMemo(() => ["80%"], []);
  const croupierScoreBottomSheetModalRef = useRef<any>(null);
  const diversitySnapshotBottomSheetModalRef = useRef<any>(null);
  const femaleOwnedBottomSheetModalRef = useRef<any>(null);
  const blackOwnedBottomSheetModalRef = useRef<any>(null);

  useEffect(() => {
    diversitySnapshotBottomSheetModalRef.current?.snapToIndex(0);
  }, [diversitySnapshotBottomSheetModalRef]);

  useFocusEffect(
    useCallback(() => {
      if (fromSearch === "true") {
        incrementCompanySearch();
      } else {
        getCompanyDetails();
      }
    }, [id, fromSearch])
  );

  const getCompanyDetails = async () => {
    try {
      setLoading(true);

      const response = await company.companyDetails(id.toString());

      setCompanyDetails(response);
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

  const incrementCompanySearch = async () => {
    try {
      setLoading(true);

      await search.incrementCompanySearch(id.toString());

      getCompanyDetails();
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

  const handleShowCroupierScoreBottomsheet = useCallback(() => {
    croupierScoreBottomSheetModalRef.current?.present();
  }, []);

  const handleHideCroupierScoreBottomsheet = useCallback(() => {
    croupierScoreBottomSheetModalRef.current?.dismiss();
  }, []);

  const handleShowDiversitySnapshotBottomsheet = useCallback(() => {
    diversitySnapshotBottomSheetModalRef.current?.present();
  }, []);

  const handleHideDiversitySnapshotBottomsheet = useCallback(() => {
    diversitySnapshotBottomSheetModalRef.current?.dismiss();
  }, []);

  const handleShowBlackOwnedBottomsheet = useCallback(() => {
    blackOwnedBottomSheetModalRef.current?.present();
  }, []);

  const handleHideBlackOwnedBottomsheet = useCallback(() => {
    blackOwnedBottomSheetModalRef.current?.dismiss();
  }, []);

  const handleShowFemaleOwnedBottomsheet = useCallback(() => {
    femaleOwnedBottomSheetModalRef.current?.present();
  }, []);

  const handleHideFemaleOwnedBottomsheet = useCallback(() => {
    femaleOwnedBottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="bg-white">
          {loading ? (
            <View className="flex items-center justify-center h-[90vh]">
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View>
              <View className="flex flex-row items-center justify-between my-3 px-5">
                <TouchableOpacity onPress={() => router.back()}>
                  <CroupierImage
                    source={icons.backIcon}
                    className="w-[40px] h-[40px]"
                  />
                </TouchableOpacity>

                <InterSemiboldText
                  text="Company Information"
                  className="text-pry text-xl"
                />

                <View className="w-[20px]" />
              </View>
              <View className="bg-white flex flex-col h-screen">
                <ScrollView
                  contentContainerClassName="pb-[150px]"
                  showsVerticalScrollIndicator={false}
                >
                  {companyDetails?.company?.black_owned ||
                  companyDetails?.company?.female_owned ? (
                    <View className="flex flex-row items-center justify-center gap-x-3 mb-3">
                      {companyDetails?.company?.black_owned && (
                        <TouchableOpacity
                          onPress={() => handleShowBlackOwnedBottomsheet()}
                        >
                          <CroupierImage
                            source={images.blackOwned}
                            className="w-[1.75rem] h-[1.75rem]"
                          />
                        </TouchableOpacity>
                      )}

                      {companyDetails?.company?.female_owned && (
                        <TouchableOpacity
                          onPress={() => handleShowFemaleOwnedBottomsheet()}
                        >
                          <CroupierImage
                            source={images.womenOwned}
                            className="w-[1.75rem] h-[1.75rem]"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : null}
                  <View className="pl-6 pr-4 flex flex-row items-center justify-between mb-2">
                    <View className="w-[80%]">
                      <InterSemiboldText
                        text={companyDetails?.company?.name ?? "-"}
                        className="text-pry text-2xl"
                      />
                      <InterSemiboldText
                        text={companyDetails?.company?.sector ?? "-"}
                        className="text-text-neutral text-base"
                      />
                    </View>

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
                      {companyDetails?.level_1_flag ? (
                        <View className="w-[11.25rem] h-[11.25rem] flex items-center justify-center border-[0.2px] border-stroke rounded-[8px] mr-[16px]">
                          {companyDetails?.company?.logo?.url ? (
                            <CroupierImage
                              source={{
                                uri: companyDetails?.company?.logo?.url,
                              }}
                              className="w-[8rem] h-[11.25rem]"
                            />
                          ) : (
                            <View className="flex items-center">
                              <CroupierImage
                                source={images.defaultImage}
                                className="w-[50px] h-[50px]"
                              />
                              <InterMediumText
                                text="Company Logo Not Available"
                                className="text-center !text-text-neutral"
                              />
                            </View>
                          )}
                        </View>
                      ) : (
                        <View className="w-[11.25rem] h-[11.25rem] flex items-center justify-center bg-white-alt mr-[16px] border-[0.2px] border-stroke rounded-[8px]">
                          <CroupierImage
                            source={icons.redSearch}
                            className="w-[1.75rem] h-[1.75rem] mb-2"
                          />
                          <InterMediumText
                            text="Company Research"
                            className="mb-2 text-text-neutral"
                          />
                          <View className="bg-red-light py-[5px] px-[10px] rounded-full">
                            <InterMediumText
                              text="In Progress"
                              className="text-red text-xs"
                            />
                          </View>
                        </View>
                      )}

                      <View>
                        <View className="mb-6">
                          <InterSemiboldText
                            text="SEARCHES"
                            className="text-xs text-text-neutral mb-1"
                          />
                          <InterSemiboldText
                            text={
                              companyDetails?.level_1_flag
                                ? companyDetails?.company?.searches?.toString() ??
                                  "0"
                                : "N/A"
                            }
                            className="text-base"
                          />
                        </View>

                        <View className="mb-6">
                          <InterSemiboldText
                            text="COMPANY CEO"
                            className="text-xs text-text-neutral mb-1"
                          />
                          <InterSemiboldText
                            text={
                              companyDetails?.level_1_flag
                                ? `${
                                    companyDetails?.company_ceo?.first_name ??
                                    "-"
                                  } ${
                                    companyDetails?.company_ceo?.last_name ??
                                    "-"
                                  } `
                                : "N/A"
                            }
                            className="text-base"
                          />
                        </View>

                        <View>
                          <InterSemiboldText
                            text="PARENT COMPANY"
                            className="text-xs text-text-neutral mb-1"
                          />

                          <View>
                            <InterSemiboldText
                              text={
                                companyDetails?.parent_company?.parent_company
                                  ?.name ?? "N/A"
                              }
                              className={`w-[12rem] text-base`}
                              numberOfLines={1}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="mb-5">
                    <View className="px-6">
                      <InterSemiboldText
                        text={
                          companyDetails?.subsidiaries?.title?.toUpperCase() ??
                          "SUBSIDIARIESS / BRANDS"
                        }
                        className="text-sm text-text-neutral tracking-wider"
                      />
                    </View>

                    {companyDetails?.level_1_flag ? (
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        className="flex flex-row px-5 mt-3"
                      >
                        {companyDetails?.subsidiaries?.subsidiaries_companies?.map(
                          (brand, index) => (
                            <TouchableWithoutFeedback
                              onPress={() =>
                                router.push(
                                  `/(root)/home/company-profile/${brand.child_company?.id}`
                                )
                              }
                              key={index}
                            >
                              <View className="mr-5 flex items-center">
                                {brand.child_company?.logo?.url ? (
                                  <CroupierImage
                                    source={{
                                      uri: brand.child_company?.logo?.url,
                                    }}
                                    className="w-16 h-16"
                                  />
                                ) : (
                                  <CroupierImage
                                    source={images.defaultImage}
                                    className="w-16 h-16"
                                  />
                                )}
                                <InterSemiboldText
                                  text={brand.child_company?.name ?? "-"}
                                  className="text-sm text-accent-2 text-center"
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          )
                        )}
                      </ScrollView>
                    ) : (
                      <View className="px-5">
                        <InterMediumText text="N/A" className=" text-base" />
                      </View>
                    )}
                  </View>

                  <TouchableWithoutFeedback
                    onPress={() =>
                      router.push(
                        `/(root)/home/company-ratings/${companyDetails?.company?.id}`
                      )
                    }
                  >
                    <View className="px-6 mb-5">
                      <InterSemiboldText
                        text="Company Ratings"
                        className="text-lg mb-1"
                      />
                      <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center">
                          <InterSemiboldText
                            text={
                              companyDetails?.review_stats?.average_ratings?.toFixed(
                                1
                              ) ?? "0"
                            }
                            className="text-base text-accent-2 mr-1"
                          />
                          <View className="flex flex-row items-center mr-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                              let icon;
                              if (
                                (companyDetails?.review_stats
                                  ?.average_ratings ?? 0) >= star
                              ) {
                                icon = icons.star;
                              } else if (
                                (companyDetails?.review_stats
                                  ?.average_ratings ?? 0) >=
                                star - 0.5
                              ) {
                                icon = icons.starHalf;
                              } else {
                                icon = icons.starOutlined;
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
                            text={`(${companyDetails?.review_stats?.total_ratings})`}
                            className="text-base text-text-neutral"
                          />
                        </View>

                        <InterSemiboldText
                          text={`Reviews(${companyDetails?.review_stats?.total_reviews})`}
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
                        <View className="flex flex-row justify-between gap-x-2 mb-4">
                          <View>
                            <InterSemiboldText
                              className="w-[6.8rem] text-[10px]"
                              text="Projected"
                            />
                            <InterSemiboldText
                              className="flex-1 text-[10px]"
                              text="Culture & Identity"
                            />
                          </View>
                          <InterSemiboldText
                            className="flex-1 text-[10px]"
                            text="Employee Demographics"
                          />
                          <InterSemiboldText
                            className="flex-1 text-[10px]"
                            text="Mgmt/Board Composition"
                          />
                        </View>
                        <View className="flex flex-row justify-between items-center gap-x-2 mb-2">
                          <View className="h-[1px] w-[6.8rem] bg-stroke" />
                          <InterSemiboldText
                            className="text-xs text-text-neutral"
                            text="Performance"
                          />
                          <View className="flex-1 h-[1px] w-full bg-stroke" />
                        </View>
                        <View className="flex flex-row justify-between items-center gap-x-2 mb-3">
                          <View className="flex flex-row items-center w-[6.8rem] gap-x-1">
                            <View
                              className={`${
                                companyDetails?.company_snapshot
                                  ?.projected_culture_and_identity == "none"
                                  ? "bg-text-muted"
                                  : companyDetails?.company_snapshot
                                      ?.projected_culture_and_identity ==
                                    "average"
                                  ? "bg-amber"
                                  : companyDetails?.company_snapshot
                                      ?.projected_culture_and_identity == "poor"
                                  ? "bg-red"
                                  : companyDetails?.company_snapshot
                                      ?.projected_culture_and_identity == "good"
                                  ? "bg-accent-1"
                                  : ""
                              } w-[10px] h-[10px] rounded-full`}
                            />
                            <InterMediumText
                              text={
                                companyDetails?.company_snapshot
                                  ?.projected_culture_and_identity ?? "N/A"
                              }
                              className="text-xs capitalize"
                            />
                          </View>
                          <View className="flex flex-row items-center flex-1 gap-x-1">
                            <View
                              className={`${
                                companyDetails?.company_snapshot
                                  ?.employee_demographics_performance == "none"
                                  ? "bg-text-muted"
                                  : companyDetails?.company_snapshot
                                      ?.employee_demographics_performance ==
                                    "average"
                                  ? "bg-amber"
                                  : companyDetails?.company_snapshot
                                      ?.employee_demographics_performance ==
                                    "poor"
                                  ? "bg-red"
                                  : companyDetails?.company_snapshot
                                      ?.employee_demographics_performance ==
                                    "good"
                                  ? "bg-accent-1"
                                  : ""
                              } w-[10px] h-[10px] rounded-full`}
                            />
                            <InterMediumText
                              text={
                                companyDetails?.company_snapshot
                                  ?.employee_demographics_performance ?? "N/A"
                              }
                              className="text-xs capitalize"
                            />
                          </View>
                          <View className="flex flex-row items-center flex-1 gap-x-1">
                            <View
                              className={`${
                                companyDetails?.company_snapshot
                                  ?.mgmt_composition_performance == "none"
                                  ? "bg-text-muted"
                                  : companyDetails?.company_snapshot
                                      ?.mgmt_composition_performance ==
                                    "average"
                                  ? "bg-amber"
                                  : companyDetails?.company_snapshot
                                      ?.mgmt_composition_performance == "poor"
                                  ? "bg-red"
                                  : companyDetails?.company_snapshot
                                      ?.mgmt_composition_performance == "good"
                                  ? "bg-accent-1"
                                  : ""
                              } w-[10px] h-[10px] rounded-full`}
                            />
                            <InterMediumText
                              text={
                                companyDetails?.company_snapshot
                                  ?.mgmt_composition_performance ?? "N/A"
                              }
                              className="text-xs capitalize"
                            />
                          </View>
                        </View>
                        <View className="flex flex-row justify-between items-center gap-x-2 mb-2">
                          <View className="h-[1px] w-[6.8rem] bg-stroke" />
                          <InterSemiboldText
                            className="text-xs text-text-neutral"
                            text="Transparency"
                          />
                          <View className="flex-1 h-[1px] w-full bg-stroke" />
                        </View>
                        <View className="flex flex-row justify-between items-center gap-x-2 mb-3">
                          <View className="w-[6.8rem]"></View>
                          <View className="flex flex-row items-center flex-1 gap-x-1">
                            <View
                              className={`${
                                companyDetails?.company_snapshot
                                  ?.employee_demographics_transparency == "none"
                                  ? "bg-text-muted"
                                  : companyDetails?.company_snapshot
                                      ?.employee_demographics_transparency ==
                                    "average"
                                  ? "bg-amber"
                                  : companyDetails?.company_snapshot
                                      ?.employee_demographics_transparency ==
                                    "poor"
                                  ? "bg-red"
                                  : companyDetails?.company_snapshot
                                      ?.employee_demographics_transparency ==
                                    "good"
                                  ? "bg-accent-1"
                                  : ""
                              } w-[10px] h-[10px] rounded-full`}
                            />
                            <InterMediumText
                              text={
                                companyDetails?.company_snapshot
                                  ?.employee_demographics_transparency ?? "N/A"
                              }
                              className="text-xs capitalize"
                            />
                          </View>
                          <View className="flex flex-row items-center flex-1 gap-x-1">
                            <View
                              className={`${
                                companyDetails?.company_snapshot
                                  ?.mgmt_composition_transparency == "none"
                                  ? "bg-text-muted"
                                  : companyDetails?.company_snapshot
                                      ?.mgmt_composition_transparency ==
                                    "average"
                                  ? "bg-amber"
                                  : companyDetails?.company_snapshot
                                      ?.mgmt_composition_transparency == "poor"
                                  ? "bg-red"
                                  : companyDetails?.company_snapshot
                                      ?.mgmt_composition_transparency == "good"
                                  ? "bg-accent-1"
                                  : ""
                              } w-[10px] h-[10px] rounded-full`}
                            />
                            <InterMediumText
                              text={
                                companyDetails?.company_snapshot
                                  ?.mgmt_composition_transparency ?? "N/A"
                              }
                              className="text-xs capitalize"
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>

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
                      <HomeHightlightCard
                        onPress={() =>
                          router.push("/home/highlights/article-one")
                        }
                        image={images.article01_1}
                        title="The US wealth gap is large and growing, yet even worse for people of color"
                        time="5"
                        date="29 Jul, 2025"
                      />
                      <HomeHightlightCard
                        onPress={() =>
                          router.push("/home/highlights/article-two")
                        }
                        image={images.highlight}
                        title="Wealth Gap: Understanding the Growing Wealth Gap in the U.S"
                        time="3"
                        date="22 Oct, 2024"
                      />
                      <HomeHightlightCard
                        onPress={() =>
                          router.push("/home/highlights/article-two")
                        }
                        image={images.highlight}
                        title="Wealth Gap: Understanding the Growing Wealth Gap in the U.S"
                        time="3"
                        date="22 Oct, 2024"
                      />
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
                <BottomSheetScrollView>
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

              {/* BLACK OWNED */}
              <BottomSheetModal
                ref={blackOwnedBottomSheetModalRef}
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
                onDismiss={handleHideBlackOwnedBottomsheet}
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
                <BottomSheetScrollView>
                  <View className="pt-3 px-5 pb-8 flex flex-row items-center gap-x-3">
                    <CroupierImage
                      source={images.blackOwned}
                      className="w-[4rem] h-[4rem]"
                    />
                    <InterWrappedText
                      className="text-base"
                      text="This company is *Black Owned*."
                    />
                  </View>
                </BottomSheetScrollView>
              </BottomSheetModal>

              {/* FEMALE OWNED */}
              <BottomSheetModal
                ref={femaleOwnedBottomSheetModalRef}
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
                onDismiss={handleHideFemaleOwnedBottomsheet}
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
                <BottomSheetScrollView>
                  <View className="pt-3 px-5 pb-8 flex flex-row items-center gap-x-3">
                    <CroupierImage
                      source={images.womenOwned}
                      className="w-[4rem] h-[4rem]"
                    />
                    <InterWrappedText
                      className="text-base"
                      text="This company is *Women Owned*."
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
                          text="Projected Culture & Identity"
                          className="text-sm"
                        />
                      </View>

                      <View className="w-2/3">
                        <View className="bg-green-alt p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="None"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-text-muted rounded-full" />
                          </View>
                          <InterMediumText
                            text="Not yet analyzed"
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-white p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Poor"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-red rounded-full" />
                          </View>
                          <InterMediumText
                            text="None"
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
                            text="Some"
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
                            text="Explicitly shared"
                            className="text-sm text-text-neutral"
                          />
                        </View>
                      </View>
                    </View>

                    <View className="flex flex-row">
                      <View className="bg-green-alt w-1/3 pl-5 flex items-center justify-center">
                        <InterSemiboldText
                          text="Employee Demographics"
                          className="text-sm"
                        />
                      </View>

                      <View className="w-2/3">
                        <View className="bg-green-alt p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="None"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-text-muted rounded-full" />
                          </View>
                          <InterMediumText
                            text="Not yet analyzed"
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-white p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Poor"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-red rounded-full" />
                          </View>
                          <InterMediumText
                            text="Little or none"
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
                            text="Approaching the national average"
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
                            text="On or above the national average"
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
                              text="None"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-text-muted rounded-full" />
                          </View>
                          <InterMediumText
                            text="No data to analyze Performance"
                            className="text-sm text-text-neutral"
                          />
                        </View>
                        <View className="bg-white p-5">
                          <View className="flex flex-row items-center gap-x-2 mb-1">
                            <InterSemiboldText
                              text="Poor"
                              className="text-xs"
                            />
                            <View className="w-3 h-3 bg-red rounded-full" />
                          </View>
                          <InterMediumText
                            text="Little or none"
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
                            text="Approaching the national average"
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
                            text="On or above the national average"
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

export default ParentCompanyProfilePage;
