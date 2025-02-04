import AppError from "../../errors/AppError";
import { TCategory } from "./Category.interface";
import { CategoryModel } from "./Category.model";



const createCategoryIntoDB = async (payload: TCategory) => {
 
    const createCategory = await CategoryModel.create(payload);
    if (!createCategory) {
      throw new AppError(400, 'Failed to create Category');
    }
  
    return createCategory;
  };

  export const CategoryServices = {
    createCategoryIntoDB,
  }