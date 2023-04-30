import { NextFunction, Request, Response } from 'express'

import { JWT } from '../lib/JWT'
import { buildResponse } from '../lib/Utils'
import { User } from '../models/User'

export const JWTProtectedMiddleware = async (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization || req.headers.auth

  if (!authToken) {
    return res
      .status(401)
      .json(buildResponse(false, 'Authorization header is not provided'))
  }

  const decodedToken: { id: number } = JWT.decode(authToken)

  if (typeof decodedToken == 'object') {
    req.user = await User.find(decodedToken.id)
  } else {
    return res
      .status(401)
      .json(buildResponse(false, 'Authorization token is invalid'))
  }

  return next()
}
