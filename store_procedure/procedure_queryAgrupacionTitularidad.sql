DELIMITER $$
	DROP PROCEDURE IF EXISTS agrupacionTitularidad;
	CREATE PROCEDURE agrupacionTitularidad()
		BEGIN
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion,
    			B.codTitularidad
			FROM agrupaciones AS A
			JOIN parametrosTitularidad AS B 
				ON B.codAgrupador = A.codAgrupador;
		END$$
DELIMITER ;

CALL agrupacionTitularidad();