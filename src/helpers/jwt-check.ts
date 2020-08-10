import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["Authorization"];
  let jwtPayload;
  
  try {
    jwtPayload = <any>jwt.verify(token, 'JWT-STR1N6');
    next();
  } catch (error) {
    res.status(401).send();
    return;
  }
  next();
};