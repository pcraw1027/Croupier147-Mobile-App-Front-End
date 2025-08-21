import React from "react";
import { Text } from "react-native";

declare interface TextProps {
  text: string;
  className?: string;
  numberOfLines?: number;
}

const InterBoldText = ({
  text,
  numberOfLines,
  className = "text-pry",
}: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "InterBold",
      }}
      allowFontScaling={false}
      className={className}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};

export default InterBoldText;
