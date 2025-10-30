# **App Name**: NewsWise

## Core Features:

- Fetch News Articles: Retrieve top news headlines and content from a specified API (e.g., Technology or General news).
- Article Storage: Store fetched news articles as documents for later processing.
- Text Preprocessing: Clean the news article text by removing symbols and unnecessary characters.
- Chunking & Embedding: Split long articles into smaller, manageable chunks and generate embeddings for each chunk using Sentence Transformers.
- Embedding Storage: Store the generated embeddings in FAISS for efficient similarity searching.
- Question Answering: Allow users to enter questions related to news articles and convert the questions into embeddings to search for similar chunks in FAISS.
- Summarization Tool: Combine the top relevant chunks and feed them into a Large Language Model (LLM) to generate a summarized answer, using the LLM as a tool.
- Toggle Mode: Allow the user to toggle between “Ask a question” mode and “Summarize today’s news” mode.

## Style Guidelines:

- Primary color: Deep blue (#293B5F) to convey trust and reliability, reflecting the seriousness of news.
- Background color: Light gray (#E9ECEF), desaturated to provide a neutral backdrop for readability.
- Accent color: Soft purple (#845EF7) for highlighting key elements and interactive components, adding a modern touch.
- Headline font: 'Space Grotesk' sans-serif for headlines, conveying a tech-focused, scientific feel. Body Font: 'Inter' for a clean, modern appearance, suitable for readability.
- Use clear and concise icons to represent different news categories (e.g., technology, business, politics).
- A clean, card-based layout to present news articles and summaries in an organized manner.
- Subtle transition animations to create a smooth and engaging user experience when loading articles and summaries.