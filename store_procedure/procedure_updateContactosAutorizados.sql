DELIMITER $$
	CREATE PROCEDURE updateContactosAutorizados (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45),
    ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoContacto VARCHAR(45), correoElectronico VARCHAR(45))
    
		BEGIN
			UPDATE contactosAutorizados AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion, A.departamentoExpedicion = departamentoExpedicion,
            A.ciudadExpedicion = ciudadExpedicion, A.primerApellido = primerApellido, A.segundoApellido = segundoApellido,
            A.primerNombre = primerNombre, A.segundoNombre = segundoNombre, A.codPrefijoTelefonico = codPrefijoTelefonico,
            A.telefonoContacto = telefonoContacto, A.correoElectronico = correoElectronico
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
        END$$
        
DELIMITER ;
DROP PROCEDURE updateContactosAutorizados;
CALL updateContactosAutorizados(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
SELECT * FROM contactosAutorizados;