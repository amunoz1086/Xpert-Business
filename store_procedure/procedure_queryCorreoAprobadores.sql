-- stored procedure queryCorreoAprobadores
DELIMITER $$
	CREATE PROCEDURE queryCorreoAprobadores(IN TIPOENTE INT)
		BEGIN
			SELECT JSON_ARRAYAGG(A.CORREO) AS CORREOS
			FROM usuario AS A
			JOIN ente_aprobacion AS B ON B.USUARIO = A.USUARIO
			WHERE B.COD_APROBADOR = TIPOENTE;
		END$$
DELIMITER ;

DROP PROCEDURE queryCorreoAprobadores;
CALL queryCorreoAprobadores(?);
CALL queryCorreoAprobadores(4);

