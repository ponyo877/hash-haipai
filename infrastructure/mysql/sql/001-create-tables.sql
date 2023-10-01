CREATE TABLE IF NOT EXISTS mahjong.haipai (
    id         VARCHAR(8)   NOT NULL,
    haipai     VARCHAR(41)  NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE INDEX idx_created_at ON mahjong.haipai (created_at);