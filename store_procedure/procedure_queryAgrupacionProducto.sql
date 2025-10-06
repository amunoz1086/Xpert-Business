DELIMITER $$
	DROP PROCEDURE IF EXISTS agrupacionProducto;
	CREATE PROCEDURE agrupacionProducto()
		BEGIN
			SELECT 
				ROW_NUMBER() OVER (ORDER BY codAgrupador) AS id,
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			B.codProducto,
    			IF(B.codProducto = 3, '3 - CUENTA CORRIENTE', '4 - CUENTA DE AHORROS') AS Producto,
    			JSON_ARRAYAGG(C.codSubProducto) AS SubProducto
			FROM agrupaciones AS A
			JOIN parametrosProducto AS B 
    			ON B.codAgrupador = A.codAgrupador
			JOIN parametrosSubProducto AS C 
    			ON C.codProducto = B.codProducto AND C.codAgrupador = A.codAgrupador
			GROUP BY 
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			B.codProducto;
			END$$
DELIMITER ;

CALL agrupacionProducto();