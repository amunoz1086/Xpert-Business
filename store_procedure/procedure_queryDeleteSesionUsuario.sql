-- stored procedure delete ente sesion
DELIMITER $$
	CREATE PROCEDURE queryDeleteSesionUsuario (IN USU CHAR(15))
		BEGIN
			DELETE FROM sessions
			WHERE user_id = USU;
		END$$
DELIMITER ;

DROP PROCEDURE queryDeleteSesionUsuario;
CALL queryDeleteSesionUsuario(?);