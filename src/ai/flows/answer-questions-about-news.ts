'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering questions about news articles.
 *
 * The flow takes a question as input and retrieves relevant news article chunks, which are then fed into a language model to generate a summarized answer.
 *
 * @interface AnswerQuestionsAboutNewsInput - The input type for the answerQuestionsAboutNews function.
 * @interface AnswerQuestionsAboutNewsOutput - The output type for the answerQuestionsAboutNews function.
 * @function answerQuestionsAboutNews - The function that handles the question answering process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionsAboutNewsInputSchema = z.object({
  question: z.string().describe('The question about the news articles.'),
  articleChunks: z.array(z.string()).describe('The relevant chunks from the news articles.'),
});
export type AnswerQuestionsAboutNewsInput = z.infer<typeof AnswerQuestionsAboutNewsInputSchema>;

const AnswerQuestionsAboutNewsOutputSchema = z.object({
  answer: z.string().describe('The summarized answer to the question.'),
});
export type AnswerQuestionsAboutNewsOutput = z.infer<typeof AnswerQuestionsAboutNewsOutputSchema>;

export async function answerQuestionsAboutNews(input: AnswerQuestionsAboutNewsInput): Promise<AnswerQuestionsAboutNewsOutput> {
  return answerQuestionsAboutNewsFlow(input);
}

const answerQuestionsAboutNewsPrompt = ai.definePrompt({
  name: 'answerQuestionsAboutNewsPrompt',
  input: {schema: AnswerQuestionsAboutNewsInputSchema},
  output: {schema: AnswerQuestionsAboutNewsOutputSchema},
  prompt: `You are a helpful assistant that answers questions about news articles.  Use the provided article chunks to answer the question as accurately and concisely as possible.

Question: {{{question}}}

Article Chunks:
{{#each articleChunks}}{{{this}}}
{{/each}}
`,
});

const answerQuestionsAboutNewsFlow = ai.defineFlow(
  {
    name: 'answerQuestionsAboutNewsFlow',
    inputSchema: AnswerQuestionsAboutNewsInputSchema,
    outputSchema: AnswerQuestionsAboutNewsOutputSchema,
  },
  async input => {
    const {output} = await answerQuestionsAboutNewsPrompt(input);
    return output!;
  }
);
