-- stored procedure queryListarEstado
DELIMITER $$
	CREATE PROCEDURE queryListarEstado()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'Estado';
		END$$
DELIMITER ;

CALL queryListarEstado();