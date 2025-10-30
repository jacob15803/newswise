export interface Article {
  id: number;
  headline: string;
  content: string;
  category: "Technology" | "Business" | "World";
  imageId: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    headline: "Quantum Computing Achieves New Milestone in Qubit Stability",
    content: "Researchers at a leading tech institute have announced a breakthrough in quantum computing. They have managed to maintain the stability of a 50-qubit processor for over 10 seconds, a significant improvement that could accelerate the development of practical quantum computers. This development is crucial for solving complex problems beyond the reach of classical supercomputers.",
    category: "Technology",
    imageId: "tech-news",
  },
  {
    id: 2,
    headline: "Global Markets React to Central Bank's Interest Rate Hike",
    content: "Global financial markets experienced significant volatility following the central bank's decision to raise interest rates by 25 basis points. The move, aimed at curbing inflation, has led to a sell-off in the bond market and a strengthening of the currency. Analysts are divided on the long-term effects on economic growth.",
    category: "Business",
    imageId: "business-news",
  },
  {
    id: 3,
    headline: "International Summit Concludes with New Climate Accord",
    content: "Leaders from 150 nations have signed a new climate accord aimed at drastically reducing carbon emissions by 2040. The agreement includes binding commitments for transitioning to renewable energy sources and providing financial aid to developing nations for green technology adoption. Environmental groups have praised the accord as a historic step forward.",
    category: "World",
    imageId: "world-news",
  },
  {
    id: 4,
    headline: "The Rise of Generative AI in Software Development",
    content: "Generative AI is transforming the software development lifecycle, with new tools that can write code, debug, and even design user interfaces. This paradigm shift promises to increase productivity and allow developers to focus on more complex, creative tasks. However, it also raises questions about the future of software engineering roles and the need for new skills.",
    category: "Technology",
    imageId: "ai-dev",
  },
];

export function getArticles(): Article[] {
  return mockArticles;
}
