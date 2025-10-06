DELIMITER $$
	CREATE PROCEDURE insertNewRango(IN pPlan INT, pCodPlan INT, pRango INT, pRangoMin BIGINT, pRangoMax BIGINT, pTasaEA DECIMAL(4,2), pFechaIni DATE, pestadoPlan INT, USU CHAR(15))
		BEGIN
			INSERT INTO rangoPlanes
			(plan, codPlan, rango, rangoMin, rangoMax, tasaEA, fechaInicial, estadoPlan, codUsu)
			VALUES
			(pPlan, pCodPlan, pRango, pRangoMin, pRangoMax, pTasaEA, pFechaIni, pestadoPlan, USU);
		END$$
DELIMITER ;
DROP PROCEDURE insertNewRango;
CALL insertNewRango(10010, 100101, 5, 100000003, 900000000, 2.00, curdate(), 1, 'mapo1982');

