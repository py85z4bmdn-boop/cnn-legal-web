export const site = {
  name: "CNN Legal",
  slogan: "Tư vấn pháp lý rõ ràng, trực tiếp và có trách nhiệm.",
  description:
    "CNN Legal cung cấp tư vấn pháp lý trực tiếp, bảo mật và thực tế cho cá nhân, doanh nghiệp cần đánh giá rủi ro trước khi quyết định.",
  canonicalBaseUrl: "https://cnn-web.vercel.app",
  externalProfileUrl: "https://dangkimchinh.vn",
  linkedInUrl: "https://www.linkedin.com/in/dangkimchinh/",
  publicEmail: "cnnlegal.vn@gmail.com",
  publicEmailHref: "mailto:cnnlegal.vn@gmail.com",
  publicPhone: "0944968686",
  publicPhoneHref: "tel:0944968686",

  // Structured address for Schema.org PostalAddress
  address: {
    streetAddress: "LA3-T3.18, Tòa nhà La Astoria 3, Số 383 Nguyễn Duy Trinh",
    addressLocality: "Phường Bình Trưng Tây, Thành phố Thủ Đức",
    addressRegion: "Thành phố Hồ Chí Minh",
    addressCountry: "VN",
  },
  addressDisplay:
    "LA3-T3.18, Tòa nhà La Astoria 3, Số 383 Nguyễn Duy Trinh, Phường Bình Trưng Tây, TP. Thủ Đức, TP. Hồ Chí Minh",
  geo: { latitude: 10.7836, longitude: 106.7675 },
  areaServed: "Thành phố Hồ Chí Minh, Việt Nam",
  workingHoursDisplay: "Thứ Hai – Thứ Sáu: 08:00 – 17:00",
  openingHoursSpec: "Mo-Fr 08:00-17:00",
} as const;

/** @deprecated Used only by orphaned /quy-trinh/ page */
export const processSteps = [
  {
    id: "tiep-nhan-thong-tin",
    title: "Tiếp nhận thông tin",
    text: "Ghi nhận bối cảnh, tài liệu liên quan và mục tiêu thực tế của khách hàng.",
    detail:
      "Khách hàng chia sẻ vấn đề, tài liệu chính và mốc thời gian cần lưu ý. Mục tiêu ở bước này là hiểu đúng bối cảnh trước khi đưa ra nhận định.",
  },
  {
    id: "danh-gia-phap-ly",
    title: "Đánh giá pháp lý",
    text: "Xác định vấn đề chính, rủi ro có thể phát sinh và các điểm cần làm rõ.",
    detail:
      "CNN Legal rà soát tài liệu, xác định quan hệ pháp lý, nghĩa vụ liên quan và các điểm có thể ảnh hưởng đến lựa chọn xử lý.",
  },
  {
    id: "de-xuat-huong-xu-ly",
    title: "Đề xuất hướng xử lý",
    text: "Trình bày lựa chọn khả thi, giới hạn pháp lý và việc cần chuẩn bị tiếp theo.",
    detail:
      "Khách hàng được trao đổi về hướng đi có thể cân nhắc, rủi ro của từng lựa chọn và các bước cần chuẩn bị để quyết định thận trọng.",
  },
  {
    id: "dong-hanh-thuc-hien",
    title: "Đồng hành thực hiện",
    text: "Hỗ trợ soạn thảo, làm việc với bên liên quan hoặc tham gia tố tụng khi phù hợp.",
    detail:
      "Tùy tính chất vụ việc, việc hỗ trợ có thể gồm chuẩn bị tài liệu, trao đổi với bên liên quan hoặc tham gia quá trình tố tụng theo phạm vi đã thống nhất.",
  },
] as const;
