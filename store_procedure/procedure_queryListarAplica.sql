-- stored procedure queryListarAplica
DELIMITER $$
	CREATE PROCEDURE queryListarAplica()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'Aplica';
		END$$
DELIMITER ;

CALL queryListarAplica();