import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from '@tanstack/react-query'
import { quizService } from '../api/quizzes.service'
import type { CreateQuizPayload, Quiz } from '../api/quizzes.types'
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

export function useCreateQuiz(
	options?: UseMutationOptions<
		Quiz,
		unknown,
		CreateQuizPayload
	>
) {
	const queryClient = useQueryClient()

	return useMutation<
		Quiz,
		unknown,
		CreateQuizPayload
	>({
		mutationFn: (payload) => quizService.create(payload),

		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: quizKeys.list(),
			})

			options?.onSuccess?.(...args)
		},

		onError: (...args) => {
			options?.onError?.(...args)
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
