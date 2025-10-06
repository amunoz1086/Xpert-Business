DELIMITER $$
DROP PROCEDURE IF EXISTS insertAgrupacionRol $$
CREATE PROCEDURE insertAgrupacionRol (
	IN pGrupo VARCHAR(2),
    IN pCampo VARCHAR(10),
    IN pValor VARCHAR(255)
)
BEGIN
    DECLARE sql_query TEXT;

    SET @sql_query = CONCAT(
        'UPDATE parametrosRol SET ',
        pCampo, ' = "', pValor, '" WHERE codAgrupador = \'', pGrupo, '\''
    );

    PREPARE stmt FROM @sql_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

CALL insertAgrupacionRol('A1', 'mensaje', 'Prueba')

-----------------------
DELIMITER $$
DROP PROCEDURE IF EXISTS insertAgrupacionRol $$
CREATE PROCEDURE insertAgrupacionRol (
    IN pGrupo VARCHAR(10),
    IN pCampo VARCHAR(64),
    IN pValor VARCHAR(255)
)
BEGIN
    CASE pCampo
        WHEN 'titular' THEN UPDATE parametrosRol SET titular = pValor WHERE codAgrupador = pGrupo;
        WHEN 'firmante' THEN UPDATE parametrosRol SET firmante = pValor WHERE codAgrupador = pGrupo;
        WHEN 'secundario' THEN UPDATE parametrosRol SET secundario = pValor WHERE codAgrupador = pGrupo;
        WHEN 'cotitular' THEN UPDATE parametrosRol SET cotitular = pValor WHERE codAgrupador = pGrupo;
        WHEN 'mensaje' THEN UPDATE parametrosRol SET mensaje = pValor WHERE codAgrupador = pGrupo;
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Columna inválida';
    END CASE;
END$$
DELIMITER ;
