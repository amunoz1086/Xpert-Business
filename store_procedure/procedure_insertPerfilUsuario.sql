-- stored procedure insert Perfil usuarios v2
DELIMITER $$
	CREATE PROCEDURE insertPerfilUsuario (IN PER INT, USU VARCHAR(45))
		BEGIN
			INSERT INTO perfiles_usuario (COD_PERFIL, USUARIO)
			VALUES(PER, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertPerfilUsuario;
CALL insertPerfilUsuario('1', 'usu1040');
SELECT * FROM perfiles_usuario