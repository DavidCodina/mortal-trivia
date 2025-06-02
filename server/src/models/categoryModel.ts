import { Schema, model } from 'mongoose'
import { Category } from 'types'

/* ======================
       categorySchema
====================== */

const categorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  }
  // { timestamps: true }
)

export default model('Category', categorySchema)
