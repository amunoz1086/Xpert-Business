-- stored procedure insertCorresponsales
DELIMITER $$
	CREATE PROCEDURE insertCorresponsales (IN COR VARCHAR(45), PLE DECIMAL(7,1), EST INT, PRO INT, USU CHAR(15))
		BEGIN
			INSERT INTO corresponsales (corresponsales, tarifaPlena, estado, ticket_promedio, cod_usu)
			VALUES(COR, PLE, EST, PRO, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertCorresponsales;
CALL insertCorresponsales(?);