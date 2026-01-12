import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../api/quizzes.service'
import type { CreateQuizPayload } from '../api/quizzes.types'
import { quizKeys } from './quiz.keys'

export function useQuizzes() {
	return useQuery({
		queryKey: quizKeys.list(),
		queryFn: () => quizService.list(),
	})
}

export function useQuiz(id?: string) {
	return useQuery({
		queryKey: id ? quizKeys.detail(id) : [],
		queryFn: () => quizService.getById(id!),
		enabled: !!id,
	})
}

export function useCreateQuiz() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (payload: CreateQuizPayload) => quizService.create(payload),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: quizKeys.list(),
			})
		},
	})
}

export function useDeleteQuiz() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => quizService.delete(id),

		onSuccess: (_, id) => {
			queryClient.invalidateQueries({
				queryKey: quizKeys.list(),
			})

			queryClient.removeQueries({
				queryKey: quizKeys.detail(id),
			})
		},
	})
}
