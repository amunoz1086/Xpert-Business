-- stored procedure edit ente aprobacion
DELIMITER $$
	CREATE PROCEDURE queryUpdateEnte (IN COD INT, USU CHAR(15))
		BEGIN
			UPDATE ente_aprobacion
            SET COD_APROBADOR = COD
            WHERE USUARIO = USU;
		END$$
DELIMITER ;

DROP PROCEDURE queryUpdateEnte;
CALL queryUpdateEnte(?, ?);

CALL queryUpdateEnte(2, 'ente11');