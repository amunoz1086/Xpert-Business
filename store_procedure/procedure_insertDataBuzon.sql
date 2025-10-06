-- stored procedure insertDataBuzon
DELIMITER $$
	CREATE PROCEDURE insertDataBuzon(IN SOLI INT, BUZON VARCHAR(9), DESCRIP VARCHAR(100), USU CHAR(15))
		BEGIN
			INSERT INTO controlBuzon (cod_solicitud, buzon, descripcion, cod_usu)
			VALUES (SOLI, BUZON, DESCRIP, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertDataBuzon;
CALL insertDataBuzon(?, ?, ?, ?);