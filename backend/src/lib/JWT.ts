import jwt from 'jsonwebtoken'
import { CONFIG } from '../config/app'

const { JWT_EXPIRES_IN, JWT_SECRET } = CONFIG

export class JWT {
  static generate(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: 'HS256',
    })
  }

  static decode(payload: any): any {
    return jwt.verify(payload, JWT_SECRET, { algorithms: ['HS256'] })
  }
}
