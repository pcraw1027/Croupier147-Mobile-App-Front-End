import React from "react";
import { Text } from "react-native";

declare interface TextProps {
  text: string;
  className?: string;
  numberOfLines?: number;
}

const InterSemiboldText = ({
  text,
  numberOfLines,
  className = "text-pry",
}: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "InterSemiBold",
      }}
      className={className}
      numberOfLines={numberOfLines}
    >
      {text}
    </Text>
  );
};

export default InterSemiboldText;
