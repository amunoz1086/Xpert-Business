DELIMITER $$
	CREATE PROCEDURE queryListarPlanes()
		BEGIN
			SELECT A.plan AS codPlan, B.descripcionPlan AS plan, B.tipoPlan AS tipo, C.descripcion AS tipoPlan, MAX(A.tasaEA) AS tasaEA, A.estadoPlan
			FROM rangoPlanes AS A
			JOIN planes AS B ON A.plan = B.plan
			JOIN tipoPlan AS C ON C.codTipoPlan = B.tipoPlan
			WHERE estadoPlan = 1
			GROUP BY A.plan
			ORDER BY A.plan ASC;
		END$$
DELIMITER ;
DROP PROCEDURE queryListarPlanes;
CALL queryListarPlanes();