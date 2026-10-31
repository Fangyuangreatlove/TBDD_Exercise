import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors, radius } from "../theme";

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  // BT7.3d: lấy totalQuantity từ useCart và truyền vào FloatingCartButton
  const { totalQuantity } = useCart();

  // BT7.5b: state books, categories, loading, error
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // BT7.5b: hàm load() gọi song song bằng Promise.all([getBooks(), getCategories()])
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // BT7.8b: nhận categoryId từ route.params (Tab Danh mục gửi sang)
  useEffect(() => {
    if (route.params?.categoryId !== undefined) {
      setCategoryId(route.params.categoryId);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  // BT7.7a: debounce keyword 400ms
  const debouncedKeyword = useDebounce(keyword, 400);

  // BT7.7c, BT7.8a, BT7.C2, và Câu hỏi bổ sung 3.5 (sắp xếp giá)
  const visibleBooks = useMemo(() => {
    let result = filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    });
    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);

  const hasFilter = !!keyword || categoryId !== null || priceRange !== null || sortOrder !== null;

  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
    setSortOrder(null);
  };

  const toggleSortOrder = () => {
    if (sortOrder === null) setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder(null);
  };

  const sortLabel =
    sortOrder === "asc"
      ? "Giá: Thấp → Cao ⬆"
      : sortOrder === "desc"
      ? "Giá: Cao → Thấp ⬇"
      : "Sắp xếp giá ⇅";

  return (
    <View style={styles.container}>
      <Header
        title="📚 BookStore"
        onSearchPress={() => setSearchOpen((v) => !v)}
      />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}

      {/* BT7.5c: Hiển thị LoadingView / ErrorView / BookGrid */}
      {loading ? (
        <LoadingView message="Đang tải dữ liệu từ máy chủ..." />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <BookGrid
          data={visibleBooks}
          // BT7.2a: onPressBook → navigation.navigate("BookDetail", { bookId: b.id })
          onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
          ListHeaderComponent={
            <View>
              <CategoryChips
                categories={categories}
                selectedId={categoryId}
                onSelect={setCategoryId}
              />
              <PriceFilter value={priceRange} onChange={setPriceRange} />

              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.sortBtn, sortOrder !== null && styles.sortBtnActive]}
                  onPress={toggleSortOrder}
                >
                  <Text style={[styles.sortBtnText, sortOrder !== null && styles.sortBtnTextActive]}>
                    {sortLabel}
                  </Text>
                </Pressable>

                {/* BT7.7e: nút Xóa bộ lọc khi có bộ lọc */}
                {hasFilter && (
                  <Pressable style={styles.clearBtn} onPress={clearFilters}>
                    <Text style={styles.clearBtnText}>✕ Xóa bộ lọc</Text>
                  </Pressable>
                )}
              </View>
            </View>
          }
          // BT7.7d: EmptyState khi không tìm thấy sách
          ListEmptyComponent={
            <EmptyState
              emoji="🔎"
              title="Không tìm thấy sách phù hợp"
              message="Hãy thử thay đổi từ khóa tìm kiếm hoặc xóa bộ lọc để xem các sách khác."
              actionLabel="Xóa bộ lọc"
              onAction={clearFilters}
            />
          }
        />
      )}

      {/* BT7.3d: FloatingCartButton */}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  sortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
  },
  sortBtnActive: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigo,
  },
  sortBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  sortBtnTextActive: {
    color: "#fff",
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: "#FEE2E2",
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.danger,
  },
});
