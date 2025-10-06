-- stord procedure queryListConfigurarIbr
DELIMITER $$
	CREATE PROCEDURE queryListConfigurarIbr ()
		BEGIN
    		SELECT 
				f.cod_fech AS dKey, 
				DATE_FORMAT(f.fech_inic, "%d-%m-%Y") AS fech_inic, 
				DATE_FORMAT(f.fech_hast, "%d-%m-%Y") AS fech_hast, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '0' THEN c.valor_ibr END), "%") AS ibr0, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '1' THEN c.valor_ibr END), "%") AS ibr1, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '3' THEN c.valor_ibr END), "%") AS ibr3, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '6' THEN c.valor_ibr END), "%") AS ibr6, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '12' THEN c.valor_ibr END), "%") AS ibr12
			FROM ibr_fechas f
			JOIN ibr_control c ON f.cod_fech = c.cod_fech
			WHERE f.fech_inic BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND CURDATE()
			GROUP BY f.cod_fech, f.fech_inic, f.fech_hast
			ORDER BY f.cod_fech DESC;
    	END$$
DELIMITER ;
DROP PROCEDURE queryListConfigurarIbr;
CALL queryListConfigurarIbr();