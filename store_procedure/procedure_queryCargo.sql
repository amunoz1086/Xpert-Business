-- stored procedure listar cargos v1
DELIMITER $$
	CREATE PROCEDURE listarCargos()
		BEGIN
			SELECT COD_CARGO, CARGO FROM cargos ORDER BY COD_CARGO ASC;
		END$$
DELIMITER ;

CALL listarCargos()