import { useState } from 'react';
import type { QuestionType } from '../../services/api/quizzes.types';
import { Dropdown, DropdownItem, SelectButton, SelectWrapper } from './styled';

const options: { value: QuestionType; label: string }[] = [
	{ value: 'TRUE_FALSE', label: 'Boolean' },
	{ value: 'SHORT_ANSWER', label: 'Input' },
	{ value: 'MULTIPLE_CHOICE', label: 'Checkbox' },
]

export function QuestionTypeSelect({
	value,
	onChange,
}: {
	value: QuestionType
	onChange: (v: QuestionType) => void
}) {
	const [open, setOpen] = useState(false)

	return (
		<SelectWrapper>
			<SelectButton type='button' onClick={() => setOpen(o => !o)}>
				{options.find(o => o.value === value)?.label}
			</SelectButton>

			{open && (
				<Dropdown>
					{options.map(o => (
						<DropdownItem
							key={o.value}
							onClick={() => {
								onChange(o.value)
								setOpen(false)
							}}
						>
							{o.label}
						</DropdownItem>
					))}
				</Dropdown>
			)}
		</SelectWrapper>
	)
}
