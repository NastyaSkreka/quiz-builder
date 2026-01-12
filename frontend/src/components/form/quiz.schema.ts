import { z } from 'zod'

export const QuestionTypeEnum = z.enum([
  'TRUE_FALSE',
  'SHORT_ANSWER',
  'MULTIPLE_CHOICE',
])

export const optionSchema = z.object({
  text: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean().optional(),
})

export const questionSchema = z
  .object({
    type: QuestionTypeEnum,
    prompt: z.string().min(1, 'Question text is required'),

    correctBoolean: z.boolean().optional(),
    correctText: z.string().optional(),
    options: z.array(optionSchema).optional(),
  })
  .superRefine((data, ctx) => {
   
    if (data.type === 'SHORT_ANSWER') {
      if (!data.correctText || !data.correctText.trim()) {
        ctx.addIssue({
          path: ['correctText'],
          message: 'Correct answer is required',
          code: z.ZodIssueCode.custom,
        })
      }
    }
    if (data.type === 'TRUE_FALSE') {
      if (typeof data.correctBoolean !== 'boolean') {
        ctx.addIssue({
          path: ['correctBoolean'],
          message: 'Please select True or False',
          code: z.ZodIssueCode.custom,
        })
      }
    }
    if (data.type === 'MULTIPLE_CHOICE') {
      if (!data.options || data.options.length === 0) {
        ctx.addIssue({
          path: ['options'],
          message: 'Add at least one option',
          code: z.ZodIssueCode.custom,
        })
        return
      }

      const hasCorrect = data.options.some(o => o.isCorrect)
      if (!hasCorrect) {
        ctx.addIssue({
          path: ['options'],
          message: 'Select at least one correct option',
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })

export const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
})

export type QuizFormValues = z.infer<typeof quizSchema>
