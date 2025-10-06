-- stored procedure queryListarPlanRem
DELIMITER $$
	CREATE PROCEDURE queryListarPlanRem()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'PlanRem';
		END$$
DELIMITER ;

DROP PROCEDURE queryListarPlanRem;
CALL queryListarPlanRem();