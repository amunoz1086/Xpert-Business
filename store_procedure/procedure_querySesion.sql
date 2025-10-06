DELIMITER $$

DROP PROCEDURE IF EXISTS querySesion $$
CREATE PROCEDURE querySesion(
    IN pToken VARCHAR(120),
    IN pRol INT
)
BEGIN
    DECLARE userId VARCHAR(15);
	
    SELECT user_id 
    INTO userId
    FROM sessions
    WHERE token = pToken
    LIMIT 1;

    IF userId IS NULL OR userId = '' THEN
        SELECT 0 AS result;
    ELSE
        IF EXISTS(SELECT COD_PERFIL FROM perfiles_usuario WHERE USUARIO = userId AND COD_PERFIL = pRol) THEN
			SELECT 1 AS result;
        ELSE
			IF EXISTS(SELECT USUARIO, COD_PERF_PRODUCTO FROM usuario WHERE USUARIO = userId AND FIND_IN_SET(pRol, COD_PERF_PRODUCTO)) THEN
                SELECT 1 AS result;
            ELSE
                SELECT 0 AS result;
            END IF;
		END IF;
    END IF;
END$$

DELIMITER ;

-- Llamada de ejemplo
CALL querySesion('b8675dc5a048ee6693fd424cedd10c8a', 6);
