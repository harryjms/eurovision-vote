import { NextApiRequest, NextApiResponse } from "next";
import HTTPError from "../../helpers/HTTPError";
import { generateToken } from "../../helpers/jwt";
import UserHelper from "../../helpers/UserHelper";
import Cookies from "cookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST": {
        const {
          body: { email, password },
        } = req;

        const cookies = new Cookies(req, res);

        const userHelper = new UserHelper();
        const userRecord = await userHelper.getByEmail(email);
        if (!userRecord) {
          throw new HTTPError("Unauthorised", 401);
        }

        const token = generateToken({
          id: userRecord.id,
          name: userRecord.name,
        });

        cookies.set(process.env.AUTH_TOKEN_COOKIE, token);
        res.status(200).end();

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
