import jwt from 'jsonwebtoken'

import { type JwtPayload } from '../types/JwtPayload'

export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  })
}
