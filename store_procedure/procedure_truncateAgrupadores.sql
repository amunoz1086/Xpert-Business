DELIMITER $$
	DROP PROCEDURE IF EXISTS truncateAgrupadores;
	CREATE PROCEDURE truncateAgrupadores()
		BEGIN
		 TRUNCATE parametrosTipoCompania;           
		END$$
DELIMITER ;
CALL truncateAgrupadores();