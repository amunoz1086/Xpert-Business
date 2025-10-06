DELIMITER $$
	CREATE PROCEDURE queryValidarProducto(IN pCODPRO CHAR(2))
		BEGIN		        
			SELECT NOMBRE 
			FROM producto
			WHERE COD_PRODUCTO = pCODPRO;
		END$$
DELIMITER ;
DROP PROCEDURE queryValidarProducto;
CALL queryValidarProducto('01');

