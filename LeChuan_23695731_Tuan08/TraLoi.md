# BÁO CÁO BÀI TẬP THỰC HÀNH & TRẢ LỜI CÂU HỎI BỔ SUNG (TUẦN 08)
**Chủ đề:** BookStore — Đăng nhập, Giỏ hàng, Đánh giá & Danh sách yêu thích  
**Môn học:** Thiết bị di động (TBDD)  
**Sinh viên thực hiện:** Lê Chuẩn  
**Mã số sinh viên (MSSV):** 23695731  
**Lớp học phần:** DHKTPM19B  
**Đơn vị:** Khoa Công nghệ Thông tin — Trường Đại học Công nghiệp TP. Hồ Chí Minh (IUH)

---

## PHẦN 1. BÁO CÁO CÁC BÀI TẬP ĐÃ HOÀN THÀNH (BT 8.1 — BT 8.8 & THỬ THÁCH)

### 1. Bài tập 8.1 — Màn hình Đăng nhập (LoginScreen)
- **Tệp thực hiện:** `src/screens/LoginScreen.tsx`
- **Nội dung thực hiện:**
  - Khai báo state form (`email`, `password`), validation errors (`errors.email`, `errors.password`), `submitError`, và trạng thái `loading`.
  - Hàm kiểm tra tính hợp lệ sử dụng các hàm chuẩn `validateEmail(email)` và `validatePassword(password)` hiển thị lỗi inline đỏ ngay dưới từng ô nhập.
  - Khi form hợp lệ, gọi API `login(email, password)`.
  - Dispatch action `signIn(user, token)` lưu thông tin đăng nhập vào Redux store.
  - Xử lý điều hướng thông minh: Nếu có tham số `route.params?.redirectTo === "Checkout"`, sử dụng `navigation.replace("Checkout", { total: route.params.total ?? 0 })` để người dùng tiếp tục thanh toán mà không bị rơi vào vòng lặp Back về Login. Ngược lại, điều hướng về màn hình chính `Home`.
  - Tích hợp tính năng mở rộng (Câu hỏi bổ sung 5): Thêm nút 👁 / 🙈 chuyển đổi ẩn/hiện mật khẩu tức thì.

### 2. Bài tập 8.2 — Màn hình Đăng ký (RegisterScreen)
- **Tệp thực hiện:** `src/screens/RegisterScreen.tsx`
- **Nội dung thực hiện:**
  - Khởi tạo form với 4 trường: Họ tên, Email, Mật khẩu, Nhập lại mật khẩu.
  - Kiểm tra điều kiện mật khẩu khớp: Nếu `password !== confirmPassword`, báo lỗi `"Mật khẩu nhập lại không khớp"` dưới ô nhập lại.
  - Gọi API `registerUser(...)` đăng ký tài khoản mới lên json-server.
  - Tự động đăng nhập (auto-login) sau khi đăng ký thành công thông qua hàm `signIn(user, token)`, sau đó kiểm tra `redirectTo` tương tự màn hình Login.

### 3. Bài tập 8.3 — Giữ phiên đăng nhập (usePersistence)
- **Tệp thực hiện:** `src/hooks/usePersistence.ts`
- **Nội dung thực hiện:**
  - `loadAuth()` đọc key `@bookstore/auth` từ AsyncStorage khi ứng dụng khởi động, nếu có thì dispatch `signIn(user, token)` khôi phục phiên người dùng mà không cần nhập lại.
  - Effect lưu phiên: Khi `isLoggedIn === true`, tự động ghi `{ user, token }` vào storage. Khi `isLoggedIn === false` (đăng xuất), xóa key phiên `@bookstore/auth`.

### 4. Bài tập 8.4 — Bảo vệ màn hình Thanh toán (Checkout Protection)
- **Tệp thực hiện:** `src/screens/CartScreen.tsx` và `src/screens/CheckoutScreen.tsx`
- **Nội dung thực hiện:**
  - **Lớp bảo vệ thứ nhất (CartScreen):** Trong hàm `goCheckout()`, kiểm tra `isLoggedIn`. Nếu chưa đăng nhập, chuyển sang `Login` kèm tham số `{ redirectTo: "Checkout", total: finalTotal }`. Nếu đã đăng nhập, vào thẳng `Checkout`.
  - **Lớp bảo vệ thứ hai (CheckoutScreen):** Nếu người dùng bằng cách nào đó mở thẳng Checkout (deep link hoặc route trực tiếp) mà chưa có phiên, màn hình tự động hiển thị thông báo yêu cầu đăng nhập và chuyển hướng sang `Login`.

