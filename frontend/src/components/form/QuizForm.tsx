import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateQuiz } from '../../services/queries/quiz.hooks'
import { Button, Column, ErrorText, Input, StyledForm } from '../../styles/common'
import QuestionEditor from '../QuestionEditor'
import SuccessModal from '../modal/SuccessModal'
import { quizSchema, type QuizFormValues } from './quiz.schema'

export default function QuizForm() {
	const navigate = useNavigate()
	const [successOpen, setSuccessOpen] = useState(false)

	const createQuiz = useCreateQuiz({
		onSuccess: () => {
			setSuccessOpen(true)
		},
	})

	const form = useForm<QuizFormValues>({
		resolver: zodResolver(quizSchema),
		defaultValues: {
			title: '',
			questions: [],
		},
	})

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  

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
		<>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Quiz title"
        hasError={!!errors.title}
        {...register('title')}
      />

      {errors.title && (
        <ErrorText>{errors.title.message}</ErrorText>
      )}


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
					onClick={() =>
						append({ type: 'TRUE_FALSE', prompt: '', correctBoolean: true })
					}
				>
					+ Add question
				</Button>

				<Button type='submit'>Create quiz</Button>
			</StyledForm>
			<SuccessModal
				open={successOpen}
				onClose={() => setSuccessOpen(false)}
				onCreateAnother={() => {
					reset()
					setSuccessOpen(false)
				}}
				onGoToList={() => navigate('/quizzes')}
			/>
		</>
	)
}
