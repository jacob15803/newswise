'use server';

/**
 * @fileOverview A flow that summarizes the top news articles for the day.
 *
 * - summarizeTodaysNews - A function that returns a summary of the top news articles for the day.
 * - SummarizeTodaysNewsOutput - The return type for the summarizeTodaysNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTodaysNewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the top news articles for the day.'),
});
export type SummarizeTodaysNewsOutput = z.infer<typeof SummarizeTodaysNewsOutputSchema>;

export async function summarizeTodaysNews(): Promise<SummarizeTodaysNewsOutput> {
  return summarizeTodaysNewsFlow({});
}

const prompt = ai.definePrompt({
  name: 'summarizeTodaysNewsPrompt',
  output: {schema: SummarizeTodaysNewsOutputSchema},
  prompt: `Summarize the following news articles:\n\n{{articles}}`,
});

const summarizeTodaysNewsFlow = ai.defineFlow(
  {
    name: 'summarizeTodaysNewsFlow',
    inputSchema: z.object({}),
    outputSchema: SummarizeTodaysNewsOutputSchema,
  },
  async () => {
    // TODO: Implement fetching and preprocessing of news articles here.
    const articles = 'TODO: Implement fetching and preprocessing of news articles here.';

    const {output} = await prompt({articles});
    return output!;
  }
);
