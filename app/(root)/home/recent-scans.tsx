import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import ProductScanCard from "@/components/pageComponent/Home/ProductScanCard";
import scan, { IRecentScan } from "@/config/services/scan";
import { icons } from "@/icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  TouchableOpacity,
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

const getRandomBg = () => bgColors[Math.floor(Math.random() * bgColors.length)];

const RecentScans = () => {
  const router = useRouter();
  const [recentScans, setRecentScans] = useState<IRecentScan[]>();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageLimit: 20,
    hasMore: true,
  });

  const { page, pageLimit, hasMore } = pagination;

  useEffect(() => {
    getRecentScans(1, true);
  }, []);

  const getRecentScans = async (pageNum = 1, initial = false) => {
    if (loading || loadingMore) return;

    pageNum === 1 ? setLoading(true) : setLoadingMore(true);

    try {
      const response = await scan.recentScans({ page: pageNum, pageLimit });
      const records = response.records || [];

      setRecentScans((prev) =>
        initial ? records : [...(prev ?? []), ...records]
      );

      console.log(records.length, pageLimit);

      // update pagination state
      setPagination((prev) => ({
        ...prev,
        page: pageNum,
        hasMore: records.length === pageLimit, // if fewer records, stop loading
      }));
    } catch (error) {
      console.error("Error fetching scans:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      getRecentScans(page + 1);
    }
  };

  return (
    <SafeAreaView className="bg-white-alt">
      <View className="bg-white-alt flex flex-col h-screen px-5">
        <View className="flex flex-row items-center justify-between my-3 ">
          <TouchableOpacity onPress={() => router.back()}>
            <CroupierImage
              source={icons.backIcon}
              className="w-[40px] h-[40px]"
            />
          </TouchableOpacity>

          <InterBoldText text="Recent Scans" className="text-pry text-2xl" />

          <View className="w-[20px]" />
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={recentScans}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <ProductScanCard
                title={item?.product_variant?.product_name ?? ""}
                company={item?.product_variant?.company_name ?? "-"}
                image={item?.media[0]?.file?.url}
                rating={item.product_variant?.avrg_rating?.toString() ?? "0"}
                scanCount={item.scan_count?.toString() ?? "0"}
                productId={item.product_variant?.product_id?.toString()}
                className="bg-white"
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <View className="py-4">
                  <ActivityIndicator size="small" />
                </View>
              ) : null
            }
          />
        )}
      </View>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default RecentScans;
