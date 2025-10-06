-- stored procedure queryCorreoParametrizador
DELIMITER $$
	CREATE PROCEDURE queryCorreoParametrizador(IN SOLICITUD INT)
		BEGIN
			SET @ENTE = (SELECT codEnte FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC LIMIT 1);
            SET @CORREO = (SELECT CORREO FROM usuario WHERE USUARIO = @ENTE);
			CALL queryDatosCorreo(SOLICITUD, @CORREO);
		END$$
DELIMITER ;

DROP PROCEDURE queryCorreoParametrizador;
CALL queryCorreoParametrizador(223);
