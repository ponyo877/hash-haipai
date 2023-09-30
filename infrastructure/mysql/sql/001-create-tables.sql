CREATE TABLE IF NOT EXISTS haipai.haipai (
    id         VARCHAR(8)   NOT NULL,
    haipai     VARCHAR(41)  NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE INDEX idx_created_at ON haipai.haipai (created_at);