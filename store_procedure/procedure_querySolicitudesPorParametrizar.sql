-- stored procedure querySolicitudesPorParametrizar
DELIMITER $$
	CREATE PROCEDURE querySolicitudesPorParametrizar(IN USU CHAR(15))
		BEGIN	
				SELECT A.COD_SOLICITUD,
                date_format(A.FECHA_HORA, '%d-%m-%Y') AS FECHA_HORA,
                E.OFICINA,
				F.REGIONAL_RAD,
				A.NIT_CLIENTE,
                G.tipopersona AS ESTADO_PERSONA,
				H.descripcion AS DESCRIP_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.tipoPersona') AS TIPO_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.PRODUCTO.producto') AS PRODUCTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.TOTAL_PROMEDIO_COLOCA') AS TOTAL_CARTERA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.VALOR_CAPTACION_1') AS TOTAL_CAPTACION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
                if((if(D.estadoAprobacion = 1, 'Asignado', if(D.estadoParametrizacion = 0, 'No Aprobado', if(D.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado')))) = 'No Asignado', (SELECT tipo_aprobador FROM tipo_aprobador WHERE cod_aprobador= (SELECT COD_APROBADOR FROM ente_aprobacion WHERE USUARIO = B.codEnte)), '--') AS codEnte,
                if(D.estadoAprobacion is null, 'En Proceso', if(D.estadoAprobacion = 1, 'Aprobado', 'No Aprobado')) AS Aprobacion,
				if(D.estadoAprobacion = 1 and D.estadoParametrizacion is null, 'Asignado', if(D.estadoParametrizacion = 0, 'No Aprobado', if(D.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado'))) AS Parametrizacion,
				B.idasignacion
				FROM solicitudes AS A
				JOIN asignaciones AS B ON A.COD_SOLICITUD = B.codSolicitud 
				LEFT JOIN estado_asignacion AS C ON B.idasignacion = C.idasignacion
                LEFT JOIN estado_solicitud AS D ON A.COD_SOLICITUD = D.codSolicitud
                LEFT JOIN oficina AS E ON E.COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)
				LEFT JOIN regional AS F ON F.COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)
				LEFT JOIN clienteJuridico AS G ON G.nit = A.NIT_CLIENTE
				JOIN Listas AS H ON H.lista = 'TipoPersona' AND H.codLista= G.tipopersona
				WHERE B.codEnte = USU AND B.codTipo = 0 AND D.estatusCorreo = 1
				ORDER BY COD_SOLICITUD ASC;
		END$$
DELIMITER ;

DROP PROCEDURE querySolicitudesPorParametrizar;
CALL querySolicitudesPorParametrizar(?);
CALL querySolicitudesPorParametrizar('jcib5894');