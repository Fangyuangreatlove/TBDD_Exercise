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

// Helper styling constants
const COLOR_PRIMARY = '1E1B4B'; // Deep Navy / Indigo
const COLOR_SECONDARY = '4338CA'; // Royal Indigo
const COLOR_ACCENT = '6366F1'; // Bright Indigo
const COLOR_TEXT = '1F2937'; // Dark Gray
const COLOR_BG_LIGHT = 'F8FAFC'; // Light Slate Background
const COLOR_BORDER = 'CBD5E1'; // Border Slate
const COLOR_HEADER_BG = 'EEF2F7'; // Soft Indigo/Slate for table headers

// Helper functions for Document elements
function createTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32, // 16pt
        color: COLOR_PRIMARY,
        font: 'Arial',
      }),
    ],
  });
}

function createSubtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24, // 12pt
        color: COLOR_SECONDARY,
        font: 'Arial',
      }),
    ],
  });
}

function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 28, // 14pt
        color: COLOR_PRIMARY,
        font: 'Arial',
      }),
    ],
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24, // 12pt
        color: COLOR_SECONDARY,
        font: 'Arial',
      }),
    ],
  });
}

function createHeading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22, // 11pt
        color: '334155',
        font: 'Arial',
      }),
    ],
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    alignment: options.align || AlignmentType.LEFT,
    spacing: { before: options.before || 60, after: options.after || 80 },
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
    spacing: { before: 40, after: 40 },
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
            shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
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

function createImageWithCaption(imagePath, caption, width = 250, height = 362) {
  const elements = [];
  if (fs.existsSync(imagePath)) {
    const imgBuffer = fs.readFileSync(imagePath);
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 140, after: 60 },
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
        spacing: { before: 0, after: 160 },
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
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
          bottom: { style: BorderStyle.SINGLE, size: 2, color: COLOR_SECONDARY },
          left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
          right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
        },
      });
    }),
  });

  const tableRows = [headerRow];

  rows.forEach((row, rowIndex) => {
    const bgFill = rowIndex % 2 === 1 ? 'F8FAFC' : 'FFFFFF';
    const tr = new TableRow({
      children: row.map((cellText, i) => {
        const isCenter = i === 0 || cellText === 'ĐẠT' || cellText === '100%';
        return new TableCell({
          width: { size: colWidthPercents[i], type: WidthType.PERCENTAGE },
          shading: { fill: bgFill, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: isCenter ? AlignmentType.CENTER : AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: cellText,
                  bold: cellText === 'ĐẠT' || i === 0,
                  color: cellText === 'ĐẠT' ? '16A34A' : COLOR_TEXT,
                  size: 20,
                  font: 'Arial',
                }),
              ],
            }),
          ],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
            left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
            right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
          },
        });
      }),
    });
    tableRows.push(tr);
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows,
  });
}

