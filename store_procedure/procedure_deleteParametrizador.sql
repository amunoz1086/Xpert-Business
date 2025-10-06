-- stored procedure delete ente Parametrizador
DELIMITER $$
	CREATE PROCEDURE queryDeleteParametrizador (IN USU CHAR(15))
		BEGIN
			DELETE FROM ente_parametrizacion
			WHERE USUARIO = USU;
		END$$
DELIMITER ;

DROP PROCEDURE queryDeleteParametrizador;
CALL queryDeleteParametrizador(?);
CALL queryDeleteParametrizador('ente11');