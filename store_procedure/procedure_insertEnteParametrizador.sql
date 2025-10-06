-- stored procedure insert Ente Parametrizador
DELIMITER $$
	CREATE PROCEDURE insertEnteParametrizador (IN COD INT, USU CHAR(15))
		BEGIN
			INSERT INTO ente_parametrizacion (COD_PARAMETRIZADOR, USUARIO)
			VALUES(COD, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertEnteParametrizador;
CALL insertEnteParametrizador(?, ?);
CALL insertEnteParametrizador('1', 'rad2')