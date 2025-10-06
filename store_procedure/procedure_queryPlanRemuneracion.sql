-- stored procedure queryPlanRemuneracion
DELIMITER $$
	CREATE PROCEDURE queryPlanRemuneracion()
		BEGIN
			SELECT A.idplanRemuneracion, A.planRemuneracion, 
			A.rangoInferior, A.rangoMaximo, A.tasaEA
			FROM planRemuneracion AS A
            ORDER BY A.rangoInferior ASC;
		END$$
DELIMITER ;
DROP PROCEDURE queryPlanRemuneracion;
CALL queryPlanRemuneracion();