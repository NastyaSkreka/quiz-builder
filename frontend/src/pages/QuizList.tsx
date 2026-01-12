import { Link } from 'react-router-dom'
import { useDeleteQuiz, useQuizzes } from '../services/queries/quiz.hooks'
import {
    Card,
    Count,
    EmptyState,
    IconButton,
    List,
    Page,
    QuizLink,
    Row,
    Title,
} from '../styles/common'

export default function QuizList() {
	const { data, isLoading } = useQuizzes()
	const deleteQuiz = useDeleteQuiz()

	if (isLoading) {
		return (
			<Page>
				<Title>Quizzes</Title>
				<div>Loading…</div>
			</Page>
		)
	}
	return (
		<Page>
			<Title>Quizzes</Title>

			{data?.length === 0 && <EmptyState>No quizzes created yet</EmptyState>}

			<List>
				{data?.map(quiz => (
					<Card key={quiz.id}>
						<Row>
							<Link to={`/quizzes/${quiz.id}`}>
								<QuizLink>
									{quiz.title}
									<Count>({quiz.questionCount} questions)</Count>
								</QuizLink>
							</Link>

							<IconButton
								onClick={() => deleteQuiz.mutate(quiz.id)}
								aria-label='Delete quiz'
							>
								🗑
							</IconButton>
						</Row>
					</Card>
				))}
			</List>
		</Page>
	)
}
