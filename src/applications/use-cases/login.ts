import getConfigs from "../../config/config";
import UserDataResponse from "../../entities/responseUser";
import GetUtils from "../../utils/error";
import userRepositoryInteraface from "../../applications/repositories/userRepositoriesInter";
import authServiceImpl from "../../frameworks/services/authServices";
export default async function userLogin(
  userRepository: userRepositoryInteraface,
  utils: GetUtils,
  authService: authServiceImpl,
  data: { email: string; password: string }
) {
  let { email, password } = data;

  if (!email) throw utils.createError(400, "email is required to login");
  if (!password) throw utils.createError(400, "password is  required to login");

  if (typeof email !== "string")
    throw utils.createError(400, "email must be a string");
  if (typeof password !== "string")
    throw utils.createError(400, "password must be a string");

  email = email?.trim();
  password = password?.trim();

  const userDataFromDatabase = await userRepository
    .getByEmail(email)
    .catch(utils.throwInternalError("error while fetching user data"));

  if (!userDataFromDatabase)
    throw utils.createError(400, "account with this email not exist");

  const passwordHashToCompare = userDataFromDatabase.password;

  const passwordMatched = await authService.verify(
    passwordHashToCompare,
    password
  );

  if (!passwordMatched)
    throw utils.createError(400, "incorrect password provided");

  const userDataResponse: UserDataResponse = {
    email: userDataFromDatabase.email,
    name: userDataFromDatabase.name,
  };
  return {
    message: "Login successful",
    userData: userDataResponse,
  };
}
