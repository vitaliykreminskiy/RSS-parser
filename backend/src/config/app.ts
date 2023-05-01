import dotenv from 'dotenv'
import path from 'path'

const rootEnvFilePath: string = path.join(__dirname, '..', '..', '.env')
dotenv.config({ path: rootEnvFilePath })

export const CONFIG = {
  PORT: 3000,

  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_HOST: process.env.DB_HOST as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,

  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: '1d',
}
