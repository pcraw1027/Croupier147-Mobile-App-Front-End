import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import HomeActivityStatsCard from "@/components/pageComponent/Home/HomeActivityStatsCard";
import HomeAppbar from "@/components/pageComponent/Home/HomeAppbar";
import HomeHightlightCard from "@/components/pageComponent/Home/HomeHighlightCard";
import HomeScanCard from "@/components/pageComponent/Home/HomeScanCard";
import auth from "@/config/services/auth";
import landing, {
  IHomeMyScan,
  IHomeRecentScan,
  IHomeTopScan,
} from "@/config/services/landing";
import useStore from "@/config/store";
import { images } from "@/icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
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
  const [recentScans, setRecentScans] = useState<IHomeRecentScan[]>();
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

  const environment = useStore((state) => state.environment);

  useFocusEffect(
    useCallback(() => {
      getLandingMetrics();
      getUserProfile();
    }, [])
  );

  const getLandingMetrics = async () => {
    try {
      const response = await landing.metrics();

      setActivityStats(response.activity_stats);
      setMyScans(response.my_scans);
      setTopScans(response.top_scans);
      setRecentScans(response.recent_scans);
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

      <HomeAppbar username={username} showSandbox={environment.sandbox} />

      <ScrollView className="pt-5" contentContainerClassName="pb-[70px]">
        <View className="px-6">
          <InterSemiboldText text="Highlight" className="mb-5 text-[20px]" />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row px-6"
        >
          <HomeHightlightCard
            onPress={() => router.push("/home/highlights/article-one")}
            image={images.article01_1}
            title="The US wealth gap is large and growing, yet even worse for people of color"
            time="5"
            date="29 Jul, 2025"
          />
          <HomeHightlightCard
            onPress={() => router.push("/home/highlights/article-two")}
            image={images.highlight}
            title="Wealth Gap: Understanding the Growing Wealth Gap in the U.S"
            time="3"
            date="22 Oct, 2024"
          />
          <HomeHightlightCard
            onPress={() => router.push("/home/highlights/article-two")}
            image={images.highlight}
            title="Wealth Gap: Understanding the Growing Wealth Gap in the U.S"
            time="3"
            date="22 Oct, 2024"
          />
        </ScrollView>

        {(myScans?.length ?? 0) > 0 ? (
          <View className="px-6 flex flex-row items-center justify-between mb-5 mt-8">
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
        ) : null}

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row px-6"
        >
          {myScans?.map((scan, idx) => (
            <HomeScanCard
              key={idx}
              image={scan.product_data?.media?.[0]?.file?.url ?? ""}
              rating={
                Number(scan?.product_data?.product_variant?.avrg_rating) > 0
                  ? Number(
                      scan?.product_data?.product_variant?.avrg_rating
                    ).toFixed(1)
                  : "NR"
              }
              productId={
                scan?.product_data?.product_variant?.product_id?.toString() ??
                ""
              }
              className="bg-white border border-stroke"
            />
          ))}
        </ScrollView>

        <View className="px-6 flex flex-row items-center justify-between mb-5 mt-8">
          <InterSemiboldText text="Recent Scans" className="text-[20px]" />
          <TouchableWithoutFeedback
            onPress={() => router.push("/(root)/home/recent-scans")}
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
          className="flex flex-row px-6"
        >
          {recentScans?.map((scan, idx) => (
            <HomeScanCard
              key={idx}
              image={scan.media[0]?.file?.url}
              rating={
                Number(scan?.product_variant?.avrg_rating) > 0
                  ? Number(scan?.product_variant?.avrg_rating).toFixed(1)
                  : "NR"
              }
              productId={scan.product_variant.product_id?.toString() ?? ""}
              className="bg-white border border-stroke"
            />
          ))}
        </ScrollView>

        {/* <View className="px-6 flex flex-row items-center justify-between mb-5 mt-8">
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
          className="flex flex-row px-6"
        >
          {topScans?.map((scan, idx) => (
            <HomeScanCard
              key={idx}
              image={scan.media[0]?.file?.url}
              rating={
                Number(scan?.product_variant?.avrg_rating) > 0
                  ? Number(scan?.product_variant?.avrg_rating).toFixed(1)
                  : "NR"
              }
              productId={scan.product_variant.product_id?.toString() ?? ""}
              className="bg-white border border-stroke"
            />
          ))}
        </ScrollView> */}

        <View className="px-6 mt-8">
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
