--stord procedure query Usuario
DELIMITER $$
	CREATE PROCEDURE queryUsuario (IN id CHAR(15))
		BEGIN
    		SELECT U.USUARIO, U.NOMBRE, U.CORREO, U.COD_CARGO, U.COD_OFICINA, U.COD_REGIONAL, U.COD_CANAL,
    		P.COD_PERFIL, P.PERFIL
    		FROM usuario U
    		JOIN perfiles_usuario PU ON U.USUARIO = PU.USUARIO
    		JOIN perfiles P ON PU.COD_PERFIL = P.COD_PERFIL
    		WHERE U.USUARIO = id;
    	END$$
DELIMITER ;
DROP PROCEDURE queryUsuario;
CALL queryUsuario(?);
CALL queryUsuario('MAPO1982');