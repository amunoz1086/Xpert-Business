-- stored procedure queryListarSiNo
DELIMITER $$
	CREATE PROCEDURE queryListarSiNo()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'SiNo';
		END$$
DELIMITER ;

CALL queryListarSiNo();