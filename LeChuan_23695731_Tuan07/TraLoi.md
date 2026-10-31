# BÁO CÁO TRẢ LỜI CÂU HỎI BỔ SUNG & THỬ THÁCH (TUẦN 07)
**Môn học:** Thiết bị di động (TBDD)  
**Sinh viên thực hiện:** Lê Chuẩn  
**Mã số sinh viên (MSSV):** 23695731  
**Lớp học phần:** DHKTPM19B  
**Đơn vị:** Trường Đại học Công nghiệp TP. Hồ Chí Minh (IUH)

---

## PHẦN 3. CÂU HỎI BỔ SUNG

### Câu 1. Cấu trúc điều hướng (Navigation Architecture)
**Câu hỏi:** *Vì sao `BookDetail` được đăng ký ở Stack mà không đặt trong Tab? Nếu đặt vào Tab thì màn hình sẽ khác đi thế nào?*

**Trả lời:**
- **Lý do đăng ký ở Stack:** Trong cấu trúc điều hướng phân cấp (Nested Navigation), màn hình `BookDetail` (Chi tiết sách) là một màn hình con cấp sâu mang tính ngữ cảnh (contextual screen). Khi đặt ở RootStack bên ngoài TabNavigator, `BookDetail` sẽ chiếm toàn bộ không gian hiển thị (fullscreen), tự động che khuất (overlay) thanh CustomTabBar phía dưới, đồng thời tự động nhận thanh Header có nút mũi tên quay lại (`←`) giúp người dùng tập trung xem thông tin và quay về màn trước dễ dàng.
- **Nếu đặt vào Tab:** Màn hình `BookDetail` sẽ biến thành một Tab ngang hàng với Home, Danh mục, Giỏ hàng. Khi đó:
  1. Thanh CustomTabBar ở dưới chân màn hình vẫn sẽ hiển thị, gây tốn diện tích và vi phạm quy chuẩn UX của ứng dụng thương mại điện tử (không ai để tab bar ở trang chi tiết sản phẩm).
  2. Màn hình sẽ không có nút quay lại (`←`) mặc định của Stack Header, khiến người dùng không thể bấm "Back" về đúng vị trí sách vừa chọn mà phải bấm chuyển tab thủ công.

---

### Câu 2. Quản lý trạng thái Redux & Immer, Tối ưu hoá useMemo
**Câu hỏi:** *Trong reducer viết `state.items.push(...)` mà sao state gốc không bị sửa trực tiếp? Thử bỏ `useMemo` trong `useCart`: kết quả hiển thị có đổi không, và có hậu quả gì?*

**Trả lời:**
- **Cơ chế Redux Toolkit & Immer:** Redux Toolkit tích hợp sẵn thư viện **Immer**. Khi thực thi một case reducer, đối số `state` nhận vào thực chất không phải là state gốc mà là một đối tượng đại diện gọi là **Proxy/Draft State** (bản nháp). Lệnh `state.items.push(...)` chỉ thao tác biến đổi trên bản nháp này. Sau khi reducer chạy xong, Immer sẽ tự động so sánh bản nháp với state cũ và tạo ra một đối tượng state mới bất biến (immutable state) hoàn toàn mới.
- **Nếu bỏ `useMemo` trong `useCart`:**
  - *Về kết quả hiển thị:* Kết quả hiển thị **hoàn toàn không thay đổi**, số lượng và tổng tiền vẫn được tính đúng.
  - *Về hiệu năng & hậu quả:* Mỗi lần component gọi `useCart` bị re-render (ví dụ khi màn hình cha render lại do state khác, do gõ bàn phím, hoạt ảnh...), hàm `reduce` tính tổng tiền và số lượng sẽ bị thực thi lại từ đầu dù mảng `items` không hề thay đổi. Với giỏ hàng lớn hoặc trong các ứng dụng phức tạp, việc tính toán lặp lại không cần thiết này sẽ gây lãng phí CPU và làm giảm độ mượt (lag/drop FPS) của giao diện. `useMemo` giúp giữ lại giá trị đã nhớ (memoized) và chỉ tính lại khi mảng `items` thực sự biến đổi.

---

### Câu 3. Xử lý bất đồng bộ Promise.all & Đánh đổi với Promise.allSettled
**Câu hỏi:** *Nếu `getCategories()` lỗi còn `getBooks()` thành công thì Home hiện gì? Tìm cách để vẫn hiện được danh sách sách (gợi ý: `Promise.allSettled`) và nói rõ cách đó phải đánh đổi gì.*

**Trả lời:**
- **Khi dùng `Promise.all`:** Cơ chế của `Promise.all` là "fail-fast" (một request lỗi là cả cụm thất bại ngay lập tức). Do đó, nếu `getCategories()` bị lỗi (dù `getBooks()` thành công), khối `catch` sẽ kích hoạt và màn hình Home lập tức chuyển sang trạng thái lỗi `<ErrorView>` với thông báo lỗi tiếng Việt và nút "Thử lại", khiến toàn bộ danh sách sách không thể hiển thị được.
- **Giải pháp dùng `Promise.allSettled`:**
  ```typescript
  const [booksResult, categoriesResult] = await Promise.allSettled([
    getBooks(),
    getCategories()
  ]);

  if (booksResult.status === "fulfilled") {
    setBooks(booksResult.value);
  }
  if (categoriesResult.status === "fulfilled") {
    setCategories(categoriesResult.value);
  }
  ```
