DELIMITER $$
	CREATE PROCEDURE updateEstadoExcluirPlan(IN PLAN INT, CODPLAN CHAR(6), IDCLIE INT, EDOIN INT, USU CHAR(15))
		BEGIN
			UPDATE inclusionPlan
			SET estadoInclusion = EDOIN, codUsu = USU
			WHERE plan = PLAN AND codPlan = CODPLAN AND idCliente = IDCLIE;
		END$$
DELIMITER ;
DROP PROCEDURE updateEstadoExcluirPlan;
CALL updateEstadoExcluirPlan(10001, 100012, 800597415, 2, 'mapo1986');