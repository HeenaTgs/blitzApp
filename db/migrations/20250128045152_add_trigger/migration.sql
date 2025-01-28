-- Drop the trigger if it already exists
DROP TRIGGER IF EXISTS after_question_update;

-- Create the trigger
CREATE TRIGGER after_question_update
AFTER UPDATE ON Question
FOR EACH ROW
BEGIN
  INSERT INTO Question (id, timestamp)
  VALUES (NEW.id, NOW());
END;
