-- stored procedure listar perfil v1
DELIMITER $$
	CREATE PROCEDURE listarPerfil()
		BEGIN
			SELECT COD_PERFIL, PERFIL FROM perfiles ORDER BY COD_PERFIL ASC;
		END$$
DELIMITER ;

CALL listarPerfil()