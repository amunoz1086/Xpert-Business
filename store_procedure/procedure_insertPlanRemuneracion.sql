-- stored procedure insertPlanRemuneracion
DELIMITER $$
	CREATE PROCEDURE insertPlanRemuneracion(IN PLAN VARCHAR(25), INFERIOR DECIMAL(14,0), MAXIMO DECIMAL(14,0), TASA DECIMAL(5,2), USU VARCHAR(45))
		BEGIN
			INSERT INTO planRemuneracion (planRemuneracion, rangoInferior, rangoMaximo, tasaEA, cod_usu)
			VALUE (PLAN, INFERIOR, MAXIMO, TASA, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertPlanRemuneracion;
CALL insertPlanRemuneracion(?, ?, ?, ?, ?);

CALL insertPlanRemuneracion('PN', 1, 50000000, 0.50	, 'MAPO1982');

