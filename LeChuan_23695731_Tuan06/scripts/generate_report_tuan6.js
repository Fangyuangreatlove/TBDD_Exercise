const fs = require('fs');
const path = require('path');
const docx = require('c:/TBDD/LeChuan_23695731_Tuan02/node_modules/docx');

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  ImageRun,
} = docx;

// Color Palette - Bảng màu sang trọng, học thuật (IUH Navy & Crimson)
const COLOR_PRIMARY = '0B1F5C'; // Deep Navy
const COLOR_SECONDARY = 'E53A2F'; // Brand Red / Crimson
const COLOR_ACCENT = '2A4494'; // Royal Blue
const COLOR_TEXT = '1F2937'; // Dark Slate Text
const COLOR_BORDER = 'CBD5E1'; // Slate Border
const COLOR_HEADER_BG = 'F1F5F9'; // Light Slate Table Header
const COLOR_SUB_BG = 'F8FAFC'; // Code / Box background

function createTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 30, // 15pt
        color: COLOR_PRIMARY,
        font: 'Arial',
      }),
    ],
  });
}

function createSubtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 180 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 23, // 11.5pt
        color: COLOR_SECONDARY,
        font: 'Arial',
      }),
    ],
  });
}

function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26, // 13pt
        color: COLOR_PRIMARY,
        font: 'Arial',
      }),
    ],
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 23, // 11.5pt
        color: COLOR_ACCENT,
        font: 'Arial',
      }),
    ],
  });
}

function createHeading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 60 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 21, // 10.5pt
        color: '334155',
        font: 'Arial',
      }),
    ],
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    alignment: options.align || AlignmentType.LEFT,
    spacing: { before: options.before || 50, after: options.after || 70 },
    children: [
      new TextRun({
        text,
        bold: !!options.bold,
        italics: !!options.italic,
        size: options.size || 22, // 11pt
        color: options.color || COLOR_TEXT,
        font: 'Arial',
      }),
    ],
  });
}

function createBullet(prefix, text) {
  return new Paragraph({
    spacing: { before: 35, after: 35 },
    indent: { left: 360 },
    children: [
      new TextRun({
        text: '• ' + prefix + ': ',
        bold: true,
        size: 22,
        color: COLOR_ACCENT,
        font: 'Arial',
      }),
      new TextRun({
        text: text,
        size: 22,
        color: COLOR_TEXT,
        font: 'Arial',
      }),
    ],
  });
}

function createCodeBlock(code) {
  const lines = code.trim().split('\n');
  const paragraphs = lines.map(
    (line) =>
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({
            text: line.length === 0 ? ' ' : line,
            size: 19, // ~9.5pt
            font: 'Consolas',
            color: '1E293B',
          }),
        ],
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: paragraphs,
            shading: { fill: COLOR_SUB_BG, type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 140, right: 140 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
              left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_SECONDARY },
              right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
            },
          }),
        ],
      }),
    ],
  });
}

function createImageWithCaption(imagePath, caption, width = 230, height = 450) {
  const elements = [];
  if (fs.existsSync(imagePath)) {
    const imgBuffer = fs.readFileSync(imagePath);
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 50 },
        children: [
          new ImageRun({
            data: imgBuffer,
            transformation: { width, height },
          }),
        ],
      })
    );
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 140 },
        children: [
          new TextRun({
            text: caption,
            italics: true,
            bold: true,
            size: 20, // 10pt
            color: '475569',
            font: 'Arial',
          }),
        ],
      })
    );
  } else {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `[Hình ảnh không tìm thấy: ${imagePath}]`,
            color: 'DC2626',
            italics: true,
          }),
        ],
      })
    );
  }
  return elements;
}

function createTwoImagesSideBySide(
  img1Path,
  caption1,
  img2Path,
  caption2,
  width = 220,
  height = 430
) {
  const cell1Children = [];
  const cell2Children = [];

  if (fs.existsSync(img1Path)) {
    cell1Children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: fs.readFileSync(img1Path),
            transformation: { width, height },
          }),
        ],
      })
    );
    cell1Children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 40 },
        children: [
          new TextRun({
            text: caption1,
            italics: true,
            bold: true,
            size: 19,
            color: '475569',
            font: 'Arial',
          }),
        ],
      })
    );
  }

  if (fs.existsSync(img2Path)) {
    cell2Children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: fs.readFileSync(img2Path),
            transformation: { width, height },
          }),
        ],
      })
    );
    cell2Children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 40 },
        children: [
          new TextRun({
            text: caption2,
            italics: true,
            bold: true,
            size: 19,
            color: '475569',
            font: 'Arial',
          }),
        ],
      })
    );
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 60, bottom: 60, left: 60, right: 60 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            children: cell1Children,
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 60, bottom: 60, left: 60, right: 60 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            children: cell2Children,
          }),
        ],
      }),
    ],
  });
}

