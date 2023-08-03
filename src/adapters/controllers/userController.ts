import { Request, Response } from "express";
import userRepositoryInteraface from "../../applications/repositories/userRepositoriesInter";
import userSignup from "../../applications/use-cases/signup";
import userLogin from "../../applications/use-cases/login";
import GetUtils from "../../utils/error";
import authServiceImpl from "../../frameworks/services/authServices";

const userController = (
  userRepository: userRepositoryInteraface,
  utils: GetUtils,
  authService: authServiceImpl
) => {
  const signup = async (req: Request, res: Response) => {
    try {
      const response = await userSignup(
        userRepository,
        authService,
        utils,
        req.body
      );

      res.send(response);
    } catch (error) {
      res.statusCode = error?.code ?? 500;
      res.send(error);
    }
  };

  const login = async (req: Request, res: Response) => {
    try {
      const response = await userLogin(
        userRepository,
        utils,
        authService,
        req.body
      );

      res.send(response);
    } catch (error) {
      res.statusCode = error?.code ?? 500;
      res.send(error);
    }
  };
  return {
    signup,
    login,
  };
};

export default userController;
