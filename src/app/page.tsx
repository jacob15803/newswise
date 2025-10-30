import AppHeader from "@/components/app-header";
import { ArticleList } from "@/components/news/article-list";
import { ControlPanel } from "@/components/news/control-panel";
import { getArticles } from "@/lib/news-data";

export default function Home() {
  const articles = getArticles();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:flex-row sm:gap-8 sm:p-8">
        <div className="flex-1">
          <ControlPanel />
        </div>
        <aside className="w-full sm:w-80 md:w-96">
          <ArticleList articles={articles} />
        </aside>
      </main>
    </div>
  );
}
