import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart, useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

// gọi getBookById thay cho mảng tĩnh; có loading + lỗi + thử lại
export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const { isFavorite, toggle } = useWishlist();

  // BT7.5d: tạo state book / loading / error và hàm load() gọi getBookById(bookId)
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  // BT7.5e: hiển thị LoadingView khi loading, ErrorView khi lỗi hoặc không tìm thấy sách
  if (loading) {
    return <LoadingView message="Đang tải thông tin chi tiết sách..." />;
  }

  if (error || !book) {
    return <ErrorView message={error || "Không tìm thấy thông tin cuốn sách này."} onRetry={load} />;
  }

  const favorite = isFavorite(book.id);

  const handleAddToCart = () => {
    // BT7.3c: nút "Thêm vào giỏ"
    add({
      bookId: book.id,
      title: book.title,
      price: book.price,
      emoji: book.emoji,
      color: book.color,
      stock: book.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <View style={styles.blobA} />
        <View style={styles.blobB} />
        <Text style={styles.emoji}>{book.emoji}</Text>
        {/* BT7.C1: nút Wishlist tim yêu thích */}
        <Pressable
          style={styles.favBadge}
          onPress={() => toggle(book.id)}
          accessibilityLabel="Yêu thích"
        >
          <Text style={styles.favBadgeIcon}>{favorite ? "❤️" : "🤍"}</Text>
        </Pressable>
      </View>

      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Tác giả: {book.author}</Text>
        </View>
        <Pressable
          style={[styles.favBtn, favorite && styles.favBtnActive]}
          onPress={() => toggle(book.id)}
        >
          <Text style={styles.favBtnText}>{favorite ? "❤️ Đã thích" : "🤍 Yêu thích"}</Text>
        </Pressable>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPrice(book.price)}</Text>
        <Text style={styles.stock}>Kho: còn {book.stock} cuốn</Text>
      </View>

      <Text style={styles.sectionLabel}>Giới thiệu cuốn sách</Text>
      <Text style={styles.desc}>{book.description}</Text>

      {/* BT7.3c: nút Thêm vào giỏ */}
      <Pressable
        style={[styles.btn, added && styles.btnAdded]}
        onPress={handleAddToCart}
      >
        <Text style={styles.btnText}>
          {added ? "✓ Đã thêm vào giỏ hàng!" : "🛒 Thêm vào giỏ"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 10 },
  cover: {
    height: 220,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  blobA: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.15)",
    left: -40,
    bottom: -60,
  },
  blobB: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.10)",
    right: -20,
    top: 20,
  },
  emoji: { fontSize: 90 },
  favBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(255,255,255,0.85)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  favBadgeIcon: { fontSize: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
  },
  title: { fontSize: 22, fontWeight: "800", color: colors.text },
  author: { color: colors.muted, fontSize: 15, marginTop: 2 },
  favBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#fff",
  },
  favBtnActive: {
    borderColor: "#FECDD3",
    backgroundColor: "#FFF1F2",
  },
  favBtnText: { fontSize: 13, fontWeight: "700", color: colors.text },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  price: { fontSize: 22, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted, fontSize: 14 },
  sectionLabel: { fontSize: 15, fontWeight: "700", color: colors.navy, marginTop: 4 },
  desc: { color: colors.text, lineHeight: 24, fontSize: 14 },
  btn: {
    backgroundColor: colors.indigo,
    padding: 16,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: 12,
    elevation: 3,
  },
  btnAdded: { backgroundColor: colors.cyan },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
