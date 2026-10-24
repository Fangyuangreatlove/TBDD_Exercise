import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

type ExerciseKey = "bai1" | "bai2" | "bai3" | "bai4" | "bai5";

export default function App() {
  const [activeTab, setActiveTab] = useState<ExerciseKey>("bai1");

  const tabs: { key: ExerciseKey; label: string; sub: string }[] = [
    { key: "bai1", label: "Bài 1", sub: "Select Phone" },
    { key: "bai2", label: "Bài 2", sub: "Gắn API" },
    { key: "bai3", label: "Bài 3", sub: "Bottom Tab" },
    { key: "bai4", label: "Bài 4", sub: "Stack + Tab" },
    { key: "bai5", label: "Bài 5", sub: "Drawer" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header sinh viên */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.headerTitle}>LAB 06 · NAVIGATION</Text>
          <Text style={styles.studentInfo}>
            SV: Lê Chuẩn · MSSV: 23695731 · Lớp DHKTPM19B
          </Text>
        </View>
      </View>

      {/* Thanh chọn bài tập 1 -> 5 */}
      <View style={styles.tabBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    isActive && styles.tabButtonTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
                <Text
                  style={[styles.tabSubText, isActive && styles.tabSubTextActive]}
                >
                  {tab.sub}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Nội dung bài tập tương ứng */}
      <View style={styles.contentArea}>
        {activeTab === "bai1" && <SelectPhoneApp phone={PHONES[0]} />}
        {activeTab === "bai2" && <SelectPhoneApi />}
        {activeTab === "bai3" && <BottomTabApp />}
        {activeTab === "bai4" && <StackTabApp />}
        {activeTab === "bai5" && <DrawerApp />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.red,
    letterSpacing: 0.5,
  },
  studentInfo: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  tabBarWrapper: {
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: colors.red,
    borderColor: colors.red,
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.text,
  },
  tabButtonTextActive: {
    color: "#ffffff",
  },
  tabSubText: {
    fontSize: 10,
    color: colors.muted,
    marginTop: 1,
  },
  tabSubTextActive: {
    color: "#ffffff",
    fontWeight: "500",
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
