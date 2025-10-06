-- stored procedure queryListarReciprocidadMinima
DELIMITER $$
	CREATE PROCEDURE queryListarReciprocidadMinima()
		BEGIN
			SELECT A.idReciprocidadMinima, A.monto
			FROM reciprocidadMinima AS A;
		END$$
DELIMITER ;
DROP PROCEDURE queryListarReciprocidadMinima;
CALL queryListarReciprocidadMinima();