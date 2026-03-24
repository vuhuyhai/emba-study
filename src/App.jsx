import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const TOPICS = [
  {
    id: "overview",
    icon: "🏛️",
    title: "I. Tổng quan về Quản trị",
    color: "#1a6b4a",
    accent: "#2ecc71",
    chapters: "Ch.1 — Managers and You in the Workplace",
    subtopics: [
      "Khái niệm tổ chức và 3 đặc trưng cơ bản",
      "Khái niệm quản trị (Management) & nhà quản trị",
      "Hiệu lực (Effectiveness) vs Hiệu quả (Efficiency)",
      "4 chức năng quản trị: POLC",
      "3 cấp quản trị: First-line, Middle, Top",
      "3 kỹ năng: Chuyên môn, Nhân sự, Tư duy khái quát",
      "10 vai trò của nhà quản trị (Mintzberg)",
    ],
    keyTerms: [
      { term: "Quản trị (Management)", def: "Quá trình phối hợp và giám sát hoạt động của người khác để các hoạt động đó được thực hiện một cách hiệu quả (efficiently) và hiệu lực (effectively) nhằm đạt mục tiêu tổ chức." },
      { term: "Hiệu lực (Effectiveness)", def: "'Doing the right things' — Làm đúng việc, hoàn thành mục tiêu tổ chức. Liên quan đến KẾT QUẢ (ends). VD: Southwest Airlines đạt mục tiêu phục vụ khách hàng tốt nhất." },
      { term: "Hiệu quả (Efficiency)", def: "'Doing things right' — Làm việc đúng cách, tối thiểu hóa lãng phí nguồn lực (người, tiền, thiết bị). Liên quan đến PHƯƠNG TIỆN (means). VD: Southwest dùng 1 loại máy bay để giảm chi phí đào tạo." },
      { term: "Tổ chức (Organization)", def: "Một tập hợp có chủ đích của con người để thực hiện một mục đích cụ thể. 3 đặc trưng: (1) Mục đích rõ ràng, (2) Có con người, (3) Có cơ cấu tổ chức." },
      { term: "Nhà quản trị (Manager)", def: "Người phối hợp và giám sát công việc của người khác để mục tiêu tổ chức được thực hiện. Khác với nhân viên bình thường ở chỗ: họ làm việc THÔNG QUA người khác, không chỉ làm cá nhân." },
      { term: "Quản trị viên cấp cơ sở (First-line)", def: "Cấp quản trị thấp nhất, quản lý nhân viên không giữ chức vụ quản lý. Chức danh: Supervisor, Shift Manager, Trưởng ca. Kỹ năng quan trọng nhất: CHUYÊN MÔN." },
      { term: "Quản trị viên cấp trung (Middle)", def: "Cấp giữa, chịu trách nhiệm biến chiến lược thành hành động. Chức danh: Regional Manager, Store Manager, Division Manager. Cần CÂN BẰNG cả 3 kỹ năng." },
      { term: "Quản trị viên cấp cao (Top)", def: "Cấp cao nhất, ra quyết định toàn tổ chức và thiết lập chiến lược. Chức danh: CEO, CFO, President. Kỹ năng quan trọng nhất: TƯ DUY KHÁI QUÁT." },
      { term: "Kỹ năng chuyên môn (Technical)", def: "Kiến thức và năng lực trong lĩnh vực chuyên biệt. VD: kỹ năng kế toán, lập trình, marketing. Quan trọng nhất ở cấp quản trị cơ sở." },
      { term: "Kỹ năng nhân sự (Human)", def: "Khả năng làm việc tốt với người khác — cả cá nhân lẫn nhóm. Gồm: giao tiếp, tạo động lực, giải quyết xung đột. Quan trọng ở MỌI cấp quản trị." },
      { term: "Kỹ năng tư duy khái quát (Conceptual)", def: "Khả năng nhìn nhận tổ chức như một hệ thống tổng thể, hiểu mối quan hệ giữa các bộ phận và với môi trường. Quan trọng nhất ở cấp quản trị CAO." },
      { term: "4 Chức năng POLC", def: "Planning (Hoạch định): xác định mục tiêu & cách đạt. Organizing (Tổ chức): sắp xếp công việc. Leading (Lãnh đạo): hướng dẫn & động viên. Controlling (Kiểm soát): giám sát kết quả." },
      { term: "Vai trò quan hệ con người (Interpersonal)", def: "3 vai trò: (1) Người đại diện/Figurehead: đại diện tổ chức trong nghi lễ. (2) Nhà lãnh đạo/Leader: tuyển dụng, đào tạo, động viên. (3) Trung tâm liên lạc/Liaison: duy trì quan hệ bên ngoài." },
      { term: "Vai trò thông tin (Informational)", def: "3 vai trò: (1) Monitor: thu thập thông tin từ môi trường. (2) Disseminator: phổ biến thông tin nội bộ. (3) Spokesperson: phát ngôn với bên ngoài." },
      { term: "Vai trò ra quyết định (Decisional)", def: "4 vai trò: (1) Entrepreneur: khởi xướng thay đổi. (2) Disturbance Handler: xử lý khủng hoảng. (3) Resource Allocator: phân bổ nguồn lực. (4) Negotiator: thương lượng." },
    ],
    sampleQA: [
      {
        q: "Quản trị là gì? Phân biệt hiệu lực và hiệu quả. Cho ví dụ thực tế tại tổ chức bạn.",
        hints: ["Định nghĩa: phối hợp & giám sát → đạt mục tiêu efficiently & effectively", "Effectiveness = doing the right things (đúng mục tiêu)", "Efficiency = doing things right (ít lãng phí)", "Ví dụ cụ thể từ tổ chức bạn làm"]
      },
      {
        q: "Trình bày 3 cấp quản trị và kỹ năng cần thiết ở mỗi cấp. Liên hệ thực tế.",
        hints: ["Cấp cơ sở: kỹ năng chuyên môn cao nhất", "Cấp trung: cân bằng 3 kỹ năng", "Cấp cao: tư duy khái quát quan trọng nhất", "Liên hệ vị trí của bạn trong tổ chức"]
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
      "Taylor — Quản trị Khoa học (4 nguyên tắc)",
      "Fayol — Quản trị Hành chính (14 nguyên tắc)",
      "Hawthorne Studies & Hiệu ứng Hawthorne",
      "McGregor — Thuyết X và Thuyết Y",
      "Quản trị Định lượng",
      "Tiếp cận Hệ thống & Tiếp cận Tình huống",
    ],
    keyTerms: [
      { term: "Scientific Management (Taylor)", def: "4 nguyên tắc: (1) Nghiên cứu khoa học từng yếu tố công việc thay vì dùng kinh nghiệm. (2) Tuyển chọn & đào tạo NLĐ một cách khoa học. (3) Hợp tác chân thành với NLĐ. (4) Phân chia công việc bình đẳng giữa QTR và công nhân." },
      { term: "Time-and-Motion Studies (Taylor)", def: "Phương pháp của Taylor: quan sát và đo thời gian từng động tác công việc để tìm 'one best way' — cách làm hiệu quả nhất. Ứng dụng hiện đại: UPS đào tạo tài xế từng động tác cụ thể." },
      { term: "General Administrative Theory (Fayol)", def: "Fayol đề xuất quản trị là một tập hợp các chức năng phổ quát có thể áp dụng ở mọi tổ chức. Ông xác định 14 nguyên tắc quản trị, 5 chức năng: Plan, Organize, Command, Coordinate, Control." },
      { term: "14 Nguyên tắc Fayol", def: "(1) Phân công LĐ, (2) Quyền hạn, (3) Kỷ luật, (4) Thống nhất chỉ huy, (5) Thống nhất phương hướng, (6) Lợi ích chung > cá nhân, (7) Thù lao, (8) Tập trung hóa, (9) Chuỗi vô hướng, (10) Trật tự, (11) Công bằng, (12) Ổn định nhân sự, (13) Sáng kiến, (14) Tinh thần đồng đội." },
      { term: "Nguyên tắc Thống nhất chỉ huy (Unity of Command)", def: "Mỗi nhân viên chỉ nhận lệnh từ MỘT cấp trên duy nhất. Tránh nhầm lẫn và xung đột mệnh lệnh. Đây là một trong 14 nguyên tắc quan trọng nhất của Fayol." },
      { term: "Behavioral Approach (Quản trị Hành vi)", def: "Nghiên cứu con người là trung tâm — không chỉ nhiệm vụ. Xuất phát từ nghiên cứu Hawthorne (1920s). Kết luận: hành vi con người và nhóm ảnh hưởng quan trọng đến năng suất." },
      { term: "Hiệu ứng Hawthorne (Hawthorne Effect)", def: "Phát hiện từ nghiên cứu tại nhà máy Western Electric: năng suất tăng khi NLĐ biết mình đang được quan sát/chú ý, BẤT KỂ điều kiện vật chất thay đổi thế nào. Chứng minh yếu tố tâm lý xã hội quan trọng hơn điều kiện vật lý." },
      { term: "Thuyết X (McGregor)", def: "Quan điểm tiêu cực về NLĐ: họ không thích làm việc, lười biếng, trốn tránh trách nhiệm, cần bị kiểm soát chặt và đe dọa mới làm việc. → QTR cần giám sát chặt, hệ thống quy tắc nghiêm ngặt." },
      { term: "Thuyết Y (McGregor)", def: "Quan điểm tích cực: NLĐ thích làm việc, tự giác, sáng tạo, sẵn sàng nhận trách nhiệm nếu được tạo điều kiện. → QTR nên trao quyền, tạo môi trường tốt. Quản trị hiện đại nghiêng về Thuyết Y." },
      { term: "Quantitative Management (Quản trị Định lượng)", def: "Sử dụng kỹ thuật định lượng (thống kê, mô hình toán học, mô phỏng, tối ưu hóa) để ra quyết định quản trị. Ra đời từ WWII. Ứng dụng: lập lịch sản xuất, tối ưu hóa chuỗi cung ứng." },
      { term: "Systems Approach (Tiếp cận Hệ thống)", def: "Tổ chức là HỆ THỐNG MỞ gồm các bộ phận liên kết (Input → Transformation → Output), tương tác với môi trường bên ngoài. Thay đổi một bộ phận sẽ ảnh hưởng đến toàn hệ thống." },
      { term: "Contingency Approach (Tiếp cận Tình huống)", def: "Không có một cách quản trị nào là tốt nhất cho mọi tình huống ('it depends'). QTR cần điều chỉnh phương pháp phù hợp với từng bối cảnh cụ thể: quy mô, công nghệ, môi trường, con người." },
    ],
    sampleQA: [
      {
        q: "Trình bày lý thuyết Quản trị Khoa học của Taylor. Ưu điểm và nhược điểm?",
        hints: ["4 nguyên tắc cụ thể + time-and-motion studies", "Ưu: tăng năng suất vượt trội, tiêu chuẩn hóa quy trình", "Nhược: bỏ qua yếu tố tâm lý-xã hội, công nhân như 'máy móc'", "Ứng dụng thực tế tại VN hoặc tổ chức bạn"]
      },
      {
        q: "So sánh Thuyết X và Thuyết Y của McGregor. Ứng dụng trong quản trị nhân sự hiện đại?",
        hints: ["Thuyết X: con người thụ động → kiểm soát chặt", "Thuyết Y: con người chủ động → trao quyền", "Xu hướng hiện đại: Thuyết Y (Google, Zappos...)", "Liên hệ phong cách quản lý tại tổ chức bạn"]
      }
    ]
  },
  {
    id: "environment",
    icon: "🌐",
    title: "III. Môi trường Kinh doanh",
    color: "#6b1a4a",
    accent: "#e91e8c",
    chapters: "Ch.3 — External Environment & Organizational Culture",
    subtopics: [
      "Cấu trúc môi trường: bên trong & bên ngoài",
      "Môi trường tác nghiệp: KH, NCC, ĐTCT, Nhóm áp lực",
      "Môi trường vĩ mô: PESTEL",
      "Mô hình 5 lực lượng cạnh tranh Porter",
      "Văn hóa tổ chức",
    ],
    keyTerms: [
      { term: "Môi trường tác nghiệp (Task Environment)", def: "Các yếu tố bên ngoài TÁC ĐỘNG TRỰC TIẾP đến hoạt động hàng ngày của tổ chức: (1) Khách hàng, (2) Nhà cung cấp, (3) Đối thủ cạnh tranh, (4) Nhóm tạo sức ép (pressure groups, labor unions)." },
      { term: "Môi trường vĩ mô (General Environment)", def: "Các yếu tố bên ngoài tác động GIÁN TIẾP đến tổ chức — PESTEL: Political (Chính trị-pháp luật), Economic (Kinh tế), Sociocultural (Văn hóa-xã hội), Technological (Công nghệ), Environmental (Môi trường tự nhiên), Legal (Pháp lý)." },
      { term: "Môi trường bên trong (Internal Environment)", def: "Các yếu tố trong NỘI BỘ tổ chức: văn hóa tổ chức, cơ cấu tổ chức, nguồn nhân lực, tài chính, công nghệ. Tổ chức có thể kiểm soát được." },
      { term: "5 Lực lượng Porter (Five Forces)", def: "(1) Rivalry — mức độ cạnh tranh hiện tại. (2) Threat of New Entrants — nguy cơ đối thủ mới. (3) Bargaining Power of Suppliers — quyền lực NCC. (4) Bargaining Power of Buyers — quyền lực KH. (5) Threat of Substitutes — nguy cơ sản phẩm thay thế." },
      { term: "Rào cản gia nhập ngành (Entry Barriers)", def: "Các yếu tố ngăn đối thủ mới gia nhập ngành: vốn lớn, công nghệ độc quyền, thương hiệu mạnh, quy mô kinh tế, chính sách pháp luật. Rào cản cao → lợi nhuận ngành tốt hơn." },
      { term: "Văn hóa tổ chức (Organizational Culture)", def: "Hệ thống các giá trị, niềm tin, và nguyên tắc được chia sẻ giữa các thành viên. Thể hiện qua: cách ứng xử, nghi lễ, biểu tượng, câu chuyện, ngôn ngữ. Ảnh hưởng mạnh đến hành vi nhân viên." },
      { term: "Văn hóa mạnh vs Văn hóa yếu", def: "Văn hóa mạnh: giá trị cốt lõi được chia sẻ rộng rãi và kiên định → giảm cần thiết của quy tắc chính thức, tăng cam kết nhân viên. Văn hóa yếu: giá trị mơ hồ, không nhất quán → cần nhiều quy định hơn." },
      { term: "Môi trường không chắc chắn (Environmental Uncertainty)", def: "Mức độ khó dự đoán các thay đổi trong môi trường. Hai chiều: (1) Mức độ thay đổi (ổn định ↔ động). (2) Mức độ phức tạp (đơn giản ↔ phức tạp). Môi trường càng bất định → tổ chức cần linh hoạt hơn." },
    ],
    sampleQA: [
      {
        q: "Trình bày mô hình 5 lực lượng cạnh tranh của Porter. Áp dụng phân tích ngành của tổ chức bạn.",
        hints: ["5 lực lượng với tên tiếng Anh và tiếng Việt", "Mỗi lực lượng: các yếu tố quyết định mức độ", "Phân tích cụ thể 1-2 lực lượng mạnh nhất trong ngành của bạn", "Ý nghĩa với chiến lược kinh doanh"]
      }
    ]
  },
  {
    id: "planning",
    icon: "📋",
    title: "IV. Chức năng Hoạch định",
    color: "#6b4a1a",
    accent: "#f39c12",
    chapters: "Ch.8 Foundations of Planning + Ch.9 Managing Strategy",
    subtopics: [
      "Khái niệm, mục đích và tầm quan trọng của hoạch định",
      "Phân loại kế hoạch: thời gian, phạm vi, mức độ cụ thể, tần suất",
      "Mục tiêu SMART và phương pháp MBO",
      "Quy trình hoạch định chiến lược",
      "Phân tích SWOT",
    ],
    keyTerms: [
      { term: "Hoạch định (Planning)", def: "Xác định mục tiêu của tổ chức, thiết lập chiến lược tổng thể để đạt mục tiêu, và phát triển hệ thống kế hoạch tích hợp để phối hợp hoạt động. Liên quan đến cả ENDS (mục tiêu) và MEANS (phương tiện)." },
      { term: "4 Lý do hoạch định quan trọng", def: "(1) Cung cấp ĐỊNH HƯỚNG cho mọi người. (2) GiẢM BỚT bất trắc bằng cách nhìn về tương lai. (3) Giảm thiểu LÃNG PHÍ và trùng lặp. (4) Xây dựng TIÊU CHUẨN để kiểm soát." },
      { term: "Kế hoạch chiến lược (Strategic Plans)", def: "Áp dụng cho TOÀN TỔ CHỨC, thiết lập mục tiêu tổng thể và định vị trong môi trường. Thời gian: 3-5 năm hoặc hơn. Xuất phát từ MISSION (sứ mệnh) của tổ chức." },
      { term: "Kế hoạch tác nghiệp (Operational Plans)", def: "Xác định CHI TIẾT cách thực hiện mục tiêu chiến lược. Thời gian: ngắn hạn (≤1 năm). Phạm vi: bộ phận cụ thể. Mang tính chi tiết và định lượng cao." },
      { term: "Kế hoạch cụ thể (Specific Plans)", def: "Kế hoạch với mục tiêu và hành động RÕ RÀNG, không mơ hồ. VD: 'tăng doanh thu 20% trong Q2 bằng cách mở 3 điểm bán mới ở HCM'. Phù hợp khi môi trường ổn định." },
      { term: "Kế hoạch định hướng (Directional Plans)", def: "Kế hoạch LINH HOẠT, chỉ đưa ra hướng đi chung, không cố định mục tiêu hay hành động cụ thể. VD: 'cải thiện lợi nhuận 5-10% trong 6 tháng'. Phù hợp khi môi trường bất định." },
      { term: "Kế hoạch một lần (Single-use Plans)", def: "Kế hoạch tạo ra cho một TÌNH HUỐNG DUY NHẤT, không lặp lại. VD: kế hoạch mở nhà máy mới, kế hoạch ra mắt sản phẩm. Sau khi hoàn thành mục tiêu thì kế hoạch kết thúc." },
      { term: "Kế hoạch thường trực (Standing Plans)", def: "Kế hoạch LIÊN TỤC, cung cấp hướng dẫn cho các hoạt động lặp đi lặp lại. Gồm: Chính sách (policies), Quy trình (procedures), Quy tắc (rules). VD: chính sách không phân biệt đối xử." },
      { term: "Nguyên tắc SMART", def: "Mục tiêu tốt cần: Specific (Cụ thể), Measurable (Đo lường được), Achievable (Khả thi), Relevant (Phù hợp/Liên quan), Time-bound (Có thời hạn). VD: 'Tăng doanh số bán hàng online lên 30% trước ngày 31/12/2026.'" },
      { term: "MBO — Management by Objectives", def: "Phương pháp thiết lập mục tiêu HỢP TÁC giữa QTR và NV: (1) Cùng xác định mục tiêu cụ thể. (2) Định kỳ xem xét tiến độ. (3) Khen thưởng dựa trên kết quả đạt được. Tăng động lực và cam kết." },
      { term: "Phân tích SWOT", def: "Công cụ phân tích chiến lược: Strengths (Điểm mạnh nội bộ), Weaknesses (Điểm yếu nội bộ), Opportunities (Cơ hội từ môi trường), Threats (Thách thức từ môi trường). Giúp xây dựng chiến lược phù hợp." },
      { term: "Mission (Sứ mệnh)", def: "Tuyên bố rộng về MỤC ĐÍCH của tổ chức — lý do tổ chức tồn tại. Cung cấp định hướng tổng quát cho mọi quyết định. VD: Walmart: 'Save people money so they can live better.'" },
    ],
    sampleQA: [
      {
        q: "Hoạch định quan trọng như thế nào? Trình bày ví dụ về hoạch định tại tổ chức bạn.",
        hints: ["4 lý do quan trọng: định hướng, giảm bất trắc, giảm lãng phí, tạo tiêu chuẩn kiểm soát", "Ví dụ thực tế: kế hoạch năm, kế hoạch dự án, kế hoạch chiến lược", "Liên hệ: kế hoạch của bạn/bộ phận bạn"]
      },
      {
        q: "Phân biệt kế hoạch chiến lược và kế hoạch tác nghiệp. Cho ví dụ.",
        hints: ["Chiến lược: toàn tổ chức, 3-5 năm, từ sứ mệnh", "Tác nghiệp: bộ phận cụ thể, ngắn hạn, chi tiết", "Ví dụ cụ thể từ thực tế tổ chức bạn"]
      }
    ]
  },
  {
    id: "organizing",
    icon: "🏗️",
    title: "V. Chức năng Tổ chức",
    color: "#4a1a6b",
    accent: "#9b59b6",
    chapters: "Ch.11 — Designing Organizational Structure",
    subtopics: [
      "6 yếu tố thiết kế cơ cấu tổ chức",
      "Chuyên môn hóa và Phân khâu",
      "Chuỗi chỉ huy, Quyền hạn, Trách nhiệm",
      "Phạm vi kiểm soát và Phân quyền",
      "Cơ cấu Cơ khí vs Hữu cơ",
      "5 mô hình cơ cấu tổ chức",
    ],
    keyTerms: [
      { term: "6 Yếu tố thiết kế cơ cấu", def: "(1) Work Specialization — chuyên môn hóa. (2) Departmentalization — phân khâu. (3) Chain of Command — chuỗi chỉ huy. (4) Span of Control — phạm vi kiểm soát. (5) Centralization/Decentralization — tập trung/phân quyền. (6) Formalization — chính thức hóa." },
      { term: "Chuyên môn hóa (Work Specialization)", def: "Chia công việc thành các nhiệm vụ NHỎ, mỗi người chuyên sâu một việc. Tăng năng suất nhờ: kỹ năng sâu, tiết kiệm thời gian chuyển việc. Nhược: nhàm chán, căng thẳng, tăng vắng mặt nếu quá mức." },
      { term: "Phân khâu theo chức năng (Functional)", def: "Nhóm nhân viên theo CHỨC NĂNG chuyên môn: Marketing, Tài chính, Sản xuất, Nhân sự. Ưu: chuyên môn sâu, phối hợp nội bộ tốt. Nhược: phối hợp LIÊN BỘ PHẬN kém, tầm nhìn hẹp." },
      { term: "Phân khâu theo sản phẩm (Product)", def: "Nhóm theo dòng sản phẩm/dịch vụ. VD: P&G có nhóm Fabric Care, Baby Care, Beauty riêng. Ưu: linh hoạt, trách nhiệm rõ với từng sản phẩm. Nhược: trùng lặp chức năng, tốn kém." },
      { term: "Phân khâu theo địa lý (Geographic)", def: "Nhóm theo vùng địa lý. VD: phòng kinh doanh Miền Bắc, Miền Nam. Ưu: phục vụ nhu cầu địa phương tốt. Nhược: trùng lặp chức năng, khó phối hợp toàn quốc." },
      { term: "Cơ cấu Ma trận (Matrix)", def: "Kết hợp CHỨC NĂNG và DỰ ÁN/SẢN PHẨM. Nhân viên báo cáo cho CẢ HAI: trưởng bộ phận chức năng VÀ trưởng dự án. Ưu: linh hoạt, phối hợp tốt. Nhược: xung đột quyền lực, mơ hồ chỉ huy." },
      { term: "Chuỗi chỉ huy (Chain of Command)", def: "Đường quyền hạn từ CẤP CAO xuống cấp thấp nhất, làm rõ ai báo cáo cho ai. Liên quan đến: Authority (Quyền hạn), Responsibility (Trách nhiệm), Unity of Command (Thống nhất chỉ huy)." },
      { term: "Quyền hạn (Authority)", def: "Quyền của nhà quản trị RA LỆNH và yêu cầu tuân thủ. Line authority: quyền chỉ huy trực tiếp. Staff authority: quyền tư vấn, hỗ trợ. Phân biệt với Power (quyền lực) — rộng hơn." },
      { term: "Phạm vi kiểm soát (Span of Control)", def: "Số lượng nhân viên mà một QTR có thể quản lý HIỆU QUẢ. Rộng (nhiều NV): tiết kiệm chi phí, linh hoạt. Hẹp (ít NV): kiểm soát tốt hơn, tốn kém. Xu hướng hiện đại: phạm vi kiểm soát rộng hơn." },
      { term: "Tập trung hóa (Centralization)", def: "Quyết định được tập trung ở CẤP QUẢN TRỊ CAO. Phù hợp khi: cần nhất quán, tổ chức nhỏ, môi trường ổn định, QTR cấp thấp thiếu năng lực." },
      { term: "Phân quyền (Decentralization)", def: "Quyền quyết định được TRAO XUỐNG cấp thấp hơn. Phù hợp khi: môi trường phức tạp/biến động, cần phản ứng nhanh, NV cấp thấp có năng lực. Xu hướng hiện đại: phân quyền nhiều hơn." },
      { term: "Cơ cấu Cơ khí (Mechanistic)", def: "Đặc điểm: chính thức hóa CAO, tập trung hóa CAO, phân công rõ ràng, quy trình cứng nhắc. Phù hợp: môi trường ổn định, công việc lặp đi lặp lại. VD: dây chuyền sản xuất hàng loạt." },
      { term: "Cơ cấu Hữu cơ (Organic)", def: "Đặc điểm: linh hoạt, phi tập trung, ít quy tắc, phạm vi kiểm soát rộng, truyền thông đa chiều. Phù hợp: môi trường biến động, cần sáng tạo. VD: công ty khởi nghiệp công nghệ." },
    ],
    sampleQA: [
      {
        q: "Chuyên môn hóa là gì? Lợi ích và hạn chế? Tổ chức của bạn có áp dụng không?",
        hints: ["Định nghĩa: chia công việc thành nhiệm vụ nhỏ, chuyên biệt", "Lợi ích: năng suất cao, kỹ năng sâu, tiết kiệm thời gian", "Hạn chế: nhàm chán, thiếu linh hoạt, phụ thuộc lẫn nhau", "Ví dụ thực tế từ tổ chức của bạn"]
      },
      {
        q: "So sánh cơ cấu cơ khí và cơ cấu hữu cơ. Khi nào dùng mỗi loại?",
        hints: ["Cơ khí: chính thức cao, tập trung, ổn định", "Hữu cơ: linh hoạt, phân quyền, sáng tạo", "Yếu tố tình huống quyết định: môi trường, chiến lược, công nghệ, con người"]
      }
    ]
  },
  {
    id: "leading",
    icon: "🎯",
    title: "VII. Chức năng Lãnh đạo",
    color: "#1a4a6b",
    accent: "#00bcd4",
    chapters: "Ch.17 — Being an Effective Leader",
    subtopics: [
      "Phân biệt Lãnh đạo (Leader) vs Quản trị (Manager)",
      "Các phẩm chất quan trọng của nhà lãnh đạo",
      "Phong cách lãnh đạo: Độc đoán, Dân chủ, Tự do",
      "Nghiên cứu Michigan: Định hướng Công việc vs Nhân viên",
      "Lãnh đạo Tình huống Hersey & Blanchard (4 phong cách)",
      "Lãnh đạo Chuyển đổi (Transformational Leadership)",
    ],
    keyTerms: [
      { term: "Lãnh đạo (Leadership)", def: "Quá trình ảnh hưởng đến một nhóm để đạt mục tiêu. Phân biệt: Quản trị tập trung vào HIỆU QUẢ quy trình (plan-organize-control). Lãnh đạo tập trung vào THAY ĐỔI và TẠO CẢM HỨNG. Nhà lãnh đạo tốt phải CÓ NGƯỜI THEO." },
      { term: "Phong cách Độc đoán (Autocratic)", def: "Nhà lãnh đạo TỰ RA QUYẾT ĐỊNH, ít hoặc không tham khảo cấp dưới. Hiệu quả khi: cần quyết định nhanh, tình huống khủng hoảng, cấp dưới thiếu kinh nghiệm. Nhược: giảm sáng tạo, ít cam kết từ NV." },
      { term: "Phong cách Dân chủ (Democratic)", def: "Nhà lãnh đạo THAM KHẢO ý kiến nhóm, khuyến khích tham gia trước khi quyết định. Tăng cam kết, sự hài lòng và chất lượng quyết định. Phù hợp khi: NV có kinh nghiệm, thời gian đủ." },
      { term: "Phong cách Tự do (Laissez-faire)", def: "Nhà lãnh đạo ĐỂ NHÓM TỰ QUYẾT ĐỊNH — ít hoặc không can thiệp. Hiệu quả chỉ khi: nhóm có chuyên môn cao, tự giác, và nhiệm vụ không cần nhiều phối hợp. VD: nhóm nghiên cứu độc lập." },
      { term: "Nghiên cứu Michigan", def: "ĐH Michigan phát hiện 2 phong cách: (1) Employee-oriented (Định hướng Nhân viên): tập trung quan hệ con người, nhu cầu cá nhân. (2) Production-oriented (Định hướng Công việc): tập trung nhiệm vụ kỹ thuật. Kết luận: định hướng NV liên quan đến năng suất và hài lòng cao hơn." },
      { term: "Lãnh đạo Tình huống (Situational Leadership)", def: "Hersey & Blanchard: không có một phong cách lãnh đạo nào tốt nhất cho mọi tình huống. Cần điều chỉnh phong cách phù hợp với MỨC ĐỘ SẴN SÀNG (readiness) của cấp dưới." },
      { term: "4 Phong cách Tình huống (S1-S4)", def: "S1-Telling (Chỉ đạo): nhiều hướng dẫn, ít hỗ trợ — R1. S2-Selling (Thuyết phục): nhiều hướng dẫn VÀ hỗ trợ — R2. S3-Participating (Tham gia): ít hướng dẫn, nhiều hỗ trợ — R3. S4-Delegating (Ủy quyền): ít hướng dẫn VÀ hỗ trợ — R4." },
      { term: "Mức độ sẵn sàng (Readiness R1-R4)", def: "R1: THIẾU năng lực + THIẾU ý chí/tự tin → S1 Telling. R2: THIẾU năng lực nhưng CÓ ý chí → S2 Selling. R3: CÓ năng lực nhưng THIẾU ý chí/tự tin → S3 Participating. R4: CÓ cả năng lực lẫn ý chí → S4 Delegating." },
      { term: "Lãnh đạo Chuyển đổi (Transformational)", def: "Nhà lãnh đạo TRUYỀN CẢM HỨNG để cấp dưới vượt qua lợi ích cá nhân vì lợi ích tổ chức. 4 đặc trưng: Idealized Influence (ảnh hưởng lý tưởng), Inspirational Motivation, Intellectual Stimulation, Individual Consideration." },
      { term: "Lãnh đạo Giao dịch (Transactional)", def: "Dẫn dắt bằng THỎA THUẬN: thưởng nếu đạt mục tiêu, phạt nếu không. Tập trung vào duy trì hiện trạng. Khác với Transformational: không truyền cảm hứng vượt lên trên." },
      { term: "EQ — Emotional Intelligence", def: "Trí tuệ cảm xúc: khả năng nhận biết, hiểu và quản lý cảm xúc của bản thân và người khác. 5 thành phần: self-awareness, self-regulation, motivation, empathy, social skills. Quan trọng cho lãnh đạo hiệu quả." },
    ],
    sampleQA: [
      {
        q: "Trình bày Lãnh đạo Tình huống của Hersey & Blanchard. Cho ví dụ ứng dụng thực tế.",
        hints: ["4 phong cách S1-S4 với đặc điểm cụ thể", "4 mức độ sẵn sàng R1-R4", "Nguyên tắc: phong cách phải KHỚP với mức sẵn sàng", "Ví dụ: bạn đã áp dụng phong cách nào với nhân viên nào?"]
      },
      {
        q: "Phân biệt nhà lãnh đạo và nhà quản trị. Theo bạn, tổ chức cần ai hơn?",
        hints: ["Quản trị: làm đúng cách, plan-organize-control, ổn định", "Lãnh đạo: truyền cảm hứng, thay đổi, tầm nhìn", "Tổ chức cần CẢ HAI — lý do tại sao?", "Bạn đang là nhà QTR hay nhà lãnh đạo?"]
      }
    ]
  },
  {
    id: "motivation",
    icon: "⚡",
    title: "VIII. Động viên Nhân viên",
    color: "#6b1a1a",
    accent: "#e74c3c",
    chapters: "Ch.16 — Motivating Employees",
    subtopics: [
      "Khái niệm và bản chất của Động lực",
      "Tháp nhu cầu Maslow (5 cấp)",
      "Thuyết ERG của Alderfer",
      "Thuyết 2 Nhân tố Herzberg",
      "Thuyết 3 Nhu cầu McClelland",
      "Thuyết Kỳ vọng Vroom (E×I×V)",
      "Thuyết Công bằng Adams",
    ],
    keyTerms: [
      { term: "Động lực (Motivation)", def: "Quá trình trong đó nỗ lực của một người được KÍCH HOẠT (energized), ĐỊNH HƯỚNG (directed), và DUY TRÌ (sustained) hướng đến đạt một mục tiêu. 3 yếu tố: Cường độ (intensity), Hướng (direction), Sự kiên trì (persistence)." },
      { term: "Tháp nhu cầu Maslow", def: "5 cấp từ thấp → cao: (1) Physiological/Sinh lý — ăn, ở, ngủ. (2) Safety/An toàn — bảo mật, ổn định. (3) Social/Xã hội — tình bạn, yêu thương. (4) Esteem/Tôn trọng — địa vị, công nhận. (5) Self-Actualization/Tự hoàn thiện — phát huy tiềm năng. Quy tắc: cấp thấp phải THỎA MÃN trước khi cấp trên xuất hiện." },
      { term: "Nhu cầu Bậc thấp vs Bậc cao (Maslow)", def: "Lower-order needs (1,2): chủ yếu thỏa mãn bên NGOÀI — lương, điều kiện làm việc. Higher-order needs (3,4,5): thỏa mãn bên TRONG — ý nghĩa công việc, phát triển bản thân. Hàm ý: khi nhu cầu thấp đã đủ, chỉ nhu cầu cao mới tạo động lực." },
      { term: "Thuyết ERG (Alderfer)", def: "Đơn giản hóa Maslow thành 3 nhóm: Existence (Tồn tại — vật chất), Relatedness (Quan hệ — xã hội), Growth (Phát triển — cá nhân). Điểm khác biệt: (1) Nhiều nhu cầu cùng hoạt động. (2) Frustration-Regression: nhu cầu cao không thỏa → quay về nhu cầu thấp." },
      { term: "Thuyết 2 Nhân tố Herzberg", def: "Hygiene Factors (Nhân tố Vệ sinh): lương, giám sát, điều kiện LV, quan hệ đồng nghiệp → chỉ LOẠI BỎ BẤT MÃN, không tạo động lực thực sự. Motivators (Nhân tố Động viên): thành tích, công nhận, bản thân CV, trách nhiệm, thăng tiến → tạo SỰ HÀI LÒNG và động lực thực sự." },
      { term: "Ứng dụng Herzberg trong thực tế", def: "Job Enrichment (Làm giàu công việc): tăng trách nhiệm, quyền tự chủ, cơ hội phát triển → kích hoạt motivators. Không chỉ cải thiện hygiene factors (tăng lương) mà cần tập trung vào NỘI DUNG công việc để tạo động lực bền vững." },
      { term: "Thuyết 3 Nhu cầu McClelland", def: "3 nhu cầu học hỏi: (1) nAch (Achievement/Thành tích): muốn vượt trội, đạt chuẩn cao. (2) nPow (Power/Quyền lực): muốn ảnh hưởng, kiểm soát người khác. (3) nAff (Affiliation/Liên kết): muốn quan hệ thân thiết, được yêu thích. Người có nAch cao phù hợp làm doanh nhân/chuyên gia." },
      { term: "Thuyết Kỳ vọng Vroom", def: "Motivation = E × I × V. E (Expectancy): kỳ vọng nỗ lực → kết quả tốt. I (Instrumentality): tin rằng kết quả tốt → được thưởng. V (Valence): giá trị phần thưởng với bản thân. Nếu MỘT trong ba = 0 thì động lực = 0." },
      { term: "Thuyết Công bằng Adams", def: "So sánh: Outcomes(mình)/Inputs(mình) với Outcomes(người khác)/Inputs(người khác). Bất công xuôi (underpayment) → căng thẳng → giảm nỗ lực/xin tăng lương/nghỉ việc. Bất công ngược (overpayment) → làm việc nhiều hơn để 'bù'. Công bằng nhận thức quan trọng hơn công bằng thực tế." },
      { term: "Goal-Setting Theory (Edwin Locke)", def: "Mục tiêu CỤ THỂ và THÁCH THỨC (nhưng khả thi) dẫn đến hiệu suất cao hơn so với mục tiêu mơ hồ hoặc dễ. Điều kiện: phải có feedback và NV phải chấp nhận mục tiêu. Cơ sở lý thuyết cho MBO và SMART." },
      { term: "Reinforcement Theory (Skinner)", def: "Hành vi là CHỨC NĂNG của kết quả: hành vi được thưởng sẽ lặp lại, hành vi bị phạt sẽ ít lặp lại. 4 loại: Positive Reinforcement (thêm phần thưởng), Negative Reinforcement (bỏ kích thích tiêu cực), Punishment (thêm hậu quả tiêu cực), Extinction (loại bỏ phần thưởng)." },
    ],
    sampleQA: [
      {
        q: "Trình bày thuyết cấp bậc nhu cầu của Maslow. Ứng dụng thực tiễn trong quản trị nhân sự.",
        hints: ["5 cấp bậc đúng thứ tự với ví dụ mỗi cấp", "Nguyên tắc: cấp thấp thỏa mãn trước", "Ứng dụng: lương (sinh lý/an toàn), team building (xã hội), thăng tiến (tôn trọng), giao dự án thách thức (tự hoàn thiện)", "Hạn chế: không được kiểm chứng thực nghiệm"]
      },
      {
        q: "Phân biệt nhân tố vệ sinh và nhân tố động viên của Herzberg. Ví dụ tại công ty bạn.",
        hints: ["Nhân tố vệ sinh: chỉ ngăn bất mãn, không tạo hài lòng", "Nhân tố động viên: tạo hài lòng và động lực thực sự", "Ví dụ vệ sinh: lương, phòng làm việc, chính sách công ty", "Ví dụ động viên: được ghi nhận, công việc có ý nghĩa, thăng tiến"]
      }
    ]
  },
  {
    id: "controlling",
    icon: "⚙️",
    title: "IX. Chức năng Kiểm soát",
    color: "#2d4a1a",
    accent: "#8bc34a",
    chapters: "Ch.18 — Monitoring and Controlling",
    subtopics: [
      "Khái niệm, tầm quan trọng của kiểm soát",
      "Quy trình kiểm soát 3 bước",
      "Kiểm soát Phòng ngừa, Tại chỗ, Phản hồi",
      "Balanced Scorecard",
      "Tiêu chuẩn của hệ thống kiểm soát hiệu quả",
    ],
    keyTerms: [
      { term: "Kiểm soát (Controlling)", def: "Giám sát, so sánh và điều chỉnh hoạt động để đảm bảo đạt mục tiêu. Là chức năng cuối trong POLC nhưng KẾT NỐI với hoạch định — tiêu chuẩn kiểm soát xuất phát từ kế hoạch." },
      { term: "Quy trình kiểm soát 3 bước", def: "(1) ĐO LƯỜNG hiệu suất thực tế: bằng quan sát trực tiếp, báo cáo thống kê, báo cáo miệng, báo cáo văn bản. (2) SO SÁNH với tiêu chuẩn: xác định khoảng sai lệch chấp nhận được. (3) HÀNH ĐỘNG điều chỉnh: sửa sai lệch hoặc xem xét lại tiêu chuẩn." },
      { term: "Kiểm soát Phòng ngừa (Feedforward)", def: "Kiểm soát TRƯỚC khi vấn đề xảy ra. Mục tiêu: ngăn chặn thay vì sửa chữa. VD: kiểm tra nguyên liệu đầu vào, phỏng vấn kỹ trước tuyển dụng, đào tạo trước khi vào việc. Hình thức kiểm soát ĐÁNG MONG MUỐN nhất." },
      { term: "Kiểm soát Tại chỗ (Concurrent)", def: "Kiểm soát TRONG KHI hoạt động đang diễn ra. VD: giám sát trực tiếp của quản lý, hệ thống camera, kiểm tra chất lượng trên dây chuyền sản xuất. Phát hiện và sửa lỗi NGAY LẬP TỨC." },
      { term: "Kiểm soát Phản hồi (Feedback)", def: "Kiểm soát SAU KHI hoạt động hoàn thành. VD: báo cáo tài chính, đánh giá hiệu suất cuối năm, khảo sát sự hài lòng khách hàng. Ưu điểm: cung cấp thông tin toàn diện. Nhược: VẤN ĐỀ ĐÃ XẢY RA trước khi phát hiện." },
      { term: "Khoảng sai lệch chấp nhận (Acceptable Range)", def: "Dải dung sai được phép giữa thực tế và tiêu chuẩn trước khi cần can thiệp. QTR chỉ hành động khi sai lệch VƯỢT ngưỡng cho phép. Tránh can thiệp không cần thiết cho mọi sai lệch nhỏ." },
      { term: "Balanced Scorecard", def: "Hệ thống đánh giá hiệu suất từ 4 GÓC ĐỘ: (1) Tài chính (Financial), (2) Khách hàng (Customer), (3) Quy trình nội bộ (Internal Process), (4) Học hỏi & Phát triển (Learning & Growth). Cân bằng giữa chỉ số tài chính và phi tài chính." },
      { term: "8 Tiêu chuẩn kiểm soát hiệu quả", def: "(1) Chính xác, (2) Kịp thời, (3) Kinh tế/Tiết kiệm, (4) Linh hoạt, (5) Dễ hiểu, (6) Tiêu chí hợp lý, (7) Đặt đúng vị trí trọng yếu, (8) Đề ra hành động điều chỉnh. Hệ thống kiểm soát tốt giúp phát hiện SỚM và SỬA CHỮA hiệu quả." },
      { term: "Benchmarking", def: "So sánh quy trình, sản phẩm hoặc dịch vụ với TỔ CHỨC TỐT NHẤT trong ngành (best practices). Mục tiêu: học hỏi và cải tiến liên tục. VD: Xerox benchmark với L.L. Bean để cải thiện logistics." },
    ],
    sampleQA: [
      {
        q: "Trình bày 3 hình thức kiểm soát. Ứng dụng nào phù hợp nhất tại tổ chức bạn?",
        hints: ["Phòng ngừa: trước khi xảy ra — tốt nhất nhưng khó nhất", "Tại chỗ: trong khi diễn ra — phát hiện ngay", "Phản hồi: sau khi xong — phổ biến nhất", "Nêu ví dụ cụ thể từng loại tại tổ chức bạn"]
      }
    ]
  },
];

const INTERVIEW_QUESTIONS = [
  "Tại sao Anh/Chị mong muốn học khóa EMBA này? Mục tiêu nghề nghiệp của Anh/Chị trong 5 năm tới là gì?",
  "Theo Anh/Chị, sự khác biệt giữa chương trình EMBA của Đại học Ngoại thương và MBA thông thường là gì?",
  "Anh/Chị có phải là người ham học hỏi không? Hãy chứng minh bằng ví dụ cụ thể gần đây.",
  "Anh/Chị đã đọc cuốn sách hoặc bài báo nào về quản trị/kinh doanh trong 4 tuần gần đây? Nội dung chính là gì?",
  "Anh/Chị đã bao giờ mất tự tin trước một vấn đề quan trọng chưa? Anh/Chị đã vượt qua như thế nào?",
  "Hãy kể về một quyết định khó khăn nhất trong sự nghiệp quản lý của Anh/Chị. Anh/Chị đã xử lý ra sao?",
  "Nếu được nhận vào chương trình EMBA, Anh/Chị sẽ đóng góp gì cho cộng đồng học viên?",
  "Anh/Chị đã từng lãnh đạo một sự thay đổi lớn trong tổ chức chưa? Hãy mô tả quá trình đó.",
  "Theo Anh/Chị, năng lực quan trọng nhất của một nhà lãnh đạo trong môi trường kinh doanh hiện đại là gì?",
];

// QUIZ DATA — 20 câu hỏi toàn diện
const QUIZ_QUESTIONS = [
  {
    q: "Theo Robbins & Coulter, 'Efficiency' (Hiệu quả) trong quản trị có nghĩa là:",
    options: ["Hoàn thành đúng mục tiêu đã đặt ra", "Sử dụng tối ưu nguồn lực để đạt kết quả — 'doing things right'", "Ra quyết định đúng và kịp thời", "Phối hợp tốt giữa các bộ phận"],
    correct: 1,
    explain: "Efficiency = 'Doing things right' — tối thiểu hóa lãng phí nguồn lực (người, tiền, thiết bị). Phân biệt với Effectiveness = 'Doing the right things' — hoàn thành đúng mục tiêu. Cả hai đều cần thiết cho quản trị tốt."
  },
  {
    q: "Theo Taylor, nguyên tắc ĐẦU TIÊN trong Quản trị Khoa học là:",
    options: ["Tuyển chọn và đào tạo nhân viên một cách khoa học", "Phân chia công việc bình đẳng giữa QTR và công nhân", "Nghiên cứu khoa học từng yếu tố công việc để tìm 'one best way'", "Hợp tác chân thành với công nhân"],
    correct: 2,
    explain: "Nguyên tắc 1 của Taylor: phát triển khoa học cho từng yếu tố công việc (time-and-motion studies) để thay thế phương pháp kinh nghiệm 'rule-of-thumb'. Đây là nền tảng để xây dựng 3 nguyên tắc còn lại."
  },
  {
    q: "Hiệu ứng Hawthorne (Hawthorne Effect) phát hiện điều gì quan trọng?",
    options: ["Điều kiện ánh sáng tốt hơn luôn tăng năng suất", "Lương cao là yếu tố duy nhất tạo động lực", "Năng suất tăng khi NLĐ biết mình đang được quan sát — yếu tố xã hội quan trọng", "Làm việc nhóm luôn hiệu quả hơn cá nhân"],
    correct: 2,
    explain: "Nghiên cứu tại Western Electric (Hawthorne Plant, 1920s) của Elton Mayo: năng suất tăng bất kể điều kiện vật chất thay đổi như thế nào, vì NLĐ được chú ý và quan tâm. Đây là nền tảng của Behavioral Approach."
  },
  {
    q: "Theo Fayol, nguyên tắc 'Unity of Command' (Thống nhất chỉ huy) có nghĩa là:",
    options: ["Tất cả quyết định phải tập trung ở cấp cao nhất", "Mỗi nhân viên chỉ nhận lệnh từ một cấp trên duy nhất", "Toàn tổ chức phải có chung một mục tiêu", "Nhà quản trị phải ra lệnh nhất quán"],
    correct: 1,
    explain: "Unity of Command là một trong 14 nguyên tắc của Fayol: mỗi NV chỉ có MỘT người cấp trên trực tiếp. Tránh nhầm lẫn, xung đột mệnh lệnh. Đây là lý do cơ cấu ma trận có thể gây vấn đề."
  },
  {
    q: "Nhân tố nào sau đây là 'Nhân tố Động viên' (Motivator) theo thuyết 2 nhân tố của Herzberg?",
    options: ["Mức lương và phúc lợi", "Điều kiện và môi trường làm việc", "Sự công nhận thành tích và trách nhiệm công việc", "Quan hệ với đồng nghiệp và cấp trên"],
    correct: 2,
    explain: "Motivators của Herzberg (tạo hài lòng thực sự): Thành tích, Công nhận, Bản thân công việc, Trách nhiệm, Thăng tiến, Phát triển. Lương, điều kiện LV, quan hệ là Hygiene Factors — chỉ ngăn bất mãn, không tạo động lực."
  },
  {
    q: "Trong Lãnh đạo Tình huống Hersey & Blanchard, phong cách S2 'Selling' phù hợp với:",
    options: ["R1: Thiếu cả năng lực và ý chí", "R2: Thiếu năng lực nhưng nhiệt tình, có ý chí", "R3: Có năng lực nhưng thiếu tự tin/ý chí", "R4: Có đủ cả năng lực và ý chí"],
    correct: 1,
    explain: "S2 Selling: lãnh đạo vừa HƯỚNG DẪN nhiều (vì NV thiếu kỹ năng) vừa HỖ TRỢ nhiều (vì NV nhiệt tình cần được giải thích lý do). Phù hợp R2: năng lực thấp nhưng động lực cao — nhân viên mới hăng hái."
  },
  {
    q: "Mô hình 5 lực lượng cạnh tranh của Porter KHÔNG bao gồm yếu tố nào?",
    options: ["Nguy cơ từ sản phẩm thay thế", "Ảnh hưởng của chính phủ và luật pháp", "Quyền thương lượng của nhà cung cấp", "Nguy cơ từ đối thủ mới gia nhập ngành"],
    correct: 1,
    explain: "5 Forces Porter: Rivalry (cạnh tranh hiện tại), New Entrants (đối thủ mới), Suppliers (NCC), Buyers (KH), Substitutes (thay thế). Chính phủ thuộc môi trường PESTEL/vĩ mô — không nằm trong mô hình Porter."
  },
  {
    q: "Thuyết ERG của Alderfer khác với tháp Maslow ở điểm quan trọng nào?",
    options: ["ERG có 5 cấp thay vì 3 cấp", "ERG cho phép nhiều nhu cầu hoạt động cùng lúc và có regression", "ERG tập trung vào nhu cầu tài chính hơn", "ERG chỉ áp dụng cho quản lý cấp cao"],
    correct: 1,
    explain: "2 điểm khác biệt chính: (1) Đồng thời: nhiều nhu cầu có thể hoạt động cùng lúc (Maslow: tuần tự). (2) Frustration-Regression: nếu nhu cầu cao bị cản trở → quay về nhu cầu thấp hơn. Linh hoạt hơn Maslow trong thực tế."
  },
  {
    q: "Theo thuyết Kỳ vọng của Vroom (E×I×V), nếu nhân viên không tin rằng nỗ lực sẽ dẫn đến kết quả tốt, thì:",
    options: ["Động lực = V (chỉ phụ thuộc vào giá trị phần thưởng)", "Động lực = 0 vì E = 0", "Động lực giảm nhưng vẫn tồn tại", "Động lực phụ thuộc vào I và V"],
    correct: 1,
    explain: "Vroom: Motivation = E × I × V. Nếu E (Expectancy) = 0 (không tin nỗ lực → kết quả), thì tích số = 0 bất kể I và V cao đến đâu. Đây là lý do QTR cần đảm bảo NV thấy mối liên hệ rõ ràng giữa nỗ lực và kết quả."
  },
  {
    q: "Cơ cấu tổ chức nào có đặc điểm: linh hoạt, phi tập trung, ít quy tắc, phù hợp môi trường biến động?",
    options: ["Cơ cấu Cơ khí (Mechanistic)", "Cơ cấu Hữu cơ (Organic)", "Cơ cấu Chức năng (Functional)", "Cơ cấu Sản phẩm (Product)"],
    correct: 1,
    explain: "Organic structure: linh hoạt, phi tập trung, ít chính thức hóa, truyền thông đa chiều, phạm vi kiểm soát rộng. Ngược với Mechanistic (chính thức cao, tập trung, ổn định). Phù hợp môi trường bất định và cần sáng tạo."
  },
  {
    q: "Kỹ năng quản trị nào QUAN TRỌNG NHẤT ở cấp quản trị cơ sở (First-line managers)?",
    options: ["Kỹ năng tư duy khái quát (Conceptual)", "Kỹ năng nhân sự (Human)", "Kỹ năng chuyên môn (Technical)", "Kỹ năng lãnh đạo (Leadership)"],
    correct: 2,
    explain: "Theo Katz: First-line managers cần Technical skills nhiều nhất vì họ giám sát trực tiếp việc thực hiện. Middle: cân bằng 3 kỹ năng. Top: Conceptual skills quan trọng nhất (tư duy chiến lược, nhìn toàn cảnh). Human skills quan trọng ở MỌI cấp."
  },
  {
    q: "Nguyên tắc SMART yêu cầu mục tiêu phải 'Measurable'. Điều này có nghĩa là:",
    options: ["Mục tiêu phải được đo bằng tiền", "Mục tiêu phải có chỉ số cụ thể để biết khi nào đạt được", "Mục tiêu phải được đo hàng ngày", "Mục tiêu phải dễ đo lường với công cụ đơn giản"],
    correct: 1,
    explain: "Measurable: mục tiêu cần có CHỈ SỐ ĐO LƯỜNG cụ thể — không phải chỉ 'tăng doanh thu' mà phải là 'tăng doanh thu 20%'. Không đo được → không biết có đạt hay không → không kiểm soát được tiến độ."
  },
  {
    q: "Trong phân tích SWOT, 'Opportunities' (Cơ hội) là gì?",
    options: ["Điểm mạnh nội bộ của tổ chức", "Điểm yếu cần cải thiện trong tổ chức", "Các yếu tố thuận lợi từ môi trường bên ngoài", "Các mối đe dọa tiềm ẩn từ đối thủ"],
    correct: 2,
    explain: "SWOT: S-W là NỘI BỘ (strengths & weaknesses). O-T là BÊN NGOÀI (opportunities & threats từ môi trường). Opportunities: xu hướng thị trường, thay đổi công nghệ, quy định mới có lợi → tổ chức có thể khai thác để phát triển."
  },
  {
    q: "Kiểm soát Phòng ngừa (Feedforward Control) khác với Kiểm soát Phản hồi (Feedback Control) ở:",
    options: ["Feedforward diễn ra trong khi hoạt động đang thực hiện", "Feedforward diễn ra TRƯỚC khi vấn đề xảy ra để ngăn chặn", "Feedforward chỉ áp dụng cho tài chính", "Feedforward dựa trên kết quả cuối kỳ"],
    correct: 1,
    explain: "Feedforward (Phòng ngừa): TRƯỚC khi bắt đầu — kiểm tra đầu vào, phỏng vấn kỹ. Concurrent (Tại chỗ): TRONG KHI thực hiện. Feedback (Phản hồi): SAU KHI hoàn thành. Feedforward là tốt nhất nhưng khó nhất vì cần dự đoán vấn đề."
  },
  {
    q: "Thuyết Công bằng Adams (Equity Theory) dự đoán rằng nhân viên cảm thấy bị trả lương THẤP hơn so với đóng góp sẽ:",
    options: ["Làm việc chăm chỉ hơn để xứng đáng với mức lương", "Giảm nỗ lực, xin tăng lương, hoặc nghỉ việc để khôi phục công bằng", "Chấp nhận và tiếp tục làm việc bình thường", "Thay đổi cách so sánh — không so sánh với người khác nữa"],
    correct: 1,
    explain: "Khi Outcomes/Inputs của mình < Outcomes/Inputs của người tham chiếu → cảm giác bất công (underpayment). NV sẽ hành động để khôi phục công bằng: giảm nỗ lực, tăng outcomes (xin thêm lương), thay đổi người so sánh, hoặc rời tổ chức."
  },
  {
    q: "Cơ cấu tổ chức Ma trận (Matrix Structure) có đặc điểm nổi bật nào?",
    options: ["Mỗi nhân viên chỉ có duy nhất một cấp trên trực tiếp", "Nhân viên báo cáo cho cả trưởng bộ phận chức năng VÀ trưởng dự án", "Toàn bộ quyết định tập trung ở CEO", "Phân chia theo vùng địa lý"],
    correct: 1,
    explain: "Ma trận: kết hợp chức năng + dự án. NV có 2 cấp trên → vi phạm Unity of Command của Fayol. Ưu: linh hoạt, phối hợp tốt, dùng chuyên gia hiệu quả. Nhược: xung đột quyền lực, mơ hồ trách nhiệm, căng thẳng cho NV."
  },
  {
    q: "MBO (Management by Objectives) hiệu quả vì:",
    options: ["QTR đơn phương đặt mục tiêu cho NV một cách rõ ràng", "QTR và NV CÙNG xác định mục tiêu, tăng cam kết và rõ ràng về kỳ vọng", "Mục tiêu được đặt thật thách thức để tạo áp lực", "Loại bỏ hoàn toàn nhu cầu giám sát"],
    correct: 1,
    explain: "MBO hiệu quả nhờ SỰ THAM GIA: QTR-NV cùng xác định mục tiêu SMART → NV cam kết hơn (vì tự đặt ra), rõ ràng về mong đợi, nhận phản hồi định kỳ, và được thưởng dựa trên kết quả thực tế. Cơ sở lý thuyết: Goal-Setting Theory."
  },
  {
    q: "Theo nghiên cứu của Đại học Michigan về phong cách lãnh đạo, phong cách nào liên quan đến năng suất và sự hài lòng cao hơn?",
    options: ["Production-oriented (Định hướng Công việc)", "Employee-oriented (Định hướng Nhân viên)", "Autocratic (Độc đoán)", "Laissez-faire (Tự do)"],
    correct: 1,
    explain: "Nghiên cứu Michigan phát hiện: Employee-oriented leaders (tập trung quan hệ con người, nhu cầu cá nhân, chấp nhận khác biệt) liên quan đến năng suất nhóm CAO HƠN và sự hài lòng cao hơn so với production-oriented leaders."
  },
  {
    q: "Tiếp cận Tình huống (Contingency Approach) trong quản trị cho rằng:",
    options: ["Có một phương pháp quản trị tốt nhất áp dụng cho mọi tổ chức", "Không có phương pháp nào phổ quát — QTR cần điều chỉnh theo từng bối cảnh", "Quản trị khoa học của Taylor là tốt nhất trong mọi trường hợp", "Công nghệ là yếu tố duy nhất quyết định phương pháp quản trị"],
    correct: 1,
    explain: "Contingency Approach: 'It depends' — không có one-best-way. Phương pháp tốt phụ thuộc vào: quy mô tổ chức, mức độ bất định môi trường, chiến lược, công nghệ, và đặc điểm con người. QTR cần linh hoạt và chẩn đoán đúng tình huống."
  },
  {
    q: "Balanced Scorecard đánh giá hiệu suất tổ chức từ mấy góc độ?",
    options: ["2 góc độ: tài chính và phi tài chính", "3 góc độ: tài chính, khách hàng, và quy trình", "4 góc độ: Tài chính, Khách hàng, Quy trình nội bộ, Học hỏi & Phát triển", "5 góc độ theo mô hình Porter"],
    correct: 2,
    explain: "Balanced Scorecard (Kaplan & Norton): đánh giá từ 4 góc độ: (1) Financial — lợi nhuận, ROI. (2) Customer — hài lòng KH, thị phần. (3) Internal Process — chất lượng, thời gian. (4) Learning & Growth — năng lực NV, đổi mới. Cân bằng giữa kết quả ngắn hạn và dài hạn."
  },
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


// ─── LOCALSTORAGE HELPERS ─────────────────────────────────────────────────────
const STORAGE_KEY = "emba_study_pro_v1";
function loadData() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; }
  catch { return null; }
}
function saveData(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
}
function getDefaultData() {
  return {
    totalStudied: 0, totalInterview: 0, bestQuizScore: 0,
    studiedTerms: {}, quizHistory: [], interviewHistory: [],
    firstSeen: new Date().toISOString(), lastSeen: new Date().toISOString(),
  };
}

