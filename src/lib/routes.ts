export const ROUTES = {
  HOME: "/",
  VILLA: "/chalal/pulga/chojh/kheerganga/villa",
  CAFE: "/kasol/katagla/chojh/ghrahan/israeli/indian/food/pulga/cafe",
  HOSTEL: "/kasol/chalal/tosh/katagla/kheerganga/hostel",
  TREKS: "/kasol/kheerganga/sarpass/tosh/kutla/pulga/kalga/treks",
  REVIEWS: "/reviews",
  VIEWS: "/views",
  CONTACT: "/contact",
  FAQ: "/faq",
} as const;

export function trekDetailPath(slug: string) {
  return `${ROUTES.TREKS}/${slug}`;
}
