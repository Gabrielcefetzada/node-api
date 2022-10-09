import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    verify(token.split(" ")[1], process.env.SECRET_KEY)
} catch (err) {
    return response.status(401).json({
      error: 'Unauthorized',
    });
}
  return next();
}
