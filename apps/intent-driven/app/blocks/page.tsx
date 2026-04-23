"use client";

import { useRouter } from "next/navigation";
import { blocksData } from "@/lib/blocks-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@innate/ui";
import { Badge } from "@innate/ui";
import {
  LayoutDashboard,
  Mail,
  Shield,
  CheckSquare,
  CreditCard,
  Gamepad2,
  FileText,
  Music,
  ArrowRight,
  Blocks,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  CheckSquare: <CheckSquare className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
};

export default function BlocksPage() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <Blocks className="w-7 h-7 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold">Blocks</h1>
          <p className="text-sm text-muted-foreground">
            Pre-built components and layouts for your applications
          </p>
        </div>
      </div>

      {/* Blocks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocksData.map((block) => (
          <Card
            key={block.id}
            className="cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => router.push(`/blocks/${block.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {iconMap[block.icon] || <Blocks className="w-6 h-6" />}
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardTitle className="text-base mt-3">{block.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {block.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5">
                {block.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
