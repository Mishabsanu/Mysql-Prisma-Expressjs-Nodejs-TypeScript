import authServiceImpl from "../../frameworks/services/authServices";

const authServiceInterface = (authService: authServiceImpl) => {
  const create = authService.create;
  const verify = authService.verify;

  return {
    create,
    verify,
  };
};

type authServiceInterface = ReturnType<typeof authServiceInterface>;
export default authServiceInterface;
