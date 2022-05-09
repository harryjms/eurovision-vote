import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  cookies.set(process.env.AUTH_TOKEN_COOKIE, null);
  res.redirect("/");
};
