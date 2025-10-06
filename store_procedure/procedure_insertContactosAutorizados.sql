DELIMITER $$
	CREATE PROCEDURE insertContactosAutorizados (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoContacto VARCHAR(45), correoElectronico VARCHAR(45))
		BEGIN
			INSERT INTO contactosAutorizados 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoContacto, correoElectronico)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoContacto, correoElectronico);
		END$$
DELIMITER ;
DROP PROCEDURE insertContactosAutorizados;
CALL insertContactosAutorizados(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertContactosAutorizados(901801745, 2, 1, 95648321, '2015-02-01', 'CO', 'CO-SAN', '68.001', 'Sanchez', 'Castro', 'Luis', 'Eduardo', '+57','3217401054','lsanchez@agripollo.com');