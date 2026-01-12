export const quizKeys = {
    all: ['quizzes'] as const,
  
    list: () => [...quizKeys.all, 'list'] as const,
  
    detail: (id: string) => [...quizKeys.all, 'detail', id] as const,
  };
  