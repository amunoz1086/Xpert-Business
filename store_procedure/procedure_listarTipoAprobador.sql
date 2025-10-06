-- stored procedure listar tipo aprobador
DELIMITER $$
	CREATE PROCEDURE listarTipoAprobador()
		BEGIN
			SELECT cod_aprobador, tipo_aprobador FROM tipo_aprobador ORDER BY idtipo_aprobador ASC;
		END$$
DELIMITER ;

CALL listarTipoAprobador()