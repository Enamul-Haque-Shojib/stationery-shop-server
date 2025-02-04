import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MarqueeServices } from "./MarqueeImage.services";



const createImage = catchAsync(async (req, res) => {
    const result = await MarqueeServices.createImageIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Marquee image successfully created',
      data: result,
    });
  });

const getImage = catchAsync(async (req, res) => {
    const result = await MarqueeServices.getImageFromDB();
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Marquee image successfully retrieved',
      data: result,
    });
  });

  export const MarqueeControllers = {
    createImage,
    getImage
  }