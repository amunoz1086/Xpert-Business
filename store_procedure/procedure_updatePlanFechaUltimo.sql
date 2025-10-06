DELIMITER $$
	CREATE PROCEDURE updatePlanFechaUltimo(IN pPlan INT, USU CHAR(15))
		BEGIN
            DECLARE vRowAffec INT;
                        
			UPDATE planes
			SET codUsu = USU
			WHERE plan = pPlan;
            SET vRowAffec = ROW_COUNT();
            
            IF vRowAffec > 0 THEN
				SELECT 200 AS STATUS;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
            
		END$$
DELIMITER ;
DROP PROCEDURE updatePlanFechaUltimo;
CALL updatePlanFechaUltimo(10002, 'mapo198');