import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./Category.services";



const createCategory = catchAsync(async (req, res) => {
    console.log(req.body)
    const result = await CategoryServices.createCategoryIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Category successfully created',
      data: result,
    });
  });

export const CategoryControllers = {
    createCategory,
}