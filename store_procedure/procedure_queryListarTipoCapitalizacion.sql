DELIMITER $$
	DROP PROCEDURE IF EXISTS listarTipoCapitalizacion;
	CREATE PROCEDURE listarTipoCapitalizacion()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoCapitalizacion';
		END$$
DELIMITER ;
CALL listarTipoCapitalizacion();