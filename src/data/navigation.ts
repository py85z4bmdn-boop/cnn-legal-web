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
  "bao-chua-hinh-su": "Bào chữa trực tiếp tại tòa án.",
  "tu-van-phap-ly-hinh-su": "Phân tích hồ sơ và chiến lược tố tụng.",
  "dat-dai-bat-dong-san": "Tranh chấp đất đai và bồi thường.",
  "dan-su-hop-dong": "Tranh chấp dân sự và hợp đồng.",
  "thuong-mai-quoc-te": "Thư tín dụng L/C và trọng tài quốc tế.",
  "nghien-cuu-tu-van-chinh-sach-phap-luat": "Đóng góp dự thảo luật và nghiên cứu.",
};

export const navigationItems: readonly NavigationItem[] = [
  {
    id: "tong-quan",
    label: "Tổng quan",
    href: "/tong-quan/",
    description: "Giới thiệu ngắn gọn về CNN Legal và các hướng hỗ trợ chính.",
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
    id: "vu-an-tieu-bieu",
    label: "Vụ án tiêu biểu",
    href: "/vu-an-tieu-bieu/",
    description: "Các vụ án mà Luật sư Đặng Kim Chinh đã tham gia bào chữa.",
  },
];
