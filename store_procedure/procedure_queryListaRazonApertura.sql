DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListaRazonApertura $$
	CREATE PROCEDURE queryListaRazonApertura()
		BEGIN
			SELECT 
				code,
				value
			FROM list_razonApertura;
		END$$
DELIMITER ;

CALL queryListaRazonApertura();