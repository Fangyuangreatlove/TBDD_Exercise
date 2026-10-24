import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabProps } from "./types";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids, toggle } = useFavorites();
  const favoritePhones = PHONES.filter((p) => ids.includes(p.id));

  return (
    <SafeAreaView style={styles.container}>
      {favoritePhones.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={54} color={colors.muted} />
          <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích</Text>
          <Text style={styles.emptySubtitle}>
            Hãy nhấn vào biểu tượng trái tim ở danh sách sản phẩm để lưu lại tại đây!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritePhones}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate("ProductDetails", { id: item.id })
              }
            >
              <Image
                source={PHONE_COLORS[item.defaultColor].image}
                style={styles.thumb}
                resizeMode="contain"
              />
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <Text style={styles.supplier}>Nhà cung cấp: {item.supplier}</Text>
              </View>

              <Pressable
                style={styles.removeBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  toggle(item.id);
                }}
              >
                <Ionicons name="trash-outline" size={22} color={colors.red} />
              </Pressable>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    position: "relative",
  },
  thumb: {
    width: 76,
    height: 96,
    marginRight: 12,
  },
  info: {
    flex: 1,
    paddingRight: 28,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 18,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 2,
  },
  supplier: {
    fontSize: 12,
    color: colors.muted,
  },
  removeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 14,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
});
