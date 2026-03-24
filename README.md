## Notivation Backend

Backend for **Notivation**, a graph-based collaborative notes platform.

### Tech Stack

- Node.js, Express.js
- PostgreSQL (`pg`)
- JWT auth, bcrypt
- Validation with `zod`
- Security: `helmet`, `cors`, `express-rate-limit`
- Logging: `morgan`

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set environment variables in `.env`:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`

3. Run database migrations:

```bash
npm run migrate
```

4. Seed example data (optional):

```bash
npm run seed
```

5. Start in development:

```bash
npm run dev
```

The server will start on `http://localhost:4000` (or your configured `PORT`).

### Testing

```bash
npm test
```

