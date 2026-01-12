import { Controller, useFieldArray, useWatch, type UseFormReturn } from 'react-hook-form'
import { Button, Card, Column, ErrorText, Input, Row } from '../styles/common'
import type { QuizFormValues } from './form/quiz.schema'
import { QuestionTypeSelect } from './select/QuestionTypeSelect'

type Props = {
	index: number
	form: UseFormReturn<QuizFormValues>
	onRemove: () => void
}

export default function QuestionEditor({ index, form, onRemove }: Props) {
	const {
		register,
		control,
		watch,
		setValue,
		formState: { errors },
	} = form

	const type = useWatch({
		control,
		name: `questions.${index}.type`,
	  })
	const questionErrors = errors.questions?.[index]

	const optionsArray = useFieldArray({
		control,
		name: `questions.${index}.options`,
	})

	return (
		<Card>
			<Column>
				<Input
					placeholder='Question text'
					hasError={!!questionErrors?.prompt}
					{...register(`questions.${index}.prompt`)}
				/>

				{questionErrors?.prompt && (
					<ErrorText>{questionErrors.prompt.message}</ErrorText>
				)}

				<Controller
					control={control}
					name={`questions.${index}.type`}
					render={({ field }) => (
						<QuestionTypeSelect
							value={field.value}
							onChange={value => {
								const prompt = watch(`questions.${index}.prompt`)

								setValue(
									`questions.${index}`,
									{
										type: value,
										prompt,
										...(value === 'TRUE_FALSE' && { correctBoolean: true }),
										...(value === 'SHORT_ANSWER' && { correctText: '' }),
										...(value === 'MULTIPLE_CHOICE' && {
											options: [{ text: '', isCorrect: false }],
										}),
									},
									{ shouldDirty: true, shouldValidate: true }
								)
							}}
						/>
					)}
				/>

				{questionErrors?.type && (
					<ErrorText>{questionErrors.type.message}</ErrorText>
				)}

				{type === 'TRUE_FALSE' && (
					<Row>
						<label>
							<input
								type='radio'
								checked={watch(`questions.${index}.correctBoolean`) === true}
								onChange={() =>
									setValue(`questions.${index}.correctBoolean`, true, {
										shouldDirty: true,
										shouldValidate: true,
									})
								}
							/>{' '}
							True
						</label>

						<label>
							<input
								type='radio'
								checked={watch(`questions.${index}.correctBoolean`) === false}
								onChange={() =>
									setValue(`questions.${index}.correctBoolean`, false, {
										shouldDirty: true,
										shouldValidate: true,
									})
								}
							/>{' '}
							False
						</label>
					</Row>
				)}

				{type === 'SHORT_ANSWER' && (
					<>
						<Input
							placeholder='Correct answer'
							hasError={!!questionErrors?.correctText}
							{...register(`questions.${index}.correctText`)}
						/>

						{questionErrors?.correctText && (
							<ErrorText>{questionErrors.correctText.message}</ErrorText>
						)}
					</>
				)}

				{type === 'MULTIPLE_CHOICE' && (
					<Column>
						{optionsArray.fields.map((opt, optIndex) => {
							const optionError = questionErrors?.options?.[optIndex]?.text

							return (
								<Column key={opt.id}>
									<Row>
										<Input
											placeholder='Option text'
											hasError={!!optionError}
											{...register(
												`questions.${index}.options.${optIndex}.text`
											)}
										/>

										<label>
											<input
												type='checkbox'
												checked={
													!!watch(
														`questions.${index}.options.${optIndex}.isCorrect`
													)
												}
												onChange={e =>
													setValue(
														`questions.${index}.options.${optIndex}.isCorrect`,
														e.target.checked,
														{ shouldDirty: true }
													)
												}
											/>
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

									{optionError && <ErrorText>{optionError.message}</ErrorText>}
								</Column>
							)
						})}

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
