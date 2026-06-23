export type CaseSource = {
  readonly name: string;
  readonly url: string;
};

export type NotableCase = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly court: string;
  readonly date: string;
  readonly year: number;
  readonly role: string;
  readonly defendant: string;
  readonly charge: string;
  readonly summary: string;
  readonly body: string;
  readonly keyArguments: readonly string[];
  readonly result?: string;
  readonly sources: readonly CaseSource[];
};

export const notableCases: readonly NotableCase[] = [
  {
    id: "van-thinh-phat-gd2",
    slug: "dai-an-van-thinh-phat-giai-doan-2",
    title: "Đại án Vạn Thịnh Phát — Giai đoạn 2 (Phúc thẩm)",
    court: "TAND Cấp cao tại TP.HCM",
    date: "25/3 – 21/4/2025",
    year: 2025,
    role: "Luật sư bào chữa",
    defendant: "Kwok Hakman Oliver (quốc tịch Úc, nguyên TGĐ Công ty CP Tập đoàn Đầu tư An Đông)",
    charge: "Lừa đảo chiếm đoạt tài sản (đồng phạm giúp sức)",
    summary:
      "Luật sư Đặng Kim Chinh tham gia bào chữa cho bị cáo Kwok Hakman Oliver — bị cáo người nước ngoài duy nhất kháng cáo trong vụ án. Tại phiên tòa, luật sư đã trực tiếp thẩm vấn bị cáo để làm rõ vai trò, nhận thức và hoàn cảnh phạm tội.",
    body: `<p>Trong phiên phúc thẩm đại án Vạn Thịnh Phát giai đoạn 2 (diễn ra từ ngày 25/3 đến 21/4/2025 tại TAND Cấp cao tại TP.HCM), Luật sư Đặng Kim Chinh tham gia bào chữa cho bị cáo <strong>Kwok Hakman Oliver</strong> — quốc tịch Úc, nguyên Tổng Giám đốc Công ty CP Tập đoàn Đầu tư An Đông.</p>
<p>Bị cáo Kwok Hakman Oliver là bị cáo người nước ngoài duy nhất kháng cáo xin giảm nhẹ hình phạt trong vụ án này. Tại bản án sơ thẩm (tháng 2/2024), bị cáo bị tuyên phạt 5 năm 6 tháng tù về tội "Lừa đảo chiếm đoạt tài sản" với vai trò đồng phạm giúp sức cho bà Trương Mỹ Lan.</p>
<p>Tại phiên tòa, Luật sư Đặng Kim Chinh đã trực tiếp thẩm vấn bị cáo để làm rõ vai trò, nhận thức và hoàn cảnh phạm tội. Luật sư đã đề nghị Hội đồng xét xử xem xét áp dụng tình tiết giảm nhẹ <strong>"phạm tội do lạc hậu"</strong> — lập luận rằng bị cáo là người nước ngoài, sinh sống khoảng 59 năm ở nước ngoài, bị hạn chế về ngôn ngữ, văn hóa, môi trường kinh doanh và đặc biệt là kiến thức về pháp luật Việt Nam, nhất là các quy định chuyên ngành về phát hành trái phiếu doanh nghiệp.</p>
<p>Kết quả phúc thẩm: bị cáo Kwok Hakman Oliver bị tuyên phạt <strong>3 năm 6 tháng tù</strong> (giảm từ 5 năm 6 tháng).</p>`,
    keyArguments: [
      "Đề nghị áp dụng tình tiết giảm nhẹ \"phạm tội do lạc hậu\" — bị cáo là người nước ngoài, sinh sống ~59 năm ở nước ngoài, hạn chế nhận thức về pháp luật Việt Nam.",
      "Lập luận sự khác biệt về ngôn ngữ, văn hóa, môi trường kinh doanh giữa Việt Nam và Úc khiến bị cáo không nhận thức đầy đủ hành vi giúp sức là phạm tội.",
      "Nhấn mạnh bị cáo không hiểu biết các quy định chuyên ngành đặc thù về phát hành trái phiếu doanh nghiệp tại Việt Nam.",
    ],
    result: "Sơ thẩm: 5 năm 6 tháng tù → Phúc thẩm: 3 năm 6 tháng tù",
    sources: [
      {
        name: "Báo Tiền Phong",
        url: "https://tienphong.vn/luat-su-de-nghi-ap-dung-tinh-tiet-giam-nhe-pham-toi-do-lac-hau-cho-mot-dong-pham-cua-ba-truong-my-lan-post1731264.tpo",
      },
      {
        name: "Báo Tiền Phong",
        url: "https://tienphong.vn/ba-truong-my-lan-xin-mien-hon-30-ty-dong-an-phi-vi-thuoc-doi-tuong-nguoi-cao-tuoi-post1728960.tpo",
      },
      {
        name: "Pháp Luật TP.HCM",
        url: "https://plo.vn/phuc-tham-dai-an-van-thinh-phat-giai-doan-2-post834171.html",
      },
    ],
  },
  {
    id: "van-thinh-phat-gd1",
    slug: "dai-an-van-thinh-phat-giai-doan-1",
    title: "Đại án Vạn Thịnh Phát — Giai đoạn 1 (Phúc thẩm)",
    court: "TAND Cấp cao tại TP.HCM",
    date: "Tháng 11–12/2024",
    year: 2024,
    role: "Luật sư bào chữa",
    defendant: "Lê Khánh Hiền (cựu Tổng Giám đốc Ngân hàng SCB)",
    charge: "Vi phạm quy định về cho vay trong hoạt động của các tổ chức tín dụng",
    summary:
      "Luật sư Đặng Kim Chinh bào chữa cho bị cáo Lê Khánh Hiền tại phiên phúc thẩm. Luật sư đã trình bày trước HĐXX rằng bị cáo là một \"trường hợp đặc biệt\" cần được xem xét giảm nhẹ hình phạt.",
    body: `<p>Tại phiên phúc thẩm đại án Vạn Thịnh Phát giai đoạn 1 (diễn ra tháng 11–12/2024 tại TAND Cấp cao tại TP.HCM), Luật sư Đặng Kim Chinh tham gia bào chữa cho bị cáo <strong>Lê Khánh Hiền</strong> — cựu Tổng Giám đốc Ngân hàng SCB.</p>
<p>Bị cáo Lê Khánh Hiền bị truy tố về tội "Vi phạm quy định về cho vay trong hoạt động của các tổ chức tín dụng" và bị tuyên phạt 5 năm tù tại phiên sơ thẩm.</p>
<p>Luật sư Đặng Kim Chinh đã trình bày trước Hội đồng xét xử rằng bị cáo là một <strong>"trường hợp đặc biệt"</strong>. Cụ thể, luật sư dẫn chứng công văn của Ngân hàng SCB ghi nhận bị cáo có thành tích xuất sắc trong đề án tái cơ cấu ngân hàng, góp phần ổn định tính thanh khoản và hiện đại hóa công nghệ thông tin cho SCB.</p>
<p>Ngoài ra, luật sư nhấn mạnh bị cáo đã tích cực vận động gia đình tiếp tục khắc phục hậu quả sau phiên tòa sơ thẩm.</p>
<p>Kết quả phúc thẩm: bị cáo Lê Khánh Hiền bị tuyên phạt <strong>3 năm tù</strong> (giảm từ 5 năm).</p>`,
    keyArguments: [
      "Dẫn chứng công văn của Ngân hàng SCB ghi nhận bị cáo có thành tích xuất sắc trong đề án tái cơ cấu ngân hàng.",
      "Nhấn mạnh bị cáo đã góp phần ổn định tính thanh khoản và hiện đại hóa công nghệ thông tin cho SCB.",
      "Bị cáo đã tích cực vận động gia đình tiếp tục khắc phục hậu quả sau phiên sơ thẩm.",
    ],
    result: "Sơ thẩm: 5 năm tù → Phúc thẩm: 3 năm tù",
    sources: [
      {
        name: "Báo Tiền Phong",
        url: "https://tienphong.vn/phuc-tham-dai-an-van-thinh-phat-luat-su-trinh-bay-ve-truong-hop-dac-biet-cua-mot-bi-cao-post1689183.tpo",
      },
    ],
  },
  {
    id: "buon-lau-xang-dau",
    slug: "buon-lau-xang-dau-200-trieu-lit",
    title: "Vụ buôn lậu gần 200 triệu lít xăng dầu (Phúc thẩm)",
    court: "TAND Cấp cao tại TP.HCM",
    date: "Tháng 3/2023",
    year: 2023,
    role: "Luật sư bào chữa",
    defendant: "Bị cáo trong vụ án buôn lậu xăng dầu quy mô lớn (74 bị cáo, giai đoạn 1)",
    charge: "Buôn lậu",
    summary:
      "Vụ án buôn lậu xăng dầu quy mô lớn nhất từ trước đến nay tại Việt Nam, với 74 bị cáo bị truy tố trong giai đoạn 1. Luật sư Đặng Kim Chinh tham gia bào chữa tại phiên phúc thẩm tại TAND Cấp cao tại TP.HCM.",
    body: `<p>Vụ án buôn lậu gần 200 triệu lít xăng dầu là một trong những vụ án buôn lậu quy mô lớn nhất từ trước đến nay tại Việt Nam. Giai đoạn 1 của vụ án có 74 bị cáo bị truy tố.</p>
<p>Luật sư Đặng Kim Chinh tham gia bào chữa tại phiên phúc thẩm được xét xử tại <strong>TAND Cấp cao tại TP.HCM</strong> vào tháng 3/2023.</p>
<p>Phiên tòa thu hút sự quan tâm lớn của dư luận do quy mô đặc biệt của vụ án và số lượng bị cáo đông đảo. An ninh tại phiên tòa được thắt chặt với sự tham gia của nhiều luật sư bào chữa cho các bị cáo.</p>`,
    keyArguments: [],
    sources: [
      {
        name: "Báo Lao Động",
        url: "https://laodong.vn/phap-luat/an-ninh-that-chat-tai-phien-phuc-tham-vu-buon-lau-200-trieu-lit-xang-dau-1157100.ldo",
      },
    ],
  },
];
