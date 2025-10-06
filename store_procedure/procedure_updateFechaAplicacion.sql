DELIMITER $$
	CREATE PROCEDURE updateFechaAplicacion(IN pPlan INT, pCodPlan INT, pFechaAplica DATE, USU CHAR(15))
		BEGIN
            DECLARE vRowAffec INT;
                        
			UPDATE rangoPlanes
			SET fechaAplicacion = pFechaAplica, codUsu = USU
			WHERE plan = pPlan AND codPlan = pCodPlan;
            SET vRowAffec = ROW_COUNT();
            
            IF vRowAffec > 0 THEN
				SELECT 200 AS STATUS;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
            
		END$$
DELIMITER ;
DROP PROCEDURE updateFechaAplicacion;
CALL updateFechaAplicacion(10034, 100441, '2025-03-04', 'mapo1982');