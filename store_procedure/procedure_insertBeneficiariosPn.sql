DELIMITER $$
	CREATE PROCEDURE insertBeneficiariosPn (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), porcentajeBeneficio VARCHAR(45), responsableFiscalEEUU VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
		BEGIN
			INSERT INTO beneficiariosPn 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, porcentajeBeneficio, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, porcentajeBeneficio, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;
DROP PROCEDURE insertBeneficiariosPn;
CALL insertBeneficiariosPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertBeneficiariosPn(901801745, 2, 1, 1019222335, '2022-10-31', 'Sevilla', 'Hernandez', 'Castañeda', 'Martha','','25' , '', 0);