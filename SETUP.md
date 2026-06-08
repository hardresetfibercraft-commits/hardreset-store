# Guide de configuration

## MySQL

1. Creer une base MySQL.
2. Importer le schema :

```bash
mysql -u shadow -p shadow < database/mysql/schema.sql
```

3. Copier `.env.example` vers `.env`, puis renseigner :

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=shadow
MYSQL_PASSWORD=change-me
MYSQL_DATABASE=shadow
ADMIN_JWT_SECRET=change-this-long-random-secret
```

4. Lancer l'API :

```bash
npm run dev:api
```

5. Lancer le frontend :

```bash
npm run dev
```

6. Aller sur `/admin`, creer le compte proprietaire, puis enregistrer la cle Tip4Serv.

Le projet n'utilise plus Supabase. La cle Tip4Serv reste cote serveur, stockee dans MySQL.

## Personnalisation de marque

Le nom, le logo, la description et les liens de menu sont tires automatiquement de votre compte Tip4Serv.

Pour les ajustements visuels :

- Palette : `tailwind.config.js`
- Favicon / image de partage : `public/`
- Image hero : `public/background.png`
