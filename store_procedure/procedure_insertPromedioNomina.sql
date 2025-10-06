-- stored procedure insertPromedioNomina
DELIMITER $$
	CREATE PROCEDURE insertPromedioNomina(IN TIPO VARCHAR(45), USU VARCHAR(45))
		BEGIN
			INSERT INTO promedioNomina (tipo, usuario)
			values (TIPO, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertPromedioNomina;
CALL insertPromedioNomina(?, ?);