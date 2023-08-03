import bcrypt from "bcryptjs";

interface PasswordOptions {
  salt?: number;
}

const authServiceImpl = (options?: PasswordOptions) => {
  const salt = options?.salt || 10;

  const create = (password: string) => {
    return bcrypt.hash(password, salt);
  };

  const verify = (passwordHash: string, password: string) => {
    return bcrypt.compare(password, passwordHash);
  };

  return {
    create,
    verify,
  };
};

type authServiceImpl = ReturnType<typeof authServiceImpl>;
export default authServiceImpl;
