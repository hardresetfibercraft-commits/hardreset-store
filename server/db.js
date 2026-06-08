import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'shadow',
      waitForConnections: true,
      connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
      namedPlaceholders: true,
    });
  }

  return pool;
}

export async function getSetting(key) {
  const [rows] = await getPool().execute(
    'SELECT value FROM app_settings WHERE `key` = :key LIMIT 1',
    { key },
  );
  return rows[0]?.value || '';
}

export async function setSetting(key, value) {
  await getPool().execute(
    `INSERT INTO app_settings (\`key\`, value, updated_at)
     VALUES (:key, :value, NOW())
     ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = NOW()`,
    { key, value },
  );
}
