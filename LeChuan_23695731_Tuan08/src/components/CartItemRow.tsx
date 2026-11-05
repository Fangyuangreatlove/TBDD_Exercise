import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty, item.bookId, item.quantity, onChangeQty]);

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text style={styles.stockText}>Còn {item.stock} trong kho</Text>
      </View>
      
      <View style={styles.qtyControl}>
        <Pressable
          style={[styles.qtyBtn, !canDec && styles.qtyBtnDisabled]}
          onPress={() => canDec && setQty((q) => Math.max(1, q - 1))}
          disabled={!canDec}
          hitSlop={6}
        >
          <Text style={[styles.qtyBtnText, !canDec && styles.qtyBtnTextDisabled]}>−</Text>
        </Pressable>

        <Text style={styles.qtyNumber}>{qty}</Text>

        <Pressable
          style={[styles.qtyBtn, !canInc && styles.qtyBtnDisabled]}
          onPress={() => canInc && setQty((q) => Math.min(item.stock, q + 1))}
          disabled={!canInc}
          hitSlop={6}
        >
          <Text style={[styles.qtyBtnText, !canInc && styles.qtyBtnTextDisabled]}>+</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text, fontSize: 13 },
  price: { color: colors.indigo, fontWeight: "800", fontSize: 13 },
  stockText: { color: colors.muted, fontSize: 11, fontStyle: "italic" },
  qtyControl: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.bg, padding: 4, borderRadius: radius.sm },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.card, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.line },
  qtyBtnDisabled: { opacity: 0.35, backgroundColor: "#E2E8F0" },
  qtyBtnText: { fontSize: 16, fontWeight: "700", color: colors.navy, lineHeight: 18 },
  qtyBtnTextDisabled: { color: colors.muted },
  qtyNumber: { fontWeight: "800", color: colors.navy, fontSize: 14, minWidth: 20, textAlign: "center" },
  trash: { fontSize: 20, marginLeft: 4 },
});
