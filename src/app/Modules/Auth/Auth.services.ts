import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import AppError from '../../errors/AppError';
import { authSearchableField } from './Auth.constant';
import { TAuth, TLogin } from './Auth.interface';
import { AuthModel } from './Auth.model';
import { createToken, verifyToken } from './Auth.utils';

const createAuthIntoDB = async (payload: TAuth) => {
  const createAuth = await AuthModel.create(payload);
  if (!createAuth) {
    throw new AppError(400, 'Failed to create Auth');
  }

  return createAuth;
};

const getAllAuthIntoDB = async (query: Record<string, unknown>) => {
  const authQuery = new QueryBuilder(AuthModel.find(), query)
    .search(authSearchableField)
    .sortAndOrder()
    .filter();
  const result = authQuery.modelQuery;

  return result;
};
const getSingleAuthIntoDB = async (email: string) => {
  const authData = await AuthModel.findOne({ email });
  if (!authData) {
    throw new AppError(400, 'Auth not found');
  }
  return authData;
};

const manageAuthIntoDB = async (
  email: string,
  manage: { isActive: string },
) => {
  const { isActive } = manage;
  if (isActive === 'Active') {
    const updatedAuth = await AuthModel.findOneAndUpdate(
      { email },
      { isActive: true },
      { new: true },
    );
    return updatedAuth;
  } else if (isActive === 'DeActive') {
    // authData.isActive = false;
    const updatedAuth = await AuthModel.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true },
    );
    return updatedAuth;
  }
};

const loginAuthIntoDB = async (payload: TLogin) => {
  const auth = await AuthModel.isUserExistsByEmail(payload.email);

  if (!auth) {
    throw new AppError(404, 'This user is not found !');
  }

  if (!(await AuthModel.isPasswordMatched(payload?.password, auth?.password)))
    throw new AppError(403, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    email: auth.email,
    role: auth.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  
  const { email } = decoded;

  const auth = await AuthModel.isUserExistsByEmail(email);

  if (!auth) {
    throw new AppError(404, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = auth?.isActive;

  if (userStatus == false) {
    throw new AppError(403, 'This user is DeActive ! !');
  }

  const jwtPayload = {
    email: auth.email,
    role: auth.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createAuthIntoDB,
  loginAuthIntoDB,
  getAllAuthIntoDB,
  getSingleAuthIntoDB,
  manageAuthIntoDB,
  refreshToken,
};
