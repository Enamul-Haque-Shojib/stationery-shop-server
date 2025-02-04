import { model, Schema } from "mongoose";
import { TMarqueeImg } from "./MarqueeImage.interface";


const authSchema = new Schema<TMarqueeImg>(
    {
     
      image: {
        type: String,
        required: true,
      },
   
    },
    {
      timestamps: true,
    },
  );

  export const MarqueeImageModel = model<TMarqueeImg>(
    'MarqueeImg',
    authSchema,
  );