-- stored procedure queryDataBuzon
DELIMITER $$
	CREATE PROCEDURE queryDataBuzon(IN SOLI INT)
		BEGIN
			SELECT cod_solicitud, buzon, descripcion
            FROM controlBuzon WHERE cod_solicitud = SOLI;
		END$$
DELIMITER ;

DROP PROCEDURE queryDataBuzon;
CALL queryDataBuzon(?);