DELIMITER $$
	CREATE PROCEDURE updateBeneficiariosPJ (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), porcentajeParticipacion VARCHAR(45), primerApellido VARCHAR(45),
    segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU VARCHAR(45),
    numeroIdentificacionTributaria VARCHAR(45))
    
		BEGIN
			UPDATE beneficiariosPJ AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.nombreRazonSocial = nombreRazonSocial, A.porcentajeParticipacion = porcentajeParticipacion, A.primerApellido = primerApellido,
            A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre,
            A.responsableFiscalEEUU = responsableFiscalEEUU, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
        
DELIMITER ;
DROP PROCEDURE updateBeneficiariosPJ;
CALL updateBeneficiariosPJ(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
SELECT * FROM beneficiariosPJ;