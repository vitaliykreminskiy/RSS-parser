import { Router, Request, Response } from 'express'

import { LoginCredentials, User } from '../models/User'
import { JWT } from '../lib/JWT'
import { Logger } from '../lib/Logger'

export const AuthController: Router = Router()
const LOG_TAG: string = 'Auth Controller'

AuthController.post(
  '/login',
  async (req: Request<{}, {}, LoginCredentials>, res: Response) => {
    try {
      const credentials: LoginCredentials = req.body

      if (!credentials.username || !credentials.password) {
        return res.status(400).send()
      }

      const user: User = await User.findByCredentials(credentials)

      if (!user) {
        return res.status(401).send()
      }

      const token: string = JWT.generate({ id: user.id })

      return res.json({ token })
    } catch (error: any) {
      Logger.error(LOG_TAG, error.message)

      return res.status(401).send()
    }
  }
)
