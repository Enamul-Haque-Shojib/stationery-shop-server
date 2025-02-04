import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './Product.services';


const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.file, req.body);
console.log(req.file, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product successfully created',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProductIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product successfully updated',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Product successfully retrieved',
    data: result,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products successfully retrieved',
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteSingleProductFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product successfully deleted',
    data: result,
  });
});
const createOrderProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createOrderProductFromDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product successfully ordered',
    data: result,
  });
});
const OrderProductList = catchAsync(async (req, res) => {
  const result = await ProductServices.OrderProductListFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'order Product list successfully retrieved',
    data: result,
  });
});

const orderStatusChange = catchAsync(async (req, res) => {
  const result = await ProductServices.orderStatusChangeIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Order Status changed successfully to ${req.body.status}`,
    data: result,
  });
});

export const ProductControllers = {
 createProduct,
 updateProduct,
 getAllProducts,
 getSingleProduct,
 deleteSingleProduct,
 createOrderProduct,
 OrderProductList,
 orderStatusChange,
};
