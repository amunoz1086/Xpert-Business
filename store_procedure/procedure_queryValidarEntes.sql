-- stored procedure queryValidarEntes
DELIMITER $$
	CREATE PROCEDURE queryValidarEntes(IN SOLICITUD INT)
		BEGIN
            DECLARE APRO INT;
            DECLARE REQUERIDAS INT;
            DECLARE ENTE CHAR(15);
            DECLARE TIPOENTE INT;
            DECLARE ENTES_ATRIBUCION VARCHAR(30);
            DECLARE NAPRO INT;
            DECLARE PARAMETRIZADOR CHAR(15);
            DECLARE RADICADOR CHAR(15);
            
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
            
            SET PARAMETRIZADOR = (SELECT USUARIO AS COD_PARAMETRIZADOR FROM ente_parametrizacion WHERE USUARIO = (SELECT JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR'))
									FROM solicitudes AS A 
									WHERE COD_SOLICITUD = SOLICITUD));
                                    
			SET RADICADOR = (SELECT USUARIO FROM usuario 
								WHERE USUARIO = (SELECT ID_RADICADOR FROM solicitudes WHERE COD_SOLICITUD = SOLICITUD));
                                    
			IF (APRO + 1) < REQUERIDAS THEN
				-- VALIDAR APROBADOR;
                SET NAPRO = APRO + 1;
                SET TIPOENTE = (SELECT JSON_UNQUOTE(JSON_EXTRACT(ENTES_ATRIBUCION, CONCAT('$[', NAPRO, ']'))));
                SET ENTE = (SELECT USUARIO FROM ente_aprobacion WHERE COD_APROBADOR = TIPOENTE ORDER BY RAND() LIMIT 1);
                SELECT ENTE;
			ELSE
				-- VALIDAR PARAMETRIZADOR;
                SELECT PARAMETRIZADOR, RADICADOR;
			END IF;
		END$$
DELIMITER ;

DROP PROCEDURE queryValidarEntes;
CALL queryValidarEntes(?);
CALL queryValidarEntes(41)