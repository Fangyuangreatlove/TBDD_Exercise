import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { useAuth } from "../store/hooks";
import { colors, radius } from "../theme";

// Tab Tài khoản hiển thị KHÁC NHAU theo isLoggedIn.
// Dữ liệu đăng nhập đang là GIẢ — đăng nhập thật qua API làm ở buổi sau.
export function AccountScreen() {
  const { user, isLoggedIn, signIn, signOut } = useAuth();

  const handleMockLogin = () => {
    // BT7.4d: đăng nhập thử với dữ liệu sinh viên Lê Chuẩn
    signIn(
      {
        id: 1,
        name: "Lê Chuẩn",
        email: "23695731@iuh.edu.vn",
        avatar: "👨‍🎓",
      },
      "jwt-token-23695731-session"
    );
  };

  return (
    <View style={styles.container}>
      <Header title="👤 Tài khoản" />
      {/* BT7.4c: hiển thị điều kiện dựa trên isLoggedIn */}
      {isLoggedIn && user ? (
        <View style={styles.box}>
          <Text style={styles.avatar}>{user.avatar || "👨‍🎓"}</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.badgeMssv}>
            <Text style={styles.badgeMssvText}>MSSV: 23695731 • Lớp: DHKTPM19B</Text>
          </View>
          <Pressable style={[styles.btn, styles.btnOutline]} onPress={signOut}>
            <Text style={styles.btnOutlineText}>Đăng xuất</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.box}>
          <Text style={styles.avatar}>🔒</Text>
          <Text style={styles.name}>Bạn chưa đăng nhập</Text>
          <Text style={styles.email}>Vui lòng đăng nhập để trải nghiệm đầy đủ các tính năng.</Text>
          <Pressable style={styles.btn} onPress={handleMockLogin}>
            <Text style={styles.btnText}>Đăng nhập thử (Lê Chuẩn - 23695731)</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  box: { alignItems: "center", padding: 24, gap: 8 },
  avatar: { fontSize: 64 },
  name: { fontSize: 20, fontWeight: "800", color: colors.text },
  email: { color: colors.muted },
  badgeMssv: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: 4,
  },
  badgeMssvText: {
    color: colors.indigo,
    fontWeight: "700",
    fontSize: 12,
  },
  btn: { backgroundColor: colors.indigo, paddingVertical: 12, paddingHorizontal: 20, borderRadius: radius.md, marginTop: 12 },
  btnText: { color: "#fff", fontWeight: "800" },
  btnOutline: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: colors.danger, marginTop: 16 },
  btnOutlineText: { color: colors.danger, fontWeight: "800" },
});
