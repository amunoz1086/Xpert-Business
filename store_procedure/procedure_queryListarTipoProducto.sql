-- stored procedure queryListarTipoProducto
DELIMITER $$
	CREATE PROCEDURE queryListarTipoProducto()
		BEGIN
			SELECT COD_PRODUCTO, NOMBRE FROM producto;
		END$$
DELIMITER ;

CALL queryListarTipoProducto();