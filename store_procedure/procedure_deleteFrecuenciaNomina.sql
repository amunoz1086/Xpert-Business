-- stored procedure deleteFrecuenciaNomina
DELIMITER $$
	CREATE PROCEDURE deleteFrecuenciaNomina(IN IDPN INT)
		BEGIN
			DELETE FROM frecuenciaNomina
            WHERE idfrecuenciaNomina = IDPN;
		END$$
DELIMITER ;

CALL deleteFrecuenciaNomina(?);