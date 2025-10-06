-- stored procedure insert Ente Aprobacion
DELIMITER $$
	CREATE PROCEDURE insertEnteAprobacion (IN COD INT, USU CHAR(15))
		BEGIN
			INSERT INTO ente_aprobacion (COD_APROBADOR, USUARIO)
			VALUES(COD, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertEnteAprobacion;
CALL insertEnteAprobacion(?, ?);
CALL insertEnteAprobacion(11, 'ente11')