DELIMITER $$
	CREATE PROCEDURE procesoEliminarPlan(IN pPlan INT, pCoPlan CHAR(6), pPlanContingencia INT)
		BEGIN
			DECLARE vTipoPlan INT;
         DECLARE vPlan INT;
         DECLARE vVer INT;
         DECLARE vInclusion INT;
         DECLARE vRango INT;
            
         SELECT tipoPlan  INTO vTipoPlan
         FROM planes
         WHERE plan = pPlan;
            
			CALL eliminarPlan(pPlan);
            IF ROW_COUNT() > 0 THEN
				SET vplan = 1;
            END IF;
            
            CALL eliminarControlVersionPlan(pPlan, pCoPlan);
            IF ROW_COUNT() > 0 THEN
				SET vVer = 1;
            END IF;
            
            IF vTipoPlan = 1 THEN
				CALL eliminarInclusionPlan(pPlan, pCoPlan);
				IF ROW_COUNT() > 0 THEN
					SET vInclusion = 1;
				END IF;
            END IF;
            
            CALL eliminarRangoPlanes(pPlan, pCoPlan);
            IF ROW_COUNT() > 0 THEN
				SET vRango = 1;
			END IF;
            
            SELECT vPlan, vVer, vInclusion, vRango;
            
		END$$
DELIMITER ;
DROP PROCEDURE procesoEliminarPlan;
CALL procesoEliminarPlan(10002, 100021, 1)