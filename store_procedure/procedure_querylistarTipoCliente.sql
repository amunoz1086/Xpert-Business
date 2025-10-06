-- stored procedure listar tipoCliente v1
DELIMITER $$
	CREATE PROCEDURE listarTipoCliente()
		BEGIN
			SELECT COD_TIPO_CLIENTE, TIPOCLI FROM tipo_cliente;
		END$$
DELIMITER ;

CALL listarTipoCliente()