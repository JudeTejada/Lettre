
# Lettre

Send a letter to someone with QR code


## Tech Stack

- Next.js
- Tailwindcss
- Prisma
- NeonDB




## Getting Started

To setup the project, create a NeonDB database and get your connection string.

Add your NeonDB connection string to your .env file:

```
DATABASE_URL=postgresql://neondb_owner:your-password@your-neon-host/neondb?sslmode=require&channel_binding=require
```

Add schema to NeonDB database

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
