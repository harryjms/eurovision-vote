import { User } from "@prisma/client";
import { hashPassword } from "./password";
import { prisma } from "./prisma";

export type UserCreate = Pick<User, "email" | "name" | "password">;

export default class UserHelper {
  constructor() {}

  async create(user: UserCreate) {
    const { hash, salt } = hashPassword(user.password);
    const newUser = await prisma.user.create({
      data: { ...user, password: hash, salt },
    });
    return newUser.id;
  }

  async getByEmail(email: string) {
    return prisma.user.findFirst({
      where: { AND: [{ email }, { active: true }] },
    });
  }

  async getById(id: number) {
    return prisma.user.findFirst({
      where: { AND: [{ id }, { active: true }] },
    });
  }
}
