DELIMITER $$
	CREATE PROCEDURE updateJuntaDirectivaPn (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45),
    segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codTipoIntegrante VARCHAR(45))
		BEGIN
			UPDATE juntaDirectivaPn AS A
			SET A.codClienteJuridico = codClienteJuridico, A.cantidad = cantidad, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion,
            A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre,
            A.codTipoIntegrante = codTipoIntegrante
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;
DROP PROCEDURE updateJuntaDirectivaPn;
CALL updateJuntaDirectivaPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
SELECT * FROM juntaDirectivaPn;
