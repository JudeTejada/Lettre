This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

---

```bash
npm run dev
# or
yarn dev
```

To connect it with a postgres database

```bash
npx prisma db push

```

Connecting with Planet scale locally

```bash

 pscale connect lettre dev --port 3301
// pscale connect lettre main --port 3302


```

To sync prisma on the client run:
```bash
npx prisma generate
```
