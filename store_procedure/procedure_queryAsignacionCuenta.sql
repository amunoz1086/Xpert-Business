DELIMITER $$
	DROP PROCEDURE IF EXISTS queryAsignacionCuenta $$
	CREATE PROCEDURE queryAsignacionCuenta(IN pNumeroCuenta VARCHAR(255))
		BEGIN
			SELECT 
				A.cliente_id,
				A.numero_cuenta,
				A.tipo_sobregiro,
				A.dias_vigencia,
				A.monto,
				A.fecha_aprobacion,
				A.fecha_vencimiento,
				A.acta_aprobacion_id,
                C.CORREO AS correo_radicador,
				A.estado_solicitud AS cod_Estado,
				B.descripcion AS estado
			FROM cupo_sobregiro AS A
			JOIN Listas AS B ON B.lista = 'EstadoSobregiro' AND B.codLista = A.estado_solicitud
            JOIN usuario AS C ON C.USUARIO = A.usuario_radicador
			WHERE A.numero_cuenta = pNumeroCuenta AND A.estado_solicitud = '40';
		END$$
DELIMITER ;

CALL queryAsignacionCuenta('10550000000015');

CALL queryAsignacionCuenta(?);