export default function EMBAStudyTool() {
  const [screen, setScreen] = useState("home");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [showDef, setShowDef] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const [userData, setUserData] = useState(() => loadData() || getDefaultData());

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [shuffledQuiz] = useState(() => [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5));

  const [interviewIndex, setInterviewIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [interviewTopic, setInterviewTopic] = useState(null);
  const [interviewMode, setInterviewMode] = useState("general");

  const topicCards = selectedTopic ? TOPICS.find(t => t.id === selectedTopic) : null;
  const currentCard = topicCards ? topicCards.keyTerms[cardIndex] : null;

  const updateUserData = (updater) => {
    setUserData(prev => {
      const next = updater({ ...prev });
      next.lastSeen = new Date().toISOString();
      saveData(next);
      return next;
    });
  };

  const getTopicProgress = (topicId) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return { studied: 0, total: 0, pct: 0 };
    const total = topic.keyTerms.length;
    const studied = topic.keyTerms.filter((_, i) => userData.studiedTerms[`${topicId}_${i}`]).length;
    return { studied, total, pct: total > 0 ? Math.round((studied / total) * 100) : 0 };
  };

  const isTermStudied = (topicId, idx) => !!userData.studiedTerms[`${topicId}_${idx}`];

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const getDaysStudied = () => {
    const dates = new Set([
      ...(userData.quizHistory || []).map(h => h.date?.slice(0, 10)),
      ...(userData.interviewHistory || []).map(h => h.date?.slice(0, 10)),
    ].filter(Boolean));
    return dates.size;
  };

  const totalTerms = TOPICS.reduce((sum, t) => sum + t.keyTerms.length, 0);
  const totalStudiedTerms = Object.keys(userData.studiedTerms || {}).length;


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
    const system = `Bạn là giảng viên chuyên gia của chương trình EMBA tại Đại học Ngoại thương Việt Nam. Nhiệm vụ: Đánh giá câu trả lời phỏng vấn đầu vào của ứng viên EMBA một cách chuyên nghiệp, chi tiết và mang tính xây dựng.\n\nCấu trúc phản hồi (trả lời bằng tiếng Việt):\n1. **Điểm mạnh** (✅): 2-3 điểm tốt\n2. **Điểm cần cải thiện** (⚠️): 2-3 điểm còn yếu\n3. **Gợi ý cụ thể**: Câu trả lời mẫu để nâng điểm\n4. **Đánh giá tổng thể**: Điểm 1-10 và nhận xét ngắn`;
    const userMsg = `Câu hỏi: "${questionText}"\nCâu trả lời: "${answer}"\nĐánh giá chi tiết.`;
    try {
      const result = await callClaude(system, userMsg);
      setFeedback(result);
      // Lưu vào lịch sử
      updateUserData(prev => ({
        ...prev,
        totalInterview: (prev.totalInterview || 0) + 1,
        interviewHistory: [
          { date: new Date().toISOString(), question: questionText, answer, mode: interviewMode, topicId: interviewTopic },
          ...(prev.interviewHistory || []).slice(0, 49), // giữ tối đa 50 lần
        ],
      }));
    } catch {
      setFeedback("❌ Lỗi kết nối. Vui lòng thử lại.");
    }
    setLoadingFeedback(false);
  };

  const nextInterviewQ = () => {
    const maxQ = interviewMode === "general" ? INTERVIEW_QUESTIONS.length : (topicCards?.sampleQA?.length || 1);
    setInterviewIndex(i => (i + 1) % maxQ);
    setAnswer(""); setFeedback(null);
  };

  const handleQuizAnswer = (idx) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (idx === shuffledQuiz[quizIndex].correct) setQuizCorrect(c => c + 1);
  };

  const nextQuizQ = () => {
    const lastCorrect = quizSelected === shuffledQuiz[quizIndex].correct ? 1 : 0;
    if (quizIndex + 1 >= shuffledQuiz.length) {
      const finalScore = quizCorrect + lastCorrect;
      setQuizDone(true);
      updateUserData(prev => ({
        ...prev,
        bestQuizScore: Math.max(prev.bestQuizScore || 0, finalScore),
        quizHistory: [
          { date: new Date().toISOString(), score: finalScore, total: shuffledQuiz.length, pct: Math.round((finalScore / shuffledQuiz.length) * 100) },
          ...(prev.quizHistory || []).slice(0, 19),
        ],
      }));
    } else {
      setQuizIndex(q => q + 1);
      setQuizSelected(null);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0); setQuizSelected(null); setQuizCorrect(0); setQuizDone(false);
  };

  const markStudied = () => {
    const termKey = `${selectedTopic}_${cardIndex}`;
    updateUserData(prev => {
      const alreadyStudied = prev.studiedTerms?.[termKey];
      return {
        ...prev,
        totalStudied: alreadyStudied ? prev.totalStudied : (prev.totalStudied || 0) + 1,
        studiedTerms: { ...prev.studiedTerms, [termKey]: true },
      };
    });
    setShowDef(false);
    if (cardIndex + 1 < topicCards.keyTerms.length) setCardIndex(i => i + 1);
    else setCardIndex(0);
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
      {/* HOME */}
      {screen === "home" && (
        <div className="home">
          <div className="home-hero">
            <h1>Chinh phục kỳ thi<br /><span>đầu vào EMBA</span></h1>
            <p>Công cụ ôn thi thông minh dựa trên sách giáo khoa Management (Robbins & Coulter, 15E) và tiêu chí đánh giá chính thức của FTU.</p>
          </div>

          <div className="mode-cards">
            {[
              { icon: "🃏", title: "Flashcard Thuật ngữ", desc: "Ôn tập nhanh các khái niệm và định nghĩa trọng tâm từng chủ đề. Lý tưởng cho việc ghi nhớ.", tag: "8 chủ đề · 100+ thuật ngữ", screen: "topics" },
              { icon: "🤖", title: "Phỏng vấn AI", desc: "Claude AI đóng vai Hội đồng tuyển sinh, hỏi và chấm điểm câu trả lời của bạn theo chuẩn EMBA.", tag: "AI-powered · Phản hồi chi tiết", screen: "interview" },
              { icon: "📝", title: "Trắc nghiệm Kiến thức", desc: "20 câu trắc nghiệm bám sát nội dung Robbins & Coulter. Câu hỏi xáo ngẫu nhiên mỗi lần thi.", tag: "20 câu · Có giải thích", screen: "quiz" },
            ].map(m => (
              <div key={m.screen} className="mode-card" onClick={() => setScreen(m.screen)}>
                <div className="mode-icon">{m.icon}</div>
                <div className="mode-title">{m.title}</div>
                <div className="mode-desc">{m.desc}</div>
                <div className="mode-tag">{m.tag}</div>
              </div>
            ))}
          </div>

          {/* TIẾN ĐỘ HỌC TẬP */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>📊 Tiến độ học tập</div>
              <button
                onClick={() => setShowStats(!showStats)}
                style={{ fontSize: 12, color: "var(--accent)", background: "var(--accent-light)", border: "1px solid #bfdbfe", padding: "4px 12px", borderRadius: 99, cursor: "pointer", fontFamily: "Roboto" }}
              >
                {showStats ? "Ẩn chi tiết" : "Xem chi tiết"}
              </button>
            </div>

            <div className="score-banner" style={{ marginBottom: showStats ? 16 : 0 }}>
              {[
                { val: totalStudiedTerms, label: "Thuật ngữ đã thuộc", sub: `/ ${totalTerms}` },
                { val: userData.totalInterview || 0, label: "Câu PV đã luyện", sub: "" },
                { val: userData.bestQuizScore || 0, label: "Điểm TN cao nhất", sub: `/ ${QUIZ_QUESTIONS.length}` },
                { val: getDaysStudied(), label: "Ngày đã học", sub: "" },
              ].map(s => (
                <div key={s.label} className="score-item">
                  <div className="score-val">{s.val}<span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 400 }}>{s.sub}</span></div>
                  <div className="score-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Progress bar tổng */}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginBottom: 5 }}>
                <span>Flashcard toàn bộ</span>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>{Math.round((totalStudiedTerms / totalTerms) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(totalStudiedTerms / totalTerms) * 100}%`, background: "var(--accent)", borderRadius: 99, transition: "width .4s" }} />
              </div>
            </div>

            {/* Chi tiết theo chủ đề */}
            {showStats && (
              <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, fontWeight: 500 }}>TIẾN ĐỘ THEO CHỦ ĐỀ</div>
                {TOPICS.map(t => {
                  const p = getTopicProgress(t.id);
                  return (
                    <div key={t.id} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                        <span>{t.icon} {t.title.split(". ").slice(1).join(". ") || t.title}</span>
                        <span style={{ color: p.pct === 100 ? "var(--green)" : "var(--muted)" }}>{p.studied}/{p.total}</span>
                      </div>
                      <div style={{ height: 4, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${p.pct}%`, background: p.pct === 100 ? "var(--green)" : "var(--accent)", borderRadius: 99, transition: "width .4s" }} />
                      </div>
                    </div>
                  );
                })}

                {/* Lịch sử làm quiz */}
                {userData.quizHistory?.length > 0 && (
                  <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, fontWeight: 500 }}>LỊCH SỬ THI TRẮC NGHIỆM</div>
                    {userData.quizHistory.slice(0, 5).map((h, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                        <span style={{ color: "var(--muted)" }}>{formatDate(h.date)}</span>
                        <span style={{ fontWeight: 600, color: h.pct >= 80 ? "var(--green)" : h.pct >= 60 ? "var(--amber)" : "var(--red)" }}>
                          {h.score}/{h.total} — {h.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nút reset */}
                <button
                  onClick={() => { if (window.confirm("Xóa toàn bộ dữ liệu học tập?")) { saveData(getDefaultData()); setUserData(getDefaultData()); } }}
                  style={{ marginTop: 14, fontSize: 11, color: "var(--red)", background: "var(--red-light)", border: "1px solid #fecaca", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "Roboto" }}
                >
                  🗑 Xóa dữ liệu & bắt đầu lại
                </button>
              </div>
            )}
          </div>

          {userData.lastSeen && (
            <div style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>
              Học lần cuối: {formatDate(userData.lastSeen)} · Bắt đầu từ: {formatDate(userData.firstSeen)}
            </div>
          )}
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
          {/* PROGRESS BAR với số đã học trong chủ đề */}
          <div style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "center" }}>
            <div className="progress-bar" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${((cardIndex + 1) / topicCards.keyTerms.length) * 100}%`, background: "var(--accent)" }} />
            </div>
            <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}>
              ✓ {getTopicProgress(selectedTopic).studied}/{topicCards.keyTerms.length} đã thuộc
            </span>
          </div>
        </div>

          <div className="flashcard" onClick={() => setShowDef(!showDef)}
            style={{ borderColor: isTermStudied(selectedTopic, cardIndex) ? "#86efac" : "var(--border)", background: isTermStudied(selectedTopic, cardIndex) ? "#f8fffb" : "var(--surface)" }}
          >
            <div className="flashcard-hint" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>💡 {showDef ? "Click để ẩn định nghĩa" : "Click để xem định nghĩa"}</span>
              {isTermStudied(selectedTopic, cardIndex) && <span style={{ color: "var(--green)", fontSize: 11, fontWeight: 600 }}>✓ Đã thuộc</span>}
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
              {isTermStudied(selectedTopic, cardIndex) ? "✓ Đã thuộc" : "Đánh dấu đã thuộc"}
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
