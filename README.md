# Welcome to Mortal Trivia!

This project is split into two main folders: client and server. Each runs independently, but the client expects the server to be running in advance.

The client is built with Next.js, Typescript, Redux, and Tailwind. The server is built with Express.js, Typescript, MongoDB, and Mongoose. Both the client and the server apps should be opened in their own Terminal window.

# server

The `server/seed` directory contains all the logic for seeding the MongoDB database, using calls to https://opentdb.com. If you're using `npm` you can simply execute `npm run seed`, as there's already a script in package.json. Alternatively, you can run `npx tsx ./seed`. If you're using `yarn`, I think (?) the command is `yarn run tsx ./seed` or `yarn dlx tsx ./seed` for Yarn 2+. **Note:** the seeding process takes a minute because it needs to work around the fact that the opentdb API rate limits at five second intervals. That said, there's helpful log messages to let you know where you're at in the process. Also if you want to dig into `seed/index.ts`, it is possible to set a limit on the number of categories to seed: `get_categories(10)`.

There's other quirks to the opentdb API such that in certain cases if you over request a number of results for a given category, it will error out and give you nothing back. In order to mitigate this, the seeding process has built-in checks to also prune the seed data prior to inserting into MongoDB. Please refer to comments in `server/seed` for more info.

The Express app depends on a few environment variables. Create a `.env` in the root of the server directory that includes:

- `NODE_ENV=development`
- `PORT=5000`
- `MONGO_URI="mongodb://localhost:27017/trivia"`

See the `server/sample.env` file. The `PORT` is important in that it should match what is specified in _client app's_ `.env`: `EXPRESS_URL=http://localhost:5000`. This is necessary to establish the client-side proxy.

Once that is set up, you should be able to do `npm install` and `npm run dev`. Then Terminal should output:

`Server listening on port 5000!`

# client

The client uses Next.js, but does not leverage server-side features like server actions, API routes, etc. Instead, it sets up a proxy in `next.config.ts` that connects to the Express app through `http://localhost:5000`. By default the client runs on `http://localhost:3000`. In order to make it work, create a `.env` in the client root with the following variable:

    EXPRESS_URL=http://localhost:5000

See the `client/sample.env`. Then just run `npm install` and `npm run dev`.
