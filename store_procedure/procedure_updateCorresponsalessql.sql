-- stored procedure updateCorresponsales
DELIMITER $$
	CREATE PROCEDURE updateCorresponsales (IN ID INT, TPLENA DECIMAL(7,1), ESTADO INT, TICKET INT, USU VARCHAR(45))
		BEGIN
			UPDATE corresponsales AS A
			SET A.tarifaPlena = TPLENA, A.estado = ESTADO, A.ticket_promedio = TICKET, A.cod_usu = USU
			WHERE A.idcorresponsales = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updateCorresponsales;
CALL updateCorresponsales(?, ?, ?, ?);