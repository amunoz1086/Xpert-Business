-- stored procedure listar IBR
DELIMITER $$
	CREATE PROCEDURE listarIbr()
		BEGIN
			SELECT cod_ibr, ibr_descripcion FROM PRICINGDB.ibr_control;
		END$$
DELIMITER ;

CALL listarIbr();