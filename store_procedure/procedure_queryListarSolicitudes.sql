DELIMITER $$
	CREATE PROCEDURE queryListarSolicitudes()
		BEGIN		        
			SELECT A.COD_SOLICITUD,
				date_format(A.FECHA_HORA, '%d-%m-%Y') AS FECHA_HORA,
				D.OFICINA,
				E.REGIONAL_RAD,
				A.NIT_CLIENTE,
                F.tipopersona AS ESTADO_PERSONA,
				G.descripcion AS DESCRIP_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.tipoPersona') AS TIPO_PERSONA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.PRODUCTO.producto') AS PRODUCTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.TOTAL_PROMEDIO_COLOCA') AS TOTAL_CARTERA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.VALOR_CAPTACION_1') AS TOTAL_CAPTACION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
                if((if(B.estadoAprobacion = 1, 'Asignado', if(B.estadoParametrizacion = 0, 'No Aprobado', if(B.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado')))) = 'No Asignado', 
					(SELECT tipo_aprobador 
						FROM tipo_aprobador 
                        WHERE cod_aprobador = (SELECT codTipo 
												FROM asignaciones 
                                                WHERE codSolicitud = A.COD_SOLICITUD 
                                                ORDER BY idasignacion 
                                                DESC LIMIT 1)), '--') AS codEnte,
				if(B.estadoAprobacion is null, 'En Proceso', if(B.estadoAprobacion = 1, 'Aprobado', 'No Aprobado')) AS Aprobacion,
				if(B.estadoAprobacion = 1 and B.estadoParametrizacion is null, 'Asignado', if(B.estadoParametrizacion = 0, 'No Aprobado', if(B.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado'))) AS Parametrizacion,
				C.idasignacion
			FROM solicitudes AS A
			LEFT JOIN estado_solicitud AS B ON A.COD_SOLICITUD = B.codSolicitud
			JOIN asignaciones AS C ON A.COD_SOLICITUD = C.codSolicitud
            JOIN oficina AS D ON D.COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)
            JOIN regional AS E ON E.COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)
            LEFT JOIN clienteJuridico AS F ON F.nit = A.NIT_CLIENTE
            JOIN Listas AS G ON G.lista = 'TipoPersona' AND G.codLista= F.tipopersona
			GROUP BY COD_SOLICITUD
			ORDER BY COD_SOLICITUD ASC
			LIMIT 500;
		END$$
DELIMITER ;

DROP PROCEDURE queryListarSolicitudes;
CALL queryListarSolicitudes();