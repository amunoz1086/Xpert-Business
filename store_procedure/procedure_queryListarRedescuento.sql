-- stored procedure queryListarRedescuento
DELIMITER $$
	CREATE PROCEDURE queryListarRedescuento()
		BEGIN
			SELECT A.cod_redescuento, A.descripcion
			FROM entidadRedescuento AS A
			WHERE A.codEstado = 1;
		END$$
DELIMITER ;
DROP PROCEDURE queryListarRedescuento;
CALL queryListarRedescuento();