### 5. Bài tập 8.5 — Đánh giá sách & Xếp hạng sao (RatingStars, BookDetailScreen)
- **Tệp thực hiện:** `src/components/RatingStars.tsx`, `src/screens/BookDetailScreen.tsx`
- **Nội dung thực hiện:**
  - `RatingStars.tsx`: Hỗ trợ 2 chế độ (chỉ đọc và chỉnh sửa tương tác). Khi có callback `onChange`, mỗi ngôi sao được bọc trong `Pressable` hỗ trợ người dùng chạm để chọn số sao (1 đến 5).
  - BT 8.5b: Tính toán điểm trung bình đánh giá bằng `useMemo` phụ thuộc vào mảng `reviews`: `average = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0`.
  - BT 8.5c: Gửi đánh giá mới lên server bằng `addReview(...)`. Khi thành công, thêm ngay review vào đầu danh sách `setReviews((prev) => [created, ...prev])` và tính lại điểm sao tức thì mà không cần reload toàn bộ trang.

### 6. Bài tập 8.6 — Tăng / Giảm số lượng với Local State & Debounce (CartItemRow)
- **Tệp thực hiện:** `src/components/CartItemRow.tsx`
- **Nội dung thực hiện:**
  - Sử dụng local state `const [qty, setQty] = useState(item.quantity)`.
  - Áp dụng hook `useDebounce(qty, 300)`: Người dùng có thể nhấn liên tục `+` hoặc `−` mà giao diện phản hồi mượt mà ngay lập tức. Sau 300ms dừng bấm, giá trị mới đồng bộ lên Redux store thông qua `onChangeQty(item.bookId, debouncedQty)`.
  - Effect đồng bộ ngược: Khi `item.quantity` trong store thay đổi từ nơi khác (AsyncStorage nạp vào hoặc thêm trùng từ màn chi tiết), tự động `setQty(item.quantity)`.
  - Nút `−` bị vô hiệu hóa khi `qty <= 1`; nút `+` bị vô hiệu hóa khi `qty >= item.stock`.
  - Hiển thị văn bản trực quan `"Còn {item.stock} trong kho"`.

### 7. Bài tập 8.7 — Xác nhận xóa sản phẩm & Lưu giỏ hàng tự động
- **Tệp thực hiện:** `src/utils/dialog.ts`, `src/hooks/useAutoPersist.ts`, `src/hooks/usePersistence.ts`
- **Nội dung thực hiện:**
  - BT 8.7a: Bấm nút thùng rác 🗑️ sẽ kích hoạt `confirmDialog` yêu cầu người dùng xác nhận: *"Bạn có chắc muốn xóa cuốn sách này khỏi giỏ hàng?"*. Người dùng bấm "Xóa" mới thực hiện loại bỏ sản phẩm.
  - BT 8.7b: Viết hook generic `useAutoPersist(key, data, ready)` tự động chuyển đổi đối tượng sang chuỗi JSON và lưu vào `AsyncStorage` mỗi khi giỏ hàng hoặc danh sách yêu thích thay đổi (chỉ ghi khi cờ `ready === true`).

### 8. Bài tập 8.8 — Quản lý danh sách Yêu thích (HeartButton, WishlistScreen)
- **Tệp thực hiện:** `src/components/HeartButton.tsx`, `src/screens/WishlistScreen.tsx`
- **Nội dung thực hiện:**
  - BT 8.8a: `HeartButton` kết nối Redux store qua hook `useWishlist()`. Đọc trạng thái `fav = isFavorite(bookId)`: hiển thị trái tim đỏ đặc `♥` khi đã thích và trái tim xám rỗng `♡` khi chưa thích; bấm vào sẽ kích hoạt action `toggle(bookId)`.
  - BT 8.8b: `WishlistScreen` tải toàn bộ sách từ API, lọc sách có ID nằm trong `ids` của wishlist. Hiển thị dạng lưới 2 cột bằng `BookGrid`. Khi danh sách rỗng, hiển thị `EmptyState` với biểu tượng `"💔 Chưa có sách yêu thích"` kèm nút hành động *"Khám phá sách"* điều hướng về trang chủ `Home`.

