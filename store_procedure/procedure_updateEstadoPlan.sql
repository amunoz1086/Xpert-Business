DELIMITER $$
	CREATE PROCEDURE updateEstadoPlanRango(IN pPlan INT, pCodPlan INT, USU CHAR(15))
		BEGIN
            DECLARE vRowAffec INT;
                        
			UPDATE rangoPlanes
			SET estadoPlan = 2, codUsu = USU
			WHERE plan = pPlan AND codPlan = pCodPlan;
            SET vRowAffec = ROW_COUNT();
            
            IF vRowAffec > 0 THEN
				SELECT 200 AS STATUS;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
            
		END$$
DELIMITER ;
DROP PROCEDURE updateEstadoPlanRango;
CALL updateEstadoPlanRango(10001, 100011, 'mapo1982');