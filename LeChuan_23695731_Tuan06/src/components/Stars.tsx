import React from "react";
import { Text } from "react-native";
import { colors } from "../theme";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <Text style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
      {"★".repeat(Math.max(0, Math.min(5, value)))}
      <Text style={{ color: colors.line }}>
        {"★".repeat(Math.max(0, 5 - value))}
      </Text>
    </Text>
  );
}
