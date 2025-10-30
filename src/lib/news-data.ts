export interface Article {
  id: number;
  headline: string;
  content: string;
  category: "Technology" | "Business" | "World";
  imageId: string;
}

// Arrays to store news by category
export const techArticles: Article[] = [];
export const businessArticles: Article[] = [];
export const worldArticles: Article[] = [];

// Load environment variable safely
const NEWS_API_KEY = "500a26cc912049b48ed7eb9c7592c542";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

async function fetchNews(category: string): Promise<Article[]> {
  if (!NEWS_API_KEY) {
    console.error("❌ Missing NEWS_API_KEY in environment variables");
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}?category=${category.toLowerCase()}&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`
    );

    const data = await response.json();

    if (!data.articles) return [];

    return data.articles.map((a: any, index: number) => ({
      id: index + 1,
      headline: a.title || "Untitled",
      content: a.description || a.content || "No content available.",
      category: category as "Technology" | "Business" | "World",
      imageId: `${category.toLowerCase()}-${index}`,
    }));
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

  techArticles.push(...tech);
  businessArticles.push(...business);
  worldArticles.push(...world);
}

export function getArticles(): Article[] {
  // Combine all categories into one array
  return [...techArticles, ...businessArticles, ...worldArticles];
}
