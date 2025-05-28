import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterText from "@/components/common/components/Text/InterText";
import helpers from "@/components/common/utils/helper";
import company, { ICompany } from "@/config/services/company";
import { IReviews, IUserReview } from "@/config/services/product";
import { icons } from "@/icons";
import logger from "@/logger.config";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import moment from "moment";
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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

const CompanyRatingsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const addBottomSheetModalRef = useRef<any>(null);
  const editBottomSheetModalRef = useRef<any>(null);
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<ICompany>();
  const [companyReviews, setCompanyReviews] = useState<IReviews>();
  const [userReview, setUserReview] = useState<IUserReview>();
  const [hideBtn, setHideBtn] = useState(false);
  const [form, setForm] = useState({
    title: "",
    rating: 0,
    comment: "",
  });
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const [fifth, setFifth] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      editBottomSheetModalRef.current?.snapToIndex(1);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      editBottomSheetModalRef.current?.snapToIndex(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      addBottomSheetModalRef.current?.snapToIndex(1);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      addBottomSheetModalRef.current?.snapToIndex(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    getCompanyDetails();
    getCompanyReviews();
    getUserCompanyReview();
  }, []);

  const handleShowEditBottomsheet = useCallback(() => {
    editBottomSheetModalRef.current?.present();
    setHideBtn(true);
  }, []);

  const handleHideEditBottomsheet = useCallback(() => {
    editBottomSheetModalRef.current?.dismiss();
    setHideBtn(false);
  }, []);

  const handleShowAddBottomsheet = useCallback(() => {
    addBottomSheetModalRef.current?.present();
    setHideBtn(true);
  }, []);

  const handleHideAddBottomsheet = useCallback(() => {
    addBottomSheetModalRef.current?.dismiss();
    setHideBtn(false);
  }, []);

  const getCompanyDetails = async () => {
    try {
      setLoading(true);

      const response = await company.companyDetails(id.toString());

      setCompanyDetails(response);
      setFirst(+response?.rating_distribution["1"]);
      setSecond(+response?.rating_distribution["2"]);
      setThird(+response?.rating_distribution["3"]);
      setFourth(+response?.rating_distribution["4"]);
      setFifth(+response?.rating_distribution["5"]);
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

  const getCompanyReviews = async () => {
    try {
      setLoading(true);

      const response = await company.companyReviews(id.toString());

      setCompanyReviews(response);
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

  const getUserCompanyReview = async () => {
    try {
      setLoading(true);

      const response = await company.userCompanyReview(id.toString());

      setUserReview(response);
      setForm({
        title: response?.title ?? "",
        rating: response.rating ?? 0,
        comment: response.comment ?? "",
      });
    } catch (error: any) {
      //   helpers.openNotification({
      //     message: error.message,
      //     type: "error",
      //   });
      return logger(error);
    } finally {
      setLoading(false);
    }
  };

  const editRatingFormik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          title: form.title,
          comment: form.comment,
          rating: form.rating,
        };

        await company.editCompanyReview(
          payload,
          userReview?.id?.toString() ?? "0"
        );

        helpers.openNotification({
          message: "Successfully edited review",
          type: "success",
        });

        handleHideEditBottomsheet();
        getCompanyDetails();
        getCompanyReviews();
        getUserCompanyReview();
      } catch (error: any) {
        helpers.openNotification({
          message: error.message,
          type: "error",
        });
        return logger(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const addRatingFormik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          review: {
            title: form.title,
            comment: form.comment,
            rating: form.rating,
            company_id: id,
          },
        };

        await company.addCompanyReview(payload);

        helpers.openNotification({
          message: "Successfully added review",
          type: "success",
        });

        getCompanyDetails();
        getCompanyReviews();
        getUserCompanyReview();
        handleHideAddBottomsheet();
        setForm({
          title: "",
          rating: 0,
          comment: "",
        });
      } catch (error: any) {
        helpers.openNotification({
          message: error.message,
          type: "error",
        });
        return logger(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <View className="h-full">
            <View>
              <View className="flex flex-row items-center justify-between mb-3 px-5">
                <TouchableOpacity onPress={() => router.back()}>
                  <CroupierImage
                    source={icons.backIcon}
                    className="w-[40px] h-[40px]"
                  />
                </TouchableOpacity>

                <InterSemiboldText
                  text="Company Ratings"
                  className="text-pry text-2xl"
                />

                <View className="w-[20px]" />
              </View>
            </View>

            <ScrollView
              contentContainerClassName="pb-[20px]"
              showsVerticalScrollIndicator={false}
            >
              <View className="px-6 mb-5 mt-8">
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
                          (companyDetails?.review_stats?.average_ratings ??
                            0) >= star
                        ) {
                          icon = icons.star;
                        } else if (
                          (companyDetails?.review_stats?.average_ratings ??
                            0) >=
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
                </View>
              </View>

              <View className="px-6 mb-10">
                <View className="flex flex-row items-center justify-between mb-5">
                  <InterMediumText
                    text="5 star"
                    className="text-text-dark text-[18px] mr-2"
                  />
                  <View className="h-[24px] border border-stroke rounded-[4px] w-[65%] mr-2">
                    <View
                      className={`bg-amber rounded-[4px] h-full`}
                      style={{ width: `${fifth}%` }}
                    ></View>
                  </View>
                  <InterMediumText
                    text={`${
                      Number.isNaN(+companyDetails?.rating_distribution["5"]!)
                        ? "0"
                        : +companyDetails?.rating_distribution["5"]!
                    }%`}
                    className="text-text-dark text-[18px] w-[75px]"
                  />
                </View>

                <View className="flex flex-row items-center justify-between mb-5">
                  <InterMediumText
                    text="4 star"
                    className="text-text-dark text-[18px] mr-2"
                  />
                  <View className="h-[24px] border border-stroke rounded-[4px] w-[65%] mr-2">
                    <View
                      className={`bg-amber rounded-[4px] h-full`}
                      style={{ width: `${fourth}%` }}
                    ></View>
                  </View>
                  <InterMediumText
                    text={`${
                      Number.isNaN(+companyDetails?.rating_distribution["4"]!)
                        ? "0"
                        : +companyDetails?.rating_distribution["4"]!
                    }%`}
                    className="text-text-dark text-[18px] w-[75px]"
                  />
                </View>

                <View className="flex flex-row items-center justify-between mb-5">
                  <InterMediumText
                    text="3 star"
                    className="text-text-dark text-[18px] mr-2"
                  />
                  <View className="h-[24px] border border-stroke rounded-[4px] w-[65%] mr-2">
                    <View
                      className={`bg-amber rounded-[4px] h-full`}
                      style={{ width: `${third}%` }}
                    ></View>
                  </View>
                  <InterMediumText
                    text={`${
                      Number.isNaN(+companyDetails?.rating_distribution["3"]!)
                        ? "0"
                        : +companyDetails?.rating_distribution["3"]!
                    }%`}
                    className="text-text-dark text-[18px] w-[75px]"
                  />
                </View>

                <View className="flex flex-row items-center justify-between mb-5">
                  <InterMediumText
                    text="2 star"
                    className="text-text-dark text-[18px] mr-2"
                  />
                  <View className="h-[24px] border border-stroke rounded-[4px] w-[65%] mr-2">
                    <View
                      className={`bg-amber rounded-[4px] h-full`}
                      style={{ width: `${second}%` }}
                    ></View>
                  </View>
                  <InterMediumText
                    text={`${
                      Number.isNaN(+companyDetails?.rating_distribution["2"]!)
                        ? "0"
                        : +companyDetails?.rating_distribution["2"]!
                    }%`}
                    className="text-text-dark text-[18px] w-[75px]"
                  />
                </View>

                <View className="flex flex-row items-center justify-between">
                  <InterMediumText
                    text="1 star"
                    className="text-text-dark text-[18px] mr-2"
                  />
                  <View className="h-[24px] border border-stroke rounded-[4px] w-[65%] mr-2">
                    <View
                      className={`bg-amber rounded-[4px] h-full`}
                      style={{ width: `${first}%` }}
                    ></View>
                  </View>
                  <InterMediumText
                    text={`${
                      Number.isNaN(+companyDetails?.rating_distribution["1"]!)
                        ? "0"
                        : +companyDetails?.rating_distribution["1"]!
                    }%`}
                    className="text-text-dark text-[18px] w-[75px]"
                  />
                </View>
              </View>

              <View className="px-6 mb-5">
                <View className="flex flex-row items-center">
                  <InterSemiboldText
                    text="Company Reviews"
                    className="text-[18px] text-text-dark"
                  />
                  <InterSemiboldText
                    text={` (${companyDetails?.review_stats?.total_reviews})`}
                    className="text-[16px] text-text-neutral"
                  />
                </View>

                {companyReviews?.records?.map((review, idx) => (
                  <View key={idx} className="mt-5 border-b border-stroke pb-5">
                    <View className="flex flex-row items-center justify-between mb-5">
                      <InterBoldText
                        text={review.title ?? "-"}
                        className="text-[16px] text-text-dark flex-1"
                        numberOfLines={1}
                      />
                      <View className="flex flex-row items-center mr-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          let icon;
                          if ((review?.rating ?? 0) >= star) {
                            icon = icons.star;
                          } else if ((review?.rating ?? 0) >= star - 0.5) {
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
                    </View>

                    <InterMediumText
                      text={review.comment ?? "-"}
                      className="text-[16px] text-text-dark leading-7 mb-4"
                    />

                    <View className="flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center">
                        <View className="bg-green-dark flex items-center justify-center h-[24px] w-[24px] rounded-full">
                          <InterText
                            text={`${review.username?.substring(1, 0) ?? "-"}`}
                            className="text-white uppercase text-center"
                          />
                        </View>

                        <InterSemiboldText
                          text={`@${review.username ?? "-"}`}
                          className="ml-3 text-[14px] text-text-neutral"
                        />
                      </View>

                      <View>
                        <InterMediumText
                          text={`${moment(review?.created_at).format(
                            "MMM D, YYYY"
                          )} | ${review.country ?? "-"}`}
                          className="text-[14px] text-text-neutral"
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            <View className="border-t border-stroke pt-3 px-6 fixed bottom-0 w-full">
              <CustomButton
                title={
                  userReview == null
                    ? "Rate & Review the Company"
                    : "Edit Rating & Review"
                }
                onPress={() => {
                  if (userReview == null) {
                    handleShowAddBottomsheet();
                  } else {
                    handleShowEditBottomsheet();
                  }
                }}
              />
            </View>

            {/* ADD COMPANY REVIEw */}
            <BottomSheetModalProvider>
              <BottomSheetModal
                ref={addBottomSheetModalRef}
                snapPoints={snapPoints}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                android_keyboardInputMode="adjustResize"
                onDismiss={handleHideAddBottomsheet}
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
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <View className="bg-white px-6 py-10 rounded-tr-[24px] rounded-tl-[24px]">
                      <InterSemiboldText
                        text="Write a Company Review"
                        className="text-[24px] text-text-dark mb-1"
                      />
                      <InterMediumText
                        text="This review reflects your knowledge and perception of the company diversity."
                        className="text-text-neutral text-[16px] leading-7 mb-8"
                      />

                      <View className="flex flex-row items-center justify-between mb-5">
                        <InterMediumText
                          text="Give ratings"
                          className="text-text-neutral text-[18px]"
                        />

                        <View className="flex flex-row items-center mr-1">
                          {[1, 2, 3, 4, 5].map((star) => {
                            let icon;
                            if ((form?.rating ?? 0) >= star) {
                              icon = icons.star;
                            } else if ((form?.rating ?? 0) >= star - 0.5) {
                              icon = icons.starHalf;
                            } else {
                              icon = icons.starOutlined;
                            }

                            return (
                              <TouchableOpacity
                                key={star}
                                onPress={() =>
                                  setForm({ ...form, rating: star })
                                }
                              >
                                <CroupierImage
                                  key={star}
                                  source={icon}
                                  className="w-[20px] h-[20px]"
                                />
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>

                      <CustomInputField
                        label="Title"
                        value={form.title}
                        onChangeText={(value) => {
                          setForm({ ...form, title: value });
                        }}
                        className="mb-5"
                      />

                      <CustomInputField
                        label="Share company review"
                        value={form.comment}
                        onChangeText={(value) => {
                          setForm({ ...form, comment: value });
                        }}
                        className="!h-[150px] mb-10"
                        numberOfLines={4}
                        multiline={true}
                        textarea={true}
                        maxLength={150}
                      />

                      <CustomButton
                        title="Submit"
                        disabled={addRatingFormik.isSubmitting}
                        loading={addRatingFormik.isSubmitting}
                        onPress={() => addRatingFormik.handleSubmit()}
                      />
                    </View>
                  </KeyboardAvoidingView>
                </BottomSheetScrollView>
              </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* EDIT COMPANY REVIEw */}
            <BottomSheetModalProvider>
              <BottomSheetModal
                ref={editBottomSheetModalRef}
                snapPoints={snapPoints}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                android_keyboardInputMode="adjustResize"
                onDismiss={handleHideEditBottomsheet}
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
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <View className="bg-white px-6 py-10 rounded-tr-[24px] rounded-tl-[24px]">
                      <InterSemiboldText
                        text="Edit your Company Review"
                        className="text-[24px] text-text-dark mb-1"
                      />
                      <InterMediumText
                        text="This review reflects your knowledge and perception of the company diversity."
                        className="text-text-neutral text-[16px] leading-7 mb-8"
                      />

                      <View className="flex flex-row items-center justify-between mb-5">
                        <InterMediumText
                          text="Give ratings"
                          className="text-text-neutral text-[18px]"
                        />

                        <View className="flex flex-row items-center mr-1">
                          {[1, 2, 3, 4, 5].map((star) => {
                            let icon;
                            if ((form?.rating ?? 0) >= star) {
                              icon = icons.star;
                            } else if ((form?.rating ?? 0) >= star - 0.5) {
                              icon = icons.starHalf;
                            } else {
                              icon = icons.starOutlined;
                            }

                            return (
                              <TouchableOpacity
                                key={star}
                                onPress={() =>
                                  setForm({ ...form, rating: star })
                                }
                              >
                                <CroupierImage
                                  key={star}
                                  source={icon}
                                  className="w-[20px] h-[20px]"
                                />
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>

                      <CustomInputField
                        label="Title"
                        value={form.title}
                        onChangeText={(value) => {
                          setForm({ ...form, title: value });
                        }}
                        className="mb-5"
                      />

                      <CustomInputField
                        label="Share company review"
                        value={form.comment}
                        onChangeText={(value) => {
                          setForm({ ...form, comment: value });
                        }}
                        className="!h-[150px] mb-10"
                        numberOfLines={4}
                        multiline={true}
                        textarea={true}
                        maxLength={150}
                      />

                      <CustomButton
                        title="Submit"
                        disabled={editRatingFormik.isSubmitting}
                        loading={editRatingFormik.isSubmitting}
                        onPress={() => editRatingFormik.handleSubmit()}
                      />
                    </View>
                  </KeyboardAvoidingView>
                </BottomSheetScrollView>
              </BottomSheetModal>
            </BottomSheetModalProvider>

            <StatusBar barStyle={"dark-content"} />
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CompanyRatingsPage;
