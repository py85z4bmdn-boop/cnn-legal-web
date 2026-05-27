import { articles } from "./articles";
import { services } from "./services";
import { site } from "./site";

export type NavigationChild = {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly external?: boolean;
};

export type NavigationGroup = {
  readonly label: string;
  readonly children: readonly NavigationChild[];
};

export type NavigationItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly description: string;
  readonly groups?: readonly NavigationGroup[];
};

const serviceMenuDescriptions: Record<string, string> = {
  "luat-bao-chua-hinh-su": "Tố tụng hình sự.",
  "luat-kinh-doanh": "Hợp đồng và giao dịch.",
  "luat-doanh-nghiep": "Quản trị doanh nghiệp.",
  "lap-ke-hoach-thua-ke-tai-san": "Di chúc và tài sản.",
  "luat-cong-nghe-thong-tin": "Dữ liệu và công nghệ.",
  "luat-tai-san": "Tranh chấp tài sản.",
  "tranh-tung-uy-thac-di-san": "Ủy thác và di sản.",
};

export const navigationItems: readonly NavigationItem[] = [
  {
    id: "tong-quan",
    label: "Tổng quan",
    href: "/",
    description: "Giới thiệu ngắn gọn về CNN Legal và các hướng hỗ trợ chính.",
  },
  {
    id: "luat-su-phu-trach",
    label: "Luật sư phụ trách",
    href: "/luat-su-phu-trach/",
    description: "Cách làm việc trực tiếp với người chịu trách nhiệm xử lý.",
    groups: [
      {
        label: "Trọng tâm",
        children: [
          {
            label: "Làm việc trực tiếp với luật sư",
            href: "/luat-su-phu-trach/",
            description: "Một đầu mối pháp lý rõ ràng cho vấn đề cần xử lý.",
          },
          {
            label: "Đánh giá vấn đề ban đầu",
            href: "/luat-su-phu-trach/",
            description: "Tiếp nhận bối cảnh, hồ sơ và rủi ro trước khi đề xuất hướng đi.",
          },
          {
            label: "Bảo mật thông tin",
            href: "/luat-su-phu-trach/",
            description: "Giữ cách trao đổi thận trọng với tài liệu và thông tin nhạy cảm.",
          },
        ],
      },
      {
        label: "Hồ sơ công khai",
        children: [
          {
            label: "dangkimchinh.vn",
            href: site.externalProfileUrl,
            description: "Trang thông tin công khai của luật sư phụ trách.",
            external: true,
          },
          {
            label: "LinkedIn",
            href: site.linkedInUrl,
            description: "Liên kết hồ sơ nghề nghiệp công khai.",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "dich-vu",
    label: "Dịch vụ",
    href: "/dich-vu/",
    description: "Các lĩnh vực pháp lý được trình bày theo nhu cầu thực tế.",
    groups: [
      {
        label: "Lĩnh vực hỗ trợ",
        children: services.map((service) => ({
          label: service.title,
          href: `/dich-vu/${service.slug}/`,
          description: serviceMenuDescriptions[service.slug] ?? service.summary,
        })),
      },
    ],
  },
  {
    id: "bai-viet",
    label: "Bài viết",
    href: "/bai-viet/",
    description: "Một số bài viết pháp lý công khai được dẫn nguồn rõ ràng.",
    groups: [
      {
        label: "Bài viết gần đây",
        children: articles.slice(0, 4).map((article) => ({
          label: article.title,
          href: `/bai-viet/${article.slug}/`,
          description: `${article.publishedAt} · ${article.category}`,
        })),
      },
    ],
  },
  {
    id: "lien-he",
    label: "Liên hệ",
    href: "/lien-he/",
    description: "Thông tin liên hệ trực tiếp và nguyên tắc bảo mật khi trao đổi hồ sơ.",
  },
];
