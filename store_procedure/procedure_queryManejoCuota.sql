DELIMITER $$
	DROP PROCEDURE IF EXISTS listarManejoCuota;
	CREATE PROCEDURE listarManejoCuota()
		BEGIN
			SELECT 
				codLista,
				descripcion
				FROM Listas
			WHERE lista = 'ManejoCuota';
		END$$
DELIMITER ;

CALL listarManejoCuota()