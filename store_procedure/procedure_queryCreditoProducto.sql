DELIMITER $$
	CREATE PROCEDURE queryCreditoProducto (IN NIT VARCHAR(15))
		BEGIN
			SELECT A.codCliente, A.descripcion, A.montoTotalCupo, A.cupoUtilizado, A.fechaAproCupo, A.fechaVenciCupo, A.cupoDisponible, A.diasVigencia, A.tasaReferencia
			FROM creditoProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;
DROP PROCEDURE queryCreditoProducto;
CALL queryCreditoProducto(901801701);
select * from creditoProducto;