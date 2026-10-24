import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (err: any) {
      setError(err?.message || "Không thể tải dữ liệu từ máy chủ API");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorBox message={error} onRetry={load} />
      </View>
    );
  }

  if (!phone) {
    return (
      <View style={styles.container}>
        <Loading message="Đang kết nối API và lấy dữ liệu..." />
      </View>
    );
  }

  return <SelectPhoneApp phone={phone} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
