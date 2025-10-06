-- stored procedure querypermitirNegociar
DELIMITER $$
	CREATE PROCEDURE querypermitirNegociar()
		BEGIN
			SELECT cod_permitir, descripcion FROM permitirNegociar;
		END$$
DELIMITER ;

CALL querypermitirNegociar();