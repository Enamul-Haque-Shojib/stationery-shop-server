import { z } from "zod";


export const createCategorySchemaValidation = z.object({
    body: z.object({
        title: z.string({message: "Title is required"}),
    })
    
    
});


export const categorySchemaValidations = {
    createCategorySchemaValidation,
    
}