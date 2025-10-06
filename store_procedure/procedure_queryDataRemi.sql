-- stored procedure queryDataRemi
DELIMITER $$
	CREATE PROCEDURE queryDataRemi()
		BEGIN
			SELECT contenidoRemi 
			FROM remi ORDER BY idremi DESC
			LIMIT 1;
		END$$
DELIMITER ;

CALL queryDataRemi();

