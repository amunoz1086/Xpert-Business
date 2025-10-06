-- stored procedure queryAprobador
DELIMITER $$
	CREATE PROCEDURE queryAprobador(IN COD INT)
		BEGIN
			SELECT A.USUARIO, B.tipo_aprobador, C.CORREO
			FROM ente_aprobacion AS A
			JOIN tipo_aprobador AS B ON B.COD_APROBADOR = A.COD_APROBADOR
			JOIN usuario AS C ON C.USUARIO = A.USUARIO
			WHERE A.COD_APROBADOR = COD
            ORDER BY rand()
            LIMIT 1;
		END$$
DELIMITER ;

DROP PROCEDURE queryAprobador;
CALL queryAprobador(?);

CALL queryAprobador(4.0);