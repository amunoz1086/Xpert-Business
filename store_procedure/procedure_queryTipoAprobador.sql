DELIMITER $$
	DROP PROCEDURE IF EXISTS queryTipoAprobador $$
    CREATE PROCEDURE queryTipoAprobador(IN USU CHAR(15))
		BEGIN
			SELECT A.COD_APROBADOR AS cod_aprobador, B.tipo_aprobador 
			FROM ente_aprobacion AS A
            JOIN tipo_aprobador AS B ON B.cod_aprobador = A.COD_APROBADOR
			WHERE A.USUARIO = USU;
		END$$
DELIMITER ;

CALL queryTipoAprobador(?);