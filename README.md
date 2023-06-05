# ⚛️ Altus Digital Starter Kit

![Altus Digital](https://img.shields.io/badge/ALTUS%20DIGITAL-8248e5?style=for-the-badge)
![](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![](https://img.shields.io/badge/ESLINT-4B32C3?style=for-the-badge&logo=eslint)
![](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## 📦 PRE-REQUISTES:

- **⚠️ Requirements:**

  - Node.js and npm (Node Package Manager) - v18.13.0

- **😎 VS-CODE Extension:**

  - Prettier - is an opinionated code formatter that supports a lot of different programming languages, like: JavaScript. JSON. JSX. CSS.
  - Tailwind CSS IntelliSense - is an opinionated code formatter that supports a lot of different programming languages, like: JavaScript. JSON. JSX. CSS.
  - Error Lens - is an extension which allows you to see error, warning and diagnostic messages in line with your code without having to hover or click on anything!

## 📦 Tech stack:

- **Client-Side Stack:**

  - [React](https://react.dev/) - as the Main Framework for building your application.

  - [TailwindCSS](https://tailwindcss.com/) - as the utility CSS framework for styling your application.
  - [DaisyUI](https://daisyui.com/components/) - as the Tailwind CSS component library. uses pure CSS and Tailwind utility classes, allowing developers to write clean HTML.
  - [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) -as the React state management library for managing the state of your application.
  - [React-Router-Dom](https://reactrouter.com/en/main/start/tutorial) -as the React Router Library for managing dynamic routing in your applications
  - [React-Query / Tanstack Query](https://tanstack.com/query/v3/docs/react/overview) -is a preconfigured data management library for ReactJS that allows for server-side state management, fetching, and caching of data, and error handling in a simple and declarative way without affecting the global state of the application1.
  - [Axios](https://axios-http.com/docs/intro) - for making HTTP requests to external APIs.
  - [DayJS](https://day.js.org/en/) - immutable date time library alternative to Moment.js with the same modern API

- **Server-Side Stack:**

  - [NodeJS](https://nodejs.org/api/documentation.html) - is a JavaScript runtime built on the V8 JavaScript engine.

  - [ExpressJS](https://expressjs.com/en/guide/routing.html) - is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  - [Bunyan](https://www.npmjs.com/package/bunyan) - is a logger for JavaScript with wide platform support and good facilities for structured log messages.
  - [TypeDI](https://docs.typestack.community/typedi/v/develop/01-getting-started) - is a dependency injection tool for TypeScript and JavaScript. With it you can build well-structured and easily testable applications in Node or in the browser. Main features includes: property based injection. constructor based injection.
  - [Prisma](https://www.prisma.io/docs/concepts/overview/what-is-prisma) - as the ORM for interacting the Database.
  - [Planet-Scale](https://planetscale.com/docs) - as the database using MySQL.
  - [DayJS](https://day.js.org/en/) - immutable date time library alternative to Moment.js with the same modern API

## ⚡️ Getting Started

To use the boilerplate structure in your project, you can follow these steps:

- Clone the boilerplate structure repository from Github using the following command:

```shell
    git clone git@github.com:altusdigital/ad-dev-boilerplate.git
```

- Install the required dependencies using npm by running the following command:

```shell
    npm install
```

- Configure the database by editing the .env file located in the root directory of your project. Change the following variables to match your MySQL database configuration:

```.env
    PLANETSCALE_DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

- Run the database migrations by running the following command:

```shell
    npx prisma db push dev
```

- Start the development server by running the following command on your vscode:

```shell
    Ctrl + Shift + P
```

- Enter the following commands and press enter:

```shell
    Terminals: Run
```

- Open your web browser and navigate to http://localhost:3000 to view your application.

## 🥶 How To Use Prisma

**Creating Model Schema**

To create a new model schema in your Prisma configuration file, add a new model block with the desired fields:

```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  password String
}
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

This example creates a Post model with an id, title, content, published, author, and authorId fields. It also defines a relationship between the Post and User models.

After updating the Prisma configuration file, you need to regenerate the Prisma client by running the npx prisma generate command again.

**Using Prisma Client**

To use the Prisma client in your Next.js project, import it in your code and use the generated functions to interact with the database. For example, to create a new user in the database, you can use the following code:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newUser = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
});

const users = await prisma.user.findMany();
```

## 🐻 How to Create Global-State Variables Using Zustand

_1. First create a store_

Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

```typescript
import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

_2. Then bind your components, and that's it!_

You can use the hook anywhere, without the need of providers. Select your state and the consuming component will re-render when that state changes.

```typescript
function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
```
