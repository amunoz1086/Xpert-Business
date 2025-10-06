-- stored procedure updateDocument
DELIMITER $$
	CREATE PROCEDURE updateDocument (IN ID INT, PATHS VARCHAR(50), VALOR LONGTEXT)
		BEGIN
			SET @CLAVE = CONCAT('$.', PATHS);
            UPDATE solicitudes AS A
			SET A.DATOS_SOLICITUD = JSON_SET(DATOS_SOLICITUD, @CLAVE, VALOR) 
			WHERE COD_SOLICITUD = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updateDocument;
CALL updateDocument(?, ?, ?);