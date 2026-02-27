DELIMITER $$
	DROP PROCEDURE IF EXISTS insertAsignacionSobregiro $$
	CREATE PROCEDURE insertAsignacionSobregiro(
		IN pCLIENTID VARCHAR(255),
		IN pNCUENTA VARCHAR(255),
		IN pTSOBREGIRO VARCHAR(255), 
		IN pVIGENCIA VARCHAR(255),
		IN pMONTO DECIMAL(15,2),
		IN pFAPROBACION DATE,
		IN pFVENCIMIENTO DATE,
		IN pACTA VARCHAR(255),
		IN pUSU VARCHAR(15),
		IN pEdoSolicitud VARCHAR(255)
	)
		BEGIN
			DECLARE vClienteActa VARCHAR(20);
            DECLARE vActa VARCHAR(20);
            DECLARE vEstadoSolicitud INT;
            DECLARE vSms VARCHAR(200);
            DECLARE vAffectRows INT;
            DECLARE vState INT;
            
            -- validando existencia del acta
            SELECT acta_aprobacion_id INTO vActa
			FROM cupo_sobregiro
			WHERE acta_aprobacion_id = pACTA
            ORDER BY fech_actualizacion DESC
			LIMIT 1;
            
            IF ISNULL(vActa) THEN
				-- SET vStateClienteActa = 0;
				INSERT INTO cupo_sobregiro
					(cliente_id, numero_cuenta, tipo_sobregiro, dias_vigencia, monto, fecha_aprobacion, fecha_vencimiento, acta_aprobacion_id, usuario_radicador, fecha_solicitud_inicial, estado_solicitud)
				VALUES
					(pCLIENTID, pNCUENTA, pTSOBREGIRO, pVIGENCIA, pMONTO, pFAPROBACION, pFVENCIMIENTO, pACTA, pUSU, DATE(NOW()), pEdoSolicitud);
                
				SELECT ROW_COUNT() INTO vAffectRows;
				IF vAffectRows > 0 THEN
					SET vState = 200;
				ELSE
					SET vState = 500;
					SET vSms = 'El insert no se completo, intentelo nuevamente';
				END IF;
			ELSE
				-- validar estado de la solicitud
				SELECT estado_solicitud INTO vEstadoSolicitud
				FROM cupo_sobregiro
				WHERE cliente_id = pCLIENTID AND acta_aprobacion_id = pACTA
				ORDER BY fech_actualizacion DESC
				LIMIT 1;
                
				-- creado
				IF vEstadoSolicitud = 20 THEN
					SET vState = 400; 
					SET vSms = CONCAT('Ya existe una solicitud aprobada para el cliente con el acta N.º',' ', pACTA);
				END IF;
                
				-- pendiente
				IF vEstadoSolicitud = 40 THEN
					SET vState = 400; 
					SET vSms = CONCAT('Ya existe una solicitud pendiente para el cliente con el acta N.º', ' ', pACTA);
				END IF;
                
				-- rechazado
				IF vEstadoSolicitud = 50 THEN
					INSERT INTO cupo_sobregiro
						(cliente_id, numero_cuenta, tipo_sobregiro, dias_vigencia, monto, fecha_aprobacion, fecha_vencimiento, acta_aprobacion_id, usuario_radicador, fecha_solicitud_inicial, estado_solicitud)
					VALUES
						(pCLIENTID, pNCUENTA, pTSOBREGIRO, pVIGENCIA, pMONTO, pFAPROBACION, pFVENCIMIENTO, pACTA, pUSU, DATE(NOW()), pEdoSolicitud);
                    
					SELECT ROW_COUNT() INTO vAffectRows;
					IF vAffectRows > 0 THEN
						SET vState = 200;
					ELSE
						SET vState = 500;
						SET vSms = 'El insert no se completo, intentelo nuevamente';
					END IF;
				END IF;
                
                -- no asociado al cliente
                IF ISNULL(vEstadoSolicitud) THEN
					SET vState = 400; 
					SET vSms = CONCAT('Ya existe una solicitud creada con el acta N.º',' ', pACTA);
				END IF; 
                
			END IF;
			SELECT vState AS state, vSms AS sms;
		END$$
DELIMITER ;

CALL insertAsignacionSobregiro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);