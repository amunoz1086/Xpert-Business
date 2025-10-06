-- stored procedure queryParametrizador
DELIMITER $$
	CREATE PROCEDURE queryParametrizador(IN USU CHAR(15))
		BEGIN
			SELECT B.CORREO, C.CARGO
			FROM ente_parametrizacion AS A
			JOIN usuario AS B ON B.USUARIO = A.USUARIO
			JOIN cargos AS C ON C.COD_CARGO = B.COD_CARGO
			WHERE A.USUARIO = USU;
		END$$
DELIMITER ;

DROP PROCEDURE queryParametrizador;
CALL queryParametrizador(?);

CALL queryParametrizador('mapo1982');