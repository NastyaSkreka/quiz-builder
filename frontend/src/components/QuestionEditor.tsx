import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { Button, Card, Column, Input, Row, Select } from '../styles/common'
import type { QuizFormValues } from './form/quiz.schema'

type Props = {
	index: number
	form: UseFormReturn<QuizFormValues>
	onRemove: () => void
}

export default function QuestionEditor({ index, form, onRemove }: Props) {
	const { register, control, watch } = form
	const type = watch(`questions.${index}.type`)

	const optionsArray = useFieldArray({
		control,
		name: `questions.${index}.options`,
	})

	return (
		<Card>
			<Column>
				<Input
					placeholder='Question text'
					{...register(`questions.${index}.prompt`)}
				/>

				<Select {...register(`questions.${index}.type`)}>
					<option value='TRUE_FALSE'>Boolean</option>
					<option value='SHORT_ANSWER'>Input</option>
					<option value='MULTIPLE_CHOICE'>Checkbox</option>
				</Select>

				{type === 'TRUE_FALSE' && (
					<Row>
						<label>
							<input
								type='radio'
								value='true'
								{...register(`questions.${index}.correctBoolean`, {
									setValueAs: v => v === 'true',
								})}
							/>{' '}
							True
						</label>

						<label>
							<input
								type='radio'
								value='false'
								{...register(`questions.${index}.correctBoolean`, {
									setValueAs: v => v === 'false',
								})}
							/>{' '}
							False
						</label>
					</Row>
				)}

				{type === 'SHORT_ANSWER' && (
					<Input
						placeholder='Correct answer'
						{...register(`questions.${index}.correctText`)}
					/>
				)}

				{type === 'MULTIPLE_CHOICE' && (
					<Column>
						{optionsArray.fields.map((opt, optIndex) => (
							<Row key={opt.id}>
								<Input
									placeholder='Option text'
									{...register(`questions.${index}.options.${optIndex}.text`)}
								/>
								<label>
									<input
										type='checkbox'
										{...register(
											`questions.${index}.options.${optIndex}.isCorrect`
										)}
									/>{' '}
									correct
								</label>
								<Button
									type='button'
									variant='ghost'
									onClick={() => optionsArray.remove(optIndex)}
								>
									✕
								</Button>
							</Row>
						))}

						<Button
							type='button'
							variant='ghost'
							onClick={() =>
								optionsArray.append({ text: '', isCorrect: false })
							}
						>
							+ Add option
						</Button>
					</Column>
				)}

				<Button type='button' variant='danger' onClick={onRemove}>
					Remove question
				</Button>
			</Column>
		</Card>
	)
}
