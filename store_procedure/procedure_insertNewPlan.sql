DELIMITER $$
	CREATE PROCEDURE insertNewPlan(IN pDescrip VARCHAR(90), ptipoPlan INT, USU CHAR(15))
		BEGIN
			DECLARE vNewPlan INT;
            
			INSERT INTO planes
			(descripcionPlan, tipoPlan, codUsu)
			VALUES
			(pDescrip, ptipoPlan, USU);
            
            SET vNewPlan = LAST_INSERT_ID();
            CALL insertNewVersion(vNewPlan, USU);
            
		END$$
DELIMITER ;
DROP PROCEDURE insertNewPlan;
CALL insertNewPlan('PlanPrueba2', 1, 'mapo1982');