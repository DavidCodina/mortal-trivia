import { Router } from 'express'
import { getCategories } from 'controllers/categoryController'

const router = Router()

router.route('/').get(getCategories)

export default router
