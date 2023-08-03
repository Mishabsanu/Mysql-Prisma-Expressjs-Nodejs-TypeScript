import getConfigs from "../../config/config";
import userRepositoryInteraface from "../../applications/repositories/userRepositoriesInter";
import GetUtils from "../../utils/error";
import User from "../../entities/user";
import UserDataResponse from "../../entities/responseUser";
import authServiceImpl from "../../frameworks/services/authServices";
export default async function userSignup(
  userRepository: userRepositoryInteraface,
  authService: authServiceImpl,
  utils: GetUtils,
  data: {
    name: string;
    email: string;
    password: string;
  }
) {
  if (!data?.name) throw utils.createError(400, "name is required");
  if (!data?.email) throw utils.createError(400, "email is required");
  if (!data?.password) throw utils.createError(400, "password is required");

  if (typeof data.name !== "string")
    throw utils.createError(400, "name must be a string");
  if (typeof data.email !== "string")
    throw utils.createError(400, "email must be a string");
  if (typeof data.password !== "string")
    throw utils.createError(400, "password must be a string");

  data.name = data.name.trim().toLowerCase();
  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();

  if (data.password.length < 6)
    throw utils.createError(400, "password must be at least 6 characters long");
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data?.email))
    throw utils.createError(400, "please provide a valid email");

  const existingUserData = await userRepository
    .getByEmail(data.email)
    .catch(utils.throwInternalError("faild to fetch user data"));
  if (existingUserData)
    throw utils.createError(400, "user with this email already exists");

  const hashedPassword = await authService.create(data.password.trim());

  const newUser: User = {
    name: data.name?.trim()?.toLowerCase(),
    email: data.email?.trim()?.toLowerCase(),
    password: hashedPassword,
  };

  await userRepository
    .signup(newUser)
    .catch(utils.throwInternalError("Faild to create user"));

  const userDataResponse: UserDataResponse = {
    name: newUser?.name,
    email: newUser?.email,
    password: newUser?.password,
  };

  return {
    message: "signup  successful",
    userData: userDataResponse,
  };
}
