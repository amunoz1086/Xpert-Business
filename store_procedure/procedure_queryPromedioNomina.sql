-- stored procedure queryPromedioNomina
DELIMITER $$
	CREATE PROCEDURE queryPromedioNomina()
		BEGIN
			SELECT idpromedioNomina, tipo FROM promedioNomina;
		END$$
DELIMITER ;

CALL queryPromedioNomina();