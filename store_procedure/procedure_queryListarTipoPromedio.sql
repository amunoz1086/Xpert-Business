DELIMITER $$
	DROP PROCEDURE IF EXISTS listarTipoPromedio;
	CREATE PROCEDURE listarTipoPromedio()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoPromedio';
		END$$
DELIMITER ;
CALL listarTipoPromedio();