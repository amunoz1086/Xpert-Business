-- stored procedure listar oficinas v2
DELIMITER $$
	CREATE PROCEDURE listarOficinas()
		BEGIN
			SELECT COD_OFICINA, concat(COD_OFICINA, " - ", OFICINA) AS OFICINA, REGIONAL
            FROM oficina ORDER BY COD_OFICINA ASC;
		END$$
DELIMITER ;

DROP PROCEDURE listarOficinas;
CALL listarOficinas()