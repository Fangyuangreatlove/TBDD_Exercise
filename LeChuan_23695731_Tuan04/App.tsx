// TUẦN 4 — THIẾT BỊ DI ĐỘNG (REACT NATIVE)
// TỔNG HỢP GIỜ 4 & GIỜ 5:
// - Giờ 4: Bài 1 (HomeScreen) + Bài 2 (BookDetailScreen)
// - Giờ 5: Bài 1 (TabBar cố định 4 mục) + Bài 2 (CartScreen đủ 3 vùng không chồng lấp)
import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { TabBar, TabKey } from './components/TabBar';
import { CategoryChips } from './components/CategoryChips';
import { BOOKS, Book, CART_ITEMS, CartItem } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS);

  const selectedBook: Book | null = BOOKS.find((b) => b.id === selectedBookId) ?? null;
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (bookToAdd: Book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === bookToAdd.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === bookToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book: bookToAdd, quantity: 1 }];
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {/* NỘI DUNG CHÍNH THEO TRẠNG THÁI */}
        {selectedBook ? (
          // Giờ 4 - Bài tập 2: Màn hình Chi tiết sách
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => handleAddToCart(selectedBook)}
          />
        ) : activeTab === 'home' ? (
          // Giờ 4 - Bài tập 1: Màn hình Trang chủ hoàn chỉnh
          <HomeScreen
            cartCount={totalCartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => setActiveTab('cart')}
          />
        ) : activeTab === 'cart' ? (
          // Giờ 5 - Bài tập 2: Màn hình Giỏ hàng (3 vùng)
          <CartScreen items={cartItems} />
        ) : activeTab === 'category' ? (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabTitle}>Danh mục sách</Text>
            <View style={{ padding: 16 }}>
              <CategoryChips />
            </View>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>👤</Text>
            <Text style={styles.placeholderTitle}>Tài khoản người dùng</Text>
            <Text style={styles.placeholderText}>
              Thông tin sinh viên: Lê Chuẩn - MSSV: 23695731
            </Text>
          </View>
        )}

        {/* Giờ 5 - Bài tập 1: Thanh Tab Bar dưới cùng (cố định ở đáy màn hình) */}
        {!selectedBook && <TabBar active={activeTab} onChange={setActiveTab} />}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 1,
    position: 'relative', // containing block cho TabBar và FloatingCartButton
  },
  tabContentContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 16,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 6,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#5B6B7F',
    fontSize: 14,
  },
});
