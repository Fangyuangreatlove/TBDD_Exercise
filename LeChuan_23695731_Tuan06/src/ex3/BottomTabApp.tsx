import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  NavigationIndependentTree,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

// 1. Home Tab
function HomeTab() {
  return (
    <SafeAreaView style={styles.tabContainer}>
      <FlatList
        data={PHONES}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={PHONE_COLORS[item.defaultColor].image}
              style={styles.cardThumb}
              resizeMode="contain"
            />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={styles.starsRow}>
                <Stars value={item.rating} size={14} />
                <Text style={styles.reviewSmall}>({item.reviewCount})</Text>
              </View>
              <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
              <Text style={styles.supplierText}>Cung cấp bởi: {item.supplier}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// 2. Search Tab (TODO 1)
function SearchTab() {
  const [keyword, setKeyword] = useState("");

  const filteredPhones = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.tabContainer}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Nhập tên sản phẩm (ví dụ: Joy, Live, Aris)..."
            placeholderTextColor={colors.muted}
            style={styles.input}
            clearButtonMode="while-editing"
          />
          {keyword.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.muted}
              onPress={() => setKeyword("")}
            />
          )}
        </View>
      </View>

      {filteredPhones.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.muted} />
          <Text style={styles.emptyText}>
            Không có kết quả nào cho "{keyword}"
          </Text>
          <Text style={styles.emptySubText}>
            Vui lòng thử tìm kiếm bằng từ khóa khác
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPhones}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={PHONE_COLORS[item.defaultColor].image}
                style={styles.cardThumb}
                resizeMode="contain"
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
                <Text style={styles.supplierText}>Đánh giá: {item.rating} ★ ({item.reviewCount} lượt)</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// 3. Profile Tab (TODO 2)
function ProfileTab() {
  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>LC</Text>
        </View>
        <Text style={styles.profileName}>Lê Chuẩn</Text>
        <Text style={styles.profileMssv}>MSSV: 23695731</Text>
        <Text style={styles.profileEmail}>chuan.le@student.iuh.edu.vn</Text>

        <View style={styles.infoDivider} />

        <View style={styles.profileRow}>
          <Ionicons name="school-outline" size={20} color={colors.red} />
          <Text style={styles.infoLabel}>Lớp:</Text>
          <Text style={styles.infoValue}>DHKTPM19B - Khoa CNTT</Text>
        </View>

        <View style={styles.profileRow}>
          <Ionicons name="book-outline" size={20} color={colors.red} />
          <Text style={styles.infoLabel}>Môn học:</Text>
          <Text style={styles.infoValue}>Phát triển ứng dụng TBDD</Text>
        </View>

        <View style={styles.profileRow}>
          <Ionicons name="business-outline" size={20} color={colors.red} />
          <Text style={styles.infoLabel}>Trường:</Text>
          <Text style={styles.infoValue}>Đại học Công nghiệp TP.HCM</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// TODO 3: BottomTabApp
export function BottomTabApp() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: true,
            headerTitleAlign: "center",
            tabBarActiveTintColor: colors.red,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 6,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
            tabBarIcon: ({ focused, color, size }) => {
              const iconNames = ICONS[route.name];
              const iconName = focused ? iconNames[0] : iconNames[1];
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeTab}
            options={{ title: "Trang chủ" }}
          />
          <Tab.Screen
            name="Search"
            component={SearchTab}
            options={{ title: "Tìm kiếm" }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileTab}
            options={{ title: "Cá nhân" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardThumb: {
    width: 70,
    height: 90,
    marginRight: 14,
  },
  cardDetails: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewSmall: {
    fontSize: 12,
    color: colors.muted,
    marginLeft: 6,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 2,
  },
  supplierText: {
    fontSize: 12,
    color: colors.muted,
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: colors.text,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 12,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 6,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  profileMssv: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.red,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.muted,
  },
  infoDivider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 8,
    marginRight: 6,
  },
  infoValue: {
    fontSize: 14,
    color: colors.muted,
    flex: 1,
  },
});
