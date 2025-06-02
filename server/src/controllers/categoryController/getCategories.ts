import { Request, Response, NextFunction } from 'express'

import Category from 'models/categoryModel'
import { handleServerError } from 'utils'
import { ResBody, Category as CategoryType } from 'types'

/* ========================================================================
                                getCategories()
======================================================================== */

export const getCategories = async (
  req: Request,
  res: Response<ResBody<CategoryType[] | null>>,
  _next: NextFunction
) => {
  try {
    const categories = await Category.find().lean().exec()

    if (!categories) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        data: null,
        message: 'Resource not found.',
        success: false
      })
    }

    return res.status(200).json({
      code: 'OK',
      data: categories,
      message: 'Success.',
      success: true
    })
  } catch (err) {
    return handleServerError(res, err)
  }
}
