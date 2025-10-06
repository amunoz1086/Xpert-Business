-- stored procedure insertPagoTerseros
DELIMITER $$
	CREATE PROCEDURE insertPagoTerseros(IN PAGO VARCHAR(45), TARIFA DECIMAL(7,1), USU VARCHAR(45))
		BEGIN
			INSERT INTO pagoTerseros (pagoTerseros, tarifaPlena, usuario)
			values (PAGO, TARIFA, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertPagoTerseros;
CALL insertPagoTerseros(?, ?, ?);