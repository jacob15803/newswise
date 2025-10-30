"use client";

import { type Article } from "@/lib/news-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArticleListItem } from "./article-list-item";

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Today's Headlines</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
