-- stored procedure updateCorreoParametrizador
DELIMITER $$
	CREATE PROCEDURE updateCorreoParametrizador (IN COD INT, ESTADO INT)
		BEGIN
			UPDATE estado_solicitud
			SET estatusCorreo = ESTADO, fechaCorreo = now()
			WHERE codSolicitud = COD;
		END$$
DELIMITER ;

DROP PROCEDURE updateCorreoParametrizador;
CALL updateCorreoParametrizador(?,?);