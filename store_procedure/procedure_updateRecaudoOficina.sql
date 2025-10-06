-- stored procedure updateRecaudoOficina
DELIMITER $$
	CREATE PROCEDURE updateRecaudoOficina (IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), ID INT, USU VARCHAR(45))
		BEGIN
			UPDATE recaudoOficina AS R 
			SET R.tarifaPlena = TPLENA, R.tarifaCosto = TCOSTO, R.cod_user = USU
			WHERE R.idrecaudoOficina = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updateRecaudoOficina;
CALL updateRecaudoOficina(8000, 7000, 2, 'mapo1982');