-- stored procedure queryCorreoRadicador
DELIMITER $$
	CREATE PROCEDURE queryCorreoRadicador(IN SOLICITUD INT)
		BEGIN
			SELECT CORREO FROM usuario
            WHERE USUARIO = (SELECT ID_RADICADOR FROM solicitudes WHERE COD_SOLICITUD = SOLICITUD);
		END$$
DELIMITER ;

DROP PROCEDURE queryCorreoRadicador;
CALL queryCorreoRadicador(?);
CALL queryCorreoRadicador(350);

