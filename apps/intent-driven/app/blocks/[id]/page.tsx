"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { getBlockById } from "@/lib/blocks-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@innate/ui";
import { Badge } from "@innate/ui";
import { Button } from "@innate/ui";
import { Textarea } from "@innate/ui";
import { Separator } from "@innate/ui";
import {
  LayoutDashboard,
  Mail,
  Shield,
  CheckSquare,
  CreditCard,
  Gamepad2,
  FileText,
  Music,
  Blocks,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-8 h-8" />,
  Mail: <Mail className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  CheckSquare: <CheckSquare className="w-8 h-8" />,
  CreditCard: <CreditCard className="w-8 h-8" />,
  Gamepad2: <Gamepad2 className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  Music: <Music className="w-8 h-8" />,
};

export default function BlockDetailPage() {
  const params = useParams();
  const block = getBlockById(params.id as string);
  const [copied, setCopied] = useState(false);

  if (!block) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <Blocks className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-xl font-semibold mb-2">Block not found</h1>
        <p className="text-muted-foreground">
          The block you are looking for does not exist.
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(block.aiPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2 text-muted-foreground"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Blocks
      </Button>

      {/* Block header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
          {iconMap[block.icon] || <Blocks className="w-8 h-8" />}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold">{block.title}</h1>
          <p className="text-muted-foreground mt-1">{block.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {block.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* AI Prompt section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle className="text-base">AI Prompt</CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Prompt
                </>
              )}
            </Button>
          </div>
          <CardDescription>
            Copy this prompt to generate the {block.title} block with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={block.aiPrompt}
            readOnly
            className="min-h-[300px] font-mono text-sm resize-none bg-muted/50"
          />
        </CardContent>
      </Card>
    </div>
  );
}
