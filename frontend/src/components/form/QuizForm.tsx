import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { useCreateQuiz } from '../../services/queries/quiz.hooks'
import { Button, Column, Input, StyledForm } from '../../styles/common'
import QuestionEditor from '../QuestionEditor'
import { quizSchema, type QuizFormValues } from './quiz.schema'

export default function QuizForm() {
	const createQuiz = useCreateQuiz()

	const form = useForm<QuizFormValues>({
		resolver: zodResolver(quizSchema),
		defaultValues: {
			title: '',
			questions: [],
		},
	})

	const { control, register, handleSubmit } = form

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questions',
	})

	const onSubmit = (data: QuizFormValues) => {
		createQuiz.mutate({
			title: data.title,
			questions: data.questions.map((q, i) => ({
				...q,
				order: i,
			})),
		})
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<Input placeholder='Quiz title' {...register('title')} />

			<Column>
				{fields.map((field, index) => (
					<QuestionEditor
						key={field.id}
						index={index}
						form={form}
						onRemove={() => remove(index)}
					/>
				))}
			</Column>

			<Button
				type='button'
				variant='ghost'
				onClick={() => append({ type: 'TRUE_FALSE', prompt: '' })}
			>
				+ Add question
			</Button>

			<Button type='submit'>Create quiz</Button>
		</StyledForm>
	)
}
