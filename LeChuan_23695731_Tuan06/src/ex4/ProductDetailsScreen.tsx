import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootProps } from "./types";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";

export function ProductDetailsScreen({
  route,
  navigation,
}: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Ionicons name="alert-circle-outline" size={60} color={colors.red} />
        <Text style={styles.notFoundTitle}>
          Không tìm thấy sản phẩm #{id}
        </Text>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Quay lại danh sách</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const isFav = has(phone.id);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Ảnh sản phẩm lớn */}
        <View style={styles.imageWrap}>
          <Image
            source={PHONE_COLORS[phone.defaultColor].image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Thông tin chi tiết */}
        <View style={styles.detailsBox}>
          <Text style={styles.name}>{phone.name}</Text>

          <View style={styles.ratingRow}>
            <Stars value={phone.rating} size={18} />
            <Text style={styles.reviewText}>
              (Xem {phone.reviewCount} đánh giá từ khách hàng)
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            {phone.oldPrice > phone.price && (
              <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
            )}
          </View>

          <View style={styles.supplierCard}>
            <Ionicons name="shield-checkmark" size={20} color="#2A4494" />
            <Text style={styles.supplierText}>
              Cung cấp bởi: <Text style={styles.bold}>{phone.supplier}</Text>
            </Text>
          </View>

          <View style={styles.badgeBox}>
            <Text style={styles.badgeText}>{phone.badge}</Text>
          </View>

          {/* Nút lưu vào yêu thích */}
          <Pressable
            style={[styles.favBtn, isFav && styles.favBtnActive]}
            onPress={() => toggle(phone.id)}
          >
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={22}
              color={isFav ? "#ffffff" : colors.red}
            />
            <Text style={[styles.favText, isFav && styles.favTextActive]}>
              {isFav ? "♥ Đã lưu vào yêu thích" : "♡ Lưu vào yêu thích"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Thanh nút bấm đáy */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.buyBtn}
          onPress={() => alert(`Đặt mua thành công sản phẩm: ${phone.name}`)}
        >
          <Text style={styles.buyBtnText}>CHỌN MUA NGAY</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  imageWrap: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsBox: {
    marginTop: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 13,
    color: colors.muted,
    marginLeft: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.red,
    marginRight: 16,
  },
  oldPrice: {
    fontSize: 16,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  supplierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  supplierText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  badgeBox: {
    backgroundColor: "#FFF2F0",
    borderWidth: 1,
    borderColor: "#FFCCC7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
  },
  favBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.red,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    gap: 8,
  },
  favBtnActive: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  favText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  favTextActive: {
    color: "#ffffff",
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: "#ffffff",
  },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 16,
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  backBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
