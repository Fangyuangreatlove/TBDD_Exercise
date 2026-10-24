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
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  const { has, toggle } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PHONES}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isFav = has(item.id);
          return (
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
                <View style={styles.ratingRow}>
                  <Stars value={item.rating} size={14} />
                  <Text style={styles.review}>({item.reviewCount})</Text>
                </View>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <Text style={styles.supplier}>{item.supplier}</Text>
              </View>

              <Pressable
                style={styles.favBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  toggle(item.id);
                }}
              >
                <Ionicons
                  name={isFav ? "heart" : "heart-outline"}
                  size={24}
                  color={isFav ? colors.red : colors.muted}
                />
              </Pressable>
            </Pressable>
          );
        }}
      />
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
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  review: {
    fontSize: 12,
    color: colors.muted,
    marginLeft: 6,
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
  favBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 4,
  },
});
