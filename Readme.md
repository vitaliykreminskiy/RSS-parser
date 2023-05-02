#### Summary

- **Frontend (admin app):** React.js, Webpack, Material UI, Axios (with Typescript)
- **Backend:** Node JS, Express JS, Knex, MySQL, JWT, `cron` package, `fast-xml-parser` package (with Typescript)

##### Prequisites

- Node.js engine version `17.0.0` installed
- Yarn package manager installed
- MySQL server installed
- Ports `3000` and `5000` not occupied

#### How to launch the app

##### Backend part

1. `cd` to `backend` directory
2. Create `.env` file end fill it using `.env.example` as a template
3. Run `yarn` to install dependencies
4. Run `yarn db:migrate` to launch migrations
5. Run `yarn db:seed` to launch seeds (create test user for app)
6. Run `yarn up` to start the server (default port is `3000` but it can be adjusted in `backend/config/app.ts`)

##### Frontend part

1. `cd` to `admin` directory
2. Run `yarn` to install dependencies
3. Run `yarn up` to start the server (will be launched on port `5000` if it is not occupied)

- Navigate to `localhost:5000` - you should be able to login with username: `admin` and password `admin`

##### Attention!

This app is not production ready and presented as a demonstration of basic skills. If you need production build, please let me know!

Parser job starts on server launch and parse entries once for a minute.