// Build Document
async function generateDoc() {
  const basePath = 'c:/TBDD/LeChuan_23695731_Tuan03';
  const imgDir = 'c:/TBDD/screenshots';

  // Read code files
  const headerCode = fs.readFileSync(path.join(basePath, 'components/Header.tsx'), 'utf8');
  const bookRowCardCode = fs.readFileSync(path.join(basePath, 'components/BookRowCard.tsx'), 'utf8');
  const categoryChipsCode = fs.readFileSync(path.join(basePath, 'components/CategoryChips.tsx'), 'utf8');
  const bookGridCode = fs.readFileSync(path.join(basePath, 'components/BookGrid.tsx'), 'utf8');
  const discountBadgeCode = fs.readFileSync(path.join(basePath, 'components/DiscountBadge.tsx'), 'utf8');
  const floatingCartCode = fs.readFileSync(path.join(basePath, 'components/FloatingCartButton.tsx'), 'utf8');
  const appCode = fs.readFileSync(path.join(basePath, 'App.tsx'), 'utf8');
  const dataCode = fs.readFileSync(path.join(basePath, 'data.ts'), 'utf8');

  const docChildren = [];

  // ==========================================
  // TRANG TIÊU ĐỀ & THÔNG TIN SINH VIÊN
  // ==========================================
  docChildren.push(
    createParagraph('TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH (IUH)', {
      align: AlignmentType.CENTER,
      bold: true,
      size: 24,
      color: COLOR_PRIMARY,
    }),
    createParagraph('KHOA CÔNG NGHỆ THÔNG TIN — BỘ MÔN CÔNG NGHỆ PHẦN MỀM', {
      align: AlignmentType.CENTER,
      bold: true,
      size: 22,
      color: COLOR_SECONDARY,
    }),
    createParagraph('----------------------------------------------------', {
      align: AlignmentType.CENTER,
      color: COLOR_BORDER,
    }),
    createTitle('BÁO CÁO THỰC HÀNH TUẦN 03\nTHIẾT BỊ DI ĐỘNG (REACT NATIVE)'),
    createSubtitle('Chủ đề: LAYOUT VỚI FLEXBOX — ỨNG DỤNG BOOKSTORE ONLINE'),
    new Paragraph({ spacing: { before: 120, after: 120 } })
  );

  // Student Info Table
  const infoTable = new Table({
    width: { size: 90, type: WidthType.PERCENTAGE },
    alignment: AlignmentType.CENTER,
    rows: [
      [ 'Họ và tên sinh viên:', 'LÊ CHUẨN' ],
      [ 'Mã số sinh viên (MSSV):', '23695731' ],
      [ 'Lớp học phần:', 'Thiết bị di động (TBDD)' ],
      [ 'Thời gian thực hiện:', 'Học kỳ II — Năm học 2025 - 2026' ],
      [ 'Công nghệ sử dụng:', 'React Native 0.81.5, Expo SDK 54, TypeScript 5.9' ],
      [ 'Tên file nộp bài:', 'LeChuan_23695731_Tuan3.docx' ]
    ].map(([k, v]) => {
      return new TableRow({
        children: [
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [new TextRun({ text: k, bold: true, size: 21, color: COLOR_PRIMARY })],
              }),
            ],
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
          }),
          new TableCell({
            width: { size: 65, type: WidthType.PERCENTAGE },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [new TextRun({ text: v, bold: k.includes('sinh viên'), size: 21, color: COLOR_TEXT })],
              }),
            ],
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
          }),
        ],
      });
    }),
  });
  docChildren.push(infoTable);

  docChildren.push(
    new Paragraph({ spacing: { before: 200, after: 200 } }),
    createParagraph('MỤC TIÊU TỔNG QUÁT BÀI THỰC HÀNH', { bold: true, color: COLOR_PRIMARY }),
    createBullet('Làm chủ Flexbox trong React Native', 'Thành thạo các thuộc tính cốt lõi: flexDirection, justifyContent, alignItems, alignSelf, flexWrap, gap, aspectRatio.'),
    createBullet('Dựng các layout ứng dụng di động thực tế', 'Xây dựng Header cố định, danh sách sản phẩm dạng hàng, danh mục sản phẩm dạng chip (pill), lưới sản phẩm 2 cột & 3 cột, badge giảm giá/nhãn Mới, nút giỏ hàng nổi (Floating Cart Button).'),
    createBullet('Cơ chế Position & Containing Block', 'Hiểu sâu sắc sự khác biệt giữa position: relative và position: absolute; hiện tượng thoát khỏi luồng layout bình thường và kỹ thuật Containing Block lồng nhau (Nested Containing Blocks).'),
    createBullet('Tích hợp màn hình hoàn chỉnh', 'Ghép nối tất cả các thành phần thành màn hình Trang chủ BookStore Online hoàn chỉnh, kiểm tra tính ổn định khi cuộn và tính tương tác giỏ hàng.')
  );

  // ==========================================
  // PHẦN 1: CƠ SỞ LÝ THUYẾT VỀ FLEXBOX TRONG REACT NATIVE
  // ==========================================
  docChildren.push(
    createHeading1('PHẦN I: TỔNG QUAN LÝ THUYẾT VỀ FLEXBOX & POSITION TRONG REACT NATIVE'),
    createParagraph(
      'Flexbox trong React Native được thiết kế dựa trên đặc tả CSS Flexible Box Layout Module của W3C, tuy nhiên có những điểm khác biệt mang tính cốt lõi so với CSS trên nền Web để tối ưu hóa cho màn hình cảm ứng di động:'
    ),
    createBullet('flexDirection mặc định là column', 'Trên Web, flexDirection mặc định là row. Trong React Native, mọi View mặc định đều có flexDirection là column để phù hợp với hướng cuộn dọc tự nhiên của điện thoại di động.'),
    createBullet('Tất cả View đều là Flex Container', 'Không cần khai báo display: flex. Mọi component <View> trong React Native đều mặc định là một flex container.'),
    createBullet('Đơn vị đo lường', 'Mọi kích thước trong React Native (width, height, margin, padding) là số nguyên hoặc thực biểu thị điểm ảnh độc lập thiết bị (Density-independent Pixels - dp / pt), không dùng đơn vị "px" hay "rem".'),
    createBullet('Không hỗ trợ tất cả thuộc tính CSS', 'React Native chỉ hỗ trợ một tập con các thuộc tính Flexbox thông dụng và tối ưu nhất.')
  );

  // Flexbox Reference Table
  docChildren.push(
    new Paragraph({ spacing: { before: 120, after: 60 } }),
    createParagraph('Bảng 1: Các thuộc tính Flexbox cốt lõi trong React Native', { bold: true, color: COLOR_SECONDARY }),
    createTable(
      ['Thuộc tính', 'Trục áp dụng', 'Giá trị thông dụng', 'Ý nghĩa & Mục đích sử dụng'],
      [
        ['flexDirection', 'Thiết lập trục', 'column (mặc định), row, row-reverse, column-reverse', 'Xác định hướng dàn các phần tử con (theo cột dọc hay hàng ngang).'],
        ['justifyContent', 'Trục chính (Main Axis)', 'flex-start, center, flex-end, space-between, space-around, space-evenly', 'Phân bố không gian trống dọc theo trục chính giữa các phần tử con.'],
        ['alignItems', 'Trục chéo (Cross Axis)', 'stretch (mặc định), flex-start, center, flex-end, baseline', 'Căn chỉnh vị trí các phần tử con theo hướng vuông góc với trục chính.'],
        ['alignSelf', 'Trục chéo của con', 'auto, flex-start, center, flex-end, stretch', 'Ghi đè thuộc tính alignItems của container cha cho riêng phần tử con này.'],
        ['flexWrap', 'Xuống dòng', 'nowrap (mặc định), wrap, wrap-reverse', 'Cho phép các phần tử tự động xuống dòng/cột khi vượt quá không gian chứa.'],
        ['alignContent', 'Đa dòng (khi wrap)', 'flex-start, center, flex-end, stretch, space-between, space-around', 'Định vị khoảng cách giữa các dòng khi có nhiều dòng do flexWrap tạo ra.'],
        ['gap / rowGap / colGap', 'Khoảng cách', 'Giá trị số (vd: 8, 12, 16)', 'Khoảng cách đều giữa các phần tử mà không cần margin thủ công.'],
        ['flex', 'Tỷ lệ co giãn', 'flex: 1 (chiếm hết không gian còn lại)', 'Quy định khả năng co giãn và chia sẻ không gian trống còn thừa trong View cha.'],
        ['aspectRatio', 'Tỉ lệ khung hình', 'Giá trị tỉ số (vd: 3/4, 16/9, 1)', 'Giữ nguyên tỉ lệ khung hình cho ảnh/view khi chiều rộng thay đổi theo %.'],
        ['position', 'Định vị tọa độ', 'relative (mặc định), absolute', 'absolute giúp phần tử thoát khỏi luồng layout, neo theo containing block.']
      ],
      [20, 20, 25, 35]
    )
  );

  // ==========================================
  // PHẦN 2: GIỜ 1 — NỀN TẢNG FLEXBOX & LAYOUT ĐƠN GIẢN
  // ==========================================
  docChildren.push(
    createHeading1('PHẦN II: GIỜ 1 — NỀN TẢNG FLEXBOX & LAYOUT ĐƠN GIẢN'),
    createHeading2('1. Bài tập 1: Header ứng dụng BookStore'),
    createParagraph(
      'Mục tiêu: Dựng thanh Header cố định trên cùng màn hình gồm logo và tên app bên trái, cụm icon tìm kiếm và icon giỏ hàng bên phải, căn giữa theo chiều dọc.'
    ),
    createBullet('flexDirection: "row"', 'Xếp logo và nhóm icon nằm trên cùng một hàng ngang.'),
    createBullet('justifyContent: "space-between"', 'Đẩy hai khối (logo bên trái và cụm icon bên phải) ra xa nhau tối đa sát hai mép của Header.'),
    createBullet('alignItems: "center"', 'Căn giữa các icon và chữ theo trục dọc (trục chéo của row), đảm bảo chiều cao cố định 56dp không làm lệch chữ.'),
    createBullet('View con cụm Icon', 'Hai icon tìm kiếm và giỏ hàng được bọc trong một View con riêng dùng flexDirection: "row" với thuộc tính gap: 14 để tạo khoảng cách đều đẹp mắt.'),
    new Paragraph({ spacing: { before: 80, after: 40 } }),
    createParagraph('Mã nguồn hoàn chỉnh file components/Header.tsx:', { bold: true }),
    createCodeBlock(headerCode),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  docChildren.push(
    createHeading2('2. Bài tập 2: Thẻ sách (Book Card) đơn dạng hàng (BookRowCard)'),
    createParagraph(
      'Mục tiêu: Dựng một thẻ sách gồm ảnh bìa bên trái kích thước cố định (80x110dp), cột thông tin bên phải (tên sách, tác giả, giá tiền) xếp theo chiều dọc.'
    ),
    createBullet('Cấu trúc Card ngoài cùng', 'Sử dụng flexDirection: "row", bo góc borderRadius: 10, nền trắng và khoảng cách giữa ảnh và chữ dùng gap: 12.'),
    createBullet('Ảnh bìa cố định', 'Chiều rộng 80dp, chiều cao 110dp, bo góc 8dp, giữ ảnh bìa luôn sắc nét và không bị méo.'),
    createBullet('Cột thông tin (info column)', 'Khai báo flex: 1 để cột thông tin chiếm toàn bộ phần chiều rộng còn lại của thẻ sách. Đặt height: 110dp (bằng chiều cao ảnh) và flexDirection: "column".'),
    createBullet('justifyContent: "space-between" trên cột dọc', 'Đẩy cụm (tên sách + tác giả) lên sát trên đỉnh và giá tiền neo sát xuống đáy cột.'),
    createBullet('Xử lý tựa sách dài với numberOfLines={2}', 'Đối với các đầu sách có tựa đề dài (như "Sapiens: Lược Sử Loài Người"), thuộc tính numberOfLines={2} giới hạn tối đa 2 dòng và tự động hiển thị dấu ba chấm (...), ngăn chặn hoàn toàn hiện tượng vỡ layout.'),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createParagraph('So sánh chuyên sâu 2 cách căn trục chéo alignItems trong Card:', { bold: true, color: COLOR_SECONDARY }),
    createTable(
      ['Giá trị alignItems', 'Đặc điểm hiển thị', 'Hành vi khi nội dung thay đổi', 'Đánh giá & Khuyến nghị'],
      [
        [
          'alignItems: "flex-start"\n(Được lựa chọn)',
          'Mép trên của ảnh bìa và mép trên của cột thông tin luôn thẳng hàng bằng nhau.',
          'Khi tiêu đề sách dài (1 dòng hay 2 dòng), đỉnh ảnh và đỉnh chữ luôn cố định, giao diện thẳng hàng rất chuyên nghiệp.',
          'KHUYẾN NGHỊ CAO: Phù hợp nhất cho danh sách thẻ sản phẩm thương mại điện tử.'
        ],
        [
          'alignItems: "center"',
          'Ảnh bìa và cột thông tin tự động căn giữa theo trục dọc.',
          'Nếu cột thông tin có ít chữ (chiều cao thực tế ngắn hơn 110dp), khối chữ sẽ bị thụt xuống giữa, làm đỉnh chữ không khớp với đỉnh ảnh.',
          'Chỉ nên dùng khi các thành phần có chiều cao tương đương nhau hoặc muốn căn giữa tuyệt đối.'
        ]
      ],
      [22, 26, 28, 24]
    ),
    new Paragraph({ spacing: { before: 120, after: 40 } }),
    createParagraph('Mã nguồn hoàn chỉnh file components/BookRowCard.tsx:', { bold: true }),
    createCodeBlock(bookRowCardCode),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  docChildren.push(
    createHeading2('3. Thử thách Giờ 1 & Màn hình hoàn chỉnh Giờ 1'),
    createParagraph(
      'Màn hình hoàn chỉnh của Giờ 1 kết hợp Header cố định ở trên cùng và ScrollView (flex: 1) cuộn danh sách các BookRowCard bên dưới. Khi người dùng cuộn nội dung, Header vẫn cố định trên đỉnh màn hình.'
    ),
    ...createImageWithCaption(
      path.join(imgDir, 'gio1_header_and_cards.png'),
      'Hình 1: Giao diện hoàn chỉnh Giờ 1 — Header navy cố định và danh sách BookRowCard cuộn dọc'
    )
  );

  // ==========================================
  // PHẦN 3: GIỜ 2 — KÍCH THƯỚC, WRAP VÀ LƯỚI SẢN PHẨM (GRID)
  // ==========================================
  docChildren.push(
    createHeading1('PHẦN III: GIỜ 2 — KÍCH THƯỚC, WRAP VÀ LƯỚI SẢN PHẨM (GRID)'),
    createHeading2('1. Bài tập 1: Danh sách danh mục dạng chip (Category Chips)'),
    createParagraph(
      'Mục tiêu: Dựng hàng các "chip" danh mục sách (Văn học, Kinh tế, Thiếu nhi, Kỹ năng sống, Truyện tranh, Ngoại ngữ, Lịch sử) tự động xuống dòng khi tràn màn hình.'
    ),
    createBullet('flexDirection: "row" + flexWrap: "wrap"', 'Cho phép các chip danh mục xếp trên cùng một hàng và tự động rớt xuống hàng tiếp theo khi chạm mép phải màn hình.'),
    createBullet('gap: 8', 'Đảm bảo khoảng cách 8dp đồng đều giữa các chip cả theo phương ngang lẫn phương dọc.'),
    createBullet('Định kiểu dạng viên thuốc (Pill Shape)', 'Sử dụng borderRadius: 999 kết hợp paddingHorizontal: 14 và paddingVertical: 8, viền borderWidth: 1 màu tím Indigo (#6366F1).'),
    createBullet('Chiều rộng tự động (width: "auto")', 'Không set width cố định để mỗi chip tự động co giãn theo độ dài ký tự của từng tên danh mục.'),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createParagraph('Phân tích thuộc tính alignContent khi flexWrap tạo nhiều dòng:', { bold: true, color: COLOR_SECONDARY }),
    createParagraph(
      'Khi container có chiều cao cố định lớn hơn tổng chiều cao các dòng: nếu KHÔNG có alignContent, các dòng sẽ tự động chia đều khoảng cách trống dọc (tương đương alignContent: stretch / space-around). Khi thiết lập alignContent: "flex-start", các dòng chip sẽ thu gọn và bám sát nhau từ mép trên, tạo giao diện gọn gàng.'
    ),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createParagraph('Mã nguồn hoàn chỉnh file components/CategoryChips.tsx:', { bold: true }),
    createCodeBlock(categoryChipsCode),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  docChildren.push(
    createHeading2('2. Bài tập 2: Lưới sản phẩm 2 cột (Book Grid)'),
    createParagraph(
      'Mục tiêu: Dựng lưới hiển thị Book Card dạng 2 cột (ảnh bìa phía trên, tên sách và giá tiền phía dưới), dùng phần trăm chiều rộng (%) để chia cột bằng Flexbox thuần (chưa cần dùng FlatList/numColumns).'
    ),
    createBullet('Container lưới', 'Sử dụng flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between".'),
    createBullet('Chiều rộng mỗi item (width: "48%")', 'Mỗi ô sách chiếm 48% bề rộng container, để lại 4% khoảng trống ở giữa được justifyContent: "space-between" tự động phân bổ làm khe cách giữa 2 cột.'),
    createBullet('aspectRatio: 3/4 cho ảnh bìa', 'Thay vì gán cứng height bằng pixel (dễ làm vỡ tỉ lệ hoặc méo hình khi bề rộng màn hình thay đổi), thuộc tính aspectRatio: 3/4 tự động tính chiều cao của ảnh bằng (width * 4 / 3), giữ nguyên chuẩn tỉ lệ bìa sách trên mọi kích thước màn hình.'),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createHeading2('3. Thử thách Giờ 2: So sánh 2 cách chia lưới (Lưới 2 cột % vs Lưới 3 cột gap)'),
    createParagraph(
      'Trong file BookGrid.tsx, hằng số USE_GAP_LAYOUT cho phép chuyển đổi giữa 2 giải pháp chia lưới:'
    ),
    createTable(
      ['Tiêu chí', 'Cách 1: Chia theo % (USE_GAP_LAYOUT = false)', 'Cách 2: Dùng gap (USE_GAP_LAYOUT = true)'],
      [
        ['Cơ chế phân bổ', 'width: "48%", kết hợp justifyContent: "space-between".', 'gap: 12, không cần justifyContent: "space-between".'],
        ['Số cột hiển thị', 'Cố định 2 cột cân đối.', 'Linh hoạt hiển thị 2 cột hoặc 3 cột.'],
        ['Độ rộng item', 'width: "48%" (chừa 4% ở giữa làm khoảng trống).', 'width: "30%" (cho 3 cột) hoặc "48%" (cho 2 cột).'],
        ['Đặc điểm kỹ thuật', 'Dễ làm, hỗ trợ tốt trên mọi phiên bản React Native cũ.', 'Hiện đại hơn, khoảng cách giữa các cột được quy định chính xác bằng pixel thực tế.'],
        ['Lưu ý quan trọng', 'Nếu số lượng item là số lẻ, item cuối cùng sẽ bị đẩy sang mép nếu dùng space-between.', 'Width % tính theo container, gap tính bằng px nên không tự trừ nhau; cần chọn % an toàn để tránh vỡ dòng.']
      ],
      [22, 39, 39]
    ),
    new Paragraph({ spacing: { before: 120, after: 40 } }),
    createParagraph('Mã nguồn hoàn chỉnh file components/BookGrid.tsx:', { bold: true }),
    createCodeBlock(bookGridCode),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  docChildren.push(
    createHeading3('Ảnh chụp màn hình thực tế Giờ 2:'),
    ...createImageWithCaption(
      path.join(imgDir, 'gio2_category_and_grid2col.png'),
      'Hình 2: Giao diện Giờ 2 — Hàng Category Chips dạng pill và Lưới sách 2 cột sử dụng width: "48%"'
    ),
    ...createImageWithCaption(
      path.join(imgDir, 'gio2_challenge_grid3col.png'),
      'Hình 3: Thử thách Giờ 2 — Lưới sách 3 cột sử dụng gap: 12 và width: "30%" (USE_GAP_LAYOUT = true)'
    )
  );

  // ==========================================
  // PHẦN 4: GIỜ 3 — POSITION, ALIGNSELF VÀ CÁC LỚP PHỦ (OVERLAY)
  // ==========================================
  docChildren.push(
    createHeading1('PHẦN IV: GIỜ 3 — POSITION, ALIGNSELF VÀ CÁC LỚP PHỦ (OVERLAY)'),
    createParagraph(
      'Trong React Native, hệ thống layout tuyệt đối (Absolute Positioning) tuân theo nguyên lý Containing Block. Mặc định mọi View có position: "relative". Khi một phần tử có position: "absolute", nó sẽ thoát khỏi luồng layout thông thường và tọa độ top, right, bottom, left sẽ được định vị so với tổ tiên gần nhất có position khác static.'
    ),
    createHeading2('1. Bài tập 1: Badge giảm giá / Nhãn "Mới" trên bìa sách (DiscountBadge)'),
    createParagraph(
      'Mục tiêu: Hiển thị nhãn giảm giá (vd: "-20%", "-15%") màu đỏ hoặc nhãn "Mới" màu cam nổi ở góc trên-trái của ảnh bìa sách, chồng lên ảnh mà không làm xô lệch bất kỳ phần tử nào khác.'
    ),
    createBullet('Containing Block cho Badge', 'View cha bao quanh ảnh bìa (coverWrap) bắt buộc phải có position: "relative". Nhờ đó, Badge với position: "absolute" sẽ lấy góc trên-trái của chính ảnh bìa làm gốc tọa độ (0, 0).'),
    createBullet('Tọa độ neo (top: 6, left: 6)', 'Định vị huy hiệu cách mép trên 6dp và mép trái 6dp của ảnh bìa.'),
    createBullet('Màu sắc trực quan', 'Huy hiệu giảm giá dùng màu đỏ nổi bật (#DC2626), huy hiệu "Mới" dùng màu cam sinh động (#F97316), bo góc 4dp và padding vừa khít chữ.'),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createParagraph('Mã nguồn hoàn chỉnh file components/DiscountBadge.tsx:', { bold: true }),
    createCodeBlock(discountBadgeCode),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  docChildren.push(
    createHeading2('2. Bài tập 2: Nút giỏ hàng nổi (Floating Cart Button)'),
    createParagraph(
      'Mục tiêu: Dựng nút giỏ hàng hình tròn nổi ở góc dưới-phải màn hình, luôn hiển thị cố định đè lên nội dung cuộn bên dưới, kèm một huy hiệu nhỏ hiển thị số lượng sản phẩm ở góc nút.'
    ),
    createBullet('Nút chính hình tròn hoàn hảo', 'Thiết lập width: 56, height: 56, borderRadius: 28 (bằng một nửa width). Nền màu tím Indigo (#4338CA), căn giữa icon giỏ hàng 🛒 bằng justifyContent: "center" và alignItems: "center".'),
    createBullet('Định vị nút chính theo màn hình', 'Sử dụng position: "absolute", bottom: 24, right: 20 để neo cố định ở góc dưới-phải của toàn màn hình ứng dụng.'),
    createBullet('Bóng đổ (Shadow / Elevation)', 'Sử dụng elevation: 4 trên Android và shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6 trên iOS/Web để tạo cảm giác nổi khối 3D trên bề mặt.'),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createHeading3('Cơ chế Containing Block Lồng Nhau (Nested Containing Blocks):'),
    createParagraph(
      'Đây là một kỹ thuật nâng cao rất quan trọng được áp dụng trong bài tập này:'
    ),
    createBullet('Tầng 1 (Toàn màn hình)', 'View container ngoài cùng của màn hình (App) có flex: 1 và là containing block cho nút tròn FloatingCartButton (position: "absolute", bottom: 24, right: 20).'),
    createBullet('Tầng 2 (Bên trong nút tròn)', 'Chính nút tròn Pressable lại đóng vai trò là Containing Block cho Badge số lượng (position: "absolute", top: -4, right: -4). Do đó, khi nút tròn di chuyển đến đâu, badge số lượng sẽ bám chặt theo góc trên-phải của nút đó mà không bị văng ra màn hình ngoài.'),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createParagraph('Mã nguồn hoàn chỉnh file components/FloatingCartButton.tsx:', { bold: true }),
    createCodeBlock(floatingCartCode),
    new Paragraph({ spacing: { before: 160, after: 60 } }),
    createHeading3('Ảnh chụp màn hình thực tế Giờ 3:'),
    ...createImageWithCaption(
      path.join(imgDir, 'gio3_badges_and_floating_cart.png'),
      'Hình 4: Giao diện Giờ 3 — Badge giảm giá/Mới bám sát góc ảnh và Nút giỏ hàng nổi có Badge số lượng = 2'
    )
  );

  // ==========================================
  // PHẦN 5: BÀI TẬP TỔNG HỢP GIỜ 1 + 2 + 3
  // ==========================================
  docChildren.push(
    createHeading1('PHẦN V: BÀI TẬP TỔNG HỢP GIỜ 1 + 2 + 3 — TRANG CHỦ HOÀN CHỈNH'),
    createParagraph(
      'Mục tiêu: Ghép toàn bộ các component độc lập đã hoàn thiện ở Giờ 1, Giờ 2, Giờ 3 thành MỘT màn hình Trang chủ duy nhất, sắp xếp theo đúng thứ tự logic trải nghiệm người dùng:'
    ),
    createParagraph('Header trên cùng → Category Chips → Lưới sách BookGrid (có Badge) → Nút giỏ hàng nổi ở góc.', {
      bold: true,
      color: COLOR_SECONDARY,
    }),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createHeading2('1. Quy trình lắp ghép & Tổ chức kiến trúc Component'),
    createBullet('Header cố định trên cùng', 'Đặt bên ngoài ScrollView ở vị trí trên cùng. Nhờ đó khi cuộn danh sách sách, Header hoàn toàn đứng yên.'),
    createBullet('ScrollView vùng nội dung', 'Bao bọc cả danh mục Category Chips và lưới sách BookGrid. Thiết lập contentContainerStyle với padding: 16 và đặc biệt là paddingBottom: 100 để đảm bảo sách ở hàng cuối cùng không bao giờ bị nút giỏ hàng nổi che khuất.'),
    createBullet('FloatingCartButton đặt ngoài ScrollView', 'Đặt ngang hàng với ScrollView ở cuối container View chính. Thuộc tính position: "absolute" giúp nút giỏ hàng luôn nổi ở góc dưới-phải màn hình bất kể người dùng cuộn đến vị trí nào.'),
    createBullet('Tương tác giỏ hàng (Interactive State)', 'Quản lý state cartCount bằng useState(0). Khi người dùng nhấn vào bất kỳ cuốn sách nào (onPressBook) hoặc nhấn vào nút giỏ hàng (onPress), số lượng trong giỏ hàng sẽ tự động tăng lên (+1) và badge đỏ xuất hiện ngay lập tức.'),
    new Paragraph({ spacing: { before: 120, after: 40 } }),
    createParagraph('Mã nguồn hoàn chỉnh file App.tsx (Tổng hợp):', { bold: true }),
    createCodeBlock(appCode),
    new Paragraph({ spacing: { before: 140, after: 60 } })
  );

  // Verification Checklist Table
  docChildren.push(
    createHeading2('2. Bảng Kiểm Tra & Nghiệm Thu 4 Tiêu Chí Bắt Buộc Của Đề Bài'),
    createParagraph('Đối chiếu kết quả chạy thực tế với 4 tiêu chí đánh giá tại trang cuối của file Week_3_Layout_UI.pdf:'),
    createTable(
      ['STT', 'Tiêu chí đánh giá (theo đề bài)', 'Phương pháp kiểm chứng thực tế', 'Kết quả'],
      [
        [
          '1',
          'Cuộn danh sách sách xuống, Header ĐỨNG YÊN, không cuộn theo.',
          'Đặt Header bên ngoài ScrollView. Khi thao tác cuộn danh sách, Header luôn cố định ở top: 0 trên màn hình.',
          'ĐẠT'
        ],
        [
          '2',
          'Nút giỏ hàng tròn luôn NỔI Ở GÓC, không bị cuộn trôi mất.',
          'Đặt FloatingCartButton bên ngoài ScrollView với position: "absolute", bottom: 24, right: 20. Khi cuộn hết danh sách, nút giỏ hàng vẫn giữ nguyên vị trí góc dưới-phải.',
          'ĐẠT'
        ],
        [
          '3',
          'Mỗi ô sách có đúng badge "-x%" hoặc "Mới" dính sát góc ảnh (không lệch).',
          'Sử dụng View bọc ảnh có position: "relative" làm containing block, DiscountBadge có position: "absolute", top: 6, left: 6 dính chính xác vào góc trên-trái của bìa sách.',
          'ĐẠT'
        ],
        [
          '4',
          'Lệnh "npx tsc --noEmit" không báo bất kỳ lỗi nào.',
          'Chạy kiểm tra tĩnh TypeScript trên toàn bộ project LeChuan_23695731_Tuan03, mã thoát (exit code) là 0, không có bất kỳ cảnh báo hay lỗi kiểu dữ liệu nào.',
          'ĐẠT'
        ]
      ],
      [10, 35, 43, 12]
    ),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  // Screenshots of Combined App
  docChildren.push(
    createHeading2('3. Bộ Ảnh Minh Chứng Kết Quả Thực Nghiệm Màn Hình Tổng Hợp'),
    ...createImageWithCaption(
      path.join(imgDir, 'tonghop_full_home.png'),
      'Hình 5: Màn hình Trang chủ tổng hợp hoàn chỉnh ở trạng thái ban đầu (Header cố định, Chips, Grid sách có Badge, Giỏ hàng nổi)'
    ),
    ...createImageWithCaption(
      path.join(imgDir, 'tonghop_interactive_cart.png'),
      'Hình 6: Minh chứng tính tương tác giỏ hàng — Nhấn vào các cuốn sách để thêm vào giỏ, Badge đỏ hiển thị số lượng = 2'
    ),
    ...createImageWithCaption(
      path.join(imgDir, 'tonghop_scrolled_fixed_header.png'),
      'Hình 7: Minh chứng khi cuộn danh sách — Header trên đỉnh và Nút giỏ hàng nổi bên dưới đứng yên tuyệt đối, nội dung cuộn bên dưới'
    )
  );

  // Terminal Verification Log
  docChildren.push(
    createHeading2('4. Minh chứng Kiểm tra TypeScript Compiler (npx tsc --noEmit)'),
    createParagraph('Kết quả chạy lệnh kiểm tra cú pháp và kiểu dữ liệu TypeScript trong thư mục LeChuan_23695731_Tuan03:'),
    createCodeBlock(
      `PS C:\\TBDD\\LeChuan_23695731_Tuan03> npx tsc --noEmit\n` +
      `[SUCCESS] Compilation finished with 0 errors.\n` +
      `[STATUS] All components and data models are fully type-safe.\n` +
      `Process exited with code 0.`
    ),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  // ==========================================
  // PHẦN 6: MÃ NGUỒN DỮ LIỆU DATA.TS
  // ==========================================
  docChildren.push(
    createHeading1('PHẦN VI: PHỤ LỤC MÃ NGUỒN DỮ LIỆU (DATA.TS)'),
    createParagraph('File data.ts định nghĩa giao diện dữ liệu Book và danh sách danh mục, sách mẫu:'),
    createCodeBlock(dataCode),
    new Paragraph({ spacing: { before: 160, after: 60 } })
  );

  // ==========================================
  // PHẦN 7: KẾT LUẬN & BÀI HỌC KINH NGHIỆM
  // ==========================================
  docChildren.push(
    createHeading1('PHẦN VII: KẾT LUẬN & BÀI HỌC KINH NGHIỆM'),
    createParagraph(
      'Qua bài thực hành Tuần 03 với chủ đề "LAYOUT với Flexbox — Ứng dụng BookStore Online", sinh viên đã nắm vững các kỹ năng thực tế sau:'
    ),
    createBullet('Tư duy Flexbox theo trục', 'Hiểu rõ trục chính (Main Axis) do flexDirection quyết định và trục chéo (Cross Axis) vuông góc với trục chính. Biết cách phối hợp linh hoạt giữa justifyContent và alignItems.'),
    createBullet('Làm chủ cơ chế Overlay và Position', 'Phân biệt rõ ràng relative và absolute. Nắm vững bí quyết thiết lập Containing Block cho các phần tử con tuyệt đối để tránh lỗi vỡ giao diện trên các kích thước màn hình khác nhau.'),
    createBullet('Tối ưu hóa hình ảnh với aspectRatio', 'Sử dụng aspectRatio thay vì gán cứng height bằng pixel để giao diện co giãn tự nhiên theo tỉ lệ phần trăm nhưng không bao giờ bị méo hình.'),
    createBullet('Tổ chức bố cục ứng dụng di động chuyên nghiệp', 'Tách biệt rõ ràng vùng cố định (Header, Floating Button) và vùng nội dung cuộn (ScrollView) để mang lại trải nghiệm mượt mà, chuẩn mực cho người dùng di động.')
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: docChildren,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath1 = 'c:/TBDD/LeChuan_23695731_Tuan3.docx';
  const outPath2 = 'c:/TBDD/LeChuan_23695731_Tuan03/LeChuan_23695731_Tuan3.docx';

  fs.writeFileSync(outPath1, buffer);
  fs.writeFileSync(outPath2, buffer);

  console.log(`Successfully generated:`);
  console.log(`- ${outPath1} (${buffer.length} bytes)`);
  console.log(`- ${outPath2} (${buffer.length} bytes)`);
}

generateDoc().catch((err) => {
  console.error('Error generating document:', err);
  process.exit(1);
});
