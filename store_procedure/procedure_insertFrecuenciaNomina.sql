-- stored procedure insertFrecuenciaNomina
DELIMITER $$
	CREATE PROCEDURE insertFrecuenciaNomina(IN TIPO VARCHAR(45), USU VARCHAR(45))
		BEGIN
			INSERT INTO frecuenciaNomina (tipo, usuario)
			values (TIPO, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertFrecuenciaNomina;
CALL insertFrecuenciaNomina(?, ?);