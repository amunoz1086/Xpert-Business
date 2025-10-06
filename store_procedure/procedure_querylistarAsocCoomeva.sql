-- stored procedure listarAsocCoomeva v1
DELIMITER $$
	CREATE PROCEDURE listarAsocCoomeva()
		BEGIN
			SELECT COD_ASOC, ASOC FROM asoc;
		END$$
DELIMITER ;

CALL listarAsocCoomeva()