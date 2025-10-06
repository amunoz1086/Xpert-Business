DELIMITER $$
	CREATE PROCEDURE queryTipoPlan()
		BEGIN
			SELECT codTipoPlan, descripcion
			FROM tipoPlan;
		END$$
DELIMITER ;
DROP PROCEDURE queryTipoPlan;
CALL queryTipoPlan();