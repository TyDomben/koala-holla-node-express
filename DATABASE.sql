-- Drop Table to reset data values
DROP TABLE IF EXISTS "koalas";

-- Create Table 'koalas'
CREATE TABLE "koalas" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(20) NOT NULL,
"gender" VARCHAR(5),
"age" INTEGER,
"ready_to_transfer" BOOL DEFAULT FALSE, 
"notes" VARCHAR(200));

-- Insert dummy data
INSERT INTO "koalas"
("name", "gender", "age", "ready_to_transfer", "notes")
VALUES
('Scotty', 'M', 4, TRUE, 'Born in Guatemala.'),
('Jean', 'F', 5, TRUE, 'Allergic to lots of lava.'),
('Ororo', 'F', 7, FALSE, 'Loves listening to Paula (Abdul).'),
('K''Leaf',	'NB', 15, 'N', 'Never refuses a treat.'),
('Charlie',	'M', 9, TRUE, 'Favorite band is Nirvana.'),
('Betsy', 'F', 4, TRUE, 'Has a pet iguana.');

-- GET all data
SELECT * FROM "koalas";

-- POST to create a koala
INSERT INTO "koalas"
("name", "gender", "age", "ready_to_transfer", "notes")
VALUES
($1, $2, $3, $4, $5);

-- UPDATE "ready_to_transfer" to True
UPDATE "koalas" SET "ready_to_transfer" = TRUE
WHERE "id" = $1;
