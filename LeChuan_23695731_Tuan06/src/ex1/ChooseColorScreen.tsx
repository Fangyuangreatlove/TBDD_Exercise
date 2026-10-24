import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );

  const [line1, line2] = phone.name.includes(" - ")
    ? phone.name.split(" - ")
    : [phone.name, ""];

  const handleFinish = () => {
    navigation.navigate("Product", { color: picked });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* 1. Nửa trên (Header trắng) */}
      <View style={styles.header}>
        <View style={styles.thumbWrap}>
          <Image
            source={PHONE_COLORS[picked ?? phone.defaultColor].image}
            style={styles.thumb}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.titleLine1}>{line1}</Text>
          {line2 ? <Text style={styles.titleLine2}>{line2}</Text> : null}

          {/* TODO 3: Khi đã chọn màu, hiện thêm 3 dòng */}
          {picked ? (
            <View style={styles.pickedInfo}>
              <Text style={styles.infoLine}>
                Màu:{" "}
                <Text style={styles.boldText}>
                  {PHONE_COLORS[picked].label}
                </Text>
              </Text>
              <Text style={styles.infoLine}>
                Cung cấp bởi{" "}
                <Text style={styles.boldText}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.boldPrice}>
                {formatPrice(phone.price)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* 2. Nửa dưới (Body xám) */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        {/* 4 ô màu */}
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => {
            const isSelected = picked === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPicked(key)}
                style={[
                  styles.swatch,
                  { backgroundColor: PHONE_COLORS[key].hex },
                  isSelected && styles.swatchOn,
                ]}
              >
                {isSelected && <View style={styles.swatchCheck} />}
              </Pressable>
            );
          })}
        </View>

        {/* TODO 4: Nút XONG */}
        <Pressable style={styles.doneBtn} onPress={handleFinish}>
          <Text style={styles.doneText}>XONG</Text>
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
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
  },
  thumbWrap: {
    width: 104,
    height: 128,
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  headerText: {
    flex: 1,
    justifyContent: "flex-start",
  },
  titleLine1: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    lineHeight: 20,
  },
  titleLine2: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  pickedInfo: {
    marginTop: 4,
  },
  infoLine: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginTop: 2,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.text,
  },
  boldPrice: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 6,
  },
  body: {
    flex: 1,
    backgroundColor: "#C4C4C4",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 10,
  },
  swatches: {
    alignItems: "center",
    gap: 14,
    marginVertical: 10,
  },
  swatch: {
    width: 82,
    height: 78,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: "#ffffff",
    transform: [{ scale: 1.05 }],
  },
  swatchCheck: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  doneBtn: {
    backgroundColor: "rgba(25, 82, 226, 0.58)",
    borderWidth: 1,
    borderColor: "#CA1536",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  doneText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
