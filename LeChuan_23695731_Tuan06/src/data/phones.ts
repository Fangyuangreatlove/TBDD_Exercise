import { ColorKey, Phone } from "../types";

export const PHONE_COLORS: Record<
  ColorKey,
  { label: string; hex: string; image: any }
> = {
  silver: {
    label: "bạc",
    hex: "#C9EEFA",
    image: require("../../assets/phones/silver.png"),
  },
  red: {
    label: "đỏ",
    hex: "#E53A2F",
    image: require("../../assets/phones/red.png"),
  },
  black: {
    label: "đen",
    hex: "#000000",
    image: require("../../assets/phones/black.png"),
  },
  blue: {
    label: "xanh",
    hex: "#2A4494",
    image: require("../../assets/phones/blue.png"),
  },
};

export const COLOR_ORDER: ColorKey[] = ["silver", "red", "black", "blue"];

export const PHONES: Phone[] = [
  {
    id: "1",
    name: "Điện Thoại Vsmart Joy 3 - Hàng chính hãng",
    price: 1790000,
    oldPrice: 1790000,
    rating: 5,
    reviewCount: 828,
    supplier: "Tiki Tradding",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "2",
    name: "Điện Thoại Vsmart Live 4 - Hàng chính hãng",
    price: 3990000,
    oldPrice: 4490000,
    rating: 5,
    reviewCount: 520,
    supplier: "Tiki Tradding",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "black",
  },
  {
    id: "3",
    name: "Điện Thoại Vsmart Star 5 - Hàng chính hãng",
    price: 2190000,
    oldPrice: 2490000,
    rating: 4,
    reviewCount: 310,
    supplier: "Tiki Tradding",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "4",
    name: "Điện Thoại Vsmart Active 3 - Hàng chính hãng",
    price: 3490000,
    oldPrice: 3990000,
    rating: 5,
    reviewCount: 640,
    supplier: "Tiki Tradding",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "silver",
  },
  {
    id: "5",
    name: "Điện Thoại Vsmart Aris Pro - Hàng chính hãng",
    price: 4990000,
    oldPrice: 5490000,
    rating: 5,
    reviewCount: 412,
    supplier: "Tiki Tradding",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "6",
    name: "Điện Thoại Vsmart Bee 3 - Hàng chính hãng",
    price: 1390000,
    oldPrice: 1590000,
    rating: 4,
    reviewCount: 180,
    supplier: "Tiki Tradding",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "black",
  },
];
