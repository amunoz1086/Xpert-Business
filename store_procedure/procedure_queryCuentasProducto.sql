DELIMITER $$
	CREATE PROCEDURE queryCuentasProducto (IN NIT VARCHAR(15))
		BEGIN
			SELECT A.codCliente, A.cuentas,
            A.tipo, A.fechaInicial, A.tasaEA, A.saldo,
            A.estadoCuenta, A.bloqueo, A.totalCupoSobregiro,
            A.fechaAproSobregiro, A.fechaVencSobregiro,
            A.cupoDispoSobregiro, A.vigenciaCupoSobregiro
			FROM cuentasProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;
DROP PROCEDURE queryCuentasProducto;
CALL queryCuentasProducto(901801701);
select * from cuentasProducto;