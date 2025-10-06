-- stored procedure queryTipoRedescuentoStatus
DELIMITER $$
	CREATE PROCEDURE queryTipoRedescuentoStatus()
		BEGIN
			SELECT A.cod_redescuento, A.descripcion, A.codEstado, B.descripcion AS descripcionEstado
			FROM entidadRedescuento AS A
			JOIN Listas AS B ON B.lista = 'SiNo' AND B.codLista = A.codEstado;
		END$$
DELIMITER ;
DROP PROCEDURE queryTipoRedescuentoStatus;
CALL queryTipoRedescuentoStatus();