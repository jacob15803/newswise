import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type Article } from "@/lib/news-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface ArticleListItemProps {
  article: Article;
}

const categoryColors: { [key: string]: "default" | "secondary" | "destructive" | "outline" | null | undefined } = {
  Technology: "default",
  Business: "secondary",
  World: "outline",
};

export function ArticleListItem({ article }: ArticleListItemProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === article.imageId);

  return (
    <div className="flex items-start gap-4">
      {placeholder && (
         <Image
         src={placeholder.imageUrl}
         alt={placeholder.description}
         data-ai-hint={placeholder.imageHint}
         width={100}
         height={67}
         className="rounded-md object-cover aspect-[3/2]"
       />
      )}
      <div className="flex-1 space-y-1">
        <p className="font-medium leading-snug">{article.headline}</p>
        <Badge variant={categoryColors[article.category] || "default"}>{article.category}</Badge>
      </div>
    </div>
  );
}
