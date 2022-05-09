import bcrypt from "bcrypt";

export const hashPassword = (plain: string, salt?: string) => {
  let useSalt = salt;
  if (!useSalt) {
    useSalt = bcrypt.genSaltSync(10);
  }
  const hash = bcrypt.hashSync(plain, useSalt);
  return { hash, salt: useSalt };
};

export const verifyPassword = (hash: string, plain: string) => {
  return bcrypt.compareSync(plain, hash);
};
