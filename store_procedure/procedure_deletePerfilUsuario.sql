-- stored procedure deleted Perfil usuarios v1
DELIMITER $$
	CREATE PROCEDURE deletePerfilUsuario (USU VARCHAR(45))
		BEGIN
			DELETE FROM perfiles_usuario
			WHERE USUARIO = USU;
		END$$
DELIMITER ;

DROP PROCEDURE deletePerfilUsuario;
CALL deletePerfilUsuario('usu3030');
SELECT * FROM perfiles_usuario