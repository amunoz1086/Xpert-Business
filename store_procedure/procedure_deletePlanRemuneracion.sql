-- stored procedure deletePlanRemuneracion
DELIMITER $$
	CREATE PROCEDURE deletePlanRemuneracion(IN ID INT)
		BEGIN
			DELETE FROM planRemuneracion
			WHERE idplanRemuneracion = ID;
		END$$
DELIMITER ;

DROP PROCEDURE deletePlanRemuneracion;
CALL deletePlanRemuneracion(?);

CALL deletePlanRemuneracion(5);