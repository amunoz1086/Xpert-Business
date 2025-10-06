-- stored procedure queryListarProducto
DELIMITER $$
	CREATE PROCEDURE queryListarProducto()
		BEGIN
			SELECT COD_TIP_PROD, NOMBRE FROM tipo_producto
            ORDER BY NOMBRE ASC;
		END$$
DELIMITER ;
DROP PROCEDURE queryListarProducto;
CALL queryListarProducto()