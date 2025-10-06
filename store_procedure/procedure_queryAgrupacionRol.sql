DELIMITER $$
	DROP PROCEDURE IF EXISTS agrupacionRol;
	CREATE PROCEDURE agrupacionRol()
		BEGIN
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion,
    			B.titular,
    			B.firmante,
    			B.secundario,
    			B.cotitular,
    			B.mensaje
			FROM agrupaciones AS A
			JOIN parametrosRol AS B 
				ON B.codAgrupador = A.codAgrupador;
		END$$
DELIMITER ;

CALL agrupacionRol();