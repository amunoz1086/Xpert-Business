DELIMITER $$
	CREATE PROCEDURE updateReferenciasPn (IN codClienteNatural VARCHAR(45), cantidad INT, primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), fechaNacimiento DATE, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45),
    codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45))
		
        BEGIN
			UPDATE referenciasPn AS A
			SET A.cantidad = cantidad, A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre,
            A.segundoNombre = segundoNombre, A.paisNacimiento = paisNacimiento, A.fechaNacimiento = fechaNacimiento, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.fechaExpedicion = fechaExpedicion, A.lugarExpedicion = lugarExpedicion,
            A.codPrefijoTelefonico = codPrefijoTelefonico, A.telefono = telefono, A.correoElectronico = correoElectronico
			WHERE A.codClienteNatural = codClienteNatural AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
        
DELIMITER ;
DROP PROCEDURE updateReferenciasPn;
CALL updateReferenciasPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL updateReferenciasPn(80024797, 2, 'Vargas', 'Nanvas', 'Eliza', '', 'CO', '1989-10-01', 1, 95167998, '2010-09-26', '11.001', '+57', 3002556677, 'eevargas@gmail.com');
select * from referenciasPn;