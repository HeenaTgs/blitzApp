DROP VIEW IF EXISTS ActiveQuestion;

CREATE VIEW ActiveQuestion AS
SELECT id, text
FROM Question