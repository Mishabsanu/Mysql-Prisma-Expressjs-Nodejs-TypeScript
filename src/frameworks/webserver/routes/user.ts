import ExpressApp from "express";
import getConfigs from "../../../config/config";
import GetUtils from "../../../utils/error";
import userRepositoryInteraface from "../../../applications/repositories/userRepositoriesInter";
import userRepositoryImpl from "../../database/mysql/repositores/userRepositoriesImpl";
import userController from "../../../adapters/controllers/userController";
import authServiceImpl from "../../../frameworks/services/authServices";
export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();
  const configs = getConfigs();

  const userRepository = userRepositoryInteraface(userRepositoryImpl());
  const utils = new GetUtils();
  const authService = authServiceImpl();

  const controller = userController(userRepository, utils, authService);

  router.route("/signup").post(controller.signup);
  router.route("/login").post(controller.login);

  return router;
}
