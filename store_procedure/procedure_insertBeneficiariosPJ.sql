DELIMITER $$
	CREATE PROCEDURE insertBeneficiariosPJ (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), porcentajeParticipacion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
		BEGIN
			INSERT INTO beneficiariosPJ 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;
DROP PROCEDURE insertBeneficiariosPJ;
CALL insertBeneficiariosPJ(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertBeneficiariosPJ(901801745, 2, 3, 902147852, 'Comercio Aliado', 25, '', '', '', '', '', 0);