-- stored procedure queryPagoTerseros
DELIMITER $$
	CREATE PROCEDURE queryPagoTerseros()
		BEGIN
			SELECT idpagoTerseros, pagoTerseros, tarifaPlena, tarifaCosto FROM pagoTerseros;
		END$$
DELIMITER ;

DROP PROCEDURE queryPagoTerseros;
CALL queryPagoTerseros();