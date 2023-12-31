import userRepositoryImpl from "../../frameworks/database/mysql/repositores/userRepositoriesImpl";

const userRepositoryInteraface = (respository: userRepositoryImpl) => {
  const signup = respository.signup;
  const login = respository.login;
  const getByEmail = respository.getByEmail;

  return {
    signup,
    login,
    getByEmail,
  };
};
type userRepositoryInteraface = ReturnType<typeof userRepositoryInteraface>;
export default userRepositoryInteraface;
