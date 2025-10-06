-- stored procedure insertJustificacionPse
DELIMITER $$
	CREATE PROCEDURE insertJustificacionPse(IN COD_GASTO INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
		BEGIN
            INSERT INTO justificacionPse (codGastosDirectosPse, tipoJustificacionPse, permitirNegociar, tarifaPlena, cod_usu)
			VALUES (COD_GASTO, TIPO, PERMITIR, PLENA, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertJustificacionPse;
CALL insertJustificacionPse(?, ?, ?, ?, ?);
CALL queryJustificacionPse();