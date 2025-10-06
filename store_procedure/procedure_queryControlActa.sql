DELIMITER $$
	DROP PROCEDURE IF EXISTS queryActasContratos;
	CREATE PROCEDURE queryActasContratos(IN pNombreActa VARCHAR(50))
		BEGIN
			SELECT * FROM controlActa
			WHERE nombreActa = pNombreActa;
		END$$
DELIMITER ;

CALL queryActasContratos(?);
CALL queryActasContratos('aperturaCuenta');