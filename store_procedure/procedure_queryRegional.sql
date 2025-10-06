-- stored procedure listar cargos v1
DELIMITER $$
	CREATE PROCEDURE listarRegional()
		BEGIN
			SELECT COD_REGIONAL_RAD, REGIONAL_RAD FROM regional ORDER BY COD_REGIONAL_RAD ASC;
		END$$
DELIMITER ;

CALL listarRegional()