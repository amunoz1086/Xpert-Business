-- stored procedure queryListarTipoCuenta
DELIMITER $$
	CREATE PROCEDURE queryListarTipoCuenta()
		BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoCuenta';
		END$$
DELIMITER ;

CALL queryListarTipoCuenta();