DELIMITER $$
	CREATE PROCEDURE insertClientePn (IN tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45),
    paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45),
    primerNombre VARCHAR(45), segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), departamentoNacimiento VARCHAR(45), ciudadNacimiento VARCHAR(45),
    fechaNacimiento DATE, codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45), sexo VARCHAR(45), nacionalidad1 VARCHAR(45),
    nacionalidad2 VARCHAR(45), edoCivil VARCHAR(45), tieneDiscapacidad VARCHAR(45), tipoDiscapacidad VARCHAR(45), oficina VARCHAR(45), oficialOficina VARCHAR(45),
    situacionImpositiva VARCHAR(45), desempeñoCargoPEP VARCHAR(45), tipoPEP VARCHAR(45), perteneceGrupoEtnico VARCHAR(45), tipopersona INT, codUsu CHAR(15))
		
        BEGIN
			INSERT INTO clienteNatural
			(tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, paisExpedicion, departamentoExpedicion,
			ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, departamentoNacimiento,
            ciudadNacimiento, fechaNacimiento, codPrefijoTelefonico, telefono, correoElectronico, sexo, nacionalidad1, nacionalidad2,
            edoCivil, tieneDiscapacidad, tipoDiscapacidad, oficina, oficialOficina, situacionImpositiva, desempeñoCargoPEP, tipoPEP,
            perteneceGrupoEtnico, tipopersona, codUsu)
			VALUES
			(tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, paisExpedicion, departamentoExpedicion,
			ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, departamentoNacimiento,
            ciudadNacimiento, fechaNacimiento, codPrefijoTelefonico, telefono, correoElectronico, sexo, nacionalidad1, nacionalidad2,
            edoCivil, tieneDiscapacidad, tipoDiscapacidad, oficina, oficialOficina, situacionImpositiva, desempeñoCargoPEP, tipoPEP,
            perteneceGrupoEtnico, tipopersona, codUsu);
		END$$
        
DELIMITER ;
DROP PROCEDURE insertClientePn;
CALL insertClientePn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL insertClientePn(1, 80024798, '1975-10-09', '11.001', 'CO', 'CO-DC', '11.001', 'Paredes', 'Fríos', 'Ana', '', 'CO', 'CO-DC', '11.001', '1955-10-14', '+57', 3302213146, 'aparedes@gmail.com', 'F', 'CO', '', 1, 0, '', 'Niza', 'Pedro', '', 0, '', 0, 10, 'MAPO1982' );
