-- stord procedure queryListarUltimaFecha
DELIMITER $$
	CREATE PROCEDURE queryListarUltimaFecha ()
		BEGIN
    		SELECT cod_fech, 
				DATE_FORMAT((DATE_ADD(fech_hast, INTERVAL 1 DAY)),"%Y-%m-%d") AS fech_hast
			FROM ibr_fechas
			ORDER BY cod_fech DESC 
			LIMIT 1;
    	END$$
DELIMITER ;
DROP PROCEDURE queryListarUltimaFecha;
CALL queryListarUltimaFecha();