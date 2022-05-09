import { GetServerSidePropsContext } from "next";

const AuthGSSP = async (context: GetServerSidePropsContext) => {
  console.log(context);
  return {};
};
export default AuthGSSP;
