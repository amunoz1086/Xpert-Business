-- stored procedure queryInsertAsignacion
DELIMITER $$
	CREATE PROCEDURE queryInsertAsignacion (IN SOLICITUD INT, ENTE CHAR(15), TIPOENTE INT)
		BEGIN
			INSERT INTO asignaciones (codSolicitud, codEnte, codTipo)
			VALUES (SOLICITUD, ENTE, TIPOENTE);
		END$$
DELIMITER ;

DROP PROCEDURE queryInsertAsignacion;
CALL queryInsertAsignacion(1, 2, 3);

