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

// Color Palette - Bảng màu sang trọng, học thuật (IUH Navy & Brand Indigo)
const COLOR_PRIMARY = '0B1F5C'; // Deep Navy Header
const COLOR_SECONDARY = '3B3FD8'; // Indigo Accent
const COLOR_ACCENT = '00B8D9'; // Cyan Accent
const COLOR_DANGER = 'DC2626'; // Red Danger
const COLOR_TEXT = '1F2937'; // Slate Dark Text
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
        color: COLOR_SECONDARY,
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
        color: COLOR_SECONDARY,
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
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: cell1Children,
            margins: { top: 60, bottom: 60, left: 60, right: 60 },
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: cell2Children,
            margins: { top: 60, bottom: 60, left: 60, right: 60 },
          }),
        ],
      }),
    ],
  });
}

function createStudentInfoTable() {
  const rowData = [
    ['Họ và tên sinh viên:', 'Lê Chuẩn'],
    ['Mã số sinh viên (MSSV):', '23695731'],
    ['Lớp học phần:', 'DHKTPM19B'],
    ['Môn học:', 'Thiết bị di động (TBDD)'],
    ['Trường đào tạo:', 'Đại học Công nghiệp TP. Hồ Chí Minh (IUH)'],
    ['Chủ đề thực hành:', 'Tuần 08: Đăng nhập, Giỏ hàng, Đánh giá & Danh sách yêu thích'],
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rowData.map(
      ([label, val]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 38, type: WidthType.PERCENTAGE },
              shading: { fill: COLOR_HEADER_BG, type: ShadingType.CLEAR },
              margins: { top: 70, bottom: 70, left: 100, right: 100 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      bold: true,
                      size: 21,
                      color: COLOR_PRIMARY,
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 62, type: WidthType.PERCENTAGE },
              margins: { top: 70, bottom: 70, left: 100, right: 100 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: val,
                      bold: label.includes('Họ và tên') || label.includes('MSSV'),
                      size: 21,
                      color: COLOR_TEXT,
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
    ),
  });
}

