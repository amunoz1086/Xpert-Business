-- stored procedure deleteGastosDirectosPse
DELIMITER $$
	CREATE PROCEDURE deleteGastosDirectosPse(IN IDPN INT)
		BEGIN
			DELETE FROM gastosDirectosPse
            WHERE idgastosDirectosPse = IDPN;
		END$$
DELIMITER ;

DROP PROCEDURE deleteGastosDirectosPse;
CALL deleteGastosDirectosPse(?);
SELECT * FROM PRICINGDB.gastosDirectosPse;