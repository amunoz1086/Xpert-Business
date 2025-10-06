DELIMITER $$
	DROP PROCEDURE IF EXISTS insertAgrupadores;
	CREATE PROCEDURE insertAgrupadores(IN pAgrupador VARCHAR(2), pCompania INT)
		BEGIN
			INSERT INTO parametrosTipoCompania (codAgrupador, codCompania)
            VALUES
            (pAgrupador, pCompania);
		END$$
DELIMITER ;

CALL insertAgrupadores();