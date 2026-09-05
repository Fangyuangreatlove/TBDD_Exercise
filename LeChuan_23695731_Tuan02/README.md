# BÀI TẬP THỰC HÀNH TUẦN 02 - LẬP TRÌNH THIẾT BỊ DI ĐỘNG (IUH)

## Thông tin sinh viên
- **Họ và tên:** Lê Chuẩn
- **MSSV:** 23695731
- **Lớp:** DHKTMP19B
- **Môn học:** Lập trình thiết bị di động
- **Chủ đề:** 30 Bài tập TypeScript Bất Đồng Bộ (Async / Await & Promise)
- **Link Repo:** https://github.com/Fangyuangreatlove/TBDD_Exercise.git

---

## Cấu trúc thư mục
```
LeChuan_23695731_Tuan02/
├── images/                      # Ảnh chụp màn hình kết quả chạy terminal của 30 bài
├── src/
│   ├── exercises/
│   │   ├── bai01.ts             # Bài 01: Promise chuỗi Hello Async
│   │   ├── bai02.ts             # Bài 02: Promise resolve số 10
│   │   ├── ...
│   │   └── bai30.ts             # Bài 30: Promise.allSettled kiểm tra API
│   ├── exercisesData.json       # Metadata của 30 bài tập (mã nguồn, đề bài, giải thích)
│   └── main.ts                  # File thực thi tuần tự 30 bài với log hiển thị đẹp mắt
├── package.json
├── tsconfig.json
├── LeChuan_23695731_Tuan02.docx # File báo cáo Word chuẩn định dạng
└── LeChuan_23695731_Tuan02.pdf  # File báo cáo PDF xuất kèm
```

---

## Hướng dẫn cài đặt và chạy kiểm thử

1. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

2. **Chạy toàn bộ 30 bài tập:**
   ```bash
   npm start
   ```
   Lệnh trên sẽ chạy lệnh: `ts-node src/main.ts` và lần lượt hiển thị kết quả của 30 bài từ Bài 01 đến Bài 30.

3. **Biên dịch TypeScript sang JavaScript:**
   ```bash
   npm run build
   ```
