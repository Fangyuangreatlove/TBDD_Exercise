# Bài Tập Thực Hành Tuần 04 - Thiết Bị Di Động (React Native)
## Chủ đề: LAYOUT toàn màn hình (ScrollView & SafeAreaView) & Bottom Tab Layout — Ứng dụng BookStore Online

**Sinh viên thực hiện:** Lê Chuẩn  
**Mã số sinh viên (MSSV):** 23695731  
**Lớp học phần:** Thiết bị di động (TBDD) — IUH  

---

### 1. Nội dung hoàn thành
Dự án hoàn thành toàn bộ bài tập trong **Giờ 4** và **Giờ 5** theo tài liệu `Week_4_Layout_UI.docx`:

#### **Giờ 4 — Layout toàn màn hình: ScrollView & SafeAreaView**
- **Bài tập 1: Màn hình Trang chủ hoàn chỉnh (`screens/HomeScreen.tsx`)**:
  - `SafeAreaView (flex: 1)` tránh tai thỏ.
  - `Header` cố định trên đỉnh, không cuộn theo nội dung.
  - `ScrollView (flex: 1)` chứa danh mục `CategoryChips` và lưới sách `BookGrid`, có `paddingBottom: 140` tránh che khuất.
  - `FloatingCartButton` nổi độc lập ở góc dưới-phải màn hình ngoài ScrollView.
- **Bài tập 2: Màn hình Chi tiết sách (`screens/BookDetailScreen.tsx`)**:
  - Nút `← Quay lại`.
  - Ảnh bìa lớn căn giữa (`alignSelf: 'center'`, `width: '70%'`, `aspectRatio: 3/4`, `borderRadius: 12`).
  - Tên sách, tác giả, giá tiền và phần mô tả dài đặt trong `ScrollView (flex: 1)` riêng biệt.
  - Thanh `Thêm vào giỏ` cố định dưới cùng ngoài ScrollView (`flexDirection: 'row'`, `justifyContent: 'space-between'`).

#### **Giờ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng**
- **Bài tập 1: Thanh Tab Bar dưới cùng (`components/TabBar.tsx`)**:
  - Thanh điều hướng cố định ở đáy màn hình gồm 4 mục: Trang chủ (🏠), Danh mục (📂), Giỏ hàng (🛒), Tài khoản (👤).
  - Container `flexDirection: 'row'`, mỗi mục `flex: 1` chia đều 4 phần bằng nhau.
  - Mỗi mục `flexDirection: 'column'`, `alignItems: 'center'`, `justifyContent: 'center'`, mục đang chọn có màu tím Indigo `#4338CA`.
- **Bài tập 2: Màn hình Giỏ hàng (`screens/CartScreen.tsx`)**:
  - Từng dòng sản phẩm `components/CartLineItem.tsx` (ảnh cố định, tên sách `flex: 1`, số lượng + giá `width: 90` cố định).
  - Phân tách 3 vùng không chồng lấp:
    1. Vùng cuộn ở giữa (ScrollView, `flex: 1`).
    2. Vùng tổng tiền + nút Thanh toán cố định (`marginBottom: 64`).
    3. Vùng TabBar cố định ở đáy (`height: 64`).

---

### 2. Cấu trúc thư mục
```text
LeChuan_23695731_Tuan04/
├── App.tsx                     # Điều phối toàn bộ màn hình, TabBar và tương tác
├── data.ts                     # Dữ liệu danh mục, sách và giỏ hàng mẫu
├── index.ts                    # Entry point của Expo
├── package.json                # Dependencies & scripts
├── tsconfig.json               # Cấu hình TypeScript
├── app.json                    # Cấu hình Expo
├── components/
│   ├── Header.tsx              # Thanh header cố định (Giờ 1 & 4)
│   ├── CategoryChips.tsx       # Danh mục chips (Giờ 2 & 4)
│   ├── BookGrid.tsx            # Lưới sách 2 cột & 3 cột (Giờ 2 & 4)
│   ├── DiscountBadge.tsx       # Huy hiệu giảm giá / Mới (Giờ 3 & 4)
│   ├── FloatingCartButton.tsx  # Nút giỏ hàng nổi (Giờ 3 & 4)
│   ├── TabBar.tsx              # Thanh Tab Bar 4 mục ở đáy (Giờ 5 - Bài 1)
│   └── CartLineItem.tsx        # Dòng sản phẩm trong giỏ hàng (Giờ 5 - Bài 2)
├── screens/
│   ├── HomeScreen.tsx          # Màn hình Trang chủ hoàn chỉnh (Giờ 4 - Bài 1)
│   ├── BookDetailScreen.tsx    # Màn hình Chi tiết sách (Giờ 4 - Bài 2)
│   └── CartScreen.tsx          # Màn hình Giỏ hàng 3 vùng (Giờ 5 - Bài 2)
├── screenshots/                # Ảnh chụp màn hình minh chứng chạy thực tế
└── scripts/
    └── generate_report_tuan4.js # Script tạo file Word báo cáo tự động
```

---

### 3. Hướng dẫn chạy ứng dụng
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Chạy ứng dụng trên nền tảng Web:
   ```bash
   npm run web
   # hoặc: npx expo start --web
   ```
   Sau đó mở trình duyệt tại: `http://localhost:8081`

3. Kiểm tra kiểu dữ liệu TypeScript:
   ```bash
   npx tsc --noEmit
   ```
