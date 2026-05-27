export type ExperienceItem = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
};

export const experienceItems = [
  {
    id: "tranh-chap-hop-dong",
    title: "Tranh chấp hợp đồng",
    summary:
      "Đánh giá nghĩa vụ, vi phạm, chứng cứ và hướng thương lượng hoặc tố tụng phù hợp.",
  },
  {
    id: "tu-van-doanh-nghiep",
    title: "Tư vấn doanh nghiệp",
    summary:
      "Hỗ trợ vấn đề quản trị, thỏa thuận nội bộ, giao dịch và quyết định kinh doanh cần cơ sở pháp lý.",
  },
  {
    id: "van-de-tai-san",
    title: "Vấn đề tài sản",
    summary:
      "Xem xét quyền sở hữu, quyền sử dụng, giao dịch tài sản và tranh chấp phát sinh.",
  },
  {
    id: "cong-nghe-thong-tin",
    title: "Công nghệ thông tin",
    summary:
      "Tư vấn rủi ro trong hợp đồng công nghệ, dữ liệu, nội dung số và vận hành trực tuyến.",
  },
  {
    id: "thua-ke-va-di-san",
    title: "Thừa kế và di sản",
    summary:
      "Đánh giá quan hệ thừa kế, tài sản để lại, giấy tờ liên quan và nguy cơ tranh chấp.",
  },
  {
    id: "bao-chua-va-to-tung",
    title: "Bào chữa và bảo vệ quyền lợi trong tố tụng",
    summary:
      "Hỗ trợ xác định quyền tố tụng, chuẩn bị tài liệu và định hướng bảo vệ quyền lợi hợp pháp.",
  },
] as const satisfies readonly ExperienceItem[];
