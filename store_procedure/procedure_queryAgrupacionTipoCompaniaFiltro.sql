DELIMITER $$
	DROP PROCEDURE IF EXISTS agrupacionTipoCompaniaFiltro;
	CREATE PROCEDURE agrupacionTipoCompaniaFiltro(IN pPERSONA INT, pTIPOCOMPANIA INT)
		BEGIN
			DECLARE filtroTipoCompania BOOLEAN DEFAULT TRUE;
            SET filtroTipoCompania = (pPERSONA = 2);
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion, 
				A.codTipoPersona, B.codCompania
			FROM agrupaciones AS A
			JOIN parametrosTipoCompania AS B ON B.codAgrupador = A.codAgrupador
			WHERE A.codTipoPersona = pPERSONA
            AND ( filtroTipoCompania = FALSE OR B.codCompania = pTIPOCOMPANIA );
		END$$
DELIMITER ;

CALL agrupacionTipoCompaniaFiltro(1, '');