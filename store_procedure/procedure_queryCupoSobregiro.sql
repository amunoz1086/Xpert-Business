DELIMITER $$
	DROP PROCEDURE IF EXISTS queryCupoSobregiro $$
	CREATE PROCEDURE queryCupoSobregiro(IN pIdentification VARCHAR(255))
		BEGIN
			SELECT 
				A.numero_cuenta,
				A.estado_solicitud AS cod_Estado,
				B.descripcion
			FROM cupo_sobregiro AS A
			JOIN Listas AS B ON B.lista = 'EstadoSobregiro' AND B.codLista = A.estado_solicitud
			WHERE A.cliente_id = pIdentification AND A.estado_solicitud = '40';
		END$$
DELIMITER ;

CALL queryCupoSobregiro(?);
