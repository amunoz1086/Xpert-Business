-- stored procedure deletePromedioNomina
DELIMITER $$
	CREATE PROCEDURE deletePromedioNomina(IN IDPN INT)
		BEGIN
			DELETE FROM promedioNomina
            WHERE idpromedioNomina = IDPN;
		END$$
DELIMITER ;

CALL deletePromedioNomina(?);