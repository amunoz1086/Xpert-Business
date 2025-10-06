-- stored procedure queryEstadoEnvioParametrizador
DELIMITER $$
	CREATE PROCEDURE queryEstadoEnvioParametrizador (IN COD INT)
		BEGIN
			SELECT IF(isnull(estatusCorreo) = 1, 'false', 'true') AS statusCorreo FROM estado_solicitud WHERE codSolicitud = COD;
		END$$
DELIMITER ;

DROP PROCEDURE queryEstadoEnvioParametrizador;
CALL queryEstadoEnvioParametrizador(11);