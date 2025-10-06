DELIMITER $$
	DROP PROCEDURE IF EXISTS agrupacionTitularidadFiltro;
	CREATE PROCEDURE agrupacionTitularidadFiltro(IN pGRUPO VARCHAR(2))
		BEGIN
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion,
    			B.codTitularidad
			FROM agrupaciones AS A
			JOIN parametrosTitularidad AS B 
				ON B.codAgrupador = A.codAgrupador
			WHERE A.codAgrupador = pGRUPO;
		END$$
DELIMITER ;

CALL agrupacionTitularidadFiltro('A1');