import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import HomeHightlightCard from "@/components/pageComponent/Home/HomeHighlightCard";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CompanyProfilePage = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white">
      <View className="flex flex-row items-center justify-between mb-3 px-5">
        <TouchableOpacity onPress={() => router.back()}>
          <CroupierImage
            source={icons.backIcon}
            className="w-[40px] h-[40px]"
          />
        </TouchableOpacity>

        <InterSemiboldText
          text="Company Information"
          className="text-pry text-2xl"
        />

        <View className="w-[20px]" />
      </View>
      <View className="bg-white flex flex-col h-screen">
        <ScrollView
          contentContainerClassName="pb-[150px]"
          showsVerticalScrollIndicator={false}
        >
          <View className="pl-6 pr-4 flex flex-row items-center justify-between mb-2">
            <View className="">
              <InterSemiboldText text="L'Oréal" className="text-pry text-2xl" />
              <InterSemiboldText
                text="Cosmetics, Beauty Brands"
                className="text-text-neutral text-base"
              />
            </View>

            <CroupierImage
              source={images.croupierScore80}
              className="w-20 h-20"
            />
          </View>

          <View className="px-6 mb-5">
            <View className="flex flex-row items-center mb-2">
              <View className="w-[11.25rem] h-[11.25rem] flex items-center justify-center bg-white-alt rounded-[8px] mr-[16px]">
                <CroupierImage
                  source={images.lorelGroup}
                  className="w-[8rem] h-[11.25rem]"
                />
              </View>

              <View>
                <View className="mb-6">
                  <InterSemiboldText
                    text="SEARCHES"
                    className="text-xs text-text-neutral mb-1"
                  />
                  <InterSemiboldText text="62" className="text-base" />
                </View>

                <View className="mb-6">
                  <InterSemiboldText
                    text="COMPANY CEO"
                    className="text-xs text-text-neutral mb-1"
                  />
                  <InterSemiboldText
                    text="Nicolas Hieronimus"
                    className="text-base"
                  />
                </View>

                <View>
                  <InterSemiboldText
                    text="PARENT COMPANY"
                    className="text-xs text-text-neutral mb-1"
                  />
                  <InterSemiboldText text="N/A" className="text-base" />
                </View>
              </View>
            </View>
          </View>

          <View className="mb-5">
            <View className="px-6">
              <InterSemiboldText
                text="SUBSIDIARIES / BRANDS"
                className="text-sm text-text-neutral tracking-wider"
              />
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex flex-row px-[25px]"
            >
              <View className="mr-5">
                <CroupierImage
                  source={images.ceraveBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="CeraVe"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.garnierBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Garnier"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.kihelsBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Kihel's"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.lancomeBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Lancome"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.maybeBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Maybe Line"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.ceraveBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="CeraVe"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.garnierBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Garnier"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.kihelsBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Kihel's"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.lancomeBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Lancome"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
              <View className="mr-5">
                <CroupierImage
                  source={images.maybeBrand}
                  className="w-16 h-16"
                />
                <InterSemiboldText
                  text="Maybe Line"
                  className="text-sm text-accent-2 text-center"
                />
              </View>
            </ScrollView>
          </View>

          <View className="px-6 mb-5">
            <InterSemiboldText
              text="Company Ratings"
              className="text-lg mb-1"
            />
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <InterSemiboldText
                  text="4.5"
                  className="text-base text-accent-2 mr-1"
                />
                <View className="flex flex-row items-center mr-1">
                  {[1, 2, 3, 4].map((star) => (
                    <CroupierImage
                      key={star}
                      source={icons.star}
                      className="w-[20px] h-[20px]"
                    />
                  ))}
                </View>
                <InterSemiboldText
                  text="(32)"
                  className="text-base text-text-neutral"
                />
              </View>

              <InterSemiboldText
                text="Reviews(26)"
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

          <View className="px-6 mb-5">
            <View className="flex flex-row items-center mb-3">
              <InterSemiboldText text="Quick Links" className="text-lg mr-3" />
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
    </SafeAreaView>
  );
};

export default CompanyProfilePage;
