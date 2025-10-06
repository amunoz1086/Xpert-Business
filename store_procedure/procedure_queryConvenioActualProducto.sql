DELIMITER $$
	CREATE PROCEDURE queryConvenioActualProducto (IN NIT VARCHAR(15))
		BEGIN
			SELECT A.codCliente, A.servicio, A.unidad, A.cantidad, A.tarifa
			FROM convenioActualProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;
DROP PROCEDURE queryConvenioActualProducto;
CALL queryConvenioActualProducto(901801701);
select * from convenioActualProducto;
