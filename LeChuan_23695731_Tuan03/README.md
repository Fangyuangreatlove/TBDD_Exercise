# Bài Tập Thực Hành Tuần 03 - Thiết Bị Di Động (React Native)
## Chủ đề: LAYOUT với Flexbox — Ứng dụng BookStore Online

**Sinh viên thực hiện:** Lê Chuẩn  
**Mã số sinh viên (MSSV):** 23695731  
**Lớp học phần:** Thiết bị di động (TBDD) — IUH  

---

### 1. Giới thiệu dự án
Dự án hoàn thành bài tập tổng hợp Giờ 1 + Giờ 2 + Giờ 3 theo tài liệu `Week_3_Layout_UI.pdf`:
- **Header cố định trên cùng** (`components/Header.tsx`): logo bên trái, cụm icon bên phải, đứng yên khi cuộn.
- **Danh mục sản phẩm dạng Chip** (`components/CategoryChips.tsx`): tự động xuống dòng (`flexWrap: 'wrap'`), bo tròn dạng viên thuốc (pill).
- **Lưới sách 2 cột** (`components/BookGrid.tsx`): chia cột bằng phần trăm (`width: '48%'`), ảnh bìa giữ chuẩn tỉ lệ 3:4 (`aspectRatio: 3/4`).
- **Huy hiệu giảm giá / Mới** (`components/DiscountBadge.tsx`): dính sát góc trên-trái bìa sách bằng kỹ thuật `position: 'absolute'` neo theo containing block `position: 'relative'`.
- **Nút giỏ hàng nổi** (`components/FloatingCartButton.tsx`): nổi cố định ở góc dưới-phải màn hình ngoài ScrollView, kèm huy hiệu số lượng sản phẩm (containing block lồng nhau). Khi click vào sách hoặc giỏ hàng, số lượng tự động tăng lên.

---

### 2. Cấu trúc thư mục
```text
LeChuan_23695731_Tuan03/
├── App.tsx                     # Màn hình Trang chủ tổng hợp chính
├── data.ts                     # Dữ liệu danh mục và sách mẫu
├── index.ts                    # Entry point của Expo
├── package.json                # Cấu hình dự án & dependencies
├── tsconfig.json               # Cấu hình TypeScript
├── app.json                    # Cấu hình Expo
├── LeChuan_23695731_Tuan3.docx # File Word báo cáo kết quả chạy và đáp án
├── components/
│   ├── Header.tsx              # Thanh header (Giờ 1)
│   ├── BookRowCard.tsx         # Thẻ sách đơn dạng hàng (Giờ 1)
│   ├── CategoryChips.tsx       # Danh mục chips (Giờ 2)
│   ├── BookGrid.tsx            # Lưới sách 2 cột & 3 cột (Giờ 2 & 3)
│   ├── DiscountBadge.tsx       # Huy hiệu giảm giá / nhãn Mới (Giờ 3)
│   └── FloatingCartButton.tsx  # Nút giỏ hàng nổi (Giờ 3)
└── screenshots/                # Ảnh chụp màn hình minh chứng chạy thực tế
```

---

### 3. Hướng dẫn cài đặt và chạy ứng dụng
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

3. Kiểm tra tính đúng đắn kiểu dữ liệu (TypeScript):
   ```bash
   npx tsc --noEmit
   ```
