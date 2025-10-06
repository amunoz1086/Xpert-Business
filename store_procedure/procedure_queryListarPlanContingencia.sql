DELIMITER $$
	CREATE PROCEDURE queryListarPlanContingencia()
		BEGIN
			SELECT codLista, descripcion
			FROM Listas
			WHERE lista = 'PlanContingencia';
		END$$
DELIMITER ;
DROP PROCEDURE queryListarPlanContingencia;
CALL queryListarPlanContingencia();