-- stored procedure queryValidarSesion
DELIMITER $$
	CREATE PROCEDURE queryValidarSesion (IN USU VARCHAR(15))
		BEGIN
			SELECT A.ip_user
			FROM sessions AS A
			WHERE A.user_id = USU;
		END$$
DELIMITER ;

DROP PROCEDURE queryValidarSesion;
CALL queryValidarSesion('loja');