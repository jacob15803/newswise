import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
  title: string;
  content?: string;
  isLoading: boolean;
  defaultText: string;
}

export function ResultCard({
  title,
  content,
  isLoading,
  defaultText,
}: ResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-40">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : content ? (
          <p className="whitespace-pre-wrap text-sm">{content}</p>
        ) : (
          <p className="text-sm text-muted-foreground">{defaultText}</p>
        )}
      </CardContent>
    </Card>
  );
}
