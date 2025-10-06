-- stored procedure listar Naturaleza
DELIMITER $$
	CREATE PROCEDURE listarNaturaleza()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'Naturaleza';
		END$$
DELIMITER ;

CALL listarNaturaleza()