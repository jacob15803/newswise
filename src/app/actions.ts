
'use server';

import { answerQuestionsAboutNews } from '@/ai/flows/answer-questions-about-news';
import { getArticles } from '@/lib/news-data';
import { z } from 'zod';

export interface ActionState {
  answer?: string;
  error?: string;
}

const questionSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters long.'),
});

export async function handleAskQuestion(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const validatedFields = questionSchema.safeParse({
      question: formData.get('question'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.question?.[0],
      };
    }

    const { question } = validatedFields.data;
    const articles = getArticles();
    const articleChunks = articles.map(
      (article) => `Article: ${article.headline}\nContent: ${article.content}`
    );

    const result = await answerQuestionsAboutNews({ question, articleChunks });

    if (!result.answer) {
      return { error: 'The AI could not generate an answer.' };
    }

    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function handleSummarizeNews(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const articles = getArticles();
    const articleChunks = articles.map(
      (article) => `Article: ${article.headline}\nContent: ${article.content}`
    );
    const question = "Provide a concise summary of today's news based on these articles.";

    const result = await answerQuestionsAboutNews({ question, articleChunks });

    if (!result.answer) {
      return { error: 'The AI could not generate a summary.' };
    }

    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
