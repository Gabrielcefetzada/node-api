import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({
      error: 'Unauthorized',
    }); 
  }

try {
    const { sub } = verify(token.split(" ")[1], process.env.SECRET_JWT) as IPayload;
    request.user_id = sub;
} catch (err) {
    return response.status(401).json({
      error: 'Unauthorized',
    });
}
  return next();
}
