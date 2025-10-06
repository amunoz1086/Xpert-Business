-- stored procedure queryParametrosEfecty
DELIMITER $$
	CREATE PROCEDURE queryParametrosEfecty()
		BEGIN
			SELECT idParametrosEfecty, ParametrosEfecty FROM ParametrosEfecty;
		END$$
DELIMITER ;

DROP PROCEDURE queryParametrosEfecty;
CALL queryParametrosEfecty();
