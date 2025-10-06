DELIMITER $$
	CREATE PROCEDURE queryDataCampos()
		BEGIN
			SELECT A.idCampo, A.descripcion, A.codTipoCliente, C.TIPOCLI, A.codFicha, B.nombre,
			A.actObligatorio, A.actEditable, A.creaObligatorio, A.prospObligatorio,
            A.nCliObligatorio
			FROM camposClientes AS A
			JOIN fichas AS B ON B.idFicha = codFicha
			JOIN tipo_cliente AS C ON C.COD_TIPO_CLIENTE = A.codTipoCliente;
		END$$
DELIMITER ;

DROP PROCEDURE queryDataCampos;
CALL queryDataCampos();