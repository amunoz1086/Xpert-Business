DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListarObligacion;
	CREATE PROCEDURE queryListarObligacion()
		BEGIN
			SELECT 
    			codLista, 
    			descripcion
			FROM Listas
            WHERE lista = 'Obligatorio';
		END$$
DELIMITER ;

CALL queryListarObligacion();