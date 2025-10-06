-- stored procedure listarTipoContrato v1
DELIMITER $$
	CREATE PROCEDURE listarTipoContrato()
		BEGIN
			SELECT COD_TIP_CONTRATO, TIPO_CONTRATO FROM tipo_contrato;
		END$$
DELIMITER ;

CALL listarTipoContrato()