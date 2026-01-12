export type QuizListItem = {
	id: string
	title: string
	questionCount: number
	createdAt: string
}

export type QuizOption = {
	id: string
	text: string
	isCorrect: boolean
}

export type QuizQuestion = {
	id: string
	type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER'
	prompt: string
	order: number
	options: QuizOption[]
	correctBoolean?: boolean | null
	correctText?: string | null
}

export type Quiz = {
	id: string
	title: string
	description?: string | null
	questions: QuizQuestion[]
}

export type CreateQuizPayload = {
	title: string
	description?: string
	questions: {
		type: QuizQuestion['type']
		prompt: string
		order: number
		options?: { text: string; isCorrect?: boolean }[]
		correctBoolean?: boolean
		correctText?: string
	}[]
}
