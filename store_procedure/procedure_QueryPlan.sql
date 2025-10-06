DELIMITER $$
	CREATE PROCEDURE queryPlan(IN CODPLAN INT)
		BEGIN
			SELECT 
				A.plan, A.codPlan,
				B.descripcionPlan AS Nombre,
				B.tipoPlan, DATE(MAX(A.fechaInicial)) AS fechaInicial,
				DATE(B.fech_actualizacion) AS fechaUltimo,
				A.estadoPlan
			FROM rangoPlanes AS A
			JOIN planes AS B ON A.plan = B.plan
			WHERE A.estadoPlan = 1 AND A.plan = CODPLAN
			GROUP BY A.plan;
		END$$
DELIMITER ;
DROP PROCEDURE queryPlan;
CALL queryPlan(?);
CALL queryPlan(10002);