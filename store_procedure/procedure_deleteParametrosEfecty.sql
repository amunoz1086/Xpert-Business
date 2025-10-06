-- stored procedure deleteParametrosEfecty
DELIMITER $$
	CREATE PROCEDURE deleteParametrosEfecty(IN ID INT)
		BEGIN
			DELETE FROM ParametrosEfecty
            WHERE idParametrosEfecty = ID;
		END$$
DELIMITER ;

CALL deleteParametrosEfecty(?);