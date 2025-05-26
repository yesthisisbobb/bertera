
'use server';
/**
 * @fileOverview A Genkit flow to help users compose an initial WhatsApp message.
 *
 * - composeWhatsappMessage - A function that takes a user's query and crafts a suitable WhatsApp message.
 * - ComposeWhatsappMessageInput - The input type for the composeWhatsappMessage function.
 * - ComposeWhatsappMessageOutput - The return type for the composeWhatsappMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ComposeWhatsappMessageInputSchema = z.object({
  userQuery: z.string().describe('The user_s raw query or message they typed.'),
});
export type ComposeWhatsappMessageInput = z.infer<typeof ComposeWhatsappMessageInputSchema>;

const ComposeWhatsappMessageOutputSchema = z.object({
  composedMessage: z.string().describe('The AI-crafted message ready to be pre-filled into WhatsApp.'),
});
export type ComposeWhatsappMessageOutput = z.infer<typeof ComposeWhatsappMessageOutputSchema>;

export async function composeWhatsappMessage(input: ComposeWhatsappMessageInput): Promise<ComposeWhatsappMessageOutput> {
  return composeWhatsappMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'composeWhatsappMessagePrompt',
  input: { schema: ComposeWhatsappMessageInputSchema },
  output: { schema: ComposeWhatsappMessageOutputSchema },
  prompt: `You are an AI assistant helping users compose an initial message to send to Bertera Niaga Global (premium Indonesian coffee exporters who are "forest friends" practicing agroforestry, with their main farm at Pandaan, Pasuruan, Mt. Arjuno, and who assist with farm/warehouse visits) via WhatsApp.
Bertera Niaga Global's company registration number is AHU-015291.AH.01.30.Tahun 2025 and permit number is 1404250115108. While you won't normally include this in the user's outgoing message, it's part of your background knowledge.

The user has typed the following: "{{userQuery}}".

Based on their input, draft a polite, clear, and concise message that they can send to start the WhatsApp conversation.
The message should be from the user's perspective, directed to Bertera Niaga Global. It should incorporate the user's query naturally.
The tone should be friendly and professional. If the user's query touches upon sustainability, coffee origin, or visits, it's good to subtly acknowledge Bertera Niaga Global's agroforestry practices or visit assistance if it fits naturally.

Examples:
User query: "info on Mandheling beans"
Composed message: "Hello Bertera Niaga Global, I'm interested in learning more about your Mandheling coffee beans. Could you please share some information regarding their flavor profile, origin (I understand you practice agroforestry, which is great!), and pricing?"

User query: "I want to order 10kg Arjuno and Gayo coffee"
Composed message: "Hi Bertera Niaga Global, I'd like to inquire about placing an order for 10kg of Arjuno Arabica and 10kg of Gayo Arabica coffee. Could you let me know the process and availability for these sustainably grown coffees?"

User query: "Do you ship to Singapore?"
Composed message: "Hello, I was wondering if Bertera Niaga Global ships its agroforestry coffee products to Singapore. I'm interested in your export services."

User query: "What's the minimum order for robusta?"
Composed message: "Hi Bertera Niaga Global, I'd like to know the minimum order quantity for your Robusta coffee beans. Thank you!"

User query: "Can I visit your farm?"
Composed message: "Hello Bertera Niaga Global, I'm interested in the possibility of visiting your coffee farm, perhaps the one at the foot of Mount Arjuno, or your warehouse. Could you please provide more information on how to arrange this? I understand you practice agroforestry which sounds fascinating."

User query: "Need your company registration details."
Composed message: "Hello Bertera Niaga Global, I'm looking for information regarding your company's legal registration details for verification purposes. Could you please assist me?"

Ensure the composed message is ready to be sent and makes sense as an opening inquiry.
If the user query is very short or vague, try to formulate a gentle opening question. For example, if user query is "coffee", composed message could be "Hello Bertera Niaga Global, I'm interested in your coffee products, especially those grown with your 'forest friends' approach. Could you provide an overview of what you offer?"
`,
});

const composeWhatsappMessageFlow = ai.defineFlow(
  {
    name: 'composeWhatsappMessageFlow',
    inputSchema: ComposeWhatsappMessageInputSchema,
    outputSchema: ComposeWhatsappMessageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        // Fallback in case AI fails to generate an output, though definePrompt with output schema should handle this.
        // For safety, provide a generic message or re-throw an error.
        // Here, we'll craft a simple message with the user's query.
        console.warn("AI failed to generate composed message for WhatsApp. Using user query as fallback.");
        return { composedMessage: `Hello Bertera Niaga Global, I have a query: ${input.userQuery}` };
    }
    return output;
  }
);


    