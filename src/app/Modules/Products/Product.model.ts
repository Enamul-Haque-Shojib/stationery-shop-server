import { model, Schema } from 'mongoose';
import { TOrderProduct, TProduct } from './Product.interface';

const orderProductSchema = new Schema<TOrderProduct>(
  {
   
    productTitle: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default:0
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    approveOrder: {
      type: String,
      enum: ['Pending', 'Shipping', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

const productSchema = new Schema<TProduct>(
  {
   
    title: {
      type: String,
      required: true,
    },
    productImgUrl: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
    inStock: {
      type: Boolean,
      default: true,
    },
    
  },
  {
    timestamps: true,
  },
);


export const ProductModel = model<TProduct>(
  'Product',
  productSchema,
);
export const OrderProductModel = model<TOrderProduct>(
  'Order Product',
  orderProductSchema,
);
