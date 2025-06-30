import CroupierImage from "@/components/common/components/CroupierImage";
import CustomSearchInputField from "@/components/common/components/CustomSearchInput";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterWrappedText from "@/components/common/components/Text/InterWrappedText";
import helpers from "@/components/common/utils/helper";
import HomeAppbar from "@/components/pageComponent/Home/HomeAppbar";
import search, {
  SearchCompanies,
  SearchProducts,
} from "@/config/services/search";
import { icons, images } from "@/icons";
import logger from "@/logger.config";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [products, setProducts] = useState<SearchProducts[]>();
  const [companies, setCompanies] = useState<SearchCompanies[]>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    if (debouncedText.trim() === "") return;

    const fetchResults = async () => {
      try {
        const response = await search.searchProductOrCompany(debouncedText);

        setProducts(response.results.products);
        if (response.results.products.length) {
        }

        setCompanies(response.results.companies);
        if (response.results.companies.length) {
        }

        console.log(response.results.products);
        console.log(response.results.companies);
      } catch (error: any) {
        helpers.openNotification({
          message: error.message,
          type: "error",
        });
        logger(error);
      }
    };

    fetchResults();
  }, [debouncedText]);

  return (
    <SafeAreaView className="bg-white-alt px-5 h-full">
      <HomeAppbar title="Search" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex flex-col justify-between h-full"
          keyboardShouldPersistTaps="handled"
        >
          <CustomSearchInputField
            value={searchText}
            onChangeText={(value) => setSearchText(value)}
            label="Search product or company"
            returnKeyType="search"
            hasCancel={true}
            hasClear={true}
            onCancel={() => {
              setSearchText("");
              setDebouncedText("");
              setCompanies([]);
              setProducts([]);
            }}
            onClear={() => {
              setSearchText("");
              setDebouncedText("");
            }}
          />

          {(products?.length ?? 0) <= 0 && (companies?.length ?? 0) <= 0 ? (
            <View className="flex items-center justify-center h-[90%]">
              <CroupierImage
                source={images.searchIllustration}
                className="w-[120px] h-[106px] mb-[20px]"
              />

              <InterMediumText
                text="Looking for a specific product or company? Use the search bar to find items by product or company name."
                className="text-center text-[16px] text-text-neutral mb-[24px] w-[80%]"
              />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="pt-5"
              contentContainerClassName="pb-[120px]"
            >
              <View className="mt-5">
                <View className="">
                  {(companies?.length ?? 0) > 0 && (
                    <InterSemiboldText
                      text="COMPANY"
                      className="text-text-neutral text-[12px] tracking-[1.6px] mb-5"
                    />
                  )}
                  {companies?.map((company, idx) => (
                    <TouchableWithoutFeedback
                      key={idx}
                      onPress={() =>
                        router.push({
                          pathname: "/home/company-profile/[id]",
                          params: {
                            id: company?.id ?? "",
                            fromSearch: "true",
                          },
                        })
                      }
                    >
                      <View className="mb-[20px] flex flex-row items-center gap-x-3">
                        <CroupierImage
                          source={{
                            uri: company?.logo,
                          }}
                          className="w-[50px] h-[50px]"
                        />
                        <InterWrappedText text={company?.name ?? "-"} />
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>

                <View>
                  {(products?.length ?? 0) > 0 && (
                    <InterSemiboldText
                      text="PRODUCT"
                      className="text-text-neutral text-[12px] tracking-[1.6px] mb-5"
                    />
                  )}
                  <View className="flex gap-y-5">
                    {products?.map((product, idx) => {
                      return (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            router.push({
                              pathname: "/home/product-details/[id]",
                              params: {
                                id: product?.id ?? "",
                                fromSearch: "true",
                              },
                            })
                          }
                          key={idx}
                        >
                          <View className="bg-white px-3 py-3 flex flex-row gap-x-3 rounded-[12px]">
                            <View className="w-[88px] h-[88px] flex items-center justify-center bg-amber-light rounded-[5px]">
                              <CroupierImage
                                source={{
                                  uri: product?.media?.[0].file,
                                }}
                                className="w-[68px] h-[68px]"
                              />
                            </View>
                            <View className="flex-1">
                              <InterSemiboldText
                                text={product?.name ?? "-"}
                                numberOfLines={1}
                                className="text-base mb-2"
                              />
                              <View className="mb-2">
                                <InterWrappedText
                                  text={product?.description ?? "-"}
                                  className="text-text-neutral leading-6 text-base"
                                />
                              </View>

                              <InterSemiboldText
                                text={product?.company_name ?? "-"}
                                className="text-[12px] text-text-neutral mb-1"
                              />

                              <View className=" flex flex-row items-center">
                                <InterSemiboldText
                                  text={"0.0"}
                                  className="text-text-neutral text-[12px]"
                                />
                                <CroupierImage
                                  source={icons.star}
                                  className="w-[14px] h-[14px]"
                                />
                              </View>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
