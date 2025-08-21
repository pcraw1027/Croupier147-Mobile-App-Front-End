import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InitailScreenScanCard from "@/components/pageComponent/InitialScreen/InitailScreenScanCard";
import InitialScreenActivityStatsCard from "@/components/pageComponent/InitialScreen/InitialScreenActivityStatsCard";
import InitialScreenAppBar from "@/components/pageComponent/InitialScreen/InitialScreenAppBar";
import InitialScreenHighlightCard from "@/components/pageComponent/InitialScreen/InitialScreenHighlightCard";
import landing, { IHomeTopScan } from "@/config/services/landing";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const bgColors = [
  "bg-blue-light",
  "bg-green-light",
  "bg-red-light",
  "bg-purple-light",
  "bg-amber-light",
];

export default function InitialScreen() {
  const router = useRouter();

  const [topScans, setTopScans] = useState<IHomeTopScan[]>();
  const [activityStats, setActivityStats] = useState([
    {
      type: "scan",
      currentMonth: "0",
      overall: "0",
    },
    {
      type: "upload",
      currentMonth: "0",
      overall: "0",
    },
    {
      type: "product",
      currentMonth: "0",
      overall: "0",
    },
    {
      type: "company",
      currentMonth: "0",
      overall: "0",
    },
  ]);

  useEffect(() => {
    getLandingMetrics();
  }, []);

  const getLandingMetrics = async () => {
    try {
      const response = await landing.openMetrics();

      setActivityStats(response.activity_stats);
      setTopScans(response.top_scans);
    } catch (error) {
      console.error("Error fetching landing metrics:", error);
    }
  };

  const getRandomBg = () =>
    bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <SafeAreaView className="bg-white h-screen relative">
      <InitialScreenAppBar />
      <ScrollView className="pt-5" contentContainerClassName="pb-[90px]">
        <View className="px-[25px]">
          <InterSemiboldText text="Highlight" className="mb-5 text-[20px]" />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row px-[25px]"
        >
          <InitialScreenHighlightCard
            image={images.article01_1}
            title="The US wealth gap is large and growing, yet even worse for people of color"
            time="5"
            date="29 Jul, 2025"
          />
          <InitialScreenHighlightCard
            image={images.highlight}
            title="Wealth Gap: Understanding the Growing Wealth Gap in the U.S"
            time="3"
            date="22 Oct, 2024"
          />
          <InitialScreenHighlightCard
            image={images.highlight}
            title="Wealth Gap: Understanding the Growing Wealth Gap in the U.S"
            time="3"
            date="22 Oct, 2024"
          />
        </ScrollView>
        {(topScans?.length ?? 0) > 0 ? (
          <View className="px-[25px] flex flex-row items-center justify-between mb-5 mt-8">
            <InterSemiboldText text="Top Scans" className="text-[20px]" />
            <TouchableWithoutFeedback
              onPress={() => router.replace("/(auth)/sign-in")}
            >
              <View>
                <InterSemiboldText
                  text="See all"
                  className="text-[16px] text-accent-2"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : null}

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row px-[25px]"
        >
          {topScans?.map((scan, idx) => (
            <InitailScreenScanCard
              key={idx}
              image={{
                uri: scan.media[0]?.file?.url,
              }}
              rating={
                Number(scan?.product_variant?.avrg_rating) > 0
                  ? Number(scan?.product_variant?.avrg_rating).toFixed(1)
                  : "NR"
              }
              className="bg-white border border-stroke"
            />
          ))}
        </ScrollView>

        <View className="px-[25px] mt-8">
          <InterSemiboldText
            text="Activity Stats"
            className="text-[20px] mb-5"
          />

          {activityStats.map((stat, idx) => (
            <InitialScreenActivityStatsCard key={idx} activityStats={stat} />
          ))}
        </View>
      </ScrollView>
      {/* ${
          Dimensions.get("window").height > 870
            ? "bottom-[13%]"
            : "bottom-[15%]"
        } */}
      <View
        className={`absolute bottom-0 left-0 right-0 bg-white px-[28px] h-[80px] border-t border-stroke w-full flex flex-row items-center justify-between`}
      >
        <View className="flex items-center">
          <CroupierImage
            source={icons.homeActive}
            className="w-[24px] h-[24px] mb-1"
          />
          <InterSemiboldText text="Home" className="text-accent-2" />
        </View>
        <TouchableWithoutFeedback
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <View className="flex items-center">
            <CroupierImage
              source={icons.scanInactive}
              className="w-[24px] h-[24px] mb-1"
            />
            <InterSemiboldText text="Scan" className="text-text-muted" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <View className="flex items-center">
            <CroupierImage
              source={icons.searchInactive}
              className="w-[24px] h-[24px] mb-1"
            />
            <InterSemiboldText text="Search" className="text-text-muted" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <View className="flex items-center">
            <CroupierImage
              source={icons.profileInactive}
              className="w-[24px] h-[24px] mb-1"
            />
            <InterSemiboldText text="Profile" className="text-text-muted" />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
