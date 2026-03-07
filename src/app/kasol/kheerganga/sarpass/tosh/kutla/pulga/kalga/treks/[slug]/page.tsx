import type { Metadata } from "next";
import TrekDetailPage, {
  generateMetadata as generateTreksMetadata,
  generateStaticParams as generateTreksStaticParams,
} from "@/app/treks/[slug]/page";

export const dynamicParams = false;

export function generateStaticParams() {
  return generateTreksStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: unknown;
}): Promise<Metadata> {
  return generateTreksMetadata({ params });
}

export default TrekDetailPage;
