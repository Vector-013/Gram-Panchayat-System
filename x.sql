-- Enable the pgcrypto extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Alter the table to add the new columns.
-- If you already have these columns, you can skip this step.
ALTER TABLE citizens
ADD COLUMN email VARCHAR(255) UNIQUE,
ADD COLUMN hashed_password VARCHAR(255);

-- Update existing rows:
UPDATE citizens
SET email = citizen_id::text || '@panchayat.com',
    hashed_password = crypt('OjasIsGod', gen_salt('bf'));
