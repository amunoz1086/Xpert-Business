DELIMITER $$
	CREATE PROCEDURE queryReciprocidadProducto (IN NIT VARCHAR(15))
		BEGIN
			SELECT A.codCliente, A.monto
			FROM reciprocidadProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;
DROP PROCEDURE queryReciprocidadProducto;
CALL queryReciprocidadProducto(901801701);
select * from reciprocidadProducto;
