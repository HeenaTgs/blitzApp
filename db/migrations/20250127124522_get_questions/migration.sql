-- prisma/migrations/[timestamp]_add_get_questions_sp.sql

CREATE PROCEDURE GetPaginatedQuestions(
    IN p_skip INT,
    IN p_take INT,
    IN p_orderDirection VARCHAR(4)
)
BEGIN
    -- Get the questions with pagination
    SELECT *
    FROM Question
    ORDER BY 
        CASE 
            WHEN p_orderDirection = 'asc' THEN id
        END ASC,
        CASE 
            WHEN p_orderDirection = 'desc' THEN id
        END DESC
    LIMIT p_skip, p_take;
    
    -- Get total count for hasMore calculation
    SELECT COUNT(*) as total FROM Question;
END;