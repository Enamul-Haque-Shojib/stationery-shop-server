import { z } from "zod";


export const createProductSchemaValidation = z.object({
    body: z.object({
        title: z.string().min(1, "Name is required"),
        productImgUrl: z.string({message: "Product image is required"}),
        brand: z.string().min(1, "Brand is required"),
        price: z.number().min(0, "Price must be at least 0"),
        quantity: z.number().min(0, "Quantity must be at least 0"),
        category: z.string().min(1, "Category is required"),
        description: z.string().min(1, "Description is required"),
    })
    
});
export const updateProductSchemaValidation = z.object({
    title: z.string().optional(),
    productImgUrl: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    category: z.string().optional(),
    description: z.string().optional(),   
});

export const productSchemaValidations = {
    createProductSchemaValidation,
    updateProductSchemaValidation
}