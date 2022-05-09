import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import HTTPError from "../../helpers/HTTPError";
import UserHelper from "../../helpers/UserHelper";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST": {
        const { body } = req;
        const user = await new UserHelper().create(body);
        res.json(user);
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
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          res.status(409).send("A user already uses that email");
          return;
      }
    }
    res.status(500).send(err.message);
  }
};
