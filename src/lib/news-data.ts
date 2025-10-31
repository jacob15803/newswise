export interface Article {
  id: string;
  headline: string;
  content: string;
  category: "Technology" | "Business" | "World";
  imageId: string;
  url: string; // ✅ Added to track uniqueness
}

// Arrays to store news by category
export const techArticles: Article[] = [];
export const businessArticles: Article[] = [];
export const worldArticles: Article[] = [];

// Load environment variable safely
const NEXT_PUBLIC_NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines";

async function fetchNews(category: string): Promise<Article[]> {
  if (!NEXT_PUBLIC_NEWS_API_KEY) {
    console.error("❌ Missing NEWS_API_KEY in environment variables");
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}?category=${category.toLowerCase()}&language=en&pageSize=10&apiKey=${NEXT_PUBLIC_NEWS_API_KEY}`
    );

    const data = await response.json();

    if (!data.articles) return [];

    // ✅ Map articles with unique ID and include URL for duplicate filtering
    const articles = data.articles.map((a: any, index: number) => ({
      id: `${category}-${index + 1}-${a.url || Math.random()}`, // unique even if re-fetched
      headline: a.title || "Untitled",
      content: a.description || a.content || "No content available.",
      category: category as "Technology" | "Business" | "World",
      imageId: `${category.toLowerCase()}-${index}`,
      url: a.url || "", // store for duplicate checking
    }));

    return articles;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
}

export async function loadNewsData() {
  const [tech, business, world] = await Promise.all([
    fetchNews("Technology"),
    fetchNews("Business"),
    fetchNews("World"),
  ]);

  // ✅ Combine and remove duplicates based on URL
  const allArticles = [...tech, ...business, ...world];
  const uniqueArticles = allArticles.filter(
    (article, index, self) =>
      article.url && index === self.findIndex((a) => a.url === article.url)
  );

  // ✅ Clear old data and repopulate arrays
  techArticles.length = 0;
  businessArticles.length = 0;
  worldArticles.length = 0;

  techArticles.push(...uniqueArticles.filter((a) => a.category === "Technology"));
  businessArticles.push(...uniqueArticles.filter((a) => a.category === "Business"));
  worldArticles.push(...uniqueArticles.filter((a) => a.category === "World"));
}

export function getArticles(): Article[] {
  // ✅ Return combined unique set
  return [...techArticles, ...businessArticles, ...worldArticles];
}
