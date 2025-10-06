DELIMITER $$
	DROP PROCEDURE IF EXISTS updateCupoSobregiro $$
	CREATE PROCEDURE updateCupoSobregiro (
		IN USU VARCHAR(15), 
		IN pEdoSolicitud VARCHAR(255), 
		IN pNumeroCuenta VARCHAR(255),
		IN pACTA VARCHAR(255),
		IN pObservacion VARCHAR(255)
	)
		BEGIN
			UPDATE cupo_sobregiro
			SET 
				fecha_aprobador_final = DATE(NOW()),
				usuario_aprobador = USU,
				estado_solicitud = pEdoSolicitud,
				observacion = pObservacion
			WHERE numero_cuenta = pNumeroCuenta AND acta_aprobacion_id = pACTA;
		END$$
DELIMITER ;

CALL updateCupoSobregiro('MAPO1982', 20, 10950000000018, 4, 'fecha. desfazada');