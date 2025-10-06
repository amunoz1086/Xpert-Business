DELIMITER $$
	DROP PROCEDURE IF EXISTS agrupacionTipoCompania;
	CREATE PROCEDURE agrupacionTipoCompania()
		BEGIN
			SELECT
				ROW_NUMBER() OVER (ORDER BY codAgrupador) AS id,
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			C.TIPOCLI,
    			JSON_ARRAYAGG(B.codCompania) AS codCompania
			FROM agrupaciones AS A
			JOIN parametrosTipoCompania AS B 
    			ON B.codAgrupador = A.codAgrupador
			JOIN tipo_cliente AS C
				ON C.COD_TIPO_CLIENTE = A.codTipoPersona
			GROUP BY 
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			A.codTipoPersona;
			END$$
DELIMITER ;

CALL agrupacionTipoCompania();