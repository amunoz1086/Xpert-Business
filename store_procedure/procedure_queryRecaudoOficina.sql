-- stored procedure queryRecaudoOficina
DELIMITER $$
	CREATE PROCEDURE queryRecaudoOficina()
		BEGIN
			SELECT idrecaudoOficina, tipoRecaudoOficina, tarifaPlena, tarifaCosto FROM recaudoOficina;
		END$$
DELIMITER ;

CALL queryRecaudoOficina();