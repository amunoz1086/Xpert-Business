-- stored procedure insertParametrosEfecty
DELIMITER $$
	CREATE PROCEDURE insertParametrosEfecty(IN TIPO VARCHAR(80), USU VARCHAR(45))
		BEGIN
			INSERT INTO ParametrosEfecty (ParametrosEfecty, cod_usu)
			VALUES (TIPO, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertParametrosEfecty;
CALL insertParametrosEfecty(?, ?);