DELIMITER $$
	CREATE PROCEDURE updateClientePn (IN numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45), paisExpedicion VARCHAR(45),
    departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), departamentoNacimiento VARCHAR(45), ciudadNacimiento VARCHAR(45), fechaNacimiento DATE,
    codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45), sexo VARCHAR(45), nacionalidad1 VARCHAR(45),
    nacionalidad2 VARCHAR(45), edoCivil VARCHAR(45), tieneDiscapacidad VARCHAR(45), tipoDiscapacidad VARCHAR(45), oficina VARCHAR(45),
    oficialOficina VARCHAR(45), situacionImpositiva VARCHAR(45), desempeñoCargoPEP VARCHAR(45), tipoPEP VARCHAR(45), perteneceGrupoEtnico VARCHAR(45),
    codUsu CHAR(15))
        BEGIN
			UPDATE clienteNatural AS A
			SET A.fechaExpedicion = fechaExpedicion, A.lugarExpedicion = lugarExpedicion, A.paisExpedicion = paisExpedicion,
            A.departamentoExpedicion = departamentoExpedicion, A.ciudadExpedicion = ciudadExpedicion, A.primerApellido = primerApellido,
            A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre, A.paisNacimiento = paisNacimiento,
            A.departamentoNacimiento = departamentoNacimiento, A.ciudadNacimiento = ciudadNacimiento, A.fechaNacimiento = fechaNacimiento,
            A.codPrefijoTelefonico = codPrefijoTelefonico, A.telefono = telefono, A.correoElectronico = correoElectronico, A.sexo = sexo,
            A.nacionalidad1 = nacionalidad1, A.nacionalidad2 = nacionalidad2, A.edoCivil = edoCivil, A.tieneDiscapacidad = tieneDiscapacidad,
            A.tipoDiscapacidad = tipoDiscapacidad, A.oficina = oficina, A.oficialOficina = oficialOficina, A.situacionImpositiva = situacionImpositiva,
            A.desempeñoCargoPEP = desempeñoCargoPEP, A.tipoPEP = tipoPEP, A.perteneceGrupoEtnico = perteneceGrupoEtnico, A.codUsu = codUsu
			WHERE A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;
DROP PROCEDURE updateClientePn;
CALL updateClientePn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL updateClientePn(80024798, '1975-10-09', '11.001', 'CO', 'CO-DC', '11.001', 'Paredes', 'Fríos', 'Franck', '', 'CO', 'CO-DC', '11.001', '1955-10-14', '+57', 3302213146, 'aparedes@gmail.com', 'F', 'CO', '', 1, 0, '', 'Niza', 'Pedro', '', 0, '', 0, 'MAPO1982' );
select * from clienteNatural