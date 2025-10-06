-- stored procedure updateJustificacionOficina
DELIMITER $$
	CREATE PROCEDURE updateJustificacionOficina (IN COD_JUST INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
		BEGIN
            UPDATE justificacionOficina AS A
			SET A.tipoJustificacionOfi = TIPO, A.permitirNegociar= PERMITIR, A.tarifaPlena = PLENA, A.cod_usu = USU
			WHERE A.idjustificacionOficina = COD_JUST;
		END$$
DELIMITER ;

DROP PROCEDURE updateJustificacionOficina;
CALL updateJustificacionOficina(?, ?, ?, ?, ?);