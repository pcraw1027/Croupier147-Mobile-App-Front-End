import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InitailScreenScanCard from "@/components/pageComponent/InitialScreen/InitailScreenScanCard";
import InitialScreenActivityStatsCard from "@/components/pageComponent/InitialScreen/InitialScreenActivityStatsCard";
import InitialScreenAppBar from "@/components/pageComponent/InitialScreen/InitialScreenAppBar";
import InitialScreenHighlightCard from "@/components/pageComponent/InitialScreen/InitialScreenHighlightCard";
import landing, { IHomeTopScan } from "@/config/services/landing";
import { icons } from "@/icons";
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
    <SafeAreaView className="bg-white">
      <InitialScreenAppBar />
      <ScrollView className="pt-5" contentContainerClassName="pb-[120px]">
        <View className="px-[25px]">
          <InterSemiboldText text="Highlight" className="mb-5 text-[20px]" />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row px-[25px] mb-8"
        >
          <InitialScreenHighlightCard />
          <InitialScreenHighlightCard />
          <InitialScreenHighlightCard />
        </ScrollView>
        <View className="px-[25px] flex flex-row items-center justify-between mb-5">
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

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row px-[25px] mb-8"
        >
          {topScans?.map((scan, idx) => (
            <InitailScreenScanCard
              key={idx}
              image={{
                uri: scan.media[0]?.file?.url,
              }}
              rating={
                Number(scan?.product_variant?.avrg_rating).toFixed(1) ?? "0"
              }
              className={getRandomBg()}
            />
          ))}
        </ScrollView>

        <View className="px-[25px]">
          <InterSemiboldText
            text="Activity Stats"
            className="text-[20px] mb-5"
          />

          {activityStats.map((stat, idx) => (
            <InitialScreenActivityStatsCard key={idx} activityStats={stat} />
          ))}
        </View>
      </ScrollView>

      <View className="fixed bottom-[120px] left-0 right-0 bg-white px-[28px] h-[100px] border-t border-stroke w-full flex flex-row items-center justify-between">
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
