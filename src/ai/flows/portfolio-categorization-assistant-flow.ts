'use server';
/**
 * @fileOverview An AI assistant that suggests categories for portfolio items.
 *
 * - categorizePortfolioItem - A function that categorizes a portfolio item based on its content.
 * - PortfolioCategorizationInput - The input type for the categorizePortfolioItem function.
 * - PortfolioCategorizationOutput - The return type for the categorizePortfolioItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioCategorizationInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A description of the portfolio item, such as the event type or details about the photos/videos.'
    ),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the event, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PortfolioCategorizationInput = z.infer<
  typeof PortfolioCategorizationInputSchema
>;

const PortfolioCategorizationOutputSchema = z.object({
  categories: z
    .array(z.enum(['Wedding', 'Pre-wedding', 'Haldi', 'Ceremony', 'Birthday', 'Other']))
    .describe(
      'A list of suggested categories for the portfolio item based on its content.'
    )
    .min(1),
});
export type PortfolioCategorizationOutput = z.infer<
  typeof PortfolioCategorizationOutputSchema
>;

export async function categorizePortfolioItem(
  input: PortfolioCategorizationInput
): Promise<PortfolioCategorizationOutput> {
  return portfolioCategorizationAssistantFlow(input);
}

const portfolioCategorizationPrompt = ai.definePrompt({
  name: 'portfolioCategorizationPrompt',
  input: {schema: PortfolioCategorizationInputSchema},
  output: {schema: PortfolioCategorizationOutputSchema},
  prompt: `You are an AI assistant tasked with categorizing photography and videography portfolio items for Sagar Films Studio.
Your goal is to suggest relevant categories based on the provided description and/or image.
Choose from the following categories: 'Wedding', 'Pre-wedding', 'Haldi', 'Ceremony', 'Birthday', 'Other'.
You must select at least one category that best describes the event. If none of the specific categories fit well, use 'Other'.

Description: {{{description}}}

{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}

Please provide the categories as a JSON array of strings.`,
});

const portfolioCategorizationAssistantFlow = ai.defineFlow(
  {
    name: 'portfolioCategorizationAssistantFlow',
    inputSchema: PortfolioCategorizationInputSchema,
    outputSchema: PortfolioCategorizationOutputSchema,
  },
  async input => {
    const {output} = await portfolioCategorizationPrompt(input);
    return output!;
  }
);
