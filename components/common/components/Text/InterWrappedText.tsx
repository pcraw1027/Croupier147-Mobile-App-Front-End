import React from "react";
import { Text } from "react-native";

declare interface TextProps {
  text: string;
  className?: string;
}

const InterWrappedText = ({ text, className = "text-pry" }: TextProps) => {
  const formattedText = text.replace(/\.{3}\s*/g, "\n");

  const parts = formattedText.split(/(\*[^*]+\*)/);

  return (
    <Text
      className={className}
      style={{ fontFamily: "InterRegular", flexWrap: "wrap" }}
    >
      {parts.map((part, index) => {
        const isBold = part.startsWith("*") && part.endsWith("*");
        const content = isBold ? part.slice(1, -1) : part;

        return (
          <Text
            key={index}
            allowFontScaling={false}
            style={{
              fontFamily: isBold ? "InterBold" : "InterRegular",
              color: isBold ? "#31332E" : "#7D8277",
            }}
          >
            {content}
          </Text>
        );
      })}
    </Text>
  );
};

export default InterWrappedText;