- **Sự đánh đổi:**
  - *Lợi ích:* Giao diện chịu lỗi tốt hơn (resilient/graceful degradation) — người dùng vẫn xem và mua được sách bình thường dù chip danh mục bị thiếu.
  - *Đánh đổi:* Phải tự viết logic bóc tách kết quả phức tạp hơn; giao diện sẽ bị khuyết một phần (thiếu CategoryChips) mà người dùng có thể không biết là do lỗi mạng; phải thiết kế cơ chế thông báo lỗi cục bộ (toast/snackbar) cho từng phần thay vì một ErrorView tập trung duy nhất.

---

### Câu 4. Tối ưu hoá tìm kiếm với Debounce (useDebounce)
**Câu hỏi:** *Vì sao không đặt `setTimeout` thẳng trong `onChangeText`? Hàm dọn dẹp (`return () => clearTimeout`) giúp tránh lỗi gì?*

**Trả lời:**
- **Không đặt `setTimeout` thẳng trong `onChangeText`:** Nếu chỉ gọi `setTimeout` trong callback `onChangeText` mà không có cơ chế lưu vết và hủy bỏ (cancel), thì mỗi một ký tự gõ vào (ví dụ gõ 10 chữ cái liên tiếp) sẽ sinh ra một timer độc lập. Sau khoảng delay (400ms), **cả 10 timer đều lần lượt kích hoạt**, gây ra 10 lần lọc liên tiếp — việc này chỉ làm các thao tác lọc diễn ra chậm trễ hơn chứ không hề gộp được thao tác gõ (không đạt được bản chất của Debounce).
- **Vai trò của hàm dọn dẹp (`return () => clearTimeout(timer)`):**
  1. *Nguyên lý debounce chuẩn:* Mỗi khi người dùng gõ ký tự mới trước khi hết 400ms, effect cũ bị cleanup và timer cũ bị hủy ngay lập tức, chỉ giữ lại timer của ký tự cuối cùng.
  2. *Tránh Memory Leak & Crash:* Khi người dùng gõ từ khóa rồi nhanh chóng chuyển màn hình hoặc đóng tìm kiếm khiến component bị unmount, nếu timer vẫn chạy và gọi `setState` sau đó, React sẽ cảnh báo lỗi cập nhật trạng thái trên component đã hủy (*Can't perform a React state update on an unmounted component*). Hàm cleanup giúp loại bỏ hoàn toàn nguy cơ rò rỉ bộ nhớ này.

---

### Câu 5. Mở rộng tính năng Sắp xếp giá (Price Sorting)
**Câu hỏi:** *Thêm tuỳ chọn sắp xếp “Giá tăng dần / giảm dần” cho Home. Chỉ cần thêm một state và sửa một chỗ trong `visibleBooks`. Viết đoạn code bổ sung.*

**Trả lời & Đoạn mã thực thi:**
- **Thêm State quản lý thứ tự sắp xếp:**
  ```typescript
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  ```
- **Cập nhật logic `visibleBooks` trong `useMemo`:**
  ```typescript
  const visibleBooks = useMemo(() => {
    let result = filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    });

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
  ```
- **Nút bấm chuyển đổi trên giao diện:**
  ```typescript
  const toggleSortOrder = () => {
    if (sortOrder === null) setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder(null);
  };
  ```

---

## PHẦN THỬ THÁCH (CHALLENGES C1 & C2)

### Thử thách BT7.C1: Wishlist & Adapter Pattern
- **Mã nguồn `wishlistSlice.ts`:**
  ```typescript
  toggleWishlist(state, action: PayloadAction<number>) {
    const id = action.payload;
    const index = state.ids.indexOf(id);
    if (index >= 0) {
      state.ids.splice(index, 1);
    } else {
      state.ids.push(id);
    }
  }
  ```
- **Giải thích kiến trúc Adapter Pattern:**
  Component giao diện chỉ tương tác thông qua custom hook `useWishlist()` (`{ ids, isFavorite, toggle }`). Toàn bộ việc kết nối với Redux Dispatcher và Redux Store nằm gọn trong `src/store/hooks.ts`. Nếu sau này dự án đổi thư viện quản lý trạng thái từ Redux Toolkit sang Zustand, MobX hay Recoil, lập trình viên chỉ cần viết lại nội dung bên trong file `hooks.ts` mà **không cần chỉnh sửa bất kỳ dòng mã nào ở các màn hình UI (`BookDetailScreen`, v.v.)**.

### Thử thách BT7.C2: Lọc khoảng giá kết hợp (PriceFilter)
- **Mã nguồn `inRange` trong `filters.ts`:**
  ```typescript
  export const inRange = (price: number, r: PriceRange): boolean => {
    if (r === null) return true;
    if (r === "lt100") return price < 100000;
    if (r === "100to300") return price >= 100000 && price <= 300000;
    if (r === "gt300") return price > 300000;
    return true;
  };
  ```
- **Hoạt động đồng thời:** Bộ lọc giá kết hợp mượt mà với từ khóa và danh mục theo điều kiện `AND`: `matchesKeyword && matchesCategory && matchesPrice`.
