import { NextApiRequest, NextApiResponse } from "next";
import HTTPError from "../../helpers/HTTPError";
import { decodeToken, generateToken } from "../../helpers/jwt";
import UserHelper from "../../helpers/UserHelper";
import Cookies from "cookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET": {
        const cookies = new Cookies(req, res);
        const tokenCookie = cookies.get(process.env.AUTH_TOKEN_COOKIE);
        if (!tokenCookie) throw new HTTPError("Forbidden", 403);
        const payload = decodeToken(tokenCookie);
        res.json(payload);
        return;
      }
      default:
        throw new HTTPError("Method not allowed", 405);
    }
  } catch (err) {
    console.error(err);
    if (err instanceof HTTPError) {
      res.status(err.statusCode).send(err.message);
      return;
    }
    res.status(500).send(err.message);
  }
};
