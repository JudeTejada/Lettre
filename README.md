
# Lettre

Send a letter to someone with QR code


## Tech Stack

- Next.js
- Tailwindcss
- Prisma
- Planetscale




## Getting Started

To setup the project, Connect with Planetscale

Connecting with Planet scale locally

```bash
 pscale connect [database] [branch] --port 3301
```

After connecting to planetscale, paste in the url on your env file

```
DATABASE_URL=URL
```

Add schema to planetscale database

```bash
npx prisma db push

```

To sync prisma on the client run:

```bash
npx prisma generate
```

run the development server:

---

```bash
npm run dev
# or
yarn dev
```