function createTable(headers, rows, colWidthPercents) {
  const headerRow = new TableRow({
    children: headers.map((h, i) => {
      return new TableCell({
        width: { size: colWidthPercents[i], type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_HEADER_BG, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: h,
                bold: true,
                size: 21,
                color: COLOR_PRIMARY,
                font: 'Arial',
              }),
            ],
          }),
        ],
      });
    }),
  });

  const bodyRows = rows.map((row) => {
    return new TableRow({
      children: row.map((cellText, i) => {
        return new TableCell({
          width: { size: colWidthPercents[i], type: WidthType.PERCENTAGE },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [
            new Paragraph({
              alignment: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: cellText,
                  size: 20,
                  color: COLOR_TEXT,
                  font: 'Arial',
                }),
              ],
            }),
          ],
        });
      }),
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...bodyRows],
  });
}

function buildDocument() {
  const screenshotsDir = 'c:/TBDD/LeChuan_23695731_Tuan06/screenshots';

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header Đơn vị
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({
                text: 'BỘ CÔNG THƯƠNG',
                size: 20,
                color: '475569',
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 120 },
            children: [
              new TextRun({
                text: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH',
                bold: true,
                size: 22,
                color: COLOR_PRIMARY,
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 180 },
            children: [
              new TextRun({
                text: 'KHOA CÔNG NGHỆ THÔNG TIN — BỘ MÔN CÔNG NGHỆ PHẦN MỀM',
                bold: true,
                size: 20,
                color: COLOR_SECONDARY,
                font: 'Arial',
              }),
            ],
          }),

          // Tiêu đề báo cáo
          createTitle('BÁO CÁO THỰC HÀNH TUẦN 06: NAVIGATION'),
          createSubtitle('SELECT PHONE, API INTEGRATION, TAB, STACK & DRAWER NAVIGATION'),

          // Thông tin sinh viên dạng thẻ
          createTable(
            ['Thông tin', 'Chi tiết'],
            [
              ['Họ và tên sinh viên', 'Lê Chuẩn'],
              ['Mã số sinh viên (MSSV)', '23695731'],
              ['Lớp học phần', 'DHKTPM19B'],
              ['Môn học', 'Phát triển ứng dụng thiết bị di động'],
              ['Công nghệ sử dụng', 'React Native, Expo SDK 54, React Navigation 7, TypeScript'],
              ['Đề tài bài tập', 'Lab 06 — Navigation: 5 bài tập thực hành toàn diện'],
            ],
            [35, 65]
          ),

          createParagraph('', { after: 120 }),

          // ==========================================
          // PHẦN 1: MỤC TIÊU VÀ TỔNG QUAN
          // ==========================================
          createHeading1('I. TỔNG QUAN VÀ MỤC TIÊU BÀI TẬP TUẦN 06'),
          createParagraph(
            'Tuần thực hành Lab 06 tập trung vào kỹ năng xây dựng kiến trúc điều hướng màn hình (Navigation Architecture) trong ứng dụng React Native sử dụng Expo và TypeScript. Bài tập bao gồm 5 nội dung chính tương ứng 5 bài thực hành:'
          ),
          createBullet('Bài 1: Select Phone', 'Dựng ứng dụng chọn màu sắc điện thoại thông minh (4 màn hình/trạng thái) sử dụng Native Stack Navigator, truyền params và callback cập nhật dữ liệu.'),
          createBullet('Bài 2: Gắn API', 'Tích hợp MockAPI.io vào ứng dụng Bài 1, xử lý bất đồng bộ (fetch/async-await), trạng thái nạp dữ liệu (Loading) và hộp thoại bắt lỗi (ErrorBox retry).'),
          createBullet('Bài 3: Bottom Tab Navigation', 'Dựng thanh điều hướng đáy (Bottom Tab) với 3 màn hình: Trang chủ (FlatList danh sách), Tìm kiếm (TextInput lọc từ khóa thời gian thực), Cá nhân (Hồ sơ sinh viên + Avatar).'),
          createBullet('Bài 4: Stack + Tab + Passing Params', 'Điều hướng phân cấp lồng nhau (Nested Navigation). Stack chính bọc Bottom Tab (Sản phẩm & Yêu thích) và màn Chi tiết sản phẩm (ProductDetails) nhận ID tham số, kết hợp React Context lưu trữ danh mục yêu thích.'),
          createBullet('Bài 5: Drawer Navigation', 'Điều hướng dạng ngăn kéo (Drawer Menu) vuốt từ cạnh trái với 3 màn hình: Trang chủ, Hồ sơ cá nhân và Cài đặt (Switch toggle thông báo và Dark Mode).'),

          createParagraph('', { after: 100 }),

          // ==========================================
          // PHẦN 2: BÀI 1 - SELECT PHONE
          // ==========================================
          createHeading1('II. BÀI 1: LÀM ỨNG DỤNG SELECT PHONE'),
          createHeading2('1. Yêu cầu bài toán và phân tích luồng dữ liệu'),
          createParagraph(
            'Theo thiết kế Figma và đề bài, ứng dụng mô phỏng tính năng chọn màu sắc cho sản phẩm điện thoại Vsmart Joy 3. Ứng dụng gồm 2 màn hình chính được định tuyến qua Native Stack Navigator:'
          ),
          createBullet('Screen 01 (Product)', 'Màn hình chi tiết sản phẩm mặc định (màu xanh dương). Hiển thị ảnh lớn, tên máy, đánh giá 5 sao (828 lượt), giá 1.790.000 đ kèm giá gạch ngang, huy hiệu rẻ hơn hoàn tiền, nút "4 MÀU-CHỌN MÀU" và nút đỏ "CHỌN MUA" sát đáy.'),
          createBullet('Screen 02 (ChooseColor - Chưa chọn)', 'Nửa trên nền trắng hiển thị ảnh thu nhỏ và tên sản phẩm. Nửa dưới nền xám hiển thị "Chọn một màu bên dưới:", 4 ô màu (bạc, đỏ, đen, xanh) và nút "XONG".'),
          createBullet('Screen 03 (ChooseColor - Đã chọn đỏ)', 'Khi người dùng bấm chọn ô màu đỏ: ảnh thu nhỏ lập tức chuyển sang màu đỏ, đồng thời hiển thị 3 dòng thông tin in đậm: Màu: đỏ, Cung cấp bởi Tiki Tradding, Giá: 1.790.000 đ.'),
          createBullet('Screen 04 (Product - Đã chọn màu)', 'Sau khi bấm "XONG", điều hướng trở lại màn hình Product với dữ liệu màu mới (màu đỏ). Ảnh điện thoại lớn chuyển sang màu đỏ và nhãn nút cập nhật thành "4 MÀU-CHỌN LOẠI".'),

          createHeading2('2. Đáp án mã nguồn Bài 1'),
          createHeading3('a. Khai báo Stack Navigator — src/ex1/SelectPhoneApp.tsx'),
          createCodeBlock(`import React from "react";
import { NavigationIndependentTree, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { ProductScreen } from "./ProductScreen";
import { ChooseColorScreen } from "./ChooseColorScreen";

export type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};

const Stack = createNativeStackNavigator<SelectPhoneParamList>();

export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Product">
            {(props) => <ProductScreen {...props} phone={phone} />}
          </Stack.Screen>
          <Stack.Screen name="ChooseColor">
            {(props) => <ChooseColorScreen {...props} phone={phone} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}`),

          createHeading3('b. Màn hình sản phẩm — src/ex1/ProductScreen.tsx (Xử lý TODO 1 & TODO 2)'),
          createCodeBlock(`// Trích đoạn xử lý điều hướng và giao diện chính trong ProductScreen.tsx
export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown: ColorKey = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      {/* 1. Ảnh sản phẩm hiển thị theo màu đang chọn (shown) */}
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>

      {/* 2. Thông tin chi tiết */}
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} size={18} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.rowPrice}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.rowBadge}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.badgeHelp}><Text style={styles.badgeHelpText}>?</Text></View>
        </View>

        {/* TODO 1: Nút chọn màu; khi đã chọn màu (picked) đổi thành "4 MÀU-CHỌN LOẠI" */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrowIcon}>›</Text>
        </Pressable>
      </View>

      {/* TODO 2: Nút CHỌN MUA nền đỏ bo góc sát đáy màn hình */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.buyBtn} onPress={handleBuy}>
          <Text style={styles.buyText}>CHỌN MUA</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}`),

          createHeading3('c. Màn hình chọn màu — src/ex1/ChooseColorScreen.tsx (Xử lý TODO 3 & TODO 4)'),
          createCodeBlock(`// Trích đoạn xử lý hiển thị có điều kiện và nút XONG trong ChooseColorScreen.tsx
export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.includes(" - ") ? phone.name.split(" - ") : [phone.name, ""];

  const handleFinish = () => {
    // TODO 4: Điều hướng quay lại Product kèm param màu đã chọn
    navigation.navigate("Product", { color: picked });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Nửa trên nền trắng: ảnh nhỏ và thông tin */}
      <View style={styles.header}>
        <View style={styles.thumbWrap}>
          <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.titleLine1}>{line1}</Text>
          {line2 ? <Text style={styles.titleLine2}>{line2}</Text> : null}

          {/* TODO 3: CHỈ KHI đã chọn màu (picked !== undefined) hiện 3 dòng thông tin in đậm */}
          {picked ? (
            <View style={styles.pickedInfo}>
              <Text style={styles.infoLine}>Màu: <Text style={styles.boldText}>{PHONE_COLORS[picked].label}</Text></Text>
              <Text style={styles.infoLine}>Cung cấp bởi <Text style={styles.boldText}>{phone.supplier}</Text></Text>
              <Text style={styles.boldPrice}>{formatPrice(phone.price)}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Nửa dưới nền xám: 4 ô màu và nút XONG */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => {
            const isSelected = picked === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPicked(key)}
                style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, isSelected && styles.swatchOn]}
              >
                {isSelected && <View style={styles.swatchCheck} />}
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.doneBtn} onPress={handleFinish}>
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}`),

          createHeading2('3. Kết quả chạy thực tế Bài 1 (4 Màn hình chuẩn Figma)'),
          createParagraph(
            'Dưới đây là hình ảnh chụp từ ứng dụng thực tế minh họa đúng 4 trạng thái giao diện theo đúng yêu cầu đề bài:'
          ),
          createTwoImagesSideBySide(
            path.join(screenshotsDir, 'bai1_screen01_product_blue.png'),
            'Screen 01: Màn hình Product mặc định (Màu xanh dương)',
            path.join(screenshotsDir, 'bai1_screen02_choose_color.png'),
            'Screen 02: Màn hình ChooseColor ban đầu (Chưa chọn)',
            205,
            420
          ),
          createParagraph('', { after: 100 }),
          createTwoImagesSideBySide(
            path.join(screenshotsDir, 'bai1_screen03_choose_color_red.png'),
            'Screen 03: Màn hình ChooseColor (Đã chọn màu đỏ)',
            path.join(screenshotsDir, 'bai1_screen04_product_red.png'),
            'Screen 04: Màn hình Product sau khi chọn ("4 MÀU-CHỌN LOẠI")',
            205,
            420
          ),

          createParagraph('', { after: 120 }),

          // ==========================================
          // PHẦN 3: BÀI 2 - GẮN API
          // ==========================================
          createHeading1('III. BÀI 2: GẮN API VÀO ỨNG DỤNG SELECT PHONE'),
          createHeading2('1. Mục tiêu và giải pháp kỹ thuật'),
          createParagraph(
            'Bài tập yêu cầu thay thế dữ liệu viết cứng (hardcoded data) bằng cách gọi API bất đồng bộ từ dịch vụ MockAPI.io (hoặc chế độ offline fallback dự phòng). Ứng dụng phải có cơ chế kiểm soát vòng đời nạp dữ liệu hoàn chỉnh:'
          ),
          createBullet('Hàm gọi API (phoneApi.ts)', 'Kiểm tra biến môi trường EXPO_PUBLIC_API_URL. Nếu không có biến môi trường, sử dụng dữ liệu mẫu kèm độ trễ giả lập sleep(800ms) để hiển thị giao diện Loading.'),
          createBullet('Trạng thái Loading (Loading.tsx)', 'Hiển thị vòng xoay ActivityIndicator kèm thông điệp "Đang kết nối API và lấy dữ liệu...".'),
          createBullet('Trạng thái Lỗi & Thử lại (ErrorBox.tsx)', 'Bắt lỗi kết nối mạng / HTTP 404, hiển thị thông báo lỗi chi tiết và cung cấp nút "THỬ LẠI" để người dùng tải lại.'),
          createBullet('Tái sử dụng giao diện', 'Khi dữ liệu nạp thành công, truyền đối tượng Phone nhận được vào thành phần SelectPhoneApp ở Bài 1.'),

          createHeading2('2. Đáp án mã nguồn Bài 2'),
          createHeading3('a. Mô-đun gọi API — src/api/phoneApi.ts'),
          createCodeBlock(`import { PHONES } from "../data/phones";
import { Phone } from "../types";

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\\/$/, "");
export const USING_API = API_URL !== "";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    // Chế độ offline: giả lập độ trễ mạng để kiểm tra giao diện Loading
    await sleep(800);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error("Không tìm thấy sản phẩm với mã: " + id);
    return p;
  }
  const res = await fetch(\`\${API_URL}/phones/\${id}\`);
  if (!res.ok) throw new Error(\`Máy chủ trả về lỗi: \${res.status}\`);
  return (await res.json()) as Phone;
}`),

          createHeading3('b. Thành phần nạp dữ liệu — src/ex1/SelectPhoneApi.tsx'),
          createCodeBlock(`export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // TODO 1: Đặt lại trạng thái ban đầu
    setError(null);
    setPhone(null);
    try {
      // TODO 2: Gọi hàm fetchPhone("1") bất đồng bộ
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (err: any) {
      setError(err?.message || "Không thể tải dữ liệu từ máy chủ API");
    }
  }, []);

  // TODO 3: useEffect gọi load() khi thành phần được gắn vào DOM lần đầu
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4: Xử lý hiển thị hộp lỗi nếu xảy ra sự cố
  if (error) {
    return (
      <View style={styles.container}>
        <ErrorBox message={error} onRetry={load} />
      </View>
    );
  }

  // TODO 5: Hiển thị vòng xoay chờ tải
  if (!phone) {
    return (
      <View style={styles.container}>
        <Loading message="Đang kết nối API và lấy dữ liệu..." />
      </View>
    );
  }

  // TODO 6: Nạp dữ liệu hoàn tất, chuyển sang SelectPhoneApp
  return <SelectPhoneApp phone={phone} />;
}`),

          createHeading2('3. Kết quả chạy thực tế Bài 2'),
          ...createImageWithCaption(
            path.join(screenshotsDir, 'bai2_api_loaded.png'),
            'Hình 2.1: Giao diện Bài 2 sau khi nạp dữ liệu từ API thành công và chuyển vào SelectPhoneApp',
            220,
            440
          ),

          createParagraph('', { after: 120 }),

          // ==========================================
          // PHẦN 4: BÀI 3 - BOTTOM TAB NAVIGATION
          // ==========================================
          createHeading1('IV. BÀI 3: BOTTOM TAB NAVIGATION'),
          createHeading2('1. Yêu cầu và thiết kế kiến trúc'),
          createParagraph(
            'Bài tập yêu cầu xây dựng ứng dụng với thanh điều hướng đáy (Bottom Tab) gồm 3 tab chức năng riêng biệt:'
          ),
          createBullet('Tab Trang chủ (Home)', 'Hiển thị danh sách điện thoại dạng FlatList với thẻ sản phẩm gồm hình ảnh, tên, đánh giá sao và giá thành.'),
          createBullet('Tab Tìm kiếm (Search)', 'Cung cấp ô nhập liệu TextInput để người dùng lọc sản phẩm theo thời gian thực (real-time query filter). Lọc không phân biệt chữ hoa chữ thường. Nếu không tìm thấy, hiển thị thông báo "Không có kết quả nào cho...".'),
          createBullet('Tab Cá nhân (Profile)', 'Hiển thị hồ sơ người dùng gồm vòng tròn Avatar mang chữ cái đầu (LC), họ tên "Lê Chuẩn", mã số sinh viên "23695731", email sinh viên, lớp DHKTPM19B và trường Đại học Công nghiệp TP.HCM (IUH).'),
          createBullet('Thiết kế biểu tượng', 'Sử dụng bộ icon @expo/vector-icons (Ionicons). Khi tab được chọn, biểu tượng chuyển sang dạng đặc (solid) và đổi sang màu đỏ thương hiệu (tabBarActiveTintColor: colors.red).'),

          createHeading2('2. Đáp án mã nguồn Bài 3 (src/ex3/BottomTabApp.tsx)'),
          createCodeBlock(`import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, SafeAreaView } from "react-native";
import { NavigationIndependentTree, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

export type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

// 1. Home Tab: FlatList danh sách sản phẩm
function HomeTab() {
  return (
    <SafeAreaView style={styles.tabContainer}>
      <FlatList
        data={PHONES}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={PHONE_COLORS[item.defaultColor].image} style={styles.cardThumb} resizeMode="contain" />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Stars value={item.rating} size={14} />
              <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// 2. Search Tab: Lọc sản phẩm theo từ khóa (TODO 1)
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const filteredPhones = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.tabContainer}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Nhập tên sản phẩm (ví dụ: Joy, Live, Aris)..."
            style={styles.input}
          />
        </View>
      </View>
      {filteredPhones.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không có kết quả nào cho "{keyword}"</Text>
        </View>
      ) : (
        <FlatList data={filteredPhones} keyExtractor={(p) => p.id} ... />
      )}
    </SafeAreaView>
  );
}

// 3. Profile Tab: Hồ sơ người dùng (TODO 2)
function ProfileTab() {
  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>LC</Text></View>
        <Text style={styles.profileName}>Lê Chuẩn</Text>
        <Text style={styles.profileMssv}>MSSV: 23695731</Text>
        <Text style={styles.profileEmail}>chuan.le@student.iuh.edu.vn</Text>
        <View style={styles.infoDivider} />
        <Text style={styles.infoValue}>Lớp: DHKTPM19B - Khoa CNTT - ĐH Công nghiệp TP.HCM</Text>
      </View>
    </SafeAreaView>
  );
}

// 4. Tab Navigator (TODO 3)
export function BottomTabApp() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: true,
            tabBarActiveTintColor: colors.red,
            tabBarInactiveTintColor: colors.muted,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
            ),
          })}
        >
          <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
          <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
          <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}`),

          createHeading2('3. Kết quả chạy thực tế Bài 3'),
          createParagraph(
            'Hình ảnh chụp màn hình kiểm thử thực tế 3 tab chức năng trong ứng dụng Bài 3:'
          ),
          createTwoImagesSideBySide(
            path.join(screenshotsDir, 'bai3_tab_home.png'),
            'Hình 3.1: Tab Trang chủ (Danh sách sản phẩm)',
            path.join(screenshotsDir, 'bai3_tab_search.png'),
            'Hình 3.2: Tab Tìm kiếm (Lọc từ khóa "Joy")',
            205,
            420
          ),
          createParagraph('', { after: 100 }),
          ...createImageWithCaption(
            path.join(screenshotsDir, 'bai3_tab_profile.png'),
            'Hình 3.3: Tab Cá nhân (Hồ sơ sinh viên Lê Chuẩn - 23695731 - DHKTPM19B)',
            220,
            440
          ),

          createParagraph('', { after: 120 }),

          // ==========================================
          // PHẦN 5: BÀI 4 - STACK + TAB + PASSING PARAMS
          // ==========================================
          createHeading1('V. BÀI 4: STACK + TAB + PASSING PARAMS'),
          createHeading2('1. Yêu cầu và mô hình điều hướng lồng nhau'),
          createParagraph(
            'Bài tập 4 là mô hình kiến trúc phổ biến nhất trong các ứng dụng thương mại điện tử hiện đại: kết hợp giữa Stack Navigator và Tab Navigator, đồng thời truyền tham số (Passing Params) và quản lý trạng thái chia sẻ (State Management):'
          ),
          createBullet('Cấu trúc cây điều hướng', 'RootStack gồm 2 màn hình: màn Home (chính là BottomTab chứa 2 tab con: Products và Favorites) và màn ProductDetails.'),
          createBullet('Truyền tham số (Passing Params)', 'Khi người dùng bấm vào một sản phẩm trong Tab Products: điều hướng đến màn hình chi tiết bằng lệnh navigation.navigate("ProductDetails", { id: item.id }). Màn hình chi tiết trích xuất tham số route.params.id để tìm kiếm và kết xuất đúng thông tin sản phẩm.'),
          createBullet('Quản lý danh sách yêu thích', 'Sử dụng React Context (FavoritesContext) bọc toàn bộ ứng dụng, cho phép lưu trữ mảng ID các sản phẩm yêu thích, cập nhật badge số lượng trên thanh Tab và tự động đồng bộ trạng thái trái tim giữa các màn hình.'),

          createHeading2('2. Đáp án mã nguồn Bài 4'),
          createHeading3('a. Quản lý trạng thái yêu thích — src/ex4/FavoritesContext.tsx'),
          createCodeBlock(`import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface FavoritesContextType {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(["1"]); // Mặc định yêu thích sẵn Joy 3

  const toggle = useCallback((id: string) => {
    setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => useContext(FavoritesContext)!;`),

          createHeading3('b. Điều hướng phân cấp — src/ex4/StackTabApp.tsx'),
          createCodeBlock(`// TODO 1: Cấu hình HomeTabs với badge đếm số lượng yêu thích
function HomeTabs() {
  const { ids } = useFavorites();
  return (
    <Tab.Navigator screenOptions={{ ... }}>
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{
          title: "Sản phẩm",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "cube" : "cube-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{
          title: "Yêu thích",
          tabBarBadge: ids.length > 0 ? ids.length : undefined,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// TODO 2: Cấu hình RootStack lồng HomeTabs và ProductDetails
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Chi tiết sản phẩm" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </FavoritesProvider>
  );
}`),

          createHeading3('c. Màn hình chi tiết sản phẩm nhận ID — src/ex4/ProductDetailsScreen.tsx'),
          createCodeBlock(`export function ProductDetailsScreen({ route, navigation }: RootProps<"ProductDetails">) {
  // TODO 4: Lấy ID từ tham số route.params và tìm sản phẩm
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5: Xử lý trường hợp không tìm thấy
  if (!phone) {
    return <Text>Không tìm thấy sản phẩm #{id}</Text>;
  }

  const isFav = has(phone.id);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TODO 6: Hiển thị ảnh, tên, đánh giá, giá cả và nhà cung cấp */}
        <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{phone.name}</Text>
        <Stars value={phone.rating} size={18} />
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        <Text style={styles.supplierText}>Cung cấp bởi: {phone.supplier}</Text>

        {/* TODO 7: Nút lưu vào yêu thích với Context toggle */}
        <Pressable style={[styles.favBtn, isFav && styles.favBtnActive]} onPress={() => toggle(phone.id)}>
          <Text style={[styles.favText, isFav && styles.favTextActive]}>
            {isFav ? "♥ Đã lưu vào yêu thích" : "♡ Lưu vào yêu thích"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}`),

          createHeading2('3. Kết quả chạy thực tế Bài 4'),
          createParagraph(
            'Hình ảnh thực tế chứng minh luồng điều hướng: từ Tab Sản phẩm bấm xem chi tiết Live 4, nhấn lưu yêu thích, và danh sách Yêu thích cập nhật:'
          ),
          createTwoImagesSideBySide(
            path.join(screenshotsDir, 'bai4_tab_products.png'),
            'Hình 4.1: Tab Sản phẩm (Có icon trái tim)',
            path.join(screenshotsDir, 'bai4_product_details.png'),
            'Hình 4.2: Màn Chi tiết sản phẩm nhận ID và giá đúng',
            205,
            420
          ),
          createParagraph('', { after: 100 }),
          ...createImageWithCaption(
            path.join(screenshotsDir, 'bai4_tab_favorites.png'),
            'Hình 4.3: Tab Yêu thích (Badge số lượng 1 và danh sách sản phẩm đã lưu)',
            220,
            440
          ),

          createParagraph('', { after: 120 }),

          // ==========================================
          // PHẦN 6: BÀI 5 - DRAWER NAVIGATION
          // ==========================================
          createHeading1('VI. BÀI 5: DRAWER NAVIGATION (MENU NGĂN KÉO)'),
          createHeading2('1. Yêu cầu và thiết kế'),
          createParagraph(
            'Bài tập 5 yêu cầu xây dựng điều hướng dạng Drawer (kéo từ cạnh trái hoặc bấm biểu tượng hamburger ☰ trên header) gồm 3 màn hình:'
          ),
          createBullet('Màn hình Trang chủ (Home)', 'Hiển thị lời chào thân thiện kèm hướng dẫn vuốt hoặc bấm biểu tượng ☰.'),
          createBullet('Màn hình Hồ sơ (Profile)', 'Hiển thị Avatar, tên sinh viên Lê Chuẩn, MSSV 23695731, email và lớp học phần.'),
          createBullet('Màn hình Cài đặt (Settings)', 'Chứa 2 thành phần Switch bật/tắt: "Nhận thông báo" (mặc định bật) và "Giao diện tối (Dark Mode)" (mặc định tắt). Phía dưới có dòng tóm tắt trạng thái thời gian thực: "Thông báo: BẬT/TẮT · Giao diện: TỐI/SÁNG".'),
          createBullet('Nâng cao (Dark Theme Sync)', 'Tích hợp SettingsContext để khi người dùng kích hoạt Giao diện tối, màu nền và màu chữ của toàn bộ các màn hình lập tức chuyển sang chế độ Dark Mode đồng bộ.'),

          createHeading2('2. Đáp án mã nguồn Bài 5 (src/ex5/DrawerApp.tsx)'),
          createCodeBlock(`import React, { useState, createContext, useContext } from "react";
import { View, Text, Switch, StyleSheet, SafeAreaView } from "react-native";
import { NavigationIndependentTree, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

// Cài đặt Context chia sẻ trạng thái Dark Mode
const SettingsContext = createContext({
  notify: true, setNotify: (val: boolean) => {},
  dark: false, setDark: (val: boolean) => {}
});

// TODO 1: Màn hình Cài đặt với 2 Switch
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useContext(SettingsContext);
  return (
    <SafeAreaView style={[styles.center, { backgroundColor: dark ? "#121212" : colors.bg }]}>
      <View style={[styles.card, { backgroundColor: dark ? "#1E1E1E" : "#ffffff" }]}>
        <Text style={[styles.sectionTitle, { color: dark ? "#ffffff" : colors.text }]}>Cấu hình ứng dụng</Text>

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: dark ? "#ffffff" : colors.text }]}>Nhận thông báo</Text>
          <Switch value={notify} onValueChange={setNotify} thumbColor={notify ? colors.red : "#f4f3f4"} />
        </View>

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: dark ? "#ffffff" : colors.text }]}>Giao diện tối (Dark Mode)</Text>
          <Switch value={dark} onValueChange={setDark} thumbColor={dark ? "#2A4494" : "#f4f3f4"} />
        </View>

        <View style={[styles.statusBox, { backgroundColor: dark ? "#2A2A2A" : "#F4F5F7" }]}>
          <Text style={styles.statusText}>
            Thông báo: <Text style={{ color: notify ? "#0E8A16" : colors.red }}>{notify ? "BẬT" : "TẮT"}</Text>
            {"  ·  "}
            Giao diện: <Text style={{ color: dark ? "#F5C518" : "#2A4494" }}>{dark ? "TỐI" : "SÁNG"}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// TODO 2: Cấu hình DrawerNavigator
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <SettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={({ route }) => ({
              drawerActiveTintColor: colors.red,
              drawerIcon: ({ color, size }) => (
                <Ionicons name={route.name === "Home" ? "home-outline" : route.name === "Profile" ? "person-outline" : "settings-outline"} size={size} color={color} />
              ),
            })}
          >
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ cá nhân" }} />
            <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </SettingsContext.Provider>
  );
}`),

          createHeading2('3. Kết quả chạy thực tế Bài 5'),
          createParagraph(
            'Hình ảnh kiểm thử giao diện ngăn kéo Drawer Menu trượt từ cạnh trái và màn hình Cài đặt khi bật Giao diện tối:'
          ),
          createTwoImagesSideBySide(
            path.join(screenshotsDir, 'bai5_drawer_menu.png'),
            'Hình 5.1: Drawer Menu mở ra từ cạnh trái',
            path.join(screenshotsDir, 'bai5_settings_dark.png'),
            'Hình 5.2: Màn Cài đặt khi bật Dark Mode (Giao diện tối)',
            205,
            420
          ),

          createParagraph('', { after: 120 }),

          // ==========================================
          // PHẦN 7: TỔNG KẾT VÀ KẾT LUẬN
          // ==========================================
          createHeading1('VII. TỔNG KẾT VÀ KẾT LUẬN'),
          createParagraph(
            'Sau khi hoàn thành xuất sắc toàn bộ 5 bài tập thực hành trong Lab 06 — Navigation, các kết quả kỹ thuật đạt được bao gồm:'
          ),
          createBullet('Làm chủ React Navigation v7', 'Nắm vững kiến trúc Navigation độc lập (NavigationIndependentTree), hiểu rõ sự khác biệt giữa Stack, Bottom Tab và Drawer Navigation.'),
          createBullet('Truyền dữ liệu và phản hồi', 'Thành thạo kỹ thuật truyền tham số qua navigation.navigate(screen, params) và nhận kết quả phản hồi qua route.params.'),
          createBullet('Gắn API và bắt lỗi chuyên nghiệp', 'Tích hợp mượt mà xử lý bất đồng bộ, tạo hiệu ứng chờ Loading và cơ chế phục hồi thử lại (Retry) khi gặp sự cố.'),
          createBullet('Quản lý trạng thái toàn cục', 'Ứng dụng linh hoạt React Context để chia sẻ dữ liệu yêu thích và cài đặt Dark Mode xuyên suốt cây điều hướng phân cấp.'),
          createBullet('Chuẩn hóa giao diện theo Figma', 'Dựng chính xác từng chi tiết kích thước, màu sắc thương hiệu, bo góc và độ tương phản theo bản thiết kế mẫu.'),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 240, after: 0 },
            children: [
              new TextRun({
                text: 'TP. Hồ Chí Minh, ngày 24 tháng 10 năm 2026\n',
                italics: true,
                size: 21,
                font: 'Arial',
              }),
              new TextRun({
                text: 'Sinh viên thực hiện\n\n\n',
                bold: true,
                size: 21,
                font: 'Arial',
              }),
              new TextRun({
                text: 'Lê Chuẩn (MSSV: 23695731)',
                bold: true,
                size: 22,
                color: COLOR_PRIMARY,
                font: 'Arial',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return doc;
}

async function run() {
  console.log('Generating Lab 06 Navigation Report...');
  const doc = buildDocument();
  const buffer = await Packer.toBuffer(doc);

  const outPathRoot = 'c:/TBDD/LeChuan_23695731_Tuan06.docx';
  const outPathProject = 'c:/TBDD/LeChuan_23695731_Tuan06/LeChuan_23695731_Tuan06.docx';

  fs.writeFileSync(outPathRoot, buffer);
  fs.writeFileSync(outPathProject, buffer);

  console.log('Report generated successfully:');
  console.log('  1.', outPathRoot, `(${buffer.length} bytes)`);
  console.log('  2.', outPathProject, `(${buffer.length} bytes)`);
}

run().catch((err) => {
  console.error('Error generating report:', err);
});
