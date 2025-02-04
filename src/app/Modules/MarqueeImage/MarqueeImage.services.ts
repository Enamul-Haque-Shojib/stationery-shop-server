import AppError from "../../errors/AppError";
import { TMarqueeImg } from "./MarqueeImage.interface";
import { MarqueeImageModel } from "./MarqueeImage.model";


const createImageIntoDB = async (payload: TMarqueeImg) => {

 
    const createImg = await MarqueeImageModel.create(payload);
    if (!createImg) {
      throw new AppError(400, 'Failed to create MarqueeImage');
    }
  
    return createImg;
  };

const getImageFromDB = async () => {

    const getImg = await MarqueeImageModel.find();
    if (!getImg) {
      throw new AppError(400, 'Failed to get MarqueeImage');
    }
  
    return getImg;
  };

  export const MarqueeServices = {
    createImageIntoDB,
    getImageFromDB
  }