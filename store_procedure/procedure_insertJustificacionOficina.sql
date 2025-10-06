-- stored procedure insertJustificacionOficina
DELIMITER $$
	CREATE PROCEDURE insertJustificacionOficina(IN COD_GASTO INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
		BEGIN
            INSERT INTO justificacionOficina (codGastosDirectosOfi, tipoJustificacionOfi, permitirNegociar, tarifaPlena, cod_usu)
			VALUES (COD_GASTO, TIPO, PERMITIR, PLENA, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertJustificacionOficina;
CALL insertJustificacionOficina(?, ?, ?, ?, ?);
CALL queryJustificacionOficina();