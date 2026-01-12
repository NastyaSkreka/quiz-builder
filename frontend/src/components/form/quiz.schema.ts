import { z } from 'zod';

export const QuestionTypeEnum = z.enum([
  'TRUE_FALSE',
  'SHORT_ANSWER',
  'MULTIPLE_CHOICE',
]);

export const optionSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean().optional(),
});

export const questionSchema = z.object({
  type: QuestionTypeEnum,
  prompt: z.string().min(1, 'Question text is required'),
  correctBoolean: z.boolean().optional(),
  correctText: z.string().optional(),
  options: z.array(optionSchema).optional(),
});

export const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export type QuizFormValues = z.infer<typeof quizSchema>;
