-- stored procedure listarEstadoCoomeva v1
DELIMITER $$
	CREATE PROCEDURE listarEstadoCoomeva()
		BEGIN
			SELECT COD_ESTADO_ASO, ESTADO_ASO FROM estado_aso;
		END$$
DELIMITER ;

CALL listarEstadoCoomeva()