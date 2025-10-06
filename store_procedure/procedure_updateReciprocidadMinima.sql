-- stored procedure updateReciprocidadMinima
DELIMITER $$
	CREATE PROCEDURE updateReciprocidadMinima(IN IDREC INT, MONTO INT, USU CHAR(15))
		BEGIN
			UPDATE reciprocidadMinima AS A
			SET A.monto = MONTO, A.codUsu = USU
			WHERE A.idReciprocidadMinima = IDREC;
		END$$
DELIMITER ;
DROP PROCEDURE updateReciprocidadMinima;
CALL updateReciprocidadMinima(1, 300000000, 'GG');