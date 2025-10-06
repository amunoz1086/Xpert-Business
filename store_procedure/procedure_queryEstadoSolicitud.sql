-- stored procedure queryEstadoSolicitud
DELIMITER $$
	CREATE PROCEDURE queryEstadoSolicitud(IN SOLICITUD INT)
		BEGIN
			SELECT codSolicitud, estadoAprobacion, estadoParametrizacion
            FROM estado_solicitud
            WHERE codSolicitud = SOLICITUD;
		END$$
DELIMITER ;

DROP PROCEDURE queryEstadoSolicitud;
CALL queryEstadoSolicitud(?);
CALL queryEstadoSolicitud(350);