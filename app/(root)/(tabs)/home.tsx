import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import HomeActivityStatsCard from "@/components/pageComponent/Home/HomeActivityStatsCard";
import HomeAppbar from "@/components/pageComponent/Home/HomeAppbar";
import HomeHightlightCard from "@/components/pageComponent/Home/HomeHighlightCard";
import HomeScanCard from "@/components/pageComponent/Home/HomeScanCard";
import auth from "@/config/services/auth";
import landing, { IHomeMyScan, IHomeTopScan } from "@/config/services/landing";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
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

const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [myScans, setMyScans] = useState<IHomeMyScan[]>();
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
    getUserProfile();
  }, []);

  const getLandingMetrics = async () => {
    try {
      const response = await landing.metrics();

      setActivityStats(response.activity_stats);
      setMyScans(response.my_scans);
      setTopScans(response.top_scans);
    } catch (error) {
      console.error("Error fetching landing metrics:", error);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await auth.userProfile();

      setUsername(response.user_profile.username);
    } catch (error) {
      console.error("Error fetching user profile:", error);
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
      <HomeAppbar username={username} />
      <ScrollView className="pt-5" contentContainerClassName="pb-[70px]">
        <View className="px-[25px]">
          <InterSemiboldText text="Highlight" className="mb-5 text-[20px]" />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row px-[25px] mb-8"
        >
          <HomeHightlightCard />
          <HomeHightlightCard />
          <HomeHightlightCard />
        </ScrollView>
        <View className="px-[25px] flex flex-row items-center justify-between mb-5">
          <InterSemiboldText text="My Scans" className="text-[20px]" />
          <TouchableWithoutFeedback
            onPress={() => router.push("/(root)/home/my-scans")}
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
          {myScans?.map((scan, idx) => (
            <HomeScanCard
              key={idx}
              image={{
                uri: scan.media[0]?.file?.url,
              }}
              rating={scan.product_variant?.avrg_rating?.toString() ?? "0"}
              productId={scan.product_variant.product_id?.toString() ?? ""}
              className={getRandomBg()}
            />
          ))}
        </ScrollView>

        <View className="px-[25px] flex flex-row items-center justify-between mb-5">
          <InterSemiboldText text="Top Scans" className="text-[20px]" />
          <TouchableWithoutFeedback
            onPress={() => router.push("/(root)/home/top-scans")}
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
            <HomeScanCard
              key={idx}
              image={{
                uri: scan.media[0]?.file?.url,
              }}
              rating={scan.product_variant?.avrg_rating?.toString() ?? "0"}
              productId={scan.product_variant.product_id?.toString() ?? ""}
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
            <HomeActivityStatsCard key={idx} activityStats={stat} />
          ))}
        </View>
      </ScrollView>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default Home;
