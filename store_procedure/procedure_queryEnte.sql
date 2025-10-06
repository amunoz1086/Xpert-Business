-- stored procedure queryEnte
DELIMITER $$
	CREATE PROCEDURE queryEnte(IN PERFIL CHAR(15), USU CHAR(15))
		BEGIN
			IF PERFIL = 'Aprobación' THEN
				SELECT COD_APROBADOR FROM ente_aprobacion WHERE USUARIO = USU;
            ELSEIF PERFIL = 'Parametrización' THEN
				SELECT COD_PARAMETRIZADOR FROM ente_parametrizacion WHERE USUARIO = USU;
            END IF;
		END$$
DELIMITER ;

DROP PROCEDURE queryEnte;
CALL queryEnte(?, ?);
CALL queryEnte('Aprobación', 'mapo1982')