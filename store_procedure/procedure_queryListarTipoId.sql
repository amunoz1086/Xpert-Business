-- stored procedure queryListarTipoId
DELIMITER $$
	CREATE PROCEDURE queryListarTipoId()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoId';
		END$$
DELIMITER ;

CALL queryListarTipoId();