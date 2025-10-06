DELIMITER $$
	CREATE PROCEDURE insertAccionistasPj (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoAccionista VARCHAR(45), porcentajeParticipacion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
		BEGIN
			INSERT INTO accionistasPj 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoAccionista, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoAccionista, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;
DROP PROCEDURE insertAccionistasPj;
CALL insertAccionistasPj(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertAccionistasPj(901801745, 1, 3, 903211346, 'Comercializadora Puente', 1, 40, '', '', '', '', 0, 0);
