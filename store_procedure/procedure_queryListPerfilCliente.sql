-- stored procedure queryListPerfilCliente
DELIMITER $$
	CREATE PROCEDURE queryListPerfilCliente()
		BEGIN
			SELECT A.codPerfilCliente, A.descripcion
			FROM list_PerfilCliente AS A
            ORDER BY A.codPerfilCliente ASC;
		END$$
DELIMITER ;

DROP PROCEDURE queryListPerfilCliente;
CALL queryListPerfilCliente();