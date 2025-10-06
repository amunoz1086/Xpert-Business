-- stored procedure queryParametrizarCreditos
DELIMITER $$
	CREATE PROCEDURE queryParametrizarCreditos(IN SOLICITUD INT, DECISION INT, USU CHAR(15))
		BEGIN
            DECLARE ASIGNACION INT;
            DECLARE PARAMETRIZADOR CHAR(15);
            DECLARE TIPOENTE INT;
			
            SET ASIGNACION = (SELECT A.idasignacion FROM asignaciones AS A
								WHERE A.codSolicitud = SOLICITUD AND codTipo = 0
								ORDER BY idasignacion DESC Limit 1);
                                
			SET PARAMETRIZADOR = (SELECT A.codEnte FROM asignaciones AS A
									WHERE A.codSolicitud = SOLICITUD AND codTipo = 0
                                    ORDER BY idasignacion DESC Limit 1);
		
            SET TIPOENTE = (SELECT COD_PARAMETRIZADOR FROM ente_parametrizacion
							WHERE USUARIO = PARAMETRIZADOR);
            
            IF DECISION = 1 THEN
				-- ACTUALIZAR ASIGNACION
                UPDATE asignaciones
				SET codTipo = TIPOENTE
				WHERE idasignacion = ASIGNACION;
				-- ACTUALIZAR ESTADO_ASIGANACION;
                INSERT INTO estado_asignacion (idAsignacion, codDecision, codUsuario)
				VALUES (ASIGNACION, DECISION, USU);
                -- ACTUALIZAR ESTADO_SOLICITUD;
				UPDATE estado_solicitud
				SET estadoParametrizacion = DECISION, fechaParametrizacion = NOW()
				WHERE codSolicitud = SOLICITUD;
			END IF;
		END$$
DELIMITER ;

DROP PROCEDURE queryParametrizarCreditos;
CALL queryParametrizarCreditos(?, ?, ?);
CALL queryParametrizarCreditos(114, 1, 'MAPO1982')