### 9. Thử thách nâng cao (BT 8.C1 & BT 8.C2)
- **BT 8.C1 — Sách liên quan (BookDetailScreen):**
  - Tải các cuốn sách cùng danh mục với cuốn hiện tại qua `getBooks({ categoryId: book.categoryId })`.
  - Lọc bỏ cuốn sách hiện tại (`x.id !== book.id`).
  - Hiển thị thanh cuộn ngang `FlatList horizontal` ở cuối trang chi tiết bằng `BookCard`. Bấm vào sách liên quan sẽ đẩy màn hình chi tiết mới (`navigation.push`).
- **BT 8.C2 — Mã giảm giá (CartScreen):**
  - Hỗ trợ mã `SALE10` (giảm 10% tổng đơn) và `GIAM50K` (giảm trực tiếp 50.000đ).
  - Kiểm tra mã, hiển thị thông báo thành công màu xanh `"Đã áp dụng..."` hoặc lỗi màu đỏ khi mã sai.
  - Tự động trừ tiền giảm giá và cập nhật tổng tiền thanh toán cuối cùng `finalTotal`.

---

## PHẦN 2. TRẢ LỜI 5 CÂU HỎI BỔ SUNG (SECTION 3)

### Câu 1. Cờ ready trong useAutoPersist
**Câu hỏi:** *Trong useAutoPersist, nếu bỏ điều kiện ready thì chuyện gì xảy ra với giỏ hàng đã lưu khi bạn mở lại app? Giải thích theo thứ tự các lần render.*

**Trả lời:**
- **Hiện tượng:** Nếu bỏ điều kiện `ready`, toàn bộ dữ liệu giỏ hàng mà người dùng đã lưu trước đó trong `AsyncStorage` sẽ bị **ghi đè và mất sạch hoàn toàn (trở về mảng rỗng `[]`)** mỗi khi mở lại ứng dụng.
- **Thứ tự các lần render giải thích:**
  1. **Lần render đầu tiên (Initial Mount):** Ứng dụng khởi động, Redux store khởi tạo `initialState` của cart với mảng rỗng `items: []`. Lúc này, quá trình đọc dữ liệu từ `AsyncStorage` (`loadJSON(CART_KEY)`) là một tác vụ bất đồng bộ (Asynchronous I/O) nên vẫn đang ở chế độ chờ (Pending), chưa thể hoàn thành ngay lập tức.
  2. **Effect chạy sớm:** Nếu không có điều kiện `if (!ready) return;`, hook `useEffect` của `useAutoPersist` sẽ kích hoạt ngay lập tức với dữ liệu hiện tại là mảng rỗng `items: []`. Nó ghi đè chuỗi `"[]"` vào key `@bookstore/cart` trong `AsyncStorage`.
  3. **Đọc xong thì đã muộn:** Khi hàm bất đồng bộ `loadJSON` hoàn tất, nó đọc đúng chuỗi rỗng `"[]"` vừa bị ghi đè thay vì giỏ hàng cũ của phiên trước.
- **Kết luận:** Cờ `ready` đóng vai trò là một "chốt an toàn" (gatekeeper), chỉ bật lên `true` sau khi toàn bộ dữ liệu từ AsyncStorage đã được nạp xong vào Redux store, ngăn chặn hoàn toàn việc ghi đè mảng rỗng ban đầu.

---

### Câu 2. Token giả và rủi ro bảo mật
**Câu hỏi:** *Ở bài này app tự so mật khẩu và tự tạo token. Hãy nêu hai điểm không an toàn. Hệ thống thật thì ai kiểm tra mật khẩu, và token nên lưu ở đâu thay cho AsyncStorage?*

**Trả lời:**
- **Hai điểm không an toàn trong bài thực hành:**
  1. *Lộ thông tin và logic xác thực ở client:* Mật khẩu tài khoản nằm ở dạng văn bản thô (plaintext) trong `db.json` gửi về client, và việc so khớp `user.password === password` được thực hiện hoàn toàn trên máy khách (client-side). Kẻ tấn công có thể dễ dàng dùng công cụ bắt gói tin (Fiddler/Charles Proxy) hoặc xem bộ nhớ máy khách để đọc toàn bộ mật khẩu người dùng.
  2. *Token giả không có chữ ký mã hóa (Signature):* Token trong bài là chuỗi tự tạo không có chữ ký bí mật từ server (`mock-token-${Date.now()}`). Bất kỳ ai cũng có thể tự chế một token giả để mạo danh người dùng hợp lệ mà máy chủ không có cách nào kiểm chứng được tính toàn vẹn.
