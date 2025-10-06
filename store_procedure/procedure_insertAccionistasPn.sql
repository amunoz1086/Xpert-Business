DELIMITER $$
	CREATE PROCEDURE insertAccionistasPn (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codTipoAccionista VARCHAR(45), porcentajeParticipacion VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
		BEGIN
			INSERT INTO accionistasPn 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoAccionista, porcentajeParticipacion, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoAccionista, porcentajeParticipacion, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;
DROP PROCEDURE insertAccionistasPn;
CALL insertAccionistasPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertAccionistasPn(901801745, 1, 1, '1036787989', '2001-05-15', '17.001', 'Molina', 'Ortega', 'Arturo', 'Angel', 1, 15, 0, 0);