import { useState, useRef, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const TOPICS = [
  {
    id: "overview",
    icon: "🏛️",
    title: "I. Tổng quan về Quản trị",
    color: "#1a6b4a",
    accent: "#2ecc71",
    chapters: "Ch.1 + Management History Module",
    subtopics: [
      "Khái niệm tổ chức và đặc trưng cơ bản",
      "Khái niệm quản trị & nhà quản trị",
      "4 chức năng quản trị (POLC)",
      "3 cấp quản trị (cơ sở, trung, cao)",
      "3 kỹ năng quản trị (chuyên môn, nhân sự, tư duy)",
      "Vai trò của nhà quản trị (Mintzberg)",
    ],
    keyTerms: [
      { term: "Quản trị (Management)", def: "Quá trình hoạch định, tổ chức, lãnh đạo và kiểm soát nguồn lực để đạt mục tiêu tổ chức một cách hiệu lực và hiệu quả." },
      { term: "Hiệu lực (Effectiveness)", def: "Làm đúng việc — hoàn thành các mục tiêu đã đặt ra. 'Doing the right things.'" },
      { term: "Hiệu quả (Efficiency)", def: "Làm việc đúng cách — sử dụng tối ưu nguồn lực để đạt kết quả. 'Doing things right.'" },
      { term: "Kỹ năng tư duy khái quát", def: "Khả năng nhìn nhận tổ chức như một hệ thống tổng thể, hiểu mối quan hệ giữa các bộ phận. Quan trọng nhất ở cấp quản trị cao." },
      { term: "Vai trò quan hệ con người", def: "Gồm: người đại diện (figurehead), nhà lãnh đạo (leader), trung tâm liên lạc (liaison)." },
      { term: "Vai trò thông tin", def: "Gồm: giám sát/thu thập thông tin (monitor), phổ biến thông tin (disseminator), người phát ngôn (spokesperson)." },
      { term: "Vai trò ra quyết định", def: "Gồm: người khởi xướng (entrepreneur), xử lý xáo trộn (disturbance handler), phân bổ nguồn lực (resource allocator), người thương lượng (negotiator)." },
    ],
    sampleQA: [
      {
        q: "Quản trị là gì? Phân biệt hiệu lực và hiệu quả. Cho ví dụ tại tổ chức bạn.",
        hints: ["Định nghĩa quản trị theo Robbins: POLC", "Effectiveness = doing the right things", "Efficiency = doing things right", "Ví dụ thực tế từ công ty bạn"]
      },
      {
        q: "Trình bày 3 cấp quản trị và kỹ năng cần thiết ở mỗi cấp.",
        hints: ["Cấp cơ sở: kỹ năng chuyên môn quan trọng nhất", "Cấp trung: cân bằng 3 kỹ năng", "Cấp cao: kỹ năng tư duy khái quát quan trọng nhất"]
      }
    ]
  },
  {
    id: "theories",
    icon: "📚",
    title: "II. Các Học thuyết Quản trị",
    color: "#1a3d6b",
    accent: "#3498db",
    chapters: "Management History Module",
    subtopics: [
      "Taylor - Quản trị khoa học (4 nguyên tắc)",
      "Fayol - Quản trị hành chính (14 nguyên tắc)",
      "Quản trị hành vi: Hawthorne + Thuyết X&Y",
      "Quản trị định lượng",
      "Quản trị theo quá trình",
      "Tiếp cận hệ thống",
    ],
    keyTerms: [
      { term: "Scientific Management (Taylor)", def: "4 nguyên tắc: (1) Nghiên cứu KH từng yếu tố, (2) Tuyển chọn & đào tạo KH, (3) Hợp tác với công nhân, (4) Phân công công việc bình đẳng giữa quản lý và công nhân." },
      { term: "14 nguyên tắc Fayol", def: "Bao gồm: phân công LĐ, quyền hạn, kỷ luật, thống nhất chỉ huy, thống nhất phương hướng, lợi ích chung > cá nhân, thù lao, tập trung hóa, chuỗi vô hướng, trật tự, công bằng, ổn định nhân sự, sáng kiến, tinh thần đồng đội." },
      { term: "Hiệu ứng Hawthorne", def: "Năng suất tăng khi công nhân biết mình đang được quan sát/chú ý, bất kể điều kiện làm việc thay đổi như thế nào." },
      { term: "Thuyết X (McGregor)", def: "Người lao động không thích làm việc, lười biếng, cần được kiểm soát chặt chẽ và đe dọa để hoàn thành công việc." },
      { term: "Thuyết Y (McGregor)", def: "Người lao động tự giác, sáng tạo, chấp nhận trách nhiệm, và coi công việc như hoạt động tự nhiên nếu được tạo điều kiện tốt." },
      { term: "Tiếp cận hệ thống", def: "Tổ chức là hệ thống mở gồm các bộ phận liên kết nhau (input → process → output), tương tác với môi trường bên ngoài." },
    ],
    sampleQA: [
      {
        q: "Trình bày lý thuyết Quản trị khoa học của Taylor. Ưu nhược điểm?",
        hints: ["4 nguyên tắc cụ thể", "Ưu: tăng năng suất, tiêu chuẩn hóa", "Nhược: bỏ qua yếu tố tâm lý, xã hội", "Áp dụng tại VN?"]
      },
      {
        q: "So sánh Thuyết X và Thuyết Y của McGregor. Ứng dụng trong quản trị nhân sự hiện đại?",
        hints: ["Thuyết X: con người thụ động, kiểm soát chặt", "Thuyết Y: con người chủ động, trao quyền", "Xu hướng quản trị hiện đại nghiêng về Thuyết Y"]
      }
    ]
  },
  {
    id: "environment",
    icon: "🌐",
    title: "III. Môi trường Kinh doanh",
    color: "#6b1a4a",
    accent: "#e91e8c",
    chapters: "Ch.3 External Environment & Culture",
    subtopics: [
      "Môi trường bên trong & bên ngoài",
      "Môi trường tác nghiệp (ngành): KH, NCC, ĐTCT, nhóm áp lực",
      "Môi trường vĩ mô: PEST (kinh tế, CT-PL, CN, VH-XH, nhân khẩu)",
      "Mô hình 5 lực lượng cạnh tranh Porter",
    ],
    keyTerms: [
      { term: "5 Forces Porter", def: "(1) Đối thủ cạnh tranh hiện tại, (2) Nguy cơ từ đối thủ mới, (3) Quyền thương lượng nhà cung cấp, (4) Quyền thương lượng khách hàng, (5) Nguy cơ từ sản phẩm thay thế." },
      { term: "Môi trường tác nghiệp", def: "Các yếu tố trực tiếp ảnh hưởng đến hoạt động kinh doanh: khách hàng, nhà cung cấp, đối thủ cạnh tranh, nhóm tạo sức ép (stakeholders)." },
      { term: "PEST/PESTEL", def: "Môi trường vĩ mô: Political (Chính trị-pháp luật), Economic (Kinh tế), Sociocultural (Văn hóa-xã hội), Technological (Công nghệ). Thêm Environmental và Legal cho PESTEL." },
      { term: "Môi trường bên trong", def: "Văn hóa tổ chức, nguồn nhân lực, tài chính, công nghệ, cơ cấu tổ chức — các yếu tố doanh nghiệp có thể kiểm soát." },
    ],
    sampleQA: [
      {
        q: "Trình bày mô hình 5 lực lượng cạnh tranh của Porter. Áp dụng phân tích ngành của bạn.",
        hints: ["5 lực lượng rõ ràng", "Mỗi lực lượng: nội dung + yếu tố ảnh hưởng mức độ", "Áp dụng cụ thể vào ngành/công ty bạn đang làm"]
      }
    ]
  },
  {
    id: "planning",
    icon: "📋",
    title: "IV. Chức năng Hoạch định",
    color: "#6b4a1a",
    accent: "#f39c12",
    chapters: "Ch.8 Foundations of Planning",
    subtopics: [
      "Khái niệm, nội dung, tầm quan trọng của hoạch định",
      "Phân loại kế hoạch (thời gian, mức độ cụ thể, phạm vi)",
      "Mục tiêu và nguyên tắc SMART",
      "Thiết lập mục tiêu: truyền thống vs MBO",
      "Quy trình hoạch định",
    ],
    keyTerms: [
      { term: "Hoạch định (Planning)", def: "Xác định mục tiêu của tổ chức và phương thức tốt nhất để đạt được mục tiêu đó. Là nền tảng của 4 chức năng quản trị." },
      { term: "Nguyên tắc SMART", def: "Mục tiêu tốt phải: Specific (cụ thể), Measurable (đo lường được), Achievable (khả thi), Relevant (phù hợp), Time-bound (có thời hạn)." },
      { term: "MBO (Management by Objectives)", def: "Phương pháp thiết lập mục tiêu hợp tác giữa quản lý và nhân viên. Mục tiêu cụ thể → đánh giá định kỳ → khen thưởng dựa trên kết quả." },
      { term: "Kế hoạch chiến lược vs tác nghiệp", def: "Chiến lược: dài hạn (3-5 năm), toàn tổ chức, định hướng lớn. Tác nghiệp: ngắn hạn (≤1 năm), bộ phận cụ thể, chi tiết thực hiện." },
      { term: "Kế hoạch định hướng", def: "Kế hoạch linh hoạt, chỉ đưa ra hướng đi chung, phù hợp môi trường không chắc chắn. Trái với kế hoạch cụ thể (specific plan)." },
    ],
    sampleQA: [
      {
        q: "Hoạch định quan trọng như thế nào? Trình bày ví dụ về hoạch định tại tổ chức bạn đang công tác.",
        hints: ["4 lý do quan trọng: định hướng, giảm bất chắc, phối hợp, kiểm soát", "Ví dụ thực tế: kế hoạch năm, kế hoạch dự án..."]
      },
      {
        q: "Nguyên tắc SMART là gì? Đặt 1 mục tiêu SMART cho bộ phận của bạn.",
        hints: ["Giải thích 5 tiêu chí", "Đặt mục tiêu thực tế từ công việc của bạn"]
      }
    ]
  },
  {
    id: "organizing",
    icon: "🏗️",
    title: "V. Chức năng Tổ chức",
    color: "#4a1a6b",
    accent: "#9b59b6",
    chapters: "Ch.11 Designing Organizational Structure",
    subtopics: [
      "Chuyên môn hóa (specialization)",
      "Phân khâu (departmentalization)",
      "Phân định quyền hạn, trách nhiệm",
      "Phạm vi kiểm soát & phân quyền",
      "Cơ cấu cơ khí vs hữu cơ",
      "5 mô hình cơ cấu tổ chức",
    ],
    keyTerms: [
      { term: "Chuyên môn hóa", def: "Chia công việc thành các nhiệm vụ nhỏ, mỗi người chuyên sâu một việc. Tăng năng suất nhưng có thể gây nhàm chán và thiếu linh hoạt." },
      { term: "Cơ cấu chức năng", def: "Nhóm nhân viên theo chức năng chuyên môn (Marketing, Tài chính, Sản xuất...). Ưu: chuyên môn sâu. Nhược: phối hợp kém, cục bộ." },
      { term: "Cơ cấu theo sản phẩm/SBU", def: "Nhóm theo sản phẩm, dịch vụ, thị trường, hoặc khách hàng. Ưu: linh hoạt, trách nhiệm rõ. Nhược: trùng lặp nguồn lực." },
      { term: "Cơ cấu ma trận", def: "Kết hợp chức năng và dự án/sản phẩm. Ưu: linh hoạt, phối hợp tốt. Nhược: xung đột quyền lực, 2 sếp." },
      { term: "Cơ cấu cơ khí (Mechanistic)", def: "Chính thức hóa cao, tập trung hóa, nhiều quy tắc. Phù hợp môi trường ổn định." },
      { term: "Cơ cấu hữu cơ (Organic)", def: "Linh hoạt, phi tập trung, ít quy tắc. Phù hợp môi trường biến động và sáng tạo." },
    ],
    sampleQA: [
      {
        q: "Chuyên môn hóa là gì? Lợi ích và hạn chế? Tổ chức của bạn có áp dụng không?",
        hints: ["Định nghĩa: phân chia công việc thành nhiệm vụ nhỏ", "Lợi ích: năng suất cao, dễ đào tạo", "Hạn chế: nhàm chán, thiếu linh hoạt, phụ thuộc", "Ví dụ thực tế"]
      }
    ]
  },
  {
    id: "leading",
    icon: "🎯",
    title: "VII. Chức năng Lãnh đạo",
    color: "#1a4a6b",
    accent: "#00bcd4",
    chapters: "Ch.17 Being an Effective Leader",
    subtopics: [
      "Phân biệt Lãnh đạo vs Quản trị",
      "Phẩm chất nhà lãnh đạo",
      "Phong cách lãnh đạo: độc đoán, dân chủ, tự do",
      "Lãnh đạo theo định hướng công việc vs nhân viên (ĐH Michigan)",
      "Lãnh đạo tình huống Hersey & Blanchard",
    ],
    keyTerms: [
      { term: "Lãnh đạo vs Quản trị", def: "Quản trị: làm việc đúng cách (hoạch định, tổ chức, kiểm soát). Lãnh đạo: truyền cảm hứng, ảnh hưởng người khác, tạo ra sự thay đổi." },
      { term: "Lãnh đạo độc đoán (Autocratic)", def: "Nhà lãnh đạo tự ra quyết định, ít tham khảo cấp dưới. Hiệu quả khi cần quyết định nhanh, tình huống khủng hoảng." },
      { term: "Lãnh đạo dân chủ (Democratic)", def: "Nhà lãnh đạo tham khảo ý kiến nhóm trước khi quyết định. Tăng cam kết và sự hài lòng của nhân viên." },
      { term: "Lãnh đạo tự do (Laissez-faire)", def: "Nhà lãnh đạo để nhóm tự quyết định. Hiệu quả với nhóm chuyên gia có năng lực và động lực cao." },
      { term: "Lãnh đạo tình huống Hersey-Blanchard", def: "4 phong cách: Telling (S1), Selling (S2), Participating (S3), Delegating (S4), phụ thuộc mức độ sẵn sàng của cấp dưới (R1→R4)." },
      { term: "Mức độ sẵn sàng (Readiness)", def: "R1: thiếu năng lực & động lực → S1 Telling. R2: thiếu năng lực nhưng có động lực → S2 Selling. R3: có năng lực nhưng thiếu động lực → S3 Participating. R4: có cả hai → S4 Delegating." },
    ],
    sampleQA: [
      {
        q: "Trình bày Lãnh đạo tình huống của Hersey & Blanchard. Cho ví dụ ứng dụng.",
        hints: ["4 phong cách S1-S4 với đặc điểm", "4 mức độ sẵn sàng R1-R4", "Nguyên tắc: phong cách lãnh đạo phải phù hợp mức độ sẵn sàng", "Ví dụ thực tế từ công việc của bạn"]
      }
    ]
  },
  {
    id: "motivation",
    icon: "⚡",
    title: "VIII. Động viên Nhân viên",
    color: "#6b1a1a",
    accent: "#e74c3c",
    chapters: "Ch.16 Motivating Employees",
    subtopics: [
      "Khái niệm và phân loại động lực",
      "Tháp nhu cầu Maslow (5 nấc)",
      "Thuyết ERG (Alderfer)",
      "Thuyết 2 nhân tố Herzberg",
      "Thuyết kỳ vọng Vroom",
      "Thuyết công bằng Adams",
      "Các công cụ tạo động lực",
    ],
    keyTerms: [
      { term: "Tháp nhu cầu Maslow", def: "5 cấp từ thấp đến cao: (1) Sinh lý → (2) An toàn → (3) Xã hội → (4) Tôn trọng → (5) Tự hoàn thiện. Nhu cầu thấp phải được thỏa mãn trước." },
      { term: "Thuyết ERG (Alderfer)", def: "3 nhóm nhu cầu đồng thời: Existence (tồn tại), Relatedness (quan hệ), Growth (phát triển). Linh hoạt hơn Maslow — có thể truy ngược khi nhu cầu cao bị thất vọng." },
      { term: "Thuyết 2 nhân tố Herzberg", def: "Nhân tố vệ sinh (hygiene): lương, điều kiện làm việc — chỉ ngăn bất mãn. Nhân tố động viên: thành tích, công nhận, trách nhiệm — tạo ra sự thỏa mãn thực sự." },
      { term: "Thuyết kỳ vọng Vroom", def: "Động lực = Kỳ vọng × Công cụ × Phần thưởng (E × I × V). Người ta nỗ lực khi tin rằng nỗ lực → kết quả → phần thưởng có giá trị." },
      { term: "Thuyết công bằng Adams", def: "Người lao động so sánh tỷ lệ đóng góp/phần thưởng của mình với người khác. Bất công bằng → căng thẳng → hành vi điều chỉnh (giảm nỗ lực, xin thêm lương, hoặc nghỉ việc)." },
    ],
    sampleQA: [
      {
        q: "Trình bày thuyết cấp bậc nhu cầu của Maslow. Ứng dụng thực tiễn trong quản trị nhân sự.",
        hints: ["5 cấp bậc theo đúng thứ tự", "Nguyên tắc cấp dưới được thỏa mãn trước", "Ứng dụng: thiết kế chế độ đãi ngộ, môi trường làm việc, cơ hội phát triển", "Hạn chế của Maslow"]
      },
      {
        q: "Phân biệt nhân tố vệ sinh và nhân tố động viên của Herzberg. Ví dụ tại công ty bạn.",
        hints: ["Nhân tố vệ sinh: chỉ ngăn bất mãn (không tạo hài lòng)", "Nhân tố động viên: tạo hài lòng thực sự", "Tên 3-4 ví dụ cụ thể mỗi loại", "Hàm ý: cần cả hai để quản lý hiệu quả"]
      }
    ]
  },
  {
    id: "controlling",
    icon: "⚙️",
    title: "IX. Chức năng Kiểm soát",
    color: "#2d4a1a",
    accent: "#8bc34a",
    chapters: "Ch.18 Monitoring and Controlling",
    subtopics: [
      "Khái niệm và vai trò của kiểm soát",
      "Quy trình kiểm soát (3 bước)",
      "Kiểm soát phòng ngừa, tại chỗ, phản hồi",
      "Tiêu chuẩn của hệ thống kiểm soát hiệu quả",
    ],
    keyTerms: [
      { term: "Kiểm soát (Controlling)", def: "Giám sát hoạt động để đảm bảo thực tế phù hợp với kế hoạch. Gồm 3 bước: đặt tiêu chuẩn → đo lường → so sánh & hành động." },
      { term: "Kiểm soát phòng ngừa (Feedforward)", def: "Kiểm soát trước khi vấn đề xảy ra. Ví dụ: kiểm tra nguyên liệu trước khi sản xuất, phỏng vấn kỹ trước khi tuyển dụng." },
      { term: "Kiểm soát tại chỗ (Concurrent)", def: "Kiểm soát trong khi hoạt động đang diễn ra. Ví dụ: giám sát trực tiếp, hệ thống camera, kiểm tra chất lượng trên dây chuyền." },
      { term: "Kiểm soát phản hồi (Feedback)", def: "Kiểm soát sau khi hoạt động hoàn thành. Ví dụ: báo cáo tài chính, đánh giá hiệu suất cuối năm, khảo sát khách hàng." },
      { term: "Sai lệch chấp nhận được", def: "Khoảng dung sai cho phép giữa thực tế và tiêu chuẩn trước khi cần can thiệp. Tránh can thiệp không cần thiết khi sai lệch nhỏ." },
    ],
    sampleQA: [
      {
        q: "Trình bày 3 hình thức kiểm soát. Ứng dụng nào phù hợp nhất tại tổ chức bạn?",
        hints: ["Phòng ngừa: trước khi xảy ra", "Tại chỗ: trong khi diễn ra", "Phản hồi: sau khi hoàn thành", "Ưu nhược điểm từng loại", "Liên hệ thực tế tại công ty"]
      }
    ]
  },
];

const INTERVIEW_QUESTIONS = [
  "Tại sao Anh/Chị mong muốn học khóa EMBA này? Mục tiêu nghề nghiệp của Anh/Chị trong 5 năm tới là gì?",
  "Theo Anh/Chị, sự khác biệt giữa chương trình EMBA của Đại học Ngoại thương và MBA thông thường là gì?",
  "Anh/Chị có phải là người ham học hỏi không? Hãy chứng minh bằng ví dụ cụ thể.",
  "Anh/Chị đã đọc cuốn sách hoặc bài báo nào về quản trị/kinh doanh trong 4 tuần gần đây?",
  "Anh/Chị đã bao giờ mất tự tin trước một vấn đề quan trọng chưa? Anh/Chị đã vượt qua như thế nào?",
  "Hãy kể về một quyết định khó khăn nhất trong sự nghiệp quản lý của Anh/Chị. Anh/Chị đã xử lý ra sao?",
  "Nếu được nhận vào chương trình EMBA, Anh/Chị sẽ đóng góp gì cho cộng đồng học viên?",
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f6f8;
    --surface: #ffffff;
    --surface2: #f0f1f4;
    --border: #e2e4ea;
    --border-strong: #c8ccd6;
    --text: #1a1d2e;
    --muted: #8a8fa8;
    --accent: #2563eb;
    --accent-light: #eff4ff;
    --accent-dark: #1d4ed8;
    --green: #16a34a;
    --green-light: #f0fdf4;
    --red: #dc2626;
    --red-light: #fef2f2;
    --amber: #d97706;
    --amber-light: #fffbeb;
  }

  body { font-family: 'Roboto', sans-serif; background: var(--bg); color: var(--text); }

  .app {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Roboto', sans-serif;
  }

  /* HEADER */
  .header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
  }
  .header-logo {
    display: flex; align-items: center; gap: 12px;
  }
  .header-badge {
    background: var(--accent);
    color: #fff;
    font-family: 'Roboto Mono', monospace;
    font-size: 10px; font-weight: 500;
    padding: 3px 8px; border-radius: 4px;
    letter-spacing: 1px;
  }
  .header-title {
    font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.3px;
  }
  .header-subtitle {
    font-size: 11px; color: var(--muted); font-weight: 400;
  }
  .back-btn {
    display: flex; align-items: center; gap: 6px;
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--muted); padding: 7px 14px; border-radius: 8px;
    cursor: pointer; font-size: 13px; transition: all .15s;
    font-family: 'Roboto', sans-serif; font-weight: 500;
  }
  .back-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }

  /* HOME */
  .home { padding: 32px 24px; max-width: 960px; margin: 0 auto; }
  .home-hero { text-align: center; margin-bottom: 40px; }
  .home-hero h1 {
    font-size: clamp(26px, 4vw, 38px);
    font-weight: 700; color: var(--text);
    letter-spacing: -0.5px; line-height: 1.25; margin-bottom: 10px;
  }
  .home-hero h1 span { color: var(--accent); }
  .home-hero p { color: var(--muted); font-size: 14px; max-width: 480px; margin: 0 auto; line-height: 1.65; font-weight: 400; }

  .mode-cards {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 14px; margin-bottom: 32px;
  }
  .mode-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 22px; cursor: pointer;
    transition: all .15s; position: relative; overflow: hidden;
  }
  .mode-card:hover { border-color: var(--accent); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(37,99,235,0.08); }
  .mode-icon { font-size: 28px; margin-bottom: 10px; }
  .mode-title { font-size: 15px; font-weight: 600; margin-bottom: 5px; color: var(--text); }
  .mode-desc { font-size: 13px; color: var(--muted); line-height: 1.55; font-weight: 400; }
  .mode-tag {
    display: inline-block; margin-top: 12px;
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--muted); font-size: 10px; padding: 2px 8px; border-radius: 99px;
    font-family: 'Roboto Mono', monospace;
  }

  .score-banner {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 18px 24px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  }
  .score-item { text-align: center; }
  .score-val {
    font-size: 26px; color: var(--accent); font-weight: 700; letter-spacing: -0.5px;
  }
  .score-label { font-size: 11px; color: var(--muted); margin-top: 2px; font-weight: 400; }

  /* TOPIC SELECT */
  .topic-select { padding: 24px; max-width: 900px; margin: 0 auto; }
  .section-title {
    font-size: 20px; font-weight: 700; margin-bottom: 4px; color: var(--text); letter-spacing: -0.3px;
  }
  .section-subtitle { color: var(--muted); font-size: 13px; margin-bottom: 20px; font-weight: 400; }

  .topic-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
  }
  .topic-card {
    background: var(--surface); border-radius: 10px; overflow: hidden;
    border: 1px solid var(--border); cursor: pointer; transition: all .15s;
  }
  .topic-card:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.07); border-color: var(--border-strong); }
  .topic-card-header {
    padding: 14px 16px; display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid var(--border);
  }
  .topic-emoji { font-size: 20px; }
  .topic-name { font-size: 13px; font-weight: 600; line-height: 1.3; color: var(--text); }
  .topic-ch { font-size: 10px; color: var(--muted); margin-top: 1px; font-weight: 400; }
  .topic-card-body { padding: 10px 16px 14px; }
  .subtopic-list { list-style: none; }
  .subtopic-list li {
    font-size: 11px; color: var(--muted); padding: 3px 0;
    display: flex; align-items: flex-start; gap: 5px; font-weight: 400;
  }
  .subtopic-list li::before { content: '·'; color: var(--accent); flex-shrink: 0; font-weight: 700; }

  /* STUDY MODE */
  .study-mode { padding: 24px; max-width: 800px; margin: 0 auto; }
  .study-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .topic-badge {
    display: flex; align-items: center; gap: 8px;
    background: var(--accent-light); border: 1px solid #bfdbfe;
    padding: 6px 14px; border-radius: 99px; font-size: 13px; font-weight: 500; color: var(--accent);
  }
  .progress-wrap { margin-bottom: 20px; }
  .progress-label { font-size: 12px; color: var(--muted); margin-bottom: 6px; display: flex; justify-content: space-between; font-weight: 400; }
  .progress-bar { height: 3px; background: var(--border); border-radius: 99px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 99px; transition: width .4s; }

  .flashcard {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 28px; margin-bottom: 16px;
    min-height: 190px; position: relative; cursor: pointer;
    transition: all .15s; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .flashcard:hover { border-color: var(--accent); box-shadow: 0 4px 16px rgba(37,99,235,0.08); }
  .flashcard-hint { font-size: 11px; color: var(--muted); margin-bottom: 14px; display: flex; align-items: center; gap: 5px; font-weight: 400; }
  .flashcard-term {
    font-size: 20px; font-weight: 700; line-height: 1.3; margin-bottom: 14px;
    color: var(--text); letter-spacing: -0.3px;
  }
  .flashcard-def {
    font-size: 14px; color: #4b5563; line-height: 1.7; font-weight: 400;
    animation: fadeIn .25s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

  .card-actions { display: flex; gap: 10px; }
  .btn {
    padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; border: 1px solid transparent; transition: all .15s;
    font-family: 'Roboto', sans-serif;
    display: flex; align-items: center; gap: 6px;
  }
  .btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
  .btn-primary:hover { background: var(--accent-dark); border-color: var(--accent-dark); }
  .btn-secondary { background: var(--surface); color: var(--text); border-color: var(--border); }
  .btn-secondary:hover { border-color: var(--border-strong); background: var(--surface2); }
  .btn-success { background: var(--green-light); color: var(--green); border-color: #bbf7d0; }
  .btn-success:hover { background: var(--green); color: #fff; border-color: var(--green); }
  .btn-danger { background: var(--red-light); color: var(--red); border-color: #fecaca; }
  .btn-danger:hover { background: var(--red); color: #fff; }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-full { width: 100%; justify-content: center; }

  /* AI INTERVIEW */
  .interview-mode { padding: 24px; max-width: 800px; margin: 0 auto; }
  .interview-question {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 22px; margin-bottom: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .question-label {
    font-size: 10px; color: var(--accent); font-family: 'Roboto Mono', monospace;
    letter-spacing: 1.2px; margin-bottom: 10px; font-weight: 500; text-transform: uppercase;
  }
  .question-text { font-size: 15px; line-height: 1.65; font-weight: 500; color: var(--text); }

  .answer-area {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 18px; margin-bottom: 14px;
    transition: border-color .15s;
  }
  .answer-area:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
  .answer-textarea {
    width: 100%; background: transparent; border: none; outline: none;
    color: var(--text); font-size: 14px; font-family: 'Roboto', sans-serif;
    resize: none; line-height: 1.7; min-height: 110px; font-weight: 400;
  }
  .answer-textarea::placeholder { color: var(--muted); }

  .ai-feedback {
    background: #f8faff; border-radius: 12px; padding: 22px;
    margin-bottom: 16px; animation: fadeIn .35s;
    border: 1px solid #dbeafe;
  }
  .feedback-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .ai-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }
  .feedback-label { font-size: 11px; color: var(--accent); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
  .feedback-text { font-size: 14px; color: #374151; line-height: 1.75; font-weight: 400; }
  .feedback-text strong { color: var(--text); font-weight: 600; }

  .score-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .score-chip {
    padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 600;
    font-family: 'Roboto Mono', monospace;
  }
  .chip-good { background: var(--green-light); color: var(--green); border: 1px solid #bbf7d0; }
  .chip-ok { background: var(--amber-light); color: var(--amber); border: 1px solid #fde68a; }
  .chip-weak { background: var(--red-light); color: var(--red); border: 1px solid #fecaca; }

  .loading-dots {
    display: flex; gap: 5px; align-items: center; padding: 6px 0;
  }
  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); animation: pulse 1.2s ease-in-out infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  /* QUIZ MODE */
  .quiz-mode { padding: 24px; max-width: 720px; margin: 0 auto; }
  .quiz-q {
    font-size: 15px; font-weight: 500; line-height: 1.65; color: var(--text);
    margin-bottom: 20px;
  }
  .quiz-options { display: flex; flex-direction: column; gap: 9px; }
  .quiz-option {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 13px 16px; cursor: pointer;
    font-size: 14px; transition: all .15s; text-align: left;
    font-family: 'Roboto', sans-serif; color: var(--text); font-weight: 400;
  }
  .quiz-option:hover:not(:disabled) { border-color: var(--accent); background: var(--accent-light); }
  .quiz-option.correct { background: #f0fdf4; border-color: #86efac; color: #16a34a; font-weight: 500; }
  .quiz-option.wrong { background: #fef2f2; border-color: #fca5a5; color: #dc2626; }
  .quiz-option:disabled { cursor: default; }
  .quiz-explain {
    margin-top: 14px; padding: 14px 16px; background: #fffbeb;
    border: 1px solid #fde68a; border-radius: 10px;
    font-size: 13px; color: #78350f; line-height: 1.65;
    animation: fadeIn .25s; font-weight: 400;
  }

  .result-screen {
    text-align: center; padding: 48px 24px;
  }
  .result-score {
    font-size: 80px; font-weight: 700; color: var(--accent);
    letter-spacing: -2px; line-height: 1;
    margin-bottom: 8px;
  }
  .result-label { color: var(--muted); font-size: 15px; margin-bottom: 32px; font-weight: 400; }

  .divider { height: 1px; background: var(--border); margin: 18px 0; }

  .tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .tag {
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--muted); font-size: 11px; padding: 3px 10px;
    border-radius: 99px; font-family: 'Roboto Mono', monospace; font-weight: 400;
  }
`;

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────

const QUIZ_QUESTIONS = [
  {
    q: "Theo Taylor, nguyên tắc đầu tiên trong Quản trị Khoa học là gì?",
    options: ["Tuyển chọn và đào tạo nhân viên một cách khoa học", "Phát triển quy trình làm việc khoa học cho từng yếu tố công việc", "Hợp tác chân thành với công nhân", "Phân chia công việc bình đẳng"],
    correct: 1,
    explain: "Taylor bắt đầu bằng việc nghiên cứu khoa học từng yếu tố công việc (ví dụ: time & motion studies) trước khi tuyển chọn hay đào tạo nhân viên."
  },
  {
    q: "Nhân tố nào sau đây là 'nhân tố động viên' theo thuyết 2 nhân tố của Herzberg?",
    options: ["Mức lương và phúc lợi", "Điều kiện làm việc", "Sự công nhận thành tích", "Mối quan hệ với đồng nghiệp"],
    correct: 2,
    explain: "Nhân tố động viên (motivators) của Herzberg tạo ra sự thỏa mãn thực sự: thành tích, công nhận, bản thân công việc, trách nhiệm, thăng tiến. Lương và điều kiện làm việc là nhân tố vệ sinh (hygiene)."
  },
  {
    q: "Trong Lãnh đạo Tình huống (Hersey & Blanchard), phong cách S2 'Selling' phù hợp với nhân viên ở mức độ sẵn sàng nào?",
    options: ["R1: Không có năng lực, không có động lực", "R2: Không có năng lực nhưng có động lực", "R3: Có năng lực nhưng thiếu động lực", "R4: Có năng lực và có động lực"],
    correct: 1,
    explain: "S2 Selling (hướng dẫn + động viên) dành cho R2: nhân viên chưa có kỹ năng đủ nhưng nhiệt tình. Lãnh đạo cần giải thích và thuyết phục."
  },
  {
    q: "Mô hình 5 lực lượng cạnh tranh của Porter KHÔNG bao gồm yếu tố nào?",
    options: ["Nguy cơ từ sản phẩm thay thế", "Quyền thương lượng của chính phủ", "Quyền thương lượng của nhà cung cấp", "Nguy cơ từ đối thủ mới gia nhập ngành"],
    correct: 1,
    explain: "5 lực lượng Porter: (1) Đối thủ hiện tại, (2) Đối thủ tiềm năng mới, (3) NCC, (4) Khách hàng, (5) Sản phẩm thay thế. Chính phủ thuộc môi trường vĩ mô (PEST), không nằm trong mô hình Porter."
  },
  {
    q: "Theo McGregor, nhà quản trị tin vào Thuyết Y sẽ:",
    options: ["Giám sát chặt chẽ và dùng hình phạt để kỷ luật nhân viên", "Trao quyền, phân cấp và tạo môi trường để nhân viên tự phát triển", "Xây dựng hệ thống quy tắc nghiêm ngặt cho mọi hoạt động", "Chỉ thưởng vật chất để tăng năng suất"],
    correct: 1,
    explain: "Thuyết Y giả định người lao động tự giác, muốn có trách nhiệm và sáng tạo. Vì vậy, nhà quản trị theo Thuyết Y sẽ trao quyền và tạo môi trường làm việc tốt thay vì kiểm soát chặt chẽ."
  },
  {
    q: "Nguyên tắc SMART yêu cầu mục tiêu phải 'Time-bound'. Điều này có nghĩa là:",
    options: ["Mục tiêu phải được đặt trong thời gian ngắn nhất có thể", "Mục tiêu phải có thời hạn hoàn thành cụ thể", "Mục tiêu phải được đo lường hàng ngày", "Mục tiêu phải liên quan đến thời gian làm việc của nhân viên"],
    correct: 1,
    explain: "Time-bound có nghĩa là mục tiêu cần có deadline rõ ràng — ví dụ 'tăng doanh thu 15% trong Q2/2026'. Không có thời hạn, mục tiêu chỉ là mong muốn, không có tính cam kết."
  },
  {
    q: "Cơ cấu tổ chức nào được mô tả là 'hữu cơ' (organic)?",
    options: ["Nhiều tầng quản trị, quy tắc chặt chẽ, tập trung hóa cao", "Linh hoạt, phi tập trung, ít quy tắc, phù hợp môi trường biến động", "Phân chia rõ ràng theo chức năng chuyên môn", "Mỗi nhân viên báo cáo cho hai cấp quản lý khác nhau"],
    correct: 1,
    explain: "Cơ cấu hữu cơ (organic): linh hoạt, phi tập trung, ít quy tắc, phạm vi kiểm soát rộng — phù hợp môi trường không chắc chắn và cần sáng tạo. Đối lập với cơ cấu cơ khí (mechanistic)."
  },
  {
    q: "Theo thuyết Kỳ vọng của Vroom, động lực = E × I × V. Chữ 'I' (Instrumentality) có nghĩa là gì?",
    options: ["Mức độ quan trọng của phần thưởng", "Niềm tin rằng nỗ lực sẽ dẫn đến kết quả tốt", "Niềm tin rằng kết quả tốt sẽ dẫn đến phần thưởng", "Công cụ đo lường hiệu suất"],
    correct: 2,
    explain: "I (Instrumentality) = Công cụ tính: niềm tin rằng đạt kết quả tốt sẽ được thưởng. E (Expectancy) = kỳ vọng nỗ lực → kết quả. V (Valence) = giá trị phần thưởng với cá nhân."
  },
  {
    q: "Kiểm soát phòng ngừa (Feedforward control) khác với kiểm soát phản hồi (Feedback control) ở điểm nào?",
    options: ["Kiểm soát phòng ngừa diễn ra trong khi hoạt động đang thực hiện", "Kiểm soát phòng ngừa diễn ra trước khi vấn đề xảy ra", "Kiểm soát phòng ngừa chỉ áp dụng cho bộ phận tài chính", "Kiểm soát phòng ngừa dựa trên kết quả cuối kỳ"],
    correct: 1,
    explain: "Feedforward: trước khi vấn đề xảy ra (kiểm tra nguyên liệu, phỏng vấn kỹ). Concurrent: trong khi thực hiện. Feedback: sau khi hoàn thành (báo cáo kết quả, đánh giá hiệu suất)."
  },
  {
    q: "Hiệu ứng Hawthorne (Hawthorne Effect) kết luận rằng:",
    options: ["Điều kiện ánh sáng tốt hơn luôn tăng năng suất", "Nhân viên làm việc tốt hơn khi biết mình đang được quan sát", "Tiền lương là yếu tố duy nhất ảnh hưởng đến năng suất", "Làm việc nhóm luôn hiệu quả hơn làm việc cá nhân"],
    correct: 1,
    explain: "Nghiên cứu Hawthorne tại Western Electric (1920s) phát hiện rằng bất kể điều kiện vật chất thay đổi thế nào, năng suất đều tăng khi nhân viên biết mình đang được chú ý/quan sát."
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function EMBAStudyTool() {
  const [screen, setScreen] = useState("home"); // home | topics | study | interview | quiz
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [showDef, setShowDef] = useState(false);
  const [scores, setScores] = useState({ flashcard: 0, quiz: 0, interview: 0, studied: 0 });
  
  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [shuffledQuiz] = useState(() => [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5));
  
  // Interview state
  const [interviewIndex, setInterviewIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [interviewTopic, setInterviewTopic] = useState(null); // null = general
  const [interviewMode, setInterviewMode] = useState("general"); // general | knowledge

  const topicCards = selectedTopic ? TOPICS.find(t => t.id === selectedTopic) : null;
  const currentCard = topicCards ? topicCards.keyTerms[cardIndex] : null;

  const callClaude = async (systemPrompt, userMsg) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "Không thể tải phản hồi.";
  };

  const handleGetFeedback = async () => {
    if (!answer.trim()) return;
    setLoadingFeedback(true);
    setFeedback(null);
    
    const questionText = interviewMode === "general"
      ? INTERVIEW_QUESTIONS[interviewIndex]
      : (topicCards?.sampleQA?.[interviewIndex % (topicCards?.sampleQA?.length || 1)]?.q || INTERVIEW_QUESTIONS[0]);

    const system = `Bạn là giảng viên chuyên gia của chương trình EMBA tại Đại học Ngoại thương Việt Nam. 
Nhiệm vụ: Đánh giá câu trả lời phỏng vấn đầu vào của ứng viên EMBA một cách chuyên nghiệp, chi tiết và mang tính xây dựng.

Cấu trúc phản hồi (trả lời bằng tiếng Việt):
1. **Điểm mạnh** (✅): 2-3 điểm tốt trong câu trả lời
2. **Điểm cần cải thiện** (⚠️): 2-3 điểm còn yếu hoặc thiếu
3. **Gợi ý cụ thể**: Câu trả lời mẫu hoặc hướng dẫn cụ thể để nâng điểm
4. **Đánh giá tổng thể**: Điểm số từ 1-10 và nhận xét ngắn gọn

Yêu cầu: Phản hồi thực tế, không chung chung, tập trung vào nội dung chất lượng và kỹ năng trình bày.`;

    const userMsg = `Câu hỏi phỏng vấn EMBA: "${questionText}"

Câu trả lời của ứng viên: "${answer}"

Hãy đánh giá chi tiết câu trả lời này.`;

    try {
      const result = await callClaude(system, userMsg);
      setFeedback(result);
      setScores(s => ({ ...s, interview: s.interview + 1 }));
    } catch {
      setFeedback("❌ Lỗi kết nối. Vui lòng thử lại.");
    }
    setLoadingFeedback(false);
  };

  const nextInterviewQ = () => {
    const maxQ = interviewMode === "general" ? INTERVIEW_QUESTIONS.length : (topicCards?.sampleQA?.length || 1);
    setInterviewIndex(i => (i + 1) % maxQ);
    setAnswer("");
    setFeedback(null);
  };

  const handleQuizAnswer = (idx) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (idx === shuffledQuiz[quizIndex].correct) {
      setQuizCorrect(c => c + 1);
    }
  };

  const nextQuizQ = () => {
    if (quizIndex + 1 >= shuffledQuiz.length) {
      setQuizDone(true);
      setScores(s => ({ ...s, quiz: quizCorrect + (quizSelected === shuffledQuiz[quizIndex].correct ? 1 : 0) }));
    } else {
      setQuizIndex(q => q + 1);
      setQuizSelected(null);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0); setQuizSelected(null); setQuizCorrect(0); setQuizDone(false);
  };

  const markStudied = () => {
    setScores(s => ({ ...s, flashcard: s.flashcard + 1, studied: s.studied + 1 }));
    setShowDef(false);
    if (cardIndex + 1 < topicCards.keyTerms.length) {
      setCardIndex(i => i + 1);
    } else {
      setCardIndex(0);
    }
  };

  const interviewQuestion = interviewMode === "general"
    ? INTERVIEW_QUESTIONS[interviewIndex]
    : (topicCards?.sampleQA?.[interviewIndex % (topicCards?.sampleQA?.length || 1)]?.q);

  return (
    <div className="app">
      <style>{styles}</style>

      {/* HEADER */}
      <div className="header">
        <div className="header-logo">
          <div>
            <div className="header-title">EMBA Study Pro</div>
            <div className="header-subtitle">Đại học Ngoại thương • Quản trị kinh doanh</div>
          </div>
          <div className="header-badge">EMBA</div>
        </div>
        {screen !== "home" && (
          <button className="back-btn" onClick={() => {
            setScreen("home"); setCardIndex(0); setShowDef(false);
            setSelectedTopic(null); setFeedback(null); setAnswer("");
          }}>
            ← Trang chủ
          </button>
        )}
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div className="home">
          <div className="home-hero">
            <h1>Chinh phục kỳ thi<br /><span>đầu vào EMBA</span></h1>
            <p>Công cụ ôn thi thông minh dựa trên sách giáo khoa Management (Robbins & Coulter, 15E) và tiêu chí đánh giá chính thức của FTU.</p>
          </div>

          <div className="mode-cards">
            {[
              { icon: "🃏", title: "Flashcard Thuật ngữ", desc: "Ôn tập nhanh các khái niệm và định nghĩa trọng tâm từng chủ đề. Lý tưởng cho việc ghi nhớ.", tag: "8 chủ đề · 50+ thuật ngữ", screen: "topics", accent: "#c9a84c" },
              { icon: "🤖", title: "Phỏng vấn AI", desc: "Claude AI đóng vai Hội đồng tuyển sinh, hỏi và chấm điểm câu trả lời của bạn theo chuẩn EMBA.", tag: "AI-powered · Phản hồi chi tiết", screen: "interview", accent: "#3498db" },
              { icon: "📝", title: "Trắc nghiệm Kiến thức", desc: "10 câu hỏi trắc nghiệm về các lý thuyết quản trị trọng tâm. Có giải thích đáp án chi tiết.", tag: "10 câu · Có giải thích", screen: "quiz", accent: "#e91e8c" },
            ].map(m => (
              <div
                key={m.screen}
                className="mode-card"
                style={{ "--accent-color": m.accent }}
                onClick={() => setScreen(m.screen)}
              >
                <div className="mode-icon">{m.icon}</div>
                <div className="mode-title">{m.title}</div>
                <div className="mode-desc">{m.desc}</div>
                <div className="mode-tag">{m.tag}</div>
              </div>
            ))}
          </div>

          <div className="score-banner">
            {[
              { val: scores.studied, label: "Thuật ngữ đã học" },
              { val: scores.interview, label: "Câu phỏng vấn đã luyện" },
              { val: scores.quiz, label: "Câu trắc nghiệm đúng" },
              { val: TOPICS.length, label: "Chủ đề trong đề cương" },
            ].map(s => (
              <div key={s.label} className="score-item">
                <div className="score-val">{s.val}</div>
                <div className="score-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOPIC SELECT */}
      {screen === "topics" && (
        <div className="topic-select">
          <div className="section-title">Chọn Chủ đề Ôn tập</div>
          <div className="section-subtitle">Bám sát đề cương chính thức của Hội đồng tuyển sinh EMBA — FTU</div>
          <div className="topic-grid">
            {TOPICS.map(t => (
              <div
                key={t.id}
                className="topic-card"
                style={{ borderColor: `${t.accent}30` }}
                onClick={() => { setSelectedTopic(t.id); setCardIndex(0); setShowDef(false); setScreen("study"); }}
              >
                <div className="topic-card-header" style={{ borderBottom: `1px solid ${t.accent}20` }}>
                  <span className="topic-emoji">{t.icon}</span>
                  <div>
                    <div className="topic-name">{t.title}</div>
                    <div className="topic-ch">{t.chapters}</div>
                  </div>
                </div>
                <div className="topic-card-body">
                  <ul className="subtopic-list">
                    {t.subtopics.slice(0, 4).map((s, i) => <li key={i}>{s}</li>)}
                    {t.subtopics.length > 4 && <li style={{ color: `${t.accent}` }}>+{t.subtopics.length - 4} nội dung khác</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STUDY / FLASHCARD MODE */}
      {screen === "study" && topicCards && (
        <div className="study-mode">
          <div className="study-header">
            <div className="topic-badge" style={{ borderColor: "#bfdbfe" }}>
              <span>{topicCards.icon}</span>
              <span style={{ color: "var(--accent)" }}>{topicCards.title}</span>
            </div>
          </div>

          <div className="progress-wrap">
            <div className="progress-label">
              <span>Thuật ngữ {cardIndex + 1}/{topicCards.keyTerms.length}</span>
              <span style={{ color: "var(--accent)" }}>{topicCards.chapters}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((cardIndex + 1) / topicCards.keyTerms.length) * 100}%`,
                  background: "var(--accent)"
                }}
              />
            </div>
          </div>

          <div className="flashcard" onClick={() => setShowDef(!showDef)}>
            <div className="flashcard-hint">
              💡 {showDef ? "Click để ẩn định nghĩa" : "Click để xem định nghĩa"}
            </div>
            <div className="flashcard-term">{currentCard?.term}</div>
            {showDef && <div className="flashcard-def">{currentCard?.def}</div>}
          </div>

          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => { setShowDef(false); setCardIndex(i => Math.max(0, i - 1)); }}>
              ← Trước
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowDef(!showDef)}>
              {showDef ? "Ẩn định nghĩa" : "Xem định nghĩa"}
            </button>
            <button className="btn btn-success" onClick={markStudied}>
              Đã thuộc ✓
            </button>
          </div>

          <div className="divider" />

          {/* Sample Q&A */}
          <div style={{ marginTop: 8 }}>
            <div className="section-subtitle" style={{ marginBottom: 12 }}>
              📋 Câu hỏi mẫu trong đề thi
            </div>
            {topicCards.sampleQA?.map((qa, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 18, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "var(--accent)" }}>
                  Câu hỏi {i + 1}:
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 12, color: "var(--text)" }}>{qa.q}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 600 }}>Gợi ý trả lời: </span>
                  {qa.hints.join(" · ")}
                </div>
              </div>
            ))}
            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: 8 }}
              onClick={() => {
                setInterviewMode("knowledge");
                setInterviewTopic(selectedTopic);
                setInterviewIndex(0);
                setAnswer("");
                setFeedback(null);
                setScreen("interview");
              }}
            >
              🤖 Luyện tập câu hỏi này với AI →
            </button>
          </div>
        </div>
      )}

      {/* INTERVIEW MODE */}
      {screen === "interview" && (
        <div className="interview-mode">
          <div className="section-title">Phỏng vấn AI</div>
          <div className="section-subtitle">AI đóng vai Hội đồng tuyển sinh EMBA. Trả lời bằng tiếng Việt.</div>

          <div className="tag-row">
            <button
              className="btn btn-secondary"
              style={interviewMode === "general" ? { borderColor: "var(--accent)", color: "var(--accent)", background: "var(--accent-light)" } : {}}
              onClick={() => { setInterviewMode("general"); setInterviewIndex(0); setAnswer(""); setFeedback(null); }}
            >
              🎤 Câu hỏi chung
            </button>
            {TOPICS.map(t => (
              <button
                key={t.id}
                className="btn btn-secondary"
                style={{ fontSize: 11, padding: "6px 12px", ...(interviewMode === "knowledge" && interviewTopic === t.id ? { borderColor: "var(--accent)", color: "var(--accent)", background: "var(--accent-light)" } : {}) }}
                onClick={() => {
                  setInterviewMode("knowledge");
                  setInterviewTopic(t.id);
                  setInterviewIndex(0);
                  setAnswer(""); setFeedback(null);
                  setSelectedTopic(t.id);
                }}
              >
                {t.icon} {t.title.split(".")[0]}
              </button>
            ))}
          </div>

          <div className="interview-question">
            <div className="question-label">
              {interviewMode === "general" ? "CÂU HỎI CHUNG" : "CÂU HỎI CHUYÊN MÔN"} · {interviewMode === "general" ? interviewIndex + 1 : interviewIndex + 1}/{interviewMode === "general" ? INTERVIEW_QUESTIONS.length : (topicCards?.sampleQA?.length || 1)}
            </div>
            <div className="question-text">{interviewQuestion}</div>
          </div>

          {interviewMode === "knowledge" && topicCards?.sampleQA?.[interviewIndex % (topicCards.sampleQA.length)] && (
            <div style={{ background: "#eff4ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "11px 16px", marginBottom: 16, fontSize: 12, color: "#374151" }}>
              <strong style={{ color: "var(--accent)" }}>💡 Gợi ý: </strong>
              {topicCards.sampleQA[interviewIndex % topicCards.sampleQA.length].hints.join(" · ")}
            </div>
          )}

          <div className="answer-area">
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>✏️ CÂU TRẢ LỜI CỦA BẠN</div>
            <textarea
              className="answer-textarea"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Nhập câu trả lời của bạn tại đây... (không giới hạn độ dài)"
            />
          </div>

          <div className="card-actions" style={{ marginBottom: 20 }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={handleGetFeedback}
              disabled={!answer.trim() || loadingFeedback}
            >
              {loadingFeedback ? "Đang chấm điểm..." : "🤖 Nhận phản hồi từ AI"}
            </button>
            <button className="btn btn-secondary" onClick={nextInterviewQ}>
              Câu tiếp →
            </button>
          </div>

          {loadingFeedback && (
            <div className="ai-feedback">
              <div className="feedback-header">
                <div className="ai-avatar">🎓</div>
                <div>
                  <div className="feedback-label">HỘI ĐỒNG EMBA ĐANG ĐÁNH GIÁ</div>
                </div>
              </div>
              <div className="loading-dots">
                <div className="dot" /><div className="dot" /><div className="dot" />
              </div>
            </div>
          )}

          {feedback && !loadingFeedback && (
            <div className="ai-feedback">
              <div className="feedback-header">
                <div className="ai-avatar">🎓</div>
                <div>
                  <div className="feedback-label">PHẢN HỒI TỪ HỘI ĐỒNG EMBA</div>
                </div>
              </div>
              <div className="feedback-text">
                {feedback.split('\n').map((line, i) => (
                  <p key={i} style={{ marginBottom: line.trim() ? 8 : 4 }}>
                    {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
                ))}
              </div>
              <div className="divider" />
              <button className="btn btn-secondary" onClick={nextInterviewQ}>
                Luyện câu tiếp theo →
              </button>
            </div>
          )}
        </div>
      )}

      {/* QUIZ MODE */}
      {screen === "quiz" && (
        <div className="quiz-mode">
          {!quizDone ? (
            <>
              <div className="section-title">Trắc nghiệm Quản trị học</div>
              <div className="progress-wrap" style={{ margin: "16px 0 24px" }}>
                <div className="progress-label">
                  <span>Câu {quizIndex + 1}/{shuffledQuiz.length}</span>
                  <span style={{ color: "var(--green)" }}>✓ {quizCorrect} đúng</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${((quizIndex) / shuffledQuiz.length) * 100}%`, background: "var(--accent)" }} />
                </div>
              </div>

              <div className="quiz-q">{shuffledQuiz[quizIndex].q}</div>
              <div className="quiz-options">
                {shuffledQuiz[quizIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    className={`quiz-option ${quizSelected !== null ? (i === shuffledQuiz[quizIndex].correct ? "correct" : quizSelected === i ? "wrong" : "") : ""}`}
                    onClick={() => handleQuizAnswer(i)}
                    disabled={quizSelected !== null}
                  >
                    <span style={{ fontFamily: "Roboto Mono", marginRight: 8, fontSize: 11, opacity: 0.5, fontWeight: 500 }}>{["A", "B", "C", "D"][i]}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {quizSelected !== null && (
                <div className="quiz-explain">
                  <strong>{quizSelected === shuffledQuiz[quizIndex].correct ? "✅ Chính xác! " : "❌ Chưa đúng. "}</strong>
                  {shuffledQuiz[quizIndex].explain}
                </div>
              )}

              {quizSelected !== null && (
                <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={nextQuizQ}>
                  {quizIndex + 1 >= shuffledQuiz.length ? "Xem kết quả" : "Câu tiếp theo →"}
                </button>
              )}
            </>
          ) : (
            <div className="result-screen">
              <div className="result-score">{quizCorrect}/{shuffledQuiz.length}</div>
              <div className="result-label">
                {quizCorrect >= 8 ? "🏆 Xuất sắc! Bạn đã nắm vững kiến thức Quản trị học." :
                  quizCorrect >= 6 ? "👍 Tốt! Cần ôn thêm một số chủ đề." :
                    "📚 Cần ôn tập thêm. Hãy xem lại các flashcard!"}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={resetQuiz}>🔄 Làm lại</button>
                <button className="btn btn-secondary" onClick={() => setScreen("topics")}>📚 Ôn Flashcard</button>
                <button className="btn btn-secondary" onClick={() => setScreen("interview")}>🤖 Luyện phỏng vấn</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <div style={{
        textAlign: "center", padding: "24px 16px",
        borderTop: "1px solid var(--border)", marginTop: 16,
        fontSize: 12, color: "var(--muted)", fontWeight: 400,
        letterSpacing: "0.2px"
      }}>
        App được phát triển bởi <strong style={{ color: "var(--text)", fontWeight: 500 }}>Vũ Hải</strong> | Business Consultant
      </div>
    </div>
  );
}
