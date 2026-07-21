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
  readonly category: string;
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
    date: "",
    year: 2025,
    role: "",
    defendant: "",
    charge: "",
    category: "Hình sự",
    summary:
      "Luật sư Đặng Kim Chinh bào chữa thành công cho bị cáo Kwok Hakman Oliver — Tổng Giám đốc Công ty CP Tập đoàn đầu tư An Đông, quốc tịch Úc. Nhờ đề nghị áp dụng tình tiết giảm nhẹ hiếm gặp \"phạm tội do lạc hậu\", HĐXX đã tuyên giảm án cho thân chủ từ 5 năm 6 tháng tù xuống còn 3 năm 6 tháng tù.",
    body: `<h2>Điểm nhấn</h2>
<p>Tại phiên tòa phúc thẩm vụ án Vạn Thịnh Phát giai đoạn 2 (TAND Cấp cao tại TP.HCM, xét xử từ 25/3 đến 21/4/2025), luật sư Đặng Kim Chinh (Đoàn Luật sư TP.HCM) đã bào chữa thành công cho bị cáo Kwok Hakman Oliver — Tổng Giám đốc Công ty CP Tập đoàn đầu tư An Đông, quốc tịch Úc. Nhờ lập luận pháp lý sắc bén, đặc biệt là việc đề nghị áp dụng tình tiết giảm nhẹ hiếm gặp "phạm tội do lạc hậu", Hội đồng xét xử (HĐXX) đã chấp nhận quan điểm bào chữa và tuyên giảm án cho thân chủ từ 5 năm 6 tháng tù xuống còn 3 năm 6 tháng tù — mức giảm 2 năm so với bản án sơ thẩm.</p>

<h2>Bối cảnh vụ án</h2>
<p>Vạn Thịnh Phát giai đoạn 2 là một trong những vụ án kinh tế lớn nhất từng được đưa ra xét xử tại Việt Nam, liên quan đến bà Trương Mỹ Lan (Chủ tịch Tập đoàn Vạn Thịnh Phát) cùng hàng chục đồng phạm. Theo nội dung vụ án, bị cáo Trương Mỹ Lan bị cáo buộc chỉ đạo sử dụng 4 công ty thuộc Tập đoàn Vạn Thịnh Phát (An Đông, Sunny World, Quang Thuận và Setra) để phát hành 25 mã trái phiếu không có tài sản đảm bảo, huy động vốn bất hợp pháp của hơn 35.800 nhà đầu tư, chiếm đoạt hơn 30.000 tỷ đồng. Vụ án còn liên quan đến các tội danh rửa tiền và vận chuyển trái phép tiền tệ qua biên giới.</p>
<p>Tại bản án sơ thẩm (TAND TP.HCM, tháng 10/2024), bà Trương Mỹ Lan bị tuyên án chung thân về tội "Lừa đảo chiếm đoạt tài sản". Tại phiên phúc thẩm, mức án này được giảm xuống 30 năm tù chung cho cả ba tội danh. Trong số 27 bị cáo được HĐXX phúc thẩm tuyên án ngày 21/4/2025, có nhiều bị cáo là người thân và cộng sự thân cận của bà Lan.</p>

<h2>Vai trò của bị cáo Kwok Hakman Oliver trong vụ án</h2>
<p>Ông Kwok Hakman Oliver (71 tuổi, quốc tịch Úc) là em rể của bị cáo Ngô Thanh Nhã — em dâu bà Trương Mỹ Lan. Với tư cách Tổng Giám đốc và người đại diện theo pháp luật của Công ty An Đông, ông bị cấp sơ thẩm xác định đã ký các hợp đồng hợp tác đầu tư, hợp đồng mua trái phiếu sơ cấp, hợp đồng vay vốn và các hồ sơ, tài liệu liên quan đến việc phát hành trái phiếu của Công ty An Đông năm 2018 — hành vi bị quy kết là đồng phạm giúp sức cho bà Trương Mỹ Lan trong chuỗi hành vi lừa đảo chiếm đoạt tài sản.</p>
<p>Tại bản án sơ thẩm (TAND TP.HCM, tháng 2/2024), ông bị tuyên phạt 5 năm 6 tháng tù về tội "Lừa đảo chiếm đoạt tài sản". Trong số các bị cáo người nước ngoài của vụ án, ông là người duy nhất có đơn kháng cáo xin giảm nhẹ hình phạt tại phiên phúc thẩm giai đoạn 2.</p>

<h2>Chiến lược bào chữa của luật sư Đặng Kim Chinh</h2>
<h3>Làm rõ giới hạn vai trò thực tế của bị cáo</h3>
<p>Trong phần xét hỏi, luật sư Đặng Kim Chinh trực tiếp đặt câu hỏi để làm rõ phạm vi công việc thực sự của ông Kwok Hakman Oliver tại Công ty An Đông. Bị cáo trình bày rằng nhiệm vụ chính được giao là điều hành hoạt động hằng ngày của khách sạn Windsor và Trung tâm thương mại An Đông Plaza — không phải là người phụ trách mảng tài chính hay hoạt động phát hành trái phiếu của công ty. Đây là cơ sở quan trọng để phân biệt vai trò của bị cáo với nhóm chủ mưu, chỉ đạo trực tiếp trong chuỗi hành vi phạm tội.</p>

<h3>Đề nghị áp dụng tình tiết giảm nhẹ "phạm tội do lạc hậu"</h3>
<p>Điểm mấu chốt và cũng là điểm đáng chú ý nhất trong phần bào chữa: luật sư đề nghị HĐXX xem xét áp dụng tình tiết giảm nhẹ "phạm tội do lạc hậu" — một tình tiết ít khi được viện dẫn trong thực tiễn xét xử. Ngoài các tình tiết giảm nhẹ được liệt kê cụ thể trong Bộ luật Hình sự, pháp luật hình sự Việt Nam cho phép HĐXX cân nhắc thêm những tình tiết giảm nhẹ khác phù hợp với hoàn cảnh riêng của từng vụ án, miễn là nêu rõ căn cứ trong bản án.</p>
<p>Lập luận của luật sư dựa trên các yếu tố cụ thể:</p>
<ul>
<li>Bị cáo là người nước ngoài, đã sinh sống 59 năm ở nước ngoài (Úc) trước khi đến Việt Nam làm việc và sinh sống khi đã lớn tuổi;</li>
<li>Sự khác biệt về ngôn ngữ, văn hóa, môi trường kinh doanh và hệ thống pháp luật giữa Việt Nam và Úc khiến bị cáo bị hạn chế đáng kể khả năng nhận thức về pháp luật Việt Nam, đặc biệt là các quy định chuyên ngành, đặc thù liên quan đến hoạt động phát hành trái phiếu doanh nghiệp;</li>
<li>Bị cáo đã thực hiện hành vi giúp sức cho các bị cáo khác mà không nhận thức được đó là hành vi vi phạm pháp luật hình sự tại Việt Nam — dù về nguyên tắc, pháp luật hình sự Việt Nam vẫn buộc bị cáo phải biết.</li>
</ul>
<p>Ngay sau phần trình bày của luật sư, khi được HĐXX gọi lên bục khai báo, bị cáo Kwok Hakman Oliver xác nhận đồng ý hoàn toàn với quan điểm bào chữa nêu trên.</p>

<h3>Các tình tiết giảm nhẹ bổ trợ khác</h3>
<p>Bên cạnh lập luận trọng tâm, luật sư và bị cáo cũng trình bày thêm các yếu tố có lợi khác để HĐXX xem xét toàn diện:</p>
<ul>
<li>Sau phiên sơ thẩm, bị cáo đã tiếp tục tác động để gia đình tự nguyện nộp thêm 500 triệu đồng khắc phục hậu quả;</li>
<li>Bị cáo cùng Công ty An Đông từng tham gia hoạt động phòng, chống dịch COVID-19;</li>
<li>Bị cáo và gia đình có đóng góp xây dựng công trình phúc lợi, nhà tình thương tại các địa bàn khó khăn;</li>
<li>Bị cáo đã trên 70 tuổi và tại thời điểm xét xử phúc thẩm đã bị tạm giam gần 2 năm 6 tháng.</li>
</ul>

<h2>Kết quả</h2>
<p>Trên cơ sở chấp nhận quan điểm bào chữa của luật sư Đặng Kim Chinh cùng phần tự bào chữa của bị cáo, HĐXX phúc thẩm TAND Cấp cao tại TP.HCM đã tuyên giảm án cho bị cáo Kwok Hakman Oliver từ 5 năm 6 tháng tù xuống còn 3 năm 6 tháng tù về tội "Lừa đảo chiếm đoạt tài sản" trong bản án tuyên ngày 21/4/2025. Đây là kết quả có ý nghĩa thực tiễn rõ rệt, phản ánh hiệu quả của việc xây dựng lập luận bào chữa dựa trên hoàn cảnh cá nhân đặc thù của thân chủ, kết hợp với việc vận dụng linh hoạt các quy định về tình tiết giảm nhẹ trách nhiệm hình sự.</p>

<h2>Ý nghĩa vụ việc</h2>
<p>Vụ việc là một ví dụ tiêu biểu cho năng lực tranh tụng của luật sư Đặng Kim Chinh trong các vụ án hình sự phức tạp, nhiều bị cáo, có yếu tố nước ngoài. Việc xây dựng thành công một tình tiết giảm nhẹ không nằm trong danh mục liệt kê thông thường của pháp luật, dựa trên phân tích sâu về bối cảnh cá nhân, văn hóa và nhận thức pháp luật của thân chủ, cho thấy cách tiếp cận bào chữa toàn diện — không chỉ tập trung vào tình tiết vụ án mà còn khai thác các yếu tố nhân thân, hoàn cảnh để bảo vệ tối đa quyền và lợi ích hợp pháp của bị cáo.</p>`,
    keyArguments: [],
    result: undefined,
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
    date: "",
    year: 2024,
    role: "",
    defendant: "",
    charge: "",
    category: "Hình sự",
    summary:
      "Luật sư Đặng Kim Chinh bào chữa cho bị cáo Lê Khánh Hiền — cựu Tổng Giám đốc Ngân hàng SCB. Bằng việc viện dẫn văn bản xác nhận chính thức từ chính SCB về thành tích của bị cáo trong tái cơ cấu ngân hàng, luật sư đã xây dựng căn cứ giảm nhẹ theo điểm v khoản 1 Điều 51 Bộ luật Hình sự; HĐXX chấp nhận kháng cáo và giảm hình phạt từ 5 năm tù xuống còn 3 năm tù.",
    body: `<h2>1. Tóm tắt vụ việc</h2>
<p>Luật sư Đặng Kim Chinh (Đoàn Luật sư TP.HCM) bào chữa cho bị cáo Lê Khánh Hiền — cựu Tổng Giám đốc Ngân hàng TMCP Sài Gòn (SCB) — tại phiên tòa phúc thẩm vụ án Vạn Thịnh Phát giai đoạn 1, do TAND Cấp cao tại TP.HCM xét xử từ ngày 4/11 đến 3/12/2024.</p>
<p>Bằng việc viện dẫn văn bản xác nhận chính thức từ Ngân hàng SCB — tổ chức bị thiệt hại trong vụ án — về thành tích của bị cáo trong quá trình tái cơ cấu ngân hàng, luật sư đã xây dựng căn cứ áp dụng tình tiết giảm nhẹ được quy định cụ thể tại điểm v khoản 1 Điều 51 Bộ luật Hình sự. Tại bản án tuyên ngày 3/12/2024, HĐXX chấp nhận kháng cáo và giảm hình phạt cho bị cáo từ 5 năm tù xuống còn 3 năm tù.</p>

<h2>2. Bối cảnh vụ án</h2>
<p>Vụ án Vạn Thịnh Phát giai đoạn 1 xét xử bà Trương Mỹ Lan (cựu Chủ tịch HĐQT Tập đoàn Vạn Thịnh Phát) cùng đồng phạm về các tội "Tham ô tài sản", "Đưa hối lộ" và "Vi phạm quy định về cho vay trong hoạt động của các tổ chức tín dụng". Theo cáo trạng, dù không nắm giữ chức vụ tại SCB, bà Trương Mỹ Lan gián tiếp sở hữu trên 91% cổ phần ngân hàng, qua đó chi phối gần như toàn bộ hoạt động và chỉ đạo dàn lãnh đạo chủ chốt của SCB thực hiện các hành vi gây thiệt hại đặc biệt lớn.</p>
<p>Tại bản án sơ thẩm, bà Trương Mỹ Lan bị tuyên án tử hình về tội "Tham ô tài sản". Vụ án giai đoạn 1 có 86 bị cáo, trong đó 48 bị cáo có đơn kháng cáo được đưa ra xét xử phúc thẩm. Tại bản án phúc thẩm tuyên ngày 3/12/2024, bà Trương Mỹ Lan bị tuyên y án tử hình về tội tham ô tài sản; phần lớn các bị cáo còn lại — trong đó có nhiều cựu lãnh đạo, cán bộ SCB — được HĐXX xem xét giảm nhẹ hình phạt ở các mức độ khác nhau.</p>

<h2>3. Hồ sơ thân chủ và vấn đề pháp lý trọng tâm</h2>
<p>Thân chủ: Lê Khánh Hiền, cựu Tổng Giám đốc Ngân hàng TMCP Sài Gòn (SCB).</p>
<p>Hành vi bị quy kết: Cấp sơ thẩm (TAND TP.HCM) xác định bị cáo có liên quan đến hoạt động cấp tín dụng cho các công ty, cá nhân thuộc hệ sinh thái Vạn Thịnh Phát trong giai đoạn SCB thực hiện đề án tái cơ cấu, và tuyên phạt 5 năm tù về tội "Vi phạm quy định về cho vay trong hoạt động của các tổ chức tín dụng".</p>
<p>Vấn đề pháp lý trọng tâm cần giải quyết ở cấp phúc thẩm: Cân đối giữa trách nhiệm hình sự phát sinh từ vai trò quản lý điều hành của bị cáo tại SCB với những đóng góp thực chất, có thể kiểm chứng khách quan của bị cáo đối với sự an toàn hệ thống của chính ngân hàng trong giai đoạn khủng hoảng thanh khoản — nhằm bảo đảm việc lượng hình phản ánh đầy đủ, cân xứng với toàn bộ quá trình công tác của bị cáo, không chỉ hành vi bị quy kết.</p>

<h2>4. Chiến lược bào chữa</h2>
<h3>4.1. Căn cứ pháp lý cho tình tiết giảm nhẹ "có thành tích xuất sắc trong công tác"</h3>
<p>Điểm v khoản 1 Điều 51 Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung năm 2017) quy định: người phạm tội là người có thành tích xuất sắc trong sản xuất, chiến đấu, học tập hoặc công tác được coi là tình tiết giảm nhẹ trách nhiệm hình sự. Đây là tình tiết giảm nhẹ được liệt kê cụ thể trong luật, khác với tình tiết giảm nhẹ "khác" theo khoản 2 cùng điều — do đó có giá trị áp dụng trực tiếp, không phụ thuộc vào việc Tòa án phải tự xác lập căn cứ ngoài luật định.</p>
<p>Để làm căn cứ cho việc áp dụng tình tiết này, luật sư đã đưa ra chứng cứ có giá trị đặc biệt: chính Ngân hàng SCB — bên bị thiệt hại trong vụ án — có văn bản gửi HĐXX xác nhận bị cáo Lê Khánh Hiền có thành tích xuất sắc trong đề án tái cơ cấu ngân hàng, cụ thể là đã góp phần ổn định tính thanh khoản và hiện đại hóa hệ thống công nghệ thông tin của SCB trong giai đoạn khó khăn.</p>
<p>Việc chứng cứ xác nhận thành tích xuất phát trực tiếp từ tổ chức bị thiệt hại — thay vì từ chính bị cáo hoặc luật sư — làm tăng đáng kể tính khách quan và sức thuyết phục của căn cứ giảm nhẹ được viện dẫn.</p>

<h3>4.2. Tình tiết giảm nhẹ bổ trợ về thái độ khắc phục hậu quả</h3>
<p>Tại phần tự trình bày, bị cáo Lê Khánh Hiền xác nhận với HĐXX rằng sau bản án sơ thẩm, bị cáo đã tiếp tục vận động gia đình khắc phục hậu quả vụ án — tình tiết giảm nhẹ được ghi nhận tại điểm b khoản 1 Điều 51 Bộ luật Hình sự (người phạm tội tự nguyện sửa chữa, bồi thường thiệt hại hoặc khắc phục hậu quả).</p>
<p>Việc kết hợp giữa (i) căn cứ khách quan về thành tích công tác được bên thứ ba xác nhận và (ii) tình tiết chủ quan về thái độ khắc phục hậu quả của chính bị cáo tạo thành một hồ sơ đề nghị giảm nhẹ hình phạt có cơ sở toàn diện cả về mặt luật định lẫn thực tiễn.</p>

<h2>5. Kết quả</h2>
<p>Tại bản án phúc thẩm tuyên ngày 3/12/2024, HĐXX TAND Cấp cao tại TP.HCM chấp nhận kháng cáo và giảm hình phạt cho bị cáo Lê Khánh Hiền từ 5 năm tù xuống còn 3 năm tù về tội "Vi phạm quy định về cho vay trong hoạt động của các tổ chức tín dụng" — mức giảm 2 năm so với bản án sơ thẩm.</p>

<h2>6. Nhận định chuyên môn</h2>
<p>Vụ việc là ví dụ cho thấy giá trị của việc chủ động thu thập chứng cứ khách quan từ bên thứ ba — kể cả từ chính tổ chức bị thiệt hại — để làm căn cứ áp dụng các tình tiết giảm nhẹ được liệt kê cụ thể trong luật. So với việc chỉ dựa vào lời trình bày của bị cáo, một văn bản xác nhận chính thức từ SCB về đóng góp thực chất của bị cáo trong công tác tái cơ cấu có giá trị chứng minh cao hơn, giúp HĐXX có cơ sở khách quan để đánh giá toàn diện quá trình công tác của bị cáo bên cạnh hành vi vi phạm bị quy kết.</p>`,
    keyArguments: [],
    result: undefined,
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
    date: "",
    year: 2023,
    role: "",
    defendant: "",
    charge: "",
    category: "Hình sự",
    summary:
      "Luật sư Đặng Kim Chinh tham gia trong đội ngũ luật sư bào chữa tại phiên phúc thẩm vụ án buôn lậu gần 200 triệu lít xăng dầu từ Singapore về Việt Nam — một trong những đại án buôn lậu có quy mô lớn nhất từng được xét xử tại Việt Nam, với 74 bị cáo ở cấp sơ thẩm.",
    body: `<h2>1. Tóm tắt vụ việc</h2>
<p>Luật sư Đặng Kim Chinh (Đoàn Luật sư TP.HCM) tham gia trong đội ngũ luật sư bào chữa tại phiên tòa phúc thẩm vụ án buôn lậu gần 200 triệu lít xăng dầu từ Singapore về Việt Nam — một trong những đại án buôn lậu có quy mô lớn nhất từng được xét xử tại Việt Nam, do TAND Cấp cao tại TP.HCM xét xử.</p>
<p>Đây là vụ án có số lượng bị cáo và luật sư tham gia tố tụng thuộc hàng lớn nhất trong lịch sử tố tụng hình sự tại Đồng Nai, với hàng chục luật sư bào chữa cho 74 bị cáo ở cấp sơ thẩm.</p>

<h2>2. Bối cảnh vụ án</h2>
<p>Theo hồ sơ vụ án, từ tháng 3/2020 đến tháng 2/2021, đường dây do Phan Thanh Hữu (Giám đốc Công ty TNHH Thương mại Phan Lê Hoàng Anh) và Đào Ngọc Viễn (Giám đốc Công ty TNHH Đại Dương Hải Phòng) cầm đầu đã sử dụng các tàu biển thực hiện 48 chuyến vận chuyển xăng lậu từ Singapore về Việt Nam, tổng cộng gần 200 triệu lít, trị giá hơn 2.596 tỷ đồng, tiêu thụ tại nhiều tỉnh, thành phía Nam.</p>
<p>Tại bản án sơ thẩm (TAND tỉnh Đồng Nai, tháng 12/2022), bị cáo Đào Ngọc Viễn bị tuyên phạt 17 năm tù, Phan Thanh Hữu 16 năm tù về tội "Buôn lậu"; bị cáo Ngô Văn Thụy (cựu Đội trưởng Đội kiểm soát chống buôn lậu khu vực miền Nam, Tổng cục Hải quan) bị tuyên phạt 15 năm tù về tội "Nhận hối lộ" — đây là bị cáo duy nhất trong vụ án bị xét xử về hành vi nhận hối lộ, 73 bị cáo còn lại bị xét xử về hành vi buôn lậu.</p>
<p>Vụ án có 26/74 bị cáo kháng cáo xin giảm nhẹ hình phạt, cùng 14 người có quyền lợi, nghĩa vụ liên quan đề nghị xem xét lại phần dân sự. Viện Kiểm sát Nhân dân Cấp cao tại TP.HCM đồng thời có kháng nghị theo hướng tăng nặng hình phạt đối với 28 bị cáo mà cấp sơ thẩm đã áp dụng mức án dưới khung hoặc cho hưởng án treo, phạt tiền.</p>

<h2>3. Diễn biến phiên phúc thẩm</h2>
<p>Phiên tòa phúc thẩm được TAND Cấp cao tại TP.HCM mở lần đầu ngày 13/3/2023 do thẩm phán Trần Thị Thu Thủy làm chủ tọa. Do một số luật sư bào chữa cùng nhiều bị cáo và người có quyền lợi, nghĩa vụ liên quan vắng mặt, HĐXX quyết định hoãn phiên tòa để bảo đảm quyền lợi tố tụng của các bên, và mở lại xét xử từ ngày 5/4 đến 27/4/2023.</p>
<p>Tại bản án phúc thẩm số 205/2023/HS-PT (tuyên ngày 17/4/2023), HĐXX chấp nhận một phần kháng cáo, giảm nhẹ hình phạt cho phần lớn các bị cáo có đơn kháng cáo: bị cáo Phan Thanh Hữu được giảm từ 16 năm xuống 13 năm 6 tháng tù; bị cáo Đào Ngọc Viễn được giảm từ 17 năm xuống 15 năm tù, cùng về tội "Buôn lậu". Nhiều bị cáo khác trong nhóm quản lý, thuyền trưởng, thuyền phó, thuyền viên và các bị cáo có kháng cáo cũng được xem xét giảm nhẹ hình phạt ở các mức độ khác nhau.</p>

<h2>4. Nhận định chuyên môn</h2>
<p>Đây là một vụ án có tính chất đặc biệt phức tạp về cả quy mô (74 bị cáo, hàng chục luật sư tham gia tố tụng) lẫn tính chất pháp lý (đồng thời tồn tại kháng cáo xin giảm nhẹ của bị cáo và kháng nghị tăng nặng của Viện Kiểm sát đối với cùng một nhóm bị cáo). Việc tham gia bào chữa trong một vụ án ở quy mô này đòi hỏi luật sư phải nắm vững toàn bộ hồ sơ, xử lý đồng thời nhiều tình tiết pháp lý liên quan đến việc phân hóa trách nhiệm hình sự giữa các nhóm bị cáo có vai trò khác nhau trong cùng một đường dây phạm tội — từ người cầm đầu, người vận chuyển, đến các mắt xích trung gian tiêu thụ.</p>`,
    keyArguments: [],
    sources: [
      {
        name: "Báo Lao Động",
        url: "https://laodong.vn/phap-luat/an-ninh-that-chat-tai-phien-phuc-tham-vu-buon-lau-200-trieu-lit-xang-dau-1157100.ldo",
      },
    ],
  },
];
