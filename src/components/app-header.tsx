import { Newspaper } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center border-b bg-card px-4 md:px-8">
      <div className="flex items-center gap-3">
        <Newspaper className="h-7 w-7 text-primary" />
        <h1 className="font-headline text-2xl font-semibold tracking-tight text-foreground">
          NewsWise
        </h1>
      </div>
    </header>
  );
}