- **Trong hệ thống thật:**
  - **Bên kiểm tra mật khẩu:** Máy chủ backend (Server) là nơi duy nhất được phép kiểm tra mật khẩu. Mật khẩu gửi lên server qua kết nối HTTPS bảo mật, server băm mật khẩu kèm muối (Salted Hash như bcrypt, argon2) rồi so sánh với bản băm trong cơ sở dữ liệu, sau đó phát hành mã JWT (JSON Web Token) được ký bằng khóa bí mật (Secret Key).
  - **Nơi lưu token:** Token phải được lưu trong vùng nhớ an toàn cấp hệ điều hành bằng thư viện **`expo-secure-store`** (sử dụng **Keychain** trên iOS và **Keystore/EncryptedSharedPreferences** trên Android). Tuyệt đối không lưu token thô trong `AsyncStorage` vì `AsyncStorage` không được mã hóa, dữ liệu lưu dạng text và các mã độc (XSS trên web hoặc root access trên mobile) có thể đánh cắp dễ dàng.

---

### Câu 3. Hai effect trong CartItemRow
**Câu hỏi:** *Thử xóa effect đồng bộ `setQty(item.quantity)`. Với thao tác nào thì số hiển thị trên nút bị lệch so với store?*

**Trả lời:**
- **Thao tác làm lệch hiển thị:** Nếu xóa effect `useEffect(() => { setQty(item.quantity); }, [item.quantity])`, số lượng hiển thị trên component `CartItemRow` sẽ bị lệch (không khớp) so với Redux store trong các trường hợp sau:
  1. *Khôi phục giỏ hàng từ AsyncStorage (Hydration):* Khi app vừa mở, `CartItemRow` mount với `item.quantity` ban đầu (giả sử là 1). Sau khi AsyncStorage đọc xong và dispatch `hydrateCart` cập nhật số lượng thực tế lên store (ví dụ 5 cuốn), nếu không có effect đồng bộ thì local state `qty` vẫn giữ nguyên số 1 cũ.
  2. *Thêm sản phẩm từ màn hình khác:* Khi người dùng đang mở giỏ hàng, sau đó chuyển sang màn hình Chi tiết sách (BookDetailScreen) và bấm nút "Thêm vào giỏ" thêm 1 cuốn nữa, store tăng số lượng từ 2 lên 3. Khi quay lại Giỏ hàng, nút hiển thị trên `CartItemRow` vẫn giữ số 2 do state nội bộ không được thông báo để cập nhật theo prop `item.quantity` mới.
- **Ý nghĩa:** Local state giúp UI phản hồi tức thì khi người dùng bấm tăng/giảm, nhưng prop từ store là chân lý (Single Source of Truth). Effect đồng bộ đảm bảo khi nguồn chân lý thay đổi từ bên ngoài, local state luôn được cập nhật tương ứng.

---

### Câu 4. Một nguồn state (Single Source of Truth) với Wishlist
**Câu hỏi:** *Nếu HeartButton giữ trạng thái bằng useState riêng ở mỗi nơi, tim ở lưới và ở trang chi tiết sẽ khác nhau ra sao? Store giải quyết việc đó thế nào?*

**Trả lời:**
- **Nếu dùng `useState` riêng ở mỗi nơi:**
  - Trạng thái yêu thích của cuốn sách sẽ bị phân mảnh và độc lập ở từng component. Ví dụ: Người dùng bấm tim trên `BookCard` ở màn hình Home (trái tim chuyển sang đỏ), nhưng khi bấm vào xem `BookDetailScreen` thì icon tim ở màn chi tiết vẫn là màu xám rỗng vì nó quản lý bởi một `useState` khác hoàn toàn chưa được cập nhật.
  - Ngược lại, nếu bỏ tim ở màn hình `WishlistScreen`, cuốn sách đó trên màn hình `Home` vẫn giữ nguyên màu đỏ, gây bất nhất dữ liệu nghiêm trọng và phá vỡ trải nghiệm người dùng (UX).
