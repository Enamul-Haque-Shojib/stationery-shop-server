import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import {
  orderSearchableField,
  productSearchableField,
} from './Product.constatnt';
import { TOrderProduct, TProduct } from './Product.interface';
import { OrderProductModel, ProductModel } from './Product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const createProduct = await ProductModel.create(payload);
  if (!createProduct) {
    throw new AppError(400, 'Failed to create Product');
  }

  return createProduct;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const updateProductInfo = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updateProductInfo) {
    throw new AppError(400, 'Failed to update Product');
  }

  return updateProductInfo;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search(productSearchableField)
    .sortAndOrder()
    .filter();
  const result = productQuery.modelQuery;

  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const singleProductInfo = await ProductModel.findById(id);
  return singleProductInfo;
};

const deleteSingleProductFromDB = async (id: string) => {
  const deleteProductInfo = await ProductModel.findByIdAndDelete(id);
  return deleteProductInfo;
};

const orderStatusChangeIntoDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const updatedParcel = await OrderProductModel.findByIdAndUpdate(
    id,
    {
      $set: payload,
    },
    { new: true, runValidators: true },
  );

  if (!updatedParcel) {
    throw new AppError(400, 'order could not be changed');
  }

  return updatedParcel;
};



const createOrderProductFromDB = async (payload: TOrderProduct) => {
  
  const productData = await ProductModel.findOne({
    title: payload.productTitle,
    category: payload.productCategory,
  });

  if (!productData) {
    throw new AppError(400, 'Failed to find product');
  }


  if (payload.quantity > productData.quantity) {
    throw new AppError(400, 'Not enough stock available');
  }


  const quantityNum = productData.quantity - payload.quantity;


  await ProductModel.updateOne(
    { _id: productData._id },
    {
      quantity: quantityNum,
      inStock: quantityNum > 0, 
    },
  );

 
  const orderProductInfo = await OrderProductModel.create(payload);

  if (!orderProductInfo) {
    throw new AppError(400, 'Failed to create order');
  }

  return orderProductInfo;
};

const OrderProductListFromDB = async (query: Record<string, unknown>) => {
  const orderProductList = new QueryBuilder(OrderProductModel.find(), query)
    .search(orderSearchableField)
    .sortAndOrder()
    .filter();

  if (!orderProductList) {
    throw new AppError(400, 'Failed to create order');
  }
  const result = orderProductList.modelQuery;
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  updateProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  createOrderProductFromDB,
  OrderProductListFromDB,
  orderStatusChangeIntoDB,
};
