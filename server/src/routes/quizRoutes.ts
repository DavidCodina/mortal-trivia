import { Router } from 'express'
import { getQuiz, getQuizScore } from 'controllers/quizController'
const router = Router()

router.get('/', getQuiz)
router.post('/score', getQuizScore)

export default router
