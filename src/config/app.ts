export const CONFIG = {
  PORT: Number(process.env.PORT || 3000),

  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,
}
