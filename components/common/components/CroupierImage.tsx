import React from "react";
import { Image, ImageResizeMode, ImageSourcePropType } from "react-native";

declare interface ImageProps {
  source: ImageSourcePropType;
  alt?: string;
  resizeMode?: ImageResizeMode;
  className?: string;
}

const CroupierImage = ({
  source,
  alt,
  className,
  resizeMode = "contain",
}: ImageProps) => {
  return (
    <Image
      source={source}
      alt={alt ?? "croupier-image"}
      className={className}
      resizeMode={resizeMode}
    />
  );
};

export default CroupierImage;
