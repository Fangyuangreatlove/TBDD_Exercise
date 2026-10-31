import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function LoadingView({ label, message }: { label?: string; message?: string }) {
  const text = label || message || "Đang tải…";
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={colors.indigo} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 24 },
  text: { color: colors.muted },
});
