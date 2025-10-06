DELIMITER $$
	DROP PROCEDURE IF EXISTS insertAgrupacionTitularidad;
	CREATE PROCEDURE insertAgrupacionTitularidad(IN pAgrupador VARCHAR(2), pTitularidad CHAR(1))
		BEGIN
			UPDATE parametrosTitularidad
            SET codTitularidad = pTitularidad
			WHERE codAgrupador = pAgrupador;
		END$$
DELIMITER ;

CALL insertAgrupacionTitularidad('A4', 'I');