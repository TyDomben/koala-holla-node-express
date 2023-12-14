-- 
-- 
-- 
-- 
DROP TABLE IF EXISTS "koalas";

CREATE TABLE "koalas" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR NOT NULL,
"gender" VARCHAR (5),
"age" INTEGER,
"ready_to_transfer" BOOLEAN, 
"notes" VARCHAR (200));

INSERT INTO "koalas"
("name",	"gender",	"age",	"ready_to_transfer",	"notes")
VALUES

('Scotty',	'M',	4,	'Y',	'Born in Guatemala'),
('Jean',	'F',	5,	'Y',	'Allergic to lots of lava'),
('Ororo',	'F',	7,	'N',	'Loves listening to Paula (Abdul)'),
('K''Leaf',	'NB',	15,	'N',	'Never refuses a treat.'),
('Charlie',	'M',	9,	'Y',	'Favorite band is Nirvana'),
('Betsy',	'F',	4,	'Y',	'Has a pet iguana');

