-- stored procedure queryCorresponsales
DELIMITER $$
	CREATE PROCEDURE queryCorresponsales()
		BEGIN
			SELECT idcorresponsales, corresponsales, tarifaPlena, estado, ticket_promedio
			FROM corresponsales;
		END$$
DELIMITER ;

CALL queryCorresponsales();