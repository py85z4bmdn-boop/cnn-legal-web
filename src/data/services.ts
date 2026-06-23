export type Service = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly situations: readonly string[];
  readonly approach: readonly string[];
  readonly points: readonly string[];
};

export const services = [
  {
    slug: "luat-bao-chua-hinh-su",
    title: "Luật bào chữa hình sự",
    summary:
      "Hỗ trợ đánh giá hồ sơ, quyền tố tụng và hướng bảo vệ quyền lợi trong vụ việc hình sự.",
    description:
      "Dịch vụ tập trung vào việc đọc hồ sơ, xác định vấn đề pháp lý trọng tâm và chuẩn bị phương án làm việc phù hợp trong từng giai đoạn tố tụng.",
    situations: [
      "Cần hiểu quyền và nghĩa vụ khi làm việc với cơ quan tiến hành tố tụng.",
      "Cần đánh giá tài liệu, lời khai, chứng cứ hoặc quyết định tố tụng đã nhận.",
      "Cần chuẩn bị hướng bảo vệ quyền lợi cho cá nhân hoặc người thân.",
    ],
    approach: [
      "Xác định giai đoạn tố tụng và các mốc thời gian quan trọng.",
      "Rà soát tài liệu để nhận diện vấn đề cần làm rõ.",
      "Trao đổi thẳng về rủi ro, giới hạn pháp lý và việc cần chuẩn bị.",
    ],
    points: [
      "Đánh giá rủi ro pháp lý từ tài liệu ban đầu.",
      "Tư vấn quyền và nghĩa vụ trong quá trình tố tụng.",
      "Chuẩn bị luận cứ, tài liệu và hướng làm việc với cơ quan tiến hành tố tụng.",
    ],
  },
  {
    slug: "luat-kinh-doanh",
    title: "Luật kinh doanh",
    summary:
      "Tư vấn giao dịch, hợp đồng và rủi ro pháp lý trong hoạt động kinh doanh thường xuyên.",
    description:
      "CNN Legal hỗ trợ nhìn rõ rủi ro trước khi ký kết, thực hiện hoặc xử lý tranh chấp phát sinh từ giao dịch thương mại.",
    situations: [
      "Cần rà soát hợp đồng trước khi ký hoặc gia hạn.",
      "Giao dịch đang phát sinh chậm thanh toán, không thực hiện hoặc tranh chấp nghĩa vụ.",
      "Cần chuẩn bị phương án thương lượng hoặc xử lý khi đối tác vi phạm.",
    ],
    approach: [
      "Đọc hợp đồng theo nghĩa vụ cốt lõi, điều kiện thực hiện và điều khoản rủi ro.",
      "Đánh giá chứng cứ giao dịch, trao đổi và lịch sử thực hiện.",
      "Đề xuất hướng làm việc thực tế trước khi chọn phương án tranh chấp.",
    ],
    points: [
      "Rà soát điều khoản hợp đồng và nghĩa vụ chính.",
      "Đánh giá rủi ro trước khi đàm phán hoặc ký kết.",
      "Tư vấn hướng xử lý khi giao dịch phát sinh tranh chấp.",
    ],
  },
  {
    slug: "luat-doanh-nghiep",
    title: "Luật doanh nghiệp",
    summary:
      "Hỗ trợ vấn đề nội bộ doanh nghiệp, quản trị, nghĩa vụ thành viên và hồ sơ pháp lý cơ bản.",
    description:
      "Dịch vụ hướng đến cách xử lý thực tế cho chủ doanh nghiệp, thành viên góp vốn và người quản lý khi cần quyết định có cơ sở pháp lý.",
    situations: [
      "Cần xem xét quyền và nghĩa vụ của thành viên, cổ đông hoặc người quản lý.",
      "Doanh nghiệp cần chuẩn bị quyết định, biên bản hoặc hồ sơ nội bộ.",
      "Phát sinh bất đồng nội bộ về góp vốn, quản trị hoặc điều hành.",
    ],
    approach: [
      "Xác định cơ cấu pháp lý và tài liệu nội bộ đang có.",
      "Đối chiếu quyền, nghĩa vụ và thủ tục cần tuân thủ.",
      "Ưu tiên hướng xử lý rõ ràng, giảm rủi ro cho quyết định kinh doanh.",
    ],
    points: [
      "Tư vấn quyền và nghĩa vụ của thành viên, cổ đông, người quản lý.",
      "Rà soát quyết định, biên bản và tài liệu nội bộ.",
      "Hỗ trợ xử lý mâu thuẫn hoặc thay đổi trong hoạt động doanh nghiệp.",
    ],
  },
  {
    slug: "lap-ke-hoach-thua-ke-tai-san",
    title: "Luật lập kế hoạch thừa kế/tài sản",
    summary:
      "Tư vấn sắp xếp tài sản, thừa kế và giấy tờ liên quan một cách rõ ràng, hạn chế tranh chấp.",
    description:
      "CNN Legal hỗ trợ khách hàng nhận diện tài sản, quyền liên quan và phương án pháp lý phù hợp trước khi lập hoặc điều chỉnh kế hoạch tài sản.",
    situations: [
      "Cần sắp xếp tài sản cá nhân hoặc gia đình để hạn chế tranh chấp.",
      "Cần hiểu điều kiện, hình thức và rủi ro khi lập di chúc hoặc thỏa thuận liên quan.",
      "Có nhiều người liên quan đến tài sản và cần làm rõ quyền, nghĩa vụ.",
    ],
    approach: [
      "Xác định tài sản, giấy tờ và người có quyền lợi liên quan.",
      "Đánh giá phương án pháp lý phù hợp với mục tiêu của khách hàng.",
      "Chuẩn bị tài liệu theo hướng rõ ràng, dễ kiểm chứng và hạn chế hiểu nhầm.",
    ],
    points: [
      "Đánh giá tình trạng pháp lý của tài sản và người liên quan.",
      "Tư vấn phương án lập di chúc, thỏa thuận hoặc văn bản cần thiết.",
      "Hỗ trợ chuẩn bị tài liệu để giảm rủi ro tranh chấp sau này.",
    ],
  },
  {
    slug: "luat-cong-nghe-thong-tin",
    title: "Luật công nghệ thông tin",
    summary:
      "Tư vấn hợp đồng công nghệ, dữ liệu, nền tảng số và rủi ro pháp lý trong vận hành trực tuyến.",
    description:
      "Dịch vụ dành cho cá nhân, nhóm kinh doanh và doanh nghiệp cần hiểu nghĩa vụ pháp lý trong sản phẩm, dịch vụ hoặc giao dịch công nghệ.",
    situations: [
      "Cần rà soát hợp đồng phần mềm, dịch vụ số hoặc điều khoản sử dụng.",
      "Sản phẩm trực tuyến có rủi ro về dữ liệu, nội dung hoặc quan hệ với người dùng.",
      "Phát sinh tranh chấp trong giao dịch công nghệ hoặc vận hành nền tảng.",
    ],
    approach: [
      "Đọc tài liệu theo luồng vận hành thực tế của sản phẩm hoặc dịch vụ.",
      "Xác định nghĩa vụ pháp lý liên quan đến dữ liệu, nội dung và hợp đồng.",
      "Đưa ra hướng xử lý có thể áp dụng mà không làm phức tạp hoạt động kinh doanh.",
    ],
    points: [
      "Rà soát điều khoản dịch vụ, hợp đồng phần mềm và giao dịch số.",
      "Tư vấn rủi ro liên quan dữ liệu, nội dung và nền tảng trực tuyến.",
      "Hỗ trợ xử lý tranh chấp phát sinh trong môi trường công nghệ.",
    ],
  },
  {
    slug: "luat-tai-san",
    title: "Luật tài sản",
    summary:
      "Tư vấn quyền tài sản, giao dịch tài sản và tranh chấp liên quan đến sở hữu hoặc sử dụng.",
    description:
      "CNN Legal hỗ trợ xác định quyền, nghĩa vụ và hướng xử lý khi tài sản là trọng tâm của giao dịch hoặc tranh chấp.",
    situations: [
      "Cần đánh giá giấy tờ, nguồn gốc hoặc quyền đối với tài sản.",
      "Chuẩn bị giao dịch chuyển nhượng, cho thuê, bảo đảm hoặc thỏa thuận sử dụng.",
      "Đang có tranh chấp về việc chiếm hữu, sử dụng hoặc định đoạt tài sản.",
    ],
    approach: [
      "Rà soát tài liệu chứng minh quyền và tình trạng pháp lý của tài sản.",
      "Xác định người liên quan, nghĩa vụ kèm theo và điểm có thể tranh chấp.",
      "Đề xuất hướng xử lý dựa trên chứng cứ và mục tiêu thực tế của khách hàng.",
    ],
    points: [
      "Đánh giá giấy tờ, nguồn gốc và tình trạng pháp lý của tài sản.",
      "Tư vấn giao dịch chuyển nhượng, bảo đảm hoặc sử dụng tài sản.",
      "Hỗ trợ định hướng xử lý khi phát sinh tranh chấp.",
    ],
  },
  {
    slug: "tranh-tung-uy-thac-di-san",
    title: "Tranh tụng về ủy thác và di sản",
    summary:
      "Hỗ trợ tranh chấp liên quan đến quản lý tài sản, di sản, nghĩa vụ ủy thác và quyền thừa kế.",
    description:
      "Dịch vụ tập trung vào việc phân tích tài liệu, quan hệ pháp lý và quyền lợi của các bên trong tranh chấp tài sản, di sản.",
    situations: [
      "Có tranh chấp về quản lý, phân chia hoặc thực hiện nghĩa vụ liên quan đến di sản.",
      "Cần xem xét vai trò của người quản lý tài sản, người thụ hưởng hoặc người thừa kế.",
      "Cần chuẩn bị hướng thương lượng hoặc tố tụng dựa trên hồ sơ hiện có.",
    ],
    approach: [
      "Lập lại bức tranh tài sản, di sản, người liên quan và tài liệu chứng minh.",
      "Đánh giá quyền, nghĩa vụ và điểm yếu trong từng hướng yêu cầu.",
      "Chuẩn bị phương án làm việc thận trọng, không công bố chi tiết nhạy cảm.",
    ],
    points: [
      "Rà soát hồ sơ di sản, thỏa thuận và tài liệu quản lý tài sản.",
      "Đánh giá quyền, nghĩa vụ và vị trí pháp lý của từng bên.",
      "Chuẩn bị hướng thương lượng hoặc tố tụng khi cần thiết.",
    ],
  },
] as const satisfies readonly Service[];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
