-- stored procedure listarPerfil
DELIMITER $$
	CREATE PROCEDURE listarPerfil()
		BEGIN
			SELECT COD_PERFIL, PERFIL
            FROM perfiles 
            ORDER BY COD_PERFIL ASC;
		END$$
DELIMITER ;

DROP PROCEDURE listarPerfil;
CALL listarPerfil();