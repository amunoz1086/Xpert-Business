-- stored procedure updateAdquirencia
DELIMITER $$
	CREATE PROCEDURE updateAdquirencia (IN ID INT, PUNTO INT, COSTO INT, USU VARCHAR(45))
		BEGIN
			UPDATE adquirencia AS A
			SET A.puntos = PUNTO, A.tarifaCosto = COSTO, A.cod_usu = USU
			WHERE A.idadquirencia = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updateAdquirencia;
CALL updateAdquirencia(?, ?, ?, ?);