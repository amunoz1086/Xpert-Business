DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListaOrigenFondos $$
	CREATE PROCEDURE queryListaOrigenFondos()
		BEGIN
			SELECT 
				code,
				value
			FROM list_origenFondos;
		END$$
DELIMITER ;

CALL queryListaOrigenFondos();