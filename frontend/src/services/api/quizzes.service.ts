import { axiosInstance } from './axios'
import type { CreateQuizPayload, Quiz, QuizListItem } from './quizzes.types'

class QuizService {
	private readonly BASE_URL = '/quizzes'

	async create(payload: CreateQuizPayload): Promise<Quiz> {
		const { data } = await axiosInstance.post<Quiz>(this.BASE_URL, payload)
		return data
	}

	async list(): Promise<QuizListItem[]> {
		const { data } = await axiosInstance.get<QuizListItem[]>(this.BASE_URL)
		return data
	}

	async getById(id: string): Promise<Quiz> {
		const { data } = await axiosInstance.get<Quiz>(`${this.BASE_URL}/${id}`)
		return data
	}

	async delete(id: string): Promise<{ ok: true }> {
		const { data } = await axiosInstance.delete<{ ok: true }>(
			`${this.BASE_URL}/${id}`
		)
		return data
	}
}

export const quizService = new QuizService()
