# ⚛️ Altus Digital Starter Kit

![Altus Digital](https://img.shields.io/badge/ALTUS%20DIGITAL-8248e5?style=for-the-badge) ![nextjs](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma) ![](https://img.shields.io/badge/ESLINT-4B32C3?style=for-the-badge&logo=eslint) ![](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## 📦 Tech stack:

**MAIN FRAMEWORK:**

- [Nextjs](https://nextjs.org/docs/getting-started) - as the main framework for building web applications.

**DATABASE:**

- [Planet-Scale](https://planetscale.com/docs) - as the database using MySQL.

**PACKAGES:**

- [Prisma](https://www.prisma.io/docs/getting-started/quickstart) - as the ORM for interacting with the database.
- [TailwindCSS](https://tailwindcss.com/) - as the utility CSS framework for styling your application.
- [NextAuth.js](https://next-auth.js.org/) - as the authentication package for implementing authentication in your application.
- [Axios](https://axios-http.com/docs/intro) - for making HTTP requests to external APIs..
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) -as the React state management library for managing the state of your application.

###  ⚠️ Requirements:

Before you can use the boilerplate structure, you must have the following tools installed on your machine:

* Node.js and npm (Node Package Manager) - v18.13.0
* Git

### ⚡️ Getting Started

To use the boilerplate structure in your project, you can follow these steps:

* Clone the boilerplate structure repository from Github using the following command:

```shell
    git clone git@github.com:altusdigital/ad-dev-boilerplate.git
```    

* Install the required dependencies using npm by running the following command:

```shell
    npm install	
```    
* Configure the database by editing the .env file located in the root directory of your project. Change the following variables to match your MySQL database configuration:

```.env
    DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```    
* Run the database migrations by running the following command:

```shell
    npx prisma db push dev
```    
* Start the development server by running the following command:

```shell 
    npm run dev
```    
* Open your web browser and navigate to http://localhost:3000 to view your application.



### HOW TO USE PRISMA AS AN ORM FOR INTERACTING WITH THE DATABASE

##### Creating Model Schema

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


##### Using Prisma Client

To use the Prisma client in your Next.js project, import it in your code and use the generated functions to interact with the database. For example, to create a new user in the database, you can use the following code:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const newUser = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
})

const users = await prisma.user.findMany()
```

### HOW TO CREATE PAGES, LAYOUT AND COMPONENTS

#### Server and Client Components

Server Components - All components inside the app directory are React Server Components by default, including special files and colocated components. This allows you to automatically adopt Server Components with no extra work, and achieve great performance out of the box

Client Components -  enable you to add client-side interactivity to your application. In Next.js, they are pre-rendered on the server and hydrated on the client.

A component becomes a Client Component when using the "use client" directive at the top of the file (before any imports).These components (and files) can be placed anywhere inside your application. They do not need to be in app/, specifically.

For example, you might want a components/ directory. However, the app/ directory enables you to colocate components with pages, which was not previously possible in the pages/ directory.


#### When to use Server vs. Client Components?


| What do you need to do?                                                   | Server Component | Client Component |
| -------------                                                             |:-------------:    |:-------------:|
| Fetch data. Learn more.                                                   | ✅     |  ⚠      |
| Access backend resources (directly)                                       | ✅     | ❌      |
| Keep sensitive information on the server                                  | ✅     | ❌      |
| Keep large dependencies on the server                                     | ✅     | ❌      |
| Add interactivity and event listeners                                     | ❌     | ✅      |
| Use State and Lifecycle Effects                                           | ❌     | ✅      |
| Use browser-only APIs                                                     | ❌     | ✅      |
| Use custom hooks that depend on state, effects, or browser-only APIs      | ❌     | ✅      |
| Use React Class components                                                | ❌     | ✅      |

### HOW TO CREATE GLOBAL STATE VARIABLES USING ZUSTAND

#### First create a store

Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

```typescript
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
```

#### Then bind your components, and that's it!

You can use the hook anywhere, without the need of providers. Select your state and the consuming component will re-render when that state changes.

```typescript
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```
