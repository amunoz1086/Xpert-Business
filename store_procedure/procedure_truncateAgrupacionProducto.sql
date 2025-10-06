DELIMITER $$
	DROP PROCEDURE IF EXISTS truncateAgrupacionProducto;
	CREATE PROCEDURE truncateAgrupacionProducto()
		BEGIN
		 TRUNCATE parametrosSubProducto;           
		END$$
DELIMITER ;
CALL truncateAgrupacionProducto();