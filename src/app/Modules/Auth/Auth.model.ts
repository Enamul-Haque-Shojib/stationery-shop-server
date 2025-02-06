import { model, Schema } from 'mongoose';
import { AuthStaticModel, TAuth } from './Auth.interface';
import { authRole } from './Auth.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const authSchema = new Schema<TAuth, AuthStaticModel>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: authRole,
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

authSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const auth = this; // doc
  // hashing password and save into DB
  auth.password = await bcrypt.hash(
    auth.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

authSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

authSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await AuthModel.findOne({ email }).select('+password');
};

authSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const AuthModel = model<TAuth, AuthStaticModel>('Auth', authSchema);
