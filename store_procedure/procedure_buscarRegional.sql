-- stored procedure buscarRegional
DELIMITER $$
	CREATE PROCEDURE buscarRegional(IN COD INT)
		BEGIN
			SELECT REGIONAL_RAD FROM regional
			WHERE COD_REGIONAL_RAD = COD;
		END$$
DELIMITER ;

DROP PROCEDURE buscarRegional;
CALL buscarRegional(?);
CALL buscarRegional(4);