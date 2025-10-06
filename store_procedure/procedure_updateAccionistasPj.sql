DELIMITER $$
	CREATE PROCEDURE updateAccionistasPj (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoAccionista VARCHAR(45), porcentajeParticipacion VARCHAR(45),
    primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU INT,
    numeroIdentificacionTributaria INT)
    
		BEGIN
			UPDATE accionistasPj AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.nombreRazonSocial = nombreRazonSocial, A.codTipoAccionista = codTipoAccionista, A.porcentajeParticipacion = porcentajeParticipacion,
            A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre,
            A.responsableFiscalEEUU = responsableFiscalEEUU, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
        
DELIMITER ;
DROP PROCEDURE updateAccionistasPj;
CALL updateAccionistasPj(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
SELECT * FROM accionistasPj;