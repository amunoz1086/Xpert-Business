DELIMITER $$
	DROP PROCEDURE IF EXISTS insertAsignacionSobregiro $$
	CREATE PROCEDURE insertAsignacionSobregiro(
		IN pCLIENTID VARCHAR(255),
		IN pNCUENTA VARCHAR(255),
		IN pTSOBREGIRO VARCHAR(255), 
		IN pVIGENCIA VARCHAR(255),
		IN pMONTO DECIMAL(10,2),
		IN pFAPROBACION DATE,
		IN pFVENCIMIENTO DATE,
		IN pACTA VARCHAR(255),
		IN pUSU VARCHAR(15),
		IN pEdoSolicitud VARCHAR(255)
	)
		BEGIN
			INSERT INTO cupo_sobregiro
			(cliente_id, numero_cuenta, tipo_sobregiro, dias_vigencia, monto, fecha_aprobacion, fecha_vencimiento, acta_aprobacion_id, usuario_radicador, fecha_solicitud_inicial, estado_solicitud)
			VALUES
			(pCLIENTID, pNCUENTA, pTSOBREGIRO, pVIGENCIA, pMONTO, pFAPROBACION, pFVENCIMIENTO, pACTA, pUSU, DATE(NOW()), pEdoSolicitud);
		END$$
DELIMITER ;


CALL insertAsignacionSobregiro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);