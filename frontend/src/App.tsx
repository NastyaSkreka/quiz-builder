import { Navigate, Route, Routes } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import QuizDetail from "./pages/QuizDetail";
import QuizList from "./pages/QuizList";

export const ROUTES = {
  ROOT: '/',
  QUIZZES: '/quizzes',
  QUIZ_DETAILS: '/quizzes/:id',
  CREATE_QUIZ: '/create',
} as const;

function App() {
	return (
	  <Routes>
      <Route
        path={ROUTES.ROOT}
        element={<Navigate to={ROUTES.QUIZZES} replace />}
      />
      <Route path={ROUTES.QUIZZES} element={<QuizList />} />
      <Route path={ROUTES.CREATE_QUIZ} element={<CreateQuiz />} />
      <Route path={ROUTES.QUIZ_DETAILS} element={<QuizDetail />} />
    </Routes>
	)
}

export default App
