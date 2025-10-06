DELIMITER $$
	DROP PROCEDURE IF EXISTS queryUsuarioOficina;
	CREATE PROCEDURE queryUsuarioOficina(IN pUsuario VARCHAR(15))
		BEGIN
			SELECT A.NOMBRE, CONCAT_WS(' - ', A.COD_OFICINA, B.OFICINA) AS OFICINA
			FROM usuario AS A
			JOIN oficina AS B ON B.COD_OFICINA = A.COD_OFICINA
			WHERE usuario = pUsuario;
		END$$
DELIMITER ;

CALL queryUsuarioOficina(?);
CALL queryUsuarioOficina('aplcmvqa');