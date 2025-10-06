DELIMITER $$
	CREATE PROCEDURE insertIncluirEnPlan(IN PLAN INT, CODPLAN CHAR(6), IDCLIE INT, EDOIN INT, USU CHAR(15))
		BEGIN
			INSERT INTO inclusionPlan
				(plan, codPlan, idCliente, fechaNovedad, estadoInclusion, codUsu)
			VALUES
				(PLAN, CODPLAN, IDCLIE, CURDATE(), EDOIN, USU);
		END$$
DELIMITER ;
DROP PROCEDURE insertIncluirEnPlan;
CALL insertIncluirEnPlan(10001, 100012, 800597416, 1, 'mapo1982');
