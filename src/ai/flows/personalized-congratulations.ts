'use server';

/**
 * @fileOverview A personalized congratulatory message generator for students.
 *
 * - personalizedCongratulations - A function that generates a personalized congratulatory message based on student details.
 * - PersonalizedCongratulationsInput - The input type for the personalizedCongratulations function.
 * - PersonalizedCongratulationsOutput - The return type for the personalizedCongratulations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCongratulationsInputSchema = z.object({
  name: z.string().describe('The name of the student.'),
  dateOfJoining: z.string().describe('The date the student joined the department (YYYY-MM-DD).'),
  feesPaid: z.string().describe('The amount of fees paid by the student.'),
  department: z.string().describe('The department the student is enrolled in.'),
  trainerName: z.string().describe('The name of the trainer assigned to the student.'),
  companyName: z.string().describe('The name of the company the student is associated with.'),
});
export type PersonalizedCongratulationsInput = z.infer<typeof PersonalizedCongratulationsInputSchema>;

const PersonalizedCongratulationsOutputSchema = z.object({
  message: z.string().describe('A personalized congratulatory message for the student.'),
});
export type PersonalizedCongratulationsOutput = z.infer<typeof PersonalizedCongratulationsOutputSchema>;

export async function personalizedCongratulations(
  input: PersonalizedCongratulationsInput
): Promise<PersonalizedCongratulationsOutput> {
  return personalizedCongratulationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCongratulationsPrompt',
  input: {schema: PersonalizedCongratulationsInputSchema},
  output: {schema: PersonalizedCongratulationsOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized congratulatory messages for students.

  Based on the following student details, create a warm and motivating congratulatory message. If the student has paid a reasonable amount of fees, include an offer for mentorship opportunities or additional resources. Make the message no more than 100 words.

  Student Name: {{{name}}}
  Date of Joining: {{{dateOfJoining}}}
  Fees Paid: {{{feesPaid}}}
  Department: {{{department}}}
  Trainer Name: {{{trainerName}}}
  Company Name: {{{companyName}}}
  `,
});

const personalizedCongratulationsFlow = ai.defineFlow(
  {
    name: 'personalizedCongratulationsFlow',
    inputSchema: PersonalizedCongratulationsInputSchema,
    outputSchema: PersonalizedCongratulationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
