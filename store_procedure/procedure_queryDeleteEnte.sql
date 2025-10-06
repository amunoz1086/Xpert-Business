-- stored procedure delete ente aprobacion
DELIMITER $$
	CREATE PROCEDURE queryDeleteEnte (IN USU CHAR(15))
		BEGIN
			DELETE FROM ente_aprobacion
			WHERE USUARIO = USU;
		END$$
DELIMITER ;

DROP PROCEDURE queryDeleteEnte;
CALL queryDeleteEnte(?);

CALL queryDeleteEnte('ente11');