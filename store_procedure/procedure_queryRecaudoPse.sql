-- stored procedure queryRecaudoPse
DELIMITER $$
	CREATE PROCEDURE queryRecaudoPse()
		BEGIN
			SELECT idrecaudoPse, tipoRecaudoPse, tarifaPlena, tarifaCosto FROM recaudoPse;
		END$$
DELIMITER ;

CALL queryRecaudoPse();
select * from recaudoPse;