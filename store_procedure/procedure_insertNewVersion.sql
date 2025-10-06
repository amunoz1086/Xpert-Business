DELIMITER $$
	CREATE PROCEDURE insertNewVersion(IN pPlan INT, USU CHAR(15))
		BEGIN
			DECLARE vValVer INT;
            DECLARE vNewVer INT;
            DECLARE vNewCodPlan CHAR(6);
            DECLARE vRowAffec INT;
            
            SELECT max(version) INTO vValVer FROM controlVersionPlan WHERE plan = pPlan;
            IF isnull(vValVer) = 1 THEN
				SET vNewVer = 1;
			ELSE
				SET vNewVer = vValVer + 1;
			END IF;
            SET vNewCodPlan = CONCAT(pPlan, vNewVer);
            
			INSERT INTO controlVersionPlan
			(plan, version, codPlan, codUsu)
			VALUES
			(pPlan, vNewVer, vNewCodPlan, USU);
            SET vRowAffec = ROW_COUNT();
            
            SELECT pPlan, vNewCodPlan AS codPlan, vRowAffec;
		END$$
DELIMITER ;
DROP PROCEDURE insertNewVersion;
CALL insertNewVersion(10017, 'mapo1982');