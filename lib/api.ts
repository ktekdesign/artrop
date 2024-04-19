export const login = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  return {
    email,
    password
  };
};
