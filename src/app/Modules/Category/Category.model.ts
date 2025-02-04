

import { model, Schema } from 'mongoose';
import { TCategory } from './Category.interface';


const categorySchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    } 
  },
  {
    timestamps: true,
  },
);


export const CategoryModel = model<TCategory>(
  'Category',
  categorySchema,
);
