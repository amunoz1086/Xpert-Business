-- stored procedure listarEstadoBanco v1
DELIMITER $$
	CREATE PROCEDURE listarEstadoBanco()
		BEGIN
			SELECT COD_ESTADO_BCO, ESTADO_BCO FROM estado_bco;
		END$$
DELIMITER ;

CALL listarEstadoBanco()