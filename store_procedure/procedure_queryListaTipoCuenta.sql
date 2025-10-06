DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListaTipoCuenta $$
	CREATE PROCEDURE queryListaTipoCuenta()
		BEGIN
			SELECT 
				code,
				value
			FROM list_tipoCuenta;
		END$$
DELIMITER ;

CALL queryListaTipoCuenta();