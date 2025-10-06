-- stored procedure queryListarTipoOperacion
DELIMITER $$
	CREATE PROCEDURE queryListarTipoOperacion()
		BEGIN
			SELECT COD_OPERACION, NOMBRE FROM operacion;
		END$$
DELIMITER ;

DROP PROCEDURE queryListarTipoOperacion;
CALL queryListarTipoOperacion();