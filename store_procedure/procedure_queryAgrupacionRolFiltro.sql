DELIMITER $$
	DROP PROCEDURE IF EXISTS agrupacionRolFiltro;
	CREATE PROCEDURE agrupacionRolFiltro(IN pGRUPO VARCHAR(4))
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
				ON B.codAgrupador = A.codAgrupador
			WHERE A.codAgrupador = pGRUPO;
		END$$
DELIMITER ;

CALL agrupacionRolFiltro('A2');