-- stored procedure updateJustificacionPse
DELIMITER $$
	CREATE PROCEDURE updateJustificacionPse (IN COD_JUST INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
		BEGIN
            UPDATE justificacionPse AS A
			SET A.tipoJustificacionPse = TIPO, A.permitirNegociar= PERMITIR, A.tarifaPlena = PLENA, A.cod_usu = USU
			WHERE A.idjustificacionPse = COD_JUST;
		END$$
DELIMITER ;

DROP PROCEDURE updateJustificacionPse;
CALL updateJustificacionPse(?, ?, ?, ?, ?);