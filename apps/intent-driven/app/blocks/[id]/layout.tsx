import { blocksData } from "@/lib/blocks-data";

export function generateStaticParams() {
  return blocksData.map((block) => ({
    id: block.id,
  }));
}

export default function BlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
