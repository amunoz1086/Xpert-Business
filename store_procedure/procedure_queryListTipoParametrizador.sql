-- stored procedure queryListTipoParametrizador
DELIMITER $$
	CREATE PROCEDURE queryListTipoParametrizador()
		BEGIN
			SELECT A.codTipPardor, A.descripcion
			FROM list_TipoParametrizador AS A
            ORDER BY A.codTipPardor ASC;
		END$$
DELIMITER ;

DROP PROCEDURE queryListTipoParametrizador;
CALL queryListTipoParametrizador();