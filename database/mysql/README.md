# MySQL setup

Create a MySQL database, then run:

```bash
mysql -u shadow -p shadow < database/mysql/schema.sql
```

Set the matching values in `.env`:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=shadow
MYSQL_PASSWORD=change-me
MYSQL_DATABASE=shadow
ADMIN_JWT_SECRET=change-this-long-random-secret
```

Run the backend with:

```bash
npm run dev:api
```

Run the frontend separately with:

```bash
npm run dev
```
