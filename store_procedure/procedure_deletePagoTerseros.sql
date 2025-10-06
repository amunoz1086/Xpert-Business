-- stored procedure deletePagoTerseros
DELIMITER $$
	CREATE PROCEDURE deletePagoTerseros(IN IDPN INT)
		BEGIN
			DELETE FROM pagoTerseros
            WHERE idpagoTerseros = IDPN;
		END$$
DELIMITER ;

CALL deletePagoTerseros(?);