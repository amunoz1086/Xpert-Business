-- stored procedure listar cargos v1
DELIMITER $$
	CREATE PROCEDURE listarCanal()
		BEGIN
			SELECT COD_CANAL_RAD, CANAL_RAD FROM canal ORDER BY COD_CANAL_RAD ASC;
		END$$
DELIMITER ;

CALL listarCanal()