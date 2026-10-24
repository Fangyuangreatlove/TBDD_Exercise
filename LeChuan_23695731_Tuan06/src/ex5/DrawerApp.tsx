import React, { useState, createContext, useContext } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  NavigationIndependentTree,
  NavigationContainer,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// Context để chia sẻ trạng thái Dark Mode & Thông báo cho toàn bộ Drawer App
interface SettingsContextType {
  notify: boolean;
  setNotify: (val: boolean) => void;
  dark: boolean;
  setDark: (val: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  notify: true,
  setNotify: () => {},
  dark: false,
  setDark: () => {},
});

function HomeScreen() {
  const { dark } = useContext(SettingsContext);
  return (
    <SafeAreaView
      style={[
        styles.center,
        { backgroundColor: dark ? "#121212" : colors.bg },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: dark ? "#1E1E1E" : "#ffffff" },
        ]}
      >
        <Text style={styles.emoji}>👋</Text>
        <Text
          style={[styles.big, { color: dark ? "#ffffff" : colors.text }]}
        >
          Xin chào quý khách!
        </Text>
        <Text
          style={[styles.subtitle, { color: dark ? "#AAAAAA" : colors.muted }]}
        >
          Chào mừng bạn đến với ứng dụng Lab 06 Drawer Navigation.
        </Text>
        <Text
          style={[styles.hintNote, { color: dark ? "#888888" : colors.muted }]}
        >
          Vuốt từ cạnh trái hoặc bấm biểu tượng ☰ trên thanh tiêu đề để mở menu ngăn kéo.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  const { dark } = useContext(SettingsContext);
  return (
    <SafeAreaView
      style={[
        styles.center,
        { backgroundColor: dark ? "#121212" : colors.bg },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: dark ? "#1E1E1E" : "#ffffff" },
        ]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>LC</Text>
        </View>
        <Text
          style={[styles.name, { color: dark ? "#ffffff" : colors.text }]}
        >
          Lê Chuẩn
        </Text>
        <Text style={styles.mssvBadge}>MSSV: 23695731</Text>
        <Text
          style={[styles.email, { color: dark ? "#AAAAAA" : colors.muted }]}
        >
          chuan.le@student.iuh.edu.vn
        </Text>

        <View
          style={[
            styles.divider,
            { backgroundColor: dark ? "#333333" : colors.line },
          ]}
        />

        <View style={styles.profileItem}>
          <Ionicons name="school-outline" size={20} color={colors.red} />
          <Text
            style={[
              styles.itemText,
              { color: dark ? "#E0E0E0" : colors.text },
            ]}
          >
            Lớp: DHKTPM19B - Đại học Công nghiệp TP.HCM
          </Text>
        </View>
        <View style={styles.profileItem}>
          <Ionicons name="phone-portrait-outline" size={20} color={colors.red} />
          <Text
            style={[
              styles.itemText,
              { color: dark ? "#E0E0E0" : colors.text },
            ]}
          >
            Chuyên đề: Thiết bị di động (Lab 06 - Navigation)
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useContext(SettingsContext);

  return (
    <SafeAreaView
      style={[
        styles.center,
        { backgroundColor: dark ? "#121212" : colors.bg },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: dark ? "#1E1E1E" : "#ffffff" },
        ]}
      >
        <Text
          style={[styles.sectionTitle, { color: dark ? "#ffffff" : colors.text }]}
        >
          Cấu hình ứng dụng
        </Text>

        {/* Dòng 1: Thông báo */}
        <View style={styles.switchRow}>
          <View style={styles.switchLabelRow}>
            <Ionicons
              name={notify ? "notifications" : "notifications-off-outline"}
              size={22}
              color={notify ? colors.red : colors.muted}
            />
            <Text
              style={[
                styles.switchLabel,
                { color: dark ? "#ffffff" : colors.text },
              ]}
            >
              Nhận thông báo
            </Text>
          </View>
          <Switch
            value={notify}
            onValueChange={setNotify}
            trackColor={{ false: "#767577", true: "#FF8A80" }}
            thumbColor={notify ? colors.red : "#f4f3f4"}
          />
        </View>

        {/* Dòng 2: Chế độ tối */}
        <View style={styles.switchRow}>
          <View style={styles.switchLabelRow}>
            <Ionicons
              name={dark ? "moon" : "sunny-outline"}
              size={22}
              color={dark ? "#F5C518" : colors.muted}
            />
            <Text
              style={[
                styles.switchLabel,
                { color: dark ? "#ffffff" : colors.text },
              ]}
            >
              Giao diện tối (Dark Mode)
            </Text>
          </View>
          <Switch
            value={dark}
            onValueChange={setDark}
            trackColor={{ false: "#767577", true: "#4F63C8" }}
            thumbColor={dark ? "#2A4494" : "#f4f3f4"}
          />
        </View>

        {/* Dòng trạng thái tổng hợp */}
        <View
          style={[
            styles.statusBox,
            { backgroundColor: dark ? "#2A2A2A" : "#F4F5F7" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: dark ? "#E0E0E0" : colors.text },
            ]}
          >
            Thông báo:{" "}
            <Text style={{ fontWeight: "bold", color: notify ? "#0E8A16" : colors.red }}>
              {notify ? "BẬT" : "TẮT"}
            </Text>
            {"  ·  "}
            Giao diện:{" "}
            <Text style={{ fontWeight: "bold", color: dark ? "#F5C518" : "#2A4494" }}>
              {dark ? "TỐI" : "SÁNG"}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <SettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={({ route }) => ({
              headerStyle: {
                backgroundColor: dark ? "#1E1E1E" : "#ffffff",
              },
              headerTintColor: dark ? "#ffffff" : colors.text,
              drawerActiveTintColor: colors.red,
              drawerInactiveTintColor: dark ? "#AAAAAA" : colors.text,
              drawerStyle: {
                backgroundColor: dark ? "#1E1E1E" : "#ffffff",
                width: 280,
              },
              drawerIcon: ({ color, size, focused }) => {
                let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings" : "settings-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Trang chủ" }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Hồ sơ cá nhân" }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Cài đặt" }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </SettingsContext.Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  emoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  big: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
  },
  hintNote: {
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 18,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mssvBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 14,
  },
  divider: {
    width: "100%",
    height: 1,
    marginVertical: 14,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 6,
    gap: 10,
  },
  itemText: {
    fontSize: 14,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  switchLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusBox: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    marginTop: 22,
    alignItems: "center",
  },
  statusText: {
    fontSize: 15,
  },
});
