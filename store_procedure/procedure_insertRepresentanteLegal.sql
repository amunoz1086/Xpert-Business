DELIMITER $$
	CREATE PROCEDURE insertRepresentanteLegal (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoRepresentante VARCHAR(45), correoElectronico VARCHAR(45))
		BEGIN
			INSERT INTO representanteLegal 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoRepresentante, correoElectronico)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoRepresentante, correoElectronico);
		END$$
DELIMITER ;
DROP PROCEDURE insertRepresentanteLegal;
CALL insertRepresentanteLegal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertRepresentanteLegal('901801745', 2, 1, 1010200300, '2015-01-15', 'CO', 'CO-VAC', '76.001', 'Martinez', 'Perez', 'Juan', 'Carlos', '+57', '3002293560', 'jcmartinez@agripollo.com');