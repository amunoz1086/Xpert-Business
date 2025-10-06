--stord procedure delete Usuario
DELIMITER $$
	CREATE PROCEDURE deleteUsuario (IN id CHAR(15))
		BEGIN
    		DELETE FROM usuario WHERE USUARIO = id;
            CALL deletePerfilUsuario(id);
            CALL queryDeleteParametrizador(id);
            CALL queryDeleteEnte (id);
    	END$$
DELIMITER ;

DROP PROCEDURE deleteUsuario;
CALL deleteUsuario(?);
CALL deleteUsuario('jozc4805');