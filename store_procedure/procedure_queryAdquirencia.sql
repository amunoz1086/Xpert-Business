-- stored procedure queryAdquirencia
DELIMITER $$
	CREATE PROCEDURE queryAdquirencia()
		BEGIN
			SELECT idadquirencia, tipoAdquirencia, puntos, tarifaCosto  FROM adquirencia;
		END$$
DELIMITER ;

CALL queryAdquirencia();