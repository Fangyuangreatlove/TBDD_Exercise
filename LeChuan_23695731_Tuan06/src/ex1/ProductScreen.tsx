import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown: ColorKey = picked ?? phone.defaultColor;

  const handleBuy = () => {
    Alert.alert(
      "Đặt mua thành công",
      `Bạn đã chọn mua: ${phone.name}\nMàu sắc: ${PHONE_COLORS[shown].label.toUpperCase()}\nGiá: ${formatPrice(phone.price)}`,
      [{ text: "Đóng", style: "default" }]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* 1. Ảnh sản phẩm lớn */}
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* 2. Thông tin chi tiết */}
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} size={18} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.rowPrice}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.rowBadge}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.badgeHelp}>
            <Text style={styles.badgeHelpText}>?</Text>
          </View>
        </View>

        {/* TODO 1: Nút chọn màu */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrowIcon}>›</Text>
        </Pressable>
      </View>

      {/* TODO 2: Nút CHỌN MUA sát đáy */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.buyBtn} onPress={handleBuy}>
          <Text style={styles.buyText}>CHỌN MUA</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  imageWrap: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  image: {
    width: 200,
    height: 260,
  },
  info: {
    flex: 1,
    justifyContent: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  review: {
    fontSize: 14,
    color: colors.muted,
    marginLeft: 18,
  },
  rowPrice: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 24,
  },
  oldPrice: {
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  rowBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
    letterSpacing: 0.5,
  },
  badgeHelp: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  badgeHelpText: {
    fontSize: 11,
    color: colors.red,
    fontWeight: "bold",
    lineHeight: 13,
  },
  chooseBtn: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.46)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 4,
  },
  chooseText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  arrowIcon: {
    position: "absolute",
    right: 16,
    fontSize: 24,
    color: colors.text,
    fontWeight: "300",
  },
  bottomBar: {
    paddingBottom: 16,
    paddingTop: 8,
  },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buyText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