- **Redux Store giải quyết vấn đề:**
  - Redux Store đóng vai trò là **nguồn dữ liệu duy nhất (Single Source of Truth)** lưu trữ mảng `ids: number[]` của toàn bộ sách yêu thích.
  - Mọi component `HeartButton` ở bất kỳ đâu (Home, Danh mục, Chi tiết sách, Danh sách yêu thích) đều gọi chung custom hook `useWishlist()`. Hook này sử dụng `useSelector` để lắng nghe state `wishlist.ids`.
  - Khi một nút tim được bấm, nó dispatch action `toggleWishlist(bookId)`. Ngay lập tức, toàn bộ các `HeartButton` hiển thị cùng mã sách đó trên toàn ứng dụng sẽ nhận được state mới và tự động re-render đồng bộ thành màu đỏ hoặc màu xám cùng lúc.

---

### Câu 5. Code bổ sung — Biểu tượng 👁 ẩn/hiện mật khẩu
**Câu hỏi:** *Thêm biểu tượng 👁 cạnh ô Mật khẩu ở màn Đăng nhập: bấm để hiện/ẩn mật khẩu (gợi ý: một state showPassword điều khiển secureTextEntry). Chụp ảnh màn hình kết quả.*

**Đoạn mã đã triển khai trong `src/screens/LoginScreen.tsx`:**
```tsx
// 1. Khai báo state điều khiển hiển thị mật khẩu
const [showPassword, setShowPassword] = useState(false);

// 2. Giao diện ô nhập mật khẩu có nút bấm icon mắt:
<View style={styles.passwordContainer}>
  <FormField
    label="Mật khẩu"
    placeholder="Nhập mật khẩu..."
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    error={errors.password}
  />
  <Pressable
    style={styles.eyeBtn}
    onPress={() => setShowPassword((prev) => !prev)}
    hitSlop={8}
    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
  >
    <Text style={styles.eyeIcon}>{showPassword ? "👁" : "🙈"}</Text>
  </Pressable>
</View>

// 3. Style định vị nút mắt nằm gọn gàng bên phải ô input:
const styles = StyleSheet.create({
  passwordContainer: {
    position: "relative",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: 36, // Canh giữa theo chiều dọc của ô TextInput
    padding: 4,
    zIndex: 10,
  },
  eyeIcon: {
    fontSize: 18,
  },
});
```

---

## PHẦN 3. BẢNG TỔNG HỢP HÌNH ẢNH MINH CHỨNG KẾT QUẢ CHẠY (SCREENSHOTS)

| STT | Tên tệp ảnh | Nội dung minh chứng |
| :---: | :--- | :--- |
| 1 | `01_login_screen_empty.png` | Màn hình Đăng nhập hiển thị lỗi inline đỏ dưới từng ô khi bỏ trống + nút mắt 👁 ẩn/hiện mật khẩu |
| 2 | `02_register_screen.png` | Màn hình Đăng ký với 4 trường và thông báo lỗi "Mật khẩu nhập lại không khớp" |
| 3 | `03_account_logged_in.png` | Màn hình Tài khoản đã đăng nhập hiển thị thông tin sinh viên Lê Chuẩn (23695731) |
| 4 | `04_book_detail_rating.png` | Trang Chi tiết sách với điểm sao trung bình, danh sách độc giả đánh giá và form viết đánh giá |
| 5 | `05_book_detail_related.png` | Hàng ngang "Sách liên quan" cùng danh mục ở chân trang Chi tiết sách (Thử thách BT 8.C1) |
| 6 | `06_cart_quantity_coupon.png` | Giỏ hàng với nút tăng/giảm có debounce, thông tin tồn kho và mã giảm giá SALE10 (-10%) |
| 7 | `07_cart_confirm_dialog.png` | Hộp thoại modal xác nhận xóa sản phẩm khỏi giỏ hàng "Xác nhận xóa" (BT 8.7a) |
| 8 | `08_checkout_screen.png` | Màn hình Thanh toán được bảo vệ bởi phiên đăng nhập, hiển thị tổng tiền đã giảm giá |
| 9 | `09_wishlist_heart_home.png` | Màn hình Home với các nút tim đỏ ♥ được kích hoạt đồng bộ trên sản phẩm (BT 8.8a) |
| 10 | `10_wishlist_screen.png` | Màn hình Danh sách yêu thích hiển thị lưới 2 cột các sách đã lưu tim (BT 8.8b) |

