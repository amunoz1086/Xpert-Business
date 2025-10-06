DELIMITER $$
	DROP PROCEDURE IF EXISTS list_ProductosBancarios;
	CREATE PROCEDURE list_ProductosBancarios()
		BEGIN
			SELECT codProducto, descripcion FROM list_ProductosBancarios;
		END$$
DELIMITER ;
CALL list_ProductosBancarios();