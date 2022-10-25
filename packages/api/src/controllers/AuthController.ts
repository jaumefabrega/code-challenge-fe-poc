import { Request, Response, NextFunction } from "express";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { unauthorized } from "@hapi/boom";
import { SECRET_KEY } from "src/constants";
import users from "src/data/users.json";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  const INCORRECT_LOGIN = "Incorrect login or password";

  const user = users.find((user) => user.email === email);

  if (!user) {
    next(unauthorized(INCORRECT_LOGIN)); // async functions should pass errors to next() https://expressjs.com/en/guide/error-handling.html
  } else if (!compareSync(password, user.password)) {
    next(unauthorized(INCORRECT_LOGIN)); // // async functions should pass errors to next() https://expressjs.com/en/guide/error-handling.html
  } else {
    const { password, ...userData } = user;
    const token = jwt.sign({ userData }, SECRET_KEY, { expiresIn: "1y" });

    res.status(200).json({ token });
  }
};

export const AuthController = {
  login,
};