async function main() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  const sections = [];

  // =========================================================================
  // BÌA BÁO CÁO & THÔNG TIN SINH VIÊN
  // =========================================================================
  sections.push(
    createTitle('BÁO CÁO KẾT QUẢ THỰC HÀNH BUỔI 08'),
    createSubtitle('HỆ THỐNG BOOKSTORE: ĐĂNG NHẬP, GIỎ HÀNG, ĐÁNH GIÁ & DANH SÁCH YÊU THÍCH'),
    createStudentInfoTable(),
    createParagraph(' ', { after: 120 })
  );

  // =========================================================================
  // PHẦN 1. BÁO CÁO CHI TIẾT CÁC BÀI TẬP THỰC HÀNH (8.1 — 8.8 & THỬ THÁCH)
  // =========================================================================
  sections.push(
    createHeading1('PHẦN 1. BÁO CÁO CHI TIẾT CÁC BÀI TẬP (BT 8.1 — BT 8.8 & THỬ THÁCH)'),
    createParagraph(
      'Trong buổi thực hành 8, toàn bộ các chức năng quản lý phiên người dùng, bảo vệ màn hình thanh toán, quản lý số lượng giỏ hàng bằng Local State kết hợp Debounce, hộp thoại xác nhận xóa, tính năng đánh giá sách, danh sách yêu thích và các bài toán thử thách nâng cao đã được hoàn thiện 100% không còn thẻ TODO nào.'
    )
  );

  // --- 1.1 BT 8.1 & BT 8.2: Đăng nhập & Đăng ký ---
  sections.push(
    createHeading2('1.1. Bài tập 8.1 & 8.2: Màn hình Đăng nhập & Đăng ký tài khoản'),
    createBullet('LoginScreen (BT 8.1)', 'Xây dựng form đăng nhập gồm Email và Mật khẩu. Bắt lỗi nhập liệu inline đỏ dưới từng ô nhập bằng các hàm validateEmail và validatePassword. Hiển thị submitError khi sai mật khẩu, trạng thái loading khi đang gửi request. Hỗ trợ redirectTo: "Checkout" tự động chuyển thẳng sang thanh toán.'),
    createBullet('RegisterScreen (BT 8.2)', 'Form đăng ký gồm 4 trường (Họ tên, Email, Mật khẩu, Nhập lại mật khẩu). Kiểm tra tính khớp của mật khẩu xác nhận: nếu không khớp báo lỗi "Mật khẩu nhập lại không khớp". Đăng ký thành công sẽ tự động đăng nhập (auto-login) và chuyển hướng hợp lý.'),
    createBullet('Tính năng mở rộng (Câu hỏi 5)', 'Tích hợp nút mắt 👁 / 🙈 bên phải ô mật khẩu, cho phép người dùng chuyển đổi linh hoạt giữa chế độ bảo mật (dấu chấm tròn) và hiển thị văn bản rõ ràng.'),
    createCodeBlock(`// LoginScreen: Validate, Submit & Redirection Logic
const submit = async () => {
  const e = { email: validateEmail(email), password: validatePassword(password) };
  setErrors(e);
  if (e.email || e.password) return;
  setLoading(true); setSubmitError(null);
  try {
    const { user, token } = await login(email, password);
    signIn(user, token);
    if (route.params?.redirectTo === "Checkout") {
      navigation.replace("Checkout", { total: route.params.total ?? 0 });
    } else {
      navigation.navigate("Tabs", { screen: "Home" });
    }
  } catch (err) {
    setSubmitError(getErrorMessage(err));
  } finally {
    setLoading(false);
  }
};`),
    createTwoImagesSideBySide(
      path.join(screenshotsDir, '01_login_screen_empty.png'),
      'Hình 1: Màn hình Đăng nhập hiển thị lỗi inline đỏ và nút mắt 👁',
      path.join(screenshotsDir, '02_register_screen.png'),
      'Hình 2: Màn hình Đăng ký kiểm tra lỗi mật khẩu không khớp',
      220,
      430
    )
  );

  // --- 1.2 BT 8.3 & BT 8.4: Giữ phiên & Bảo vệ Checkout ---
  sections.push(
    createHeading2('1.2. Bài tập 8.3 & 8.4: Giữ phiên đăng nhập & Bảo vệ Checkout'),
    createBullet('usePersistence (BT 8.3)', 'Tự động đọc thông tin phiên (@bookstore/auth) từ AsyncStorage khi mở app và khôi phục vào Redux store. Lưu phiên khi đăng nhập và dọn sạch khi đăng xuất.'),
    createBullet('Checkout Protection (BT 8.4)', 'Bảo vệ kép: CartScreen kiểm tra isLoggedIn trước khi bấm "Thanh toán". Nếu chưa đăng nhập, chuyển sang Login kèm tham số redirectTo: "Checkout". Nếu người dùng truy cập trực tiếp CheckoutScreen mà chưa có phiên, màn hình sẽ hiển thị thông báo và chặn lại.'),
    createCodeBlock(`// CartScreen: Bảo vệ route Checkout
const goCheckout = () => {
  if (isLoggedIn) {
    navigation.navigate("Checkout", { total: finalTotal });
  } else {
    navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  }
};`),
    createTwoImagesSideBySide(
      path.join(screenshotsDir, '03_account_logged_in.png'),
      'Hình 3: Màn hình Tài khoản đã đăng nhập (Lê Chuẩn - 23695731)',
      path.join(screenshotsDir, '08_checkout_screen.png'),
      'Hình 4: Màn hình Thanh toán được bảo vệ, hiển thị tổng tiền đã giảm giá',
      220,
      430
    )
  );

  // --- 1.3 BT 8.5 & BT 8.C1: Đánh giá sách & Sách liên quan ---
  sections.push(
    createHeading2('1.3. Bài tập 8.5 & Thử thách BT 8.C1: Đánh giá sách, Xếp hạng sao & Sách liên quan'),
    createBullet('RatingStars (BT 8.5a)', 'Thành phần hiển thị sao dùng chung, hỗ trợ hiển thị điểm thực (4.5★) và cho phép chạm để chọn số sao trong form viết đánh giá.'),
    createBullet('Điểm trung bình (BT 8.5b)', 'Sử dụng useMemo tính toán điểm sao trung bình: average = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0.'),
    createBullet('Gửi đánh giá (BT 8.5c)', 'Kiểm tra chọn sao và nội dung bình luận, gọi addReview(...). Khi gửi thành công, cập nhật ngay vào đầu danh sách setReviews((prev) => [created, ...prev]) mà không phải gọi tải lại toàn trang.'),
    createBullet('Sách liên quan (BT 8.C1)', 'Tải các sách cùng danh mục với cuốn hiện tại qua getBooks({ categoryId }), loại trừ cuốn hiện tại, hiển thị dạng cuộn ngang FlatList horizontal với BookCard.'),
    createCodeBlock(`// BookDetailScreen: Tính điểm TB & Thêm review tức thì
const average = useMemo(() => {
  if (!reviews || reviews.length === 0) return 0;
  return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
}, [reviews]);

const submitReview = async () => {
  if (!user) return;
  if (rating === 0) { setFormError("Vui lòng chọn số sao"); return; }
  if (!comment.trim()) { setFormError("Vui lòng nhập bình luận"); return; }
  setSending(true);
  try {
    const created = await addReview({ bookId, userId: user.id, userName: user.name, rating, comment: comment.trim() });
    setReviews((prev) => [created, ...prev]);
    setRating(0); setComment("");
  } catch (e) {
    setFormError(getErrorMessage(e));
  } finally {
    setSending(false);
  }
};`),
    createTwoImagesSideBySide(
      path.join(screenshotsDir, '04_book_detail_rating.png'),
      'Hình 5: Trang Chi tiết sách với điểm trung bình và form đánh giá',
      path.join(screenshotsDir, '05_book_detail_related.png'),
      'Hình 6: Hàng ngang "Sách liên quan" cùng danh mục ở cuối trang (BT 8.C1)',
      220,
      430
    )
  );

  // --- 1.4 BT 8.6, BT 8.7 & BT 8.C2: Giỏ hàng, Debounce, Hộp thoại & Mã giảm giá ---
  sections.push(
    createHeading2('1.4. Bài tập 8.6, 8.7 & Thử thách BT 8.C2: Quản lý giỏ hàng & Mã giảm giá'),
    createBullet('CartItemRow (BT 8.6)', 'Kết hợp local state const [qty, setQty] = useState(item.quantity) với useDebounce(qty, 300). Người dùng bấm liên tục nút + hoặc − giao diện cập nhật mượt mà tức thì; sau 300ms dừng bấm mới sync ra store. Vô hiệu hóa nút khi chạm giới hạn tồn kho.'),
    createBullet('Xác nhận xóa (BT 8.7a)', 'Bấm thùng rác kích hoạt hộp thoại xác nhận confirmDialog với nút Hủy và Xóa.'),
    createBullet('Tự động lưu (BT 8.7b)', 'Hook useAutoPersist tự động ghi dữ liệu giỏ hàng vào AsyncStorage khi cờ ready === true.'),
    createBullet('Mã giảm giá (BT 8.C2)', 'Hỗ trợ mã SALE10 (giảm 10%) và GIAM50K (giảm 50.000đ), tính toán và trừ tiền vào finalTotal.'),
    createCodeBlock(`// CartItemRow: Local state + Debounce 300ms
const [qty, setQty] = useState(item.quantity);
const debouncedQty = useDebounce(qty, 300);

useEffect(() => {
  if (debouncedQty !== item.quantity) {
    onChangeQty(item.bookId, debouncedQty);
  }
}, [debouncedQty, item.bookId, item.quantity, onChangeQty]);

useEffect(() => {
  setQty(item.quantity);
}, [item.quantity]);`),
    createTwoImagesSideBySide(
      path.join(screenshotsDir, '06_cart_quantity_coupon.png'),
      'Hình 7: Giỏ hàng với nút tăng/giảm, thông tin tồn kho và mã SALE10',
      path.join(screenshotsDir, '07_cart_confirm_dialog.png'),
      'Hình 8: Hộp thoại modal xác nhận xóa sản phẩm khỏi giỏ hàng',
      220,
      430
    )
  );

  // --- 1.5 BT 8.8: Danh sách yêu thích (Wishlist) ---
  sections.push(
    createHeading2('1.5. Bài tập 8.8: Quản lý danh sách Yêu thích (Single Source of Truth)'),
    createBullet('HeartButton (BT 8.8a)', 'Nút trái tim dùng chung trên BookCard và Chi tiết sách, kết nối Redux store qua hook useWishlist(). Hiển thị ♥ đỏ khi đã thích và ♡ xám khi chưa.'),
    createBullet('WishlistScreen (BT 8.8b)', 'Lấy danh sách sách từ API, lọc theo mảng IDs trong Redux store bằng useMemo. Hiển thị dạng lưới 2 cột qua BookGrid; nếu danh sách rỗng hiển thị EmptyState "Chưa có sách yêu thích".'),
    createCodeBlock(`// WishlistScreen: Lọc sách yêu thích từ store Redux
export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  const { ids } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const list = await getBooks();
      setBooks(list);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const favorites = useMemo(() => {
    return books.filter((b) => ids.includes(b.id));
  }, [books, ids]);
  ...
}`),
    createTwoImagesSideBySide(
      path.join(screenshotsDir, '09_wishlist_heart_home.png'),
      'Hình 9: Màn hình Home với nút tim đỏ ♥ được kích hoạt đồng bộ',
      path.join(screenshotsDir, '10_wishlist_screen.png'),
      'Hình 10: Màn hình Danh sách yêu thích hiển thị lưới sách đã lưu',
      220,
      430
    )
  );

  // =========================================================================
  // PHẦN 2. TRẢ LỜI 5 CÂU HỎI BỔ SUNG (SECTION 3)
  // =========================================================================
  sections.push(
    createHeading1('PHẦN 2. TRẢ LỜI 5 CÂU HỎI BỔ SUNG (SECTION 3)'),

    createHeading2('Câu 1. Ý nghĩa của cờ ready trong useAutoPersist'),
    createParagraph('Câu hỏi: Trong useAutoPersist, nếu bỏ điều kiện ready thì chuyện gì xảy ra với giỏ hàng đã lưu khi bạn mở lại app? Giải thích theo thứ tự các lần render.', { italic: true }),
    createParagraph('Trả lời:', { bold: true }),
    createBullet('Hiện tượng xảy ra', 'Nếu bỏ điều kiện ready, toàn bộ giỏ hàng cũ đã lưu trong AsyncStorage của người dùng sẽ bị xóa sạch và ghi đè bằng một mảng rỗng [] mỗi khi mở lại ứng dụng.'),
    createBullet('Thứ tự các lần render giải thích', '1) Render 1: Khi ứng dụng vừa khởi động, Redux store khởi tạo state giỏ hàng mặc định là rỗng (items: []). Lúc này, thao tác đọc AsyncStorage (loadJSON) là một tác vụ I/O bất đồng bộ nên chưa hoàn thành ngay.\n2) Chạy sớm effect: Nếu không có chốt if (!ready) return;, useEffect của useAutoPersist sẽ lập tức ghi mảng rỗng items: [] vào storage.\n3) Khi đọc xong: AsyncStorage đã bị ghi đè dữ liệu rỗng từ trước, dẫn tới mất hoàn toàn giỏ hàng của phiên làm việc cũ.'),
    createBullet('Kết luận', 'Cờ ready đảm bảo hệ thống chỉ cho phép tự động lưu sau khi quá trình đọc và khôi phục (Hydration) từ bộ nhớ hoàn tất 100%.'),

    createHeading2('Câu 2. Token giả và rủi ro bảo mật trong thực tế'),
    createParagraph('Câu hỏi: Ở bài này app tự so mật khẩu và tự tạo token. Hãy nêu hai điểm không an toàn. Hệ thống thật thì ai kiểm tra mật khẩu, và token nên lưu ở đâu thay cho AsyncStorage?', { italic: true }),
    createParagraph('Trả lời:', { bold: true }),
    createBullet('Hai điểm không an toàn trong bài', '1) Lộ dữ liệu & xác thực Client-side: Mật khẩu nằm ở dạng văn bản thô (plaintext) trong tệp db.json gửi về app, logic kiểm tra mật khẩu chạy trên máy khách nên kẻ tấn công có thể dễ dàng xem trộm bộ nhớ hoặc bắt gói tin để đánh cắp.\n2) Token giả mạo: Token chỉ là một chuỗi ngẫu nhiên không có chữ ký mã hóa từ máy chủ (mock-token-...), bất kỳ ai cũng có thể tự sinh một chuỗi để mạo danh người dùng hợp lệ.'),
    createBullet('Hệ thống thực tế', '1) Bên kiểm tra mật khẩu: Phải là máy chủ Backend. Mật khẩu được băm an toàn kèm muối (Salted Hash như bcrypt/argon2) và so sánh trong Database, sau đó server cấp phát JWT có chữ ký số bí mật (Secret Key).\n2) Nơi lưu token: Phải lưu trong vùng nhớ an toàn cấp phần cứng của hệ điều hành thông qua expo-secure-store (sử dụng Keychain trên iOS và Keystore trên Android). Tuyệt đối không lưu token nhạy cảm trong AsyncStorage vì không được mã hóa.'),

    createHeading2('Câu 3. Hai effect trong CartItemRow & Hiện tượng lệch dữ liệu'),
    createParagraph('Câu hỏi: Thử xóa effect đồng bộ setQty(item.quantity). Với thao tác nào thì số hiển thị trên nút bị lệch so với store?', { italic: true }),
    createParagraph('Trả lời:', { bold: true }),
    createBullet('Thao tác làm lệch hiển thị', 'Nếu xóa effect đồng bộ setQty(item.quantity), local state qty của component sẽ không nhận biết được sự thay đổi của store từ bên ngoài trong 2 tình huống:\n1) Khôi phục dữ liệu giỏ hàng: Khi mở app, CartItemRow được mount với số lượng ban đầu (1). Sau khi AsyncStorage nạp dữ liệu thật lên store (ví dụ 4), nút vẫn hiển thị số 1 cũ.\n2) Thêm trùng sách từ màn hình khác: Khi người dùng đang ở giỏ hàng, sau đó chuyển sang màn Chi tiết sách và bấm "Thêm vào giỏ" thêm 1 cuốn, store tăng số lượng từ 2 lên 3. Khi quay lại giỏ, nút trên hàng vẫn hiện 2 do state cục bộ không được đồng bộ theo prop mới.'),
    createBullet('Ý nghĩa kiến trúc', 'Local state giúp UI phản hồi tức thì với thao tác bấm liên tục của người dùng, nhưng effect đồng bộ đảm bảo nguồn chân lý từ store luôn chi phối và cập nhật UI khi có biến động từ bên ngoài.'),

    createHeading2('Câu 4. Một nguồn state (Single Source of Truth) với Wishlist'),
    createParagraph('Câu hỏi: Nếu HeartButton giữ trạng thái bằng useState riêng ở mỗi nơi, tim ở lưới và ở trang chi tiết sẽ khác nhau ra sao? Store giải quyết việc đó thế nào?', { italic: true }),
    createParagraph('Trả lời:', { bold: true }),
    createBullet('Nếu mỗi nơi dùng useState riêng', 'Trạng thái yêu thích sẽ bị phân mảnh và độc lập giữa các màn hình: Người dùng bấm tim đỏ ở thẻ sách tại trang chủ Home, nhưng khi mở trang Chi tiết sách thì tim vẫn màu xám; hoặc khi bỏ tim ở màn hình Yêu thích thì trang chủ vẫn giữ tim đỏ, gây sai lệch dữ liệu nghiêm trọng.'),
    createBullet('Redux Store giải quyết', 'Redux Store đóng vai trò là một nguồn dữ liệu chân lý duy nhất (Single Source of Truth) lưu trữ danh sách ID sách yêu thích. Tất cả các nút tim ở mọi nơi đều lắng nghe cùng một mảng ids qua custom hook useWishlist(). Khi người dùng bấm tim ở bất kỳ đâu, action toggleWishlist được dispatch làm thay đổi store, khiến tất cả các nút tim trên toàn ứng dụng lập tức re-render đồng bộ thành đỏ hoặc xám cùng lúc.'),

    createHeading2('Câu 5. Mã nguồn bổ sung biểu tượng 👁 ẩn/hiện mật khẩu'),
    createParagraph('Câu hỏi: Thêm biểu tượng 👁 cạnh ô Mật khẩu ở màn Đăng nhập: bấm để hiện/ẩn mật khẩu. Chụp ảnh màn hình kết quả.', { italic: true }),
    createParagraph('Trả lời:', { bold: true }),
    createParagraph('Đoạn mã đã triển khai trong LoginScreen.tsx:'),
    createCodeBlock(`// Khai báo state điều khiển hiển thị mật khẩu
const [showPassword, setShowPassword] = useState(false);

// JSX: FormField kết hợp nút Pressable icon mắt
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
</View>`)
  );

  // =========================================================================
  // PHẦN 3. BẢNG TỔNG KẾT & KẾT LUẬN
  // =========================================================================
  const summaryRows = [
    ['1', '01_login_screen_empty.png', 'Màn hình Đăng nhập có lỗi validate inline đỏ + nút mắt 👁', 'Hoàn thành 100%'],
    ['2', '02_register_screen.png', 'Màn hình Đăng ký 4 ô nhập với lỗi mật khẩu không khớp', 'Hoàn thành 100%'],
    ['3', '03_account_logged_in.png', 'Màn hình Tài khoản sinh viên Lê Chuẩn (23695731) đã đăng nhập', 'Hoàn thành 100%'],
    ['4', '04_book_detail_rating.png', 'Trang Chi tiết sách: điểm sao trung bình, đánh giá và form viết đánh giá', 'Hoàn thành 100%'],
    ['5', '05_book_detail_related.png', 'Hàng ngang "Sách liên quan" cùng danh mục ở chân trang (BT 8.C1)', 'Hoàn thành 100%'],
    ['6', '06_cart_quantity_coupon.png', 'Giỏ hàng với nút −/+, thông tin tồn kho và mã giảm giá SALE10', 'Hoàn thành 100%'],
    ['7', '07_cart_confirm_dialog.png', 'Hộp thoại modal xác nhận xóa sản phẩm khỏi giỏ hàng (BT 8.7a)', 'Hoàn thành 100%'],
    ['8', '08_checkout_screen.png', 'Màn hình Thanh toán được bảo vệ bởi phiên đăng nhập', 'Hoàn thành 100%'],
    ['9', '09_wishlist_heart_home.png', 'Màn hình Home với các nút tim đỏ ♥ được đồng bộ từ store', 'Hoàn thành 100%'],
    ['10', '10_wishlist_screen.png', 'Màn hình Danh sách yêu thích hiển thị lưới sách đã lưu (BT 8.8b)', 'Hoàn thành 100%'],
  ];

  const summaryTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: ['STT', 'Tên tệp ảnh minh chứng', 'Mô tả tính năng thực hiện', 'Đánh giá'].map(
          (h) =>
            new TableCell({
              shading: { fill: COLOR_HEADER_BG, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: h, bold: true, size: 20, color: COLOR_PRIMARY, font: 'Arial' })],
                }),
              ],
            })
        ),
      }),
      ...summaryRows.map(
        ([stt, filename, desc, status]) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: 8, type: WidthType.PERCENTAGE },
                margins: { top: 60, bottom: 60, left: 60, right: 60 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: stt, size: 20, font: 'Arial' })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 36, type: WidthType.PERCENTAGE },
                margins: { top: 60, bottom: 60, left: 60, right: 60 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: filename, bold: true, size: 20, color: COLOR_SECONDARY, font: 'Consolas' })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 42, type: WidthType.PERCENTAGE },
                margins: { top: 60, bottom: 60, left: 60, right: 60 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: desc, size: 20, font: 'Arial' })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 14, type: WidthType.PERCENTAGE },
                margins: { top: 60, bottom: 60, left: 60, right: 60 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: status, bold: true, size: 19, color: '16A34A', font: 'Arial' })],
                  }),
                ],
              }),
            ],
          })
      ),
    ],
  });

  sections.push(
    createHeading1('PHẦN 3. BẢNG TỔNG KẾT MINH CHỨNG & KẾT LUẬN'),
    createParagraph('Dưới đây là bảng tổng hợp 10 hình ảnh chụp màn hình minh chứng kết quả chạy thực tế của toàn bộ các bài tập:'),
    summaryTable,
    createParagraph(' ', { after: 100 }),
    createParagraph(
      'KẾT LUẬN: Bài thực hành Tuần 08 đã hoàn thành xuất sắc toàn bộ các bài tập từ BT 8.1 đến BT 8.8, 2 bài tập thử thách BT 8.C1, BT 8.C2, và 5 câu hỏi bổ sung. Ứng dụng hoạt động mượt mà, đúng chuẩn thiết kế kiến trúc Redux Toolkit, cơ chế đồng bộ bất đồng bộ an toàn và giao diện chuyên nghiệp.',
      { bold: true, color: COLOR_PRIMARY }
    )
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: sections,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath1 = path.join(__dirname, '..', 'LeChuan_23695731_Tuan08.docx');
  const outPath2 = 'C:\\TBDD\\LeChuan_23695731_Tuan08.docx';

  fs.writeFileSync(outPath1, buffer);
  fs.writeFileSync(outPath2, buffer);

  console.log(`Word report generated successfully:`);
  console.log(`- ${outPath1} (${Math.round(buffer.length / 1024)} KB)`);
  console.log(`- ${outPath2} (${Math.round(buffer.length / 1024)} KB)`);
}

main().catch((err) => {
  console.error('Error generating docx:', err);
  process.exit(1);
});

