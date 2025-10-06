DELIMITER $$
	CREATE PROCEDURE queryRangoPlan(IN PLAN INT, CODPLAN INT)
		BEGIN
			SELECT A.plan, A.codPlan, A.rangoMin, A.rangoMax, A.tasaEA, A.estadoPlan
			FROM rangoPlanes AS A
			WHERE A.estadoPlan = 1 AND A.plan = PLAN AND A.codPlan = CODPLAN;
		END$$
DELIMITER ;
DROP PROCEDURE queryRangoPlan;
CALL queryRangoPlan(?, ?);
CALL queryRangoPlan(10001, 100012);