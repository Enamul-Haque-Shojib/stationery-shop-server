import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.services";


const createAuth = catchAsync(async (req, res) => {
    const result = await AuthServices.createAuthIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Auth successfully created',
      data: result,
    });

  });
const getAllAuth = catchAsync(async (req, res) => {
    const result = await AuthServices.getAllAuthIntoDB(req.query);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'get Auth successfully retrieved',
      data: result,
    });

  });

const getSingleAuth = catchAsync(async (req, res) => {
    const result = await AuthServices.getSingleAuthIntoDB(req.params.email);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'get single Auth successfully retrieved',
      data: result,
    });

  });
const manageAuth = catchAsync(async (req, res) => {
    const result = await AuthServices.manageAuthIntoDB(req.params.email, req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Auth managed successfully',
      data: result,
    });

  });



  const loginAuth = catchAsync(async (req, res) => {
    const result = await AuthServices.loginAuthIntoDB(req.body);
    const { refreshToken, accessToken } = result;
  
    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Auth is logged in succesfully!',
      data: {
        accessToken,
      },
    });
  })

export const AuthControllers = {
    createAuth,
    loginAuth,
    getAllAuth,
    getSingleAuth,
    manageAuth
}