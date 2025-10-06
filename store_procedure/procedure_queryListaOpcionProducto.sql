DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListarOpcionProducto $$
	CREATE PROCEDURE queryListarOpcionProducto()
		BEGIN
			SELECT 
				codeOpcionProducto,
				descripcion
			FROM opcionProducto
			WHERE estatus = 1
			ORDER BY codeOpcionProducto ASC;
		END$$
DELIMITER ;

CALL queryListarOpcionProducto();