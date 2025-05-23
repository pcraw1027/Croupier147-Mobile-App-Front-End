import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import scan from "@/config/services/scan";
import useStore from "@/config/store";
import { icons, images } from "@/icons";
import logger from "@/logger.config";
import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SCAN_BOX_SIZE = 250;
const scanBoxTop = (height - SCAN_BOX_SIZE) / 2;
const scanBoxLeft = (width - SCAN_BOX_SIZE) / 2;

const Scan = () => {
  const isFocused = useIsFocused();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [showNoMatchFound, setShowNoMatchFound] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const isPermissionGranted = Boolean(permission?.granted);

  const upload = useStore((state) => state.upload);
  const setUpload = useStore((state) => state.setUpload);

  useEffect(() => {
    if (!isPermissionGranted) {
      requestPermission();
    }

    setCode("");
    setLoading(false);
    setShowNoMatchFound(false);
    setHasScanned(false);
  }, [isFocused]);

  const handleScan = async (data: any) => {
    if (hasScanned) return;

    setHasScanned(true);
    try {
      setLoading(true);
      setCode(data);
      const body = {
        scan: {
          barcode: data,
        },
      };
      const response = await scan.scanProduct(body);

      if (response?.scan?.product_exists == false) {
        setShowNoMatchFound(true);
        setUpload({ ...upload, scanId: response?.scan?.id, barcode: data });
      } else {
        router.replace(`/(root)/home/product-details/${response?.product?.id}`);
      }
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

  if (!isPermissionGranted) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center px-6">
        <InterSemiboldText
          text="Camera permission is required to use this feature. You denied the permission request. Please enable it in your device settings."
          className="text-pry text-2xl text-center"
        />
      </SafeAreaView>
    );
  }

  return (
    <>
      {showNoMatchFound == false ? (
        <SafeAreaView
          style={StyleSheet.absoluteFillObject}
          className="flex-1 justify-center items-center"
        >
          {Platform.OS === "android" ? <StatusBar hidden /> : null}
          {isFocused && (
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: [
                  "qr",
                  "ean13",
                  "ean8",
                  "upc_a",
                  "upc_e",
                  "code39",
                  "code93",
                  "code128",
                  "pdf417",
                  "aztec",
                  "datamatrix",
                ],
              }}
              onBarcodeScanned={({ type, data }) => {
                if (!hasScanned) {
                  handleScan(data);
                }
              }}
            />
          )}

          <View className="absolute top-0 left-0 right-0 bottom-0">
            {/* Top */}
            <View
              style={{ height: scanBoxTop }}
              className="w-full bg-black50"
            />

            {/* Center */}
            <View className="flex-row">
              <View
                style={{ width: scanBoxLeft, height: SCAN_BOX_SIZE }}
                className="bg-black50"
              />
              <View
                style={{ width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE }}
                className="bg-transparent border-2 border-white rounded-3xl flex items-center justify-center"
              >
                {loading && <ActivityIndicator color="#000000" size="large" />}
              </View>
              <View
                style={{ width: scanBoxLeft, height: SCAN_BOX_SIZE }}
                className="bg-black50"
              />
            </View>

            {/* Bottom */}
            <View
              style={{ height: scanBoxTop }}
              className="w-full bg-black50"
            />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={StyleSheet.absoluteFillObject}
          className="bg-white-alt px-6"
        >
          <View className="flex items-center justify-center mt-5 mb-5">
            <View className="flex flex-row items-center justify-between bg-white min-w-[17.5rem] px-6 py-4 rounded-[8px] mb-10">
              <View className="mr-5">
                <InterSemiboldText
                  text="BARCODE"
                  className="text-[10px] text-text-neutral tracking-wider"
                />
                <InterSemiboldText text={code} className="text-[18px]" />
              </View>
              <CroupierImage source={images.barcode} className="w-11 h-8" />
            </View>

            <CroupierImage
              source={images.scanIllustration}
              className="w-[200px] h-[172px] mb-5"
            />
          </View>

          <InterSemiboldText
            text="No match found"
            className="text-[20px] text-center mb-2"
          />

          <InterSemiboldText
            text="Help us grow our database by uploading this product in 2 simple steps"
            className="text-[16px] text-text-neutral mb-5 leading-[20px]"
          />

          <View className="flex flex-row items-center mb-4">
            <View className="w-5 h-5 bg-green-light rounded-full flex items-center justify-center mr-2">
              <InterSemiboldText
                text="1"
                className="text-accent-2 text-[14px]"
              />
            </View>

            <InterSemiboldText
              text="Take a picture of product’s front label"
              className="text-[16px] text-text-neutral"
            />
          </View>

          <View className="flex flex-row items-center mb-6">
            <View className="w-5 h-5 bg-green-light rounded-full flex items-center justify-center mr-2">
              <InterSemiboldText
                text="2"
                className="text-accent-2 text-[14px]"
              />
            </View>

            <InterSemiboldText
              text="Provide us with the Product and Company name"
              className="text-[16px] text-text-neutral"
            />
          </View>

          <CustomButton
            title="Upload this product"
            className="mb-10"
            onPress={() => router.push("/(root)/scan/upload-product-one")}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              setCode("");
              setLoading(false);
              setShowNoMatchFound(false);
              setHasScanned(false);
            }}
          >
            <View className="flex flex-row items-center justify-center">
              <CroupierImage
                source={icons.scanActive}
                className="w-9 h-9 mr-3"
              />
              <InterSemiboldText
                text="Continue Scanning"
                className="text-accent-2 text-base"
              />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      )}
    </>
  );
};

export default Scan;
