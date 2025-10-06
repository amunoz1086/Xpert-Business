-- stored procedure queryFrecuenciaNomina
DELIMITER $$
	CREATE PROCEDURE queryFrecuenciaNomina()
		BEGIN
			SELECT idfrecuenciaNomina, tipo, valor FROM frecuenciaNomina;
		END$$
DELIMITER ;

DROP PROCEDURE queryFrecuenciaNomina; 
CALL queryFrecuenciaNomina();