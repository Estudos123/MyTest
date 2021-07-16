import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express'

import authConfig from '../config/auth';

interface IrequestUser extends Request{
  userId: string
};


export const  authMiddleware = async (request : IrequestUser, response: Response, next: NextFunction) => {
  
  const headers : any = request.headers
  const authHeader : String = headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' });
}

const [, token] = authHeader.split(' ');

jwt.verify(token, authConfig.secret, function(err, decoded : any) {
  if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
  
  // se tudo estiver ok, salva no request para uso posterior
  request.userId = decoded.id;
  next();
});


}