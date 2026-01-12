import { Link, useParams } from 'react-router-dom'

import { useQuiz } from '../services/queries/quiz.hooks'
import {
    Button,
    Card,
    Column,
    Count,
    Page,
    Row,
    Title,
} from '../styles/common'

export default function QuizDetail() {
	const { id } = useParams<{ id: string }>()
	const { data: quiz, isLoading } = useQuiz(id)

	if (isLoading) {
		return (
			<Page>
				<div>Loading…</div>
			</Page>
		)
	}

	if (!quiz) {
		return (
			<Page>
				<div>Quiz not found</div>
			</Page>
		)
	}

	return (
		<Page>
			<Row style={{ justifyContent: 'space-between' }}>
				<Title>{quiz.title}</Title>
				<Link to="/quizzes">
					<Button variant="ghost">← Back</Button>
				</Link>
			</Row>

			<Column>
				{quiz.questions.map((q, index) => (
					<Card key={q.id}>
						<Column>
							<Row>
								<strong>
									{index + 1}. {q.prompt}
								</strong>
								<Count>{q.type}</Count>
							</Row>

							{q.type === 'TRUE_FALSE' && (
								<Count>
									Correct answer:{' '}
									<strong>
										{q.correctBoolean ? 'True' : 'False'}
									</strong>
								</Count>
							)}

							{q.type === 'SHORT_ANSWER' && (
								<Count>
									Correct answer:{' '}
									<strong>{q.correctText}</strong>
								</Count>
							)}

							{q.type === 'MULTIPLE_CHOICE' && (
								<Column>
									{q.options.map(o => (
										<Row key={o.id}>
											<span>{o.text}</span>
											{o.isCorrect && (
												<Count>✔ correct</Count>
											)}
										</Row>
									))}
								</Column>
							)}
						</Column>
					</Card>
				))}
			</Column>
		</Page>
	)
}
