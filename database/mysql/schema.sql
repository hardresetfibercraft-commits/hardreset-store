CREATE TABLE IF NOT EXISTS app_owner (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  claimed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT app_owner_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_settings (
  `key` VARCHAR(191) NOT NULL PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS wishlists (
  id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(191) NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY wishlists_user_product_unique (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_stats (
  id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
  product_id INT NOT NULL UNIQUE,
  view_count INT NOT NULL DEFAULT 0,
  first_seen_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_viewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX product_stats_product_id_idx (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rcon_servers (
  id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
  map_name VARCHAR(191) NOT NULL,
  host VARCHAR(191) NOT NULL,
  rcon_port INT NOT NULL,
  rcon_password TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO rcon_servers (map_name, host, rcon_port, rcon_password, sort_order)
SELECT 'Map Ascension', '176.9.111.114', 32348, 'mogo69', 1
WHERE NOT EXISTS (SELECT 1 FROM rcon_servers WHERE map_name = 'Map Ascension');

INSERT INTO rcon_servers (map_name, host, rcon_port, rcon_password, sort_order)
SELECT 'Map Astraeos', '176.9.111.114', 32342, 'mogo69', 2
WHERE NOT EXISTS (SELECT 1 FROM rcon_servers WHERE map_name = 'Map Astraeos');

INSERT INTO rcon_servers (map_name, host, rcon_port, rcon_password, sort_order)
SELECT 'Map Extinction', '176.9.111.114', 32344, 'mogo69', 3
WHERE NOT EXISTS (SELECT 1 FROM rcon_servers WHERE map_name = 'Map Extinction');

INSERT INTO rcon_servers (map_name, host, rcon_port, rcon_password, sort_order)
SELECT 'Map Island', '176.9.111.114', 32341, 'mogo69', 4
WHERE NOT EXISTS (SELECT 1 FROM rcon_servers WHERE map_name = 'Map Island');

INSERT INTO rcon_servers (map_name, host, rcon_port, rcon_password, sort_order)
SELECT 'Map Lost Colony', '176.9.111.114', 32340, 'mogo69', 5
WHERE NOT EXISTS (SELECT 1 FROM rcon_servers WHERE map_name = 'Map Lost Colony');

INSERT INTO rcon_servers (map_name, host, rcon_port, rcon_password, sort_order)
SELECT 'Map Ragnarok', '176.9.111.114', 32338, 'mogo69', 6
WHERE NOT EXISTS (SELECT 1 FROM rcon_servers WHERE map_name = 'Map Ragnarok');

INSERT INTO rcon_servers (map_name, host, rcon_port, rcon_password, sort_order)
SELECT 'Map Valguero', '176.9.111.114', 32345, 'mogo69', 7
WHERE NOT EXISTS (SELECT 1 FROM rcon_servers WHERE map_name = 'Map Valguero');
