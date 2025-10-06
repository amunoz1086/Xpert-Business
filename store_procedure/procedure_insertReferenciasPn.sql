DELIMITER $$
	CREATE PROCEDURE insertReferenciasPn (IN codClienteNatural VARCHAR(45), cantidad INT, primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), fechaNacimiento DATE, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45),
    codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45))
		
        BEGIN
			INSERT INTO referenciasPn
			(codClienteNatural, cantidad, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, fechaNacimiento, tipoDocumento, numeroIdentificacion,
            fechaExpedicion, lugarExpedicion, codPrefijoTelefonico, telefono, correoElectronico)
			VALUES
			(codClienteNatural, cantidad, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, fechaNacimiento, tipoDocumento, numeroIdentificacion,
            fechaExpedicion, lugarExpedicion, codPrefijoTelefonico, telefono, correoElectronico);
		END$$
        
DELIMITER ;
DROP PROCEDURE insertReferenciasPn;
CALL insertReferenciasPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL insertReferenciasPn(80024797, 2, 'Vargas', 'Navas', 'Elisa', '', 'CO', '1989-10-01', 1, 95167998, '2010-09-26', '11.001', '+57', 3002556677, 'evargas@gmail.com');