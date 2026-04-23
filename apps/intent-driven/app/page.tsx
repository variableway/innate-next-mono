"use client";

import { useState } from "react";
import { cn } from "@innate/ui";
import {
  Card,
  CardContent,
  CardHeader,
} from "@innate/ui";
import { Badge } from "@innate/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@innate/ui";
import { Button } from "@innate/ui";
import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  ChevronDown,
  Newspaper,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
    role: string;
    joinDate: string;
  };
  content: string;
  summary: string;
  date: string;
  likes: number;
  comments: number;
  likedBy: { initials: string; color: string }[];
  bookmarked?: boolean;
}

const posts: Post[] = [
  {
    id: "1",
    title: "Claude Dispatch 深度分析：Anthropic 的 OpenClaw 应答，以及 AI Agent 平台分野的底层逻辑",
    author: {
      name: "Superlinear Academy",
      avatar: "",
      initials: "SA",
      role: "Admin",
      joinDate: "January 5, 2026",
    },
    content: "Claude Dispatch 深度分析：Anthropic 的 OpenClaw 应答，以及 AI Agent 平台分野的底层逻辑",
    summary: "调研日期：2026-03-18 触发：Anthropic 于 3 月 17 日发布 Claude Dispatch（Cowork 子功能），Latent Space 当天以 Anthropic's Answer to OpenClaw 为标题报道。结合此前的 OpenClaw 深度分析（2026-02-14），本文从产品决策和 axiom 体系两个维度，拆解这次发布的...",
    date: "3d",
    likes: 5,
    comments: 2,
    likedBy: [
      { initials: "U1", color: "bg-blue-500" },
      { initials: "U2", color: "bg-green-500" },
      { initials: "U3", color: "bg-purple-500" },
    ],
  },
  {
    id: "2",
    title: "Attention Residuals：用 Attention 修复 Transformer 深度维度上的信号稀释",
    author: {
      name: "Superlinear Academy",
      avatar: "",
      initials: "SA",
      role: "Admin",
      joinDate: "January 5, 2026",
    },
    content: "Attention Residuals：用 Attention 修复 Transformer 深度维度上的信号稀释",
    summary: "Moonshot AI 的 Kimi Team 于 2026 年 3 月 15 日发布了一篇技术报告，挑战了 Transformer 架构中一个存在近十年、每个主流大模型都在使用的基础组件：残差连接（residual connection）。问题：隐态稀释 标准 PreNorm Transformer 中，每一层的工作方式可以简化为：把当前层的输出加回到之前所有层的累积结果上。数学上...",
    date: "3d",
    likes: 3,
    comments: 0,
    likedBy: [
      { initials: "A1", color: "bg-red-500" },
      { initials: "A2", color: "bg-yellow-500" },
      { initials: "A3", color: "bg-indigo-500" },
    ],
  },
];

const sortOptions = ["Latest", "Top", "Trending"];

export default function DeepNewsPage() {
  const [activeSort, setActiveSort] = useState("Latest");
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-semibold">Deep News</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <div className="relative">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {activeSort}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-muted-foreground hover:text-foreground"
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-medium -ml-1 border-2 border-background">
                0
              </div>
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-medium -ml-1 border-2 border-background">
                1
              </div>
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-medium -ml-1 border-2 border-background">
                +
              </div>
            </div>
            <span className="text-sm text-muted-foreground ml-1">+5,491</span>
          </div>

          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border shadow-sm">
            <CardHeader className="pb-3">
              {/* Title */}
              <h2 className="text-base font-semibold leading-snug pr-16">
                {post.title}
              </h2>

              {/* Author info */}
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-foreground text-background text-xs">
                    {post.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{post.author.name}</span>
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                    {post.author.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-10 -mt-1">
                Member since {post.author.joinDate}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Content */}
              <div className="text-sm text-foreground leading-relaxed">
                <p className="font-medium mb-2">{post.content}</p>
                <p className="text-muted-foreground">
                  {post.summary}
                </p>
              </div>

              {/* See more */}
              <button
                onClick={() => toggleExpanded(post.id)}
                className="text-sm text-muted-foreground hover:text-foreground mt-2 transition-colors"
              >
                See more
              </button>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "w-8 h-8",
                      likedPosts.has(post.id)
                        ? "text-red-500"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4",
                        likedPosts.has(post.id) && "fill-current"
                      )}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-foreground"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Liked by avatars */}
                  <div className="flex items-center">
                    {post.likedBy.map((user, index) => (
                      <div
                        key={index}
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-medium border-2 border-background",
                          user.color,
                          index > 0 && "-ml-1.5"
                        )}
                      >
                        {user.initials.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)} likes · {post.comments} comments
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-8 h-8",
                    bookmarkedPosts.has(post.id)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => toggleBookmark(post.id)}
                >
                  <Bookmark
                    className={cn(
                      "w-4 h-4",
                      bookmarkedPosts.has(post.id) && "fill-current"
                    )}
                  />
                </Button>

                <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
