-- stored procedure queryAprobarCreditos
DELIMITER $$
	CREATE PROCEDURE queryAprobarCreditos(IN SOLICITUD INT, DECISION INT, OBSER VARCHAR(1500), USU CHAR(15))
		BEGIN
            DECLARE APRO INT;
            DECLARE REQUERIDAS INT;
            DECLARE ENTE CHAR(4);
            DECLARE TIPOENTE INT;
            DECLARE ENTES_ATRIBUCION VARCHAR(30);
            DECLARE NAPRO INT;
            DECLARE PARAMETRIZADOR CHAR(15);
            DECLARE CORREOS TEXT;
            
			SET APRO = (SELECT count(A.codSolicitud)
						FROM asignaciones AS A
						JOIN solicitudes AS B ON A.codSolicitud = B.COD_SOLICITUD
						JOIN estado_asignacion AS C ON C.idAsignacion = A.idasignacion
						WHERE A.codSolicitud = SOLICITUD AND codDecision = 1
						GROUP BY A.codSolicitud);
			
            SET APRO = (SELECT IFNULL(APRO, 0));
            
            SET ENTES_ATRIBUCION = (SELECT JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION
									FROM solicitudes AS A 
									WHERE COD_SOLICITUD = SOLICITUD);
                            
			SET REQUERIDAS = (SELECT JSON_LENGTH(ENTES_ATRIBUCION));
            
            SET PARAMETRIZADOR = (SELECT JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR')) AS COD_PARAMETRIZADOR
									FROM solicitudes AS A 
									WHERE COD_SOLICITUD = SOLICITUD);
            
            IF DECISION = 0 THEN
				-- ACTUALIZAR ESTADO_ASIGANACION;
                INSERT INTO estado_asignacion (idAsignacion, codDecision, observacion, codUsuario)
				VALUES ((SELECT idasignacion FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC Limit 1), DECISION, OBSER, USU);
                -- ACTUALIZAR ESTADO_SOLICITUD A NO APROBADOR;
                INSERT INTO estado_solicitud (codSolicitud, estadoAprobacion,fechaAprobacion, estadoParametrizacion, fechaParametrizacion)
				VALUES (SOLICITUD, DECISION, NOW(), DECISION, NOW());
                --
                SELECT 0 COD;
            ELSE
				IF (APRO + 1) < REQUERIDAS THEN
					-- ACTUALIZAR ESTADO_ASIGANACION;
                    INSERT INTO estado_asignacion (idAsignacion, codDecision, codUsuario)
					VALUES ((SELECT idasignacion FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC Limit 1), DECISION, USU);
					-- INSERTAR ASIGANCION;
                    SET NAPRO = APRO + 1;
                    SET TIPOENTE = (SELECT JSON_UNQUOTE(JSON_EXTRACT(ENTES_ATRIBUCION, CONCAT('$[', NAPRO, ']'))));
                    SET ENTE = TIPOENTE;
                    SET CORREOS = (SELECT json_arrayagg(A.CORREO) FROM usuario AS A JOIN ente_aprobacion AS B ON B.USUARIO = A.USUARIO WHERE B.COD_APROBADOR = TIPOENTE);
                    
                    CALL queryInsertAsignacion(SOLICITUD, ENTE, TIPOENTE);
                    CALL queryDatosCorreo(SOLICITUD, CORREOS);
				ELSE
					-- ACTUALIZAR ESTADO_ASIGANACION;
                    INSERT INTO estado_asignacion (idAsignacion, codDecision, codUsuario)
					VALUES ((SELECT idasignacion FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC Limit 1), DECISION, USU);
					-- ACTUALIZAR ESTADO PARAMETRIZADOR;
                    SET TIPOENTE = 0;
                    SET CORREOS = (SELECT CORREO FROM usuario WHERE USUARIO = PARAMETRIZADOR);
                    
                    CALL queryInsertAsignacion(SOLICITUD, PARAMETRIZADOR, TIPOENTE);
                    CALL queryDatosCorreo(SOLICITUD, CORREOS);
                    -- ACTUALIZAR ESTADO DE APROBACION
                    INSERT INTO estado_solicitud (codSolicitud, estadoAprobacion,fechaAprobacion)
					VALUES (SOLICITUD, DECISION, NOW());
				END IF;
			END IF;
		END$$
DELIMITER ;

DROP PROCEDURE queryAprobarCreditos;
CALL queryAprobarCreditos(?, ?, ?, ?);
CALL queryAprobarCreditos(215, 1, 'MAPO1982')