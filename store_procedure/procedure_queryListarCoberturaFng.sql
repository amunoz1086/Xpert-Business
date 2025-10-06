-- stored procedure queryListarCoberturaFng
DELIMITER $$
	CREATE PROCEDURE queryListarCoberturaFng()
		BEGIN
			SELECT A.codCobertura, A.valor, A.descripcion
			FROM coberturaFng AS A;
		END$$
DELIMITER ;
DROP PROCEDURE queryListarCoberturaFng;
CALL queryListarCoberturaFng();