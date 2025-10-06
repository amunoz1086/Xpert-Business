-- stored procedure insertNegociarNomina
DELIMITER $$
	CREATE PROCEDURE insertNegociarNomina(IN PAGO VARCHAR(45), PLENA DECIMAL(7,1), COSTO DECIMAL(7,1), CANT INT, NEGO INT, FORMULA VARCHAR(45), USU VARCHAR(45))
		BEGIN
			INSERT INTO negociarNomina (pagoNomina, tarifaPlena, tarifaCosto, cantidad, permitirNegociar, formulaCalculo, usuario)
			values (PAGO, PLENA, COSTO, CANT, NEGO, FORMULA, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertNegociarNomina;
CALL insertNegociarNomina(?, ?, ?, ?, ?, ?, ?);