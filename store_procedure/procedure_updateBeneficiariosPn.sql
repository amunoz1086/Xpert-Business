DELIMITER $$
	CREATE PROCEDURE updateBeneficiariosPn (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45),
    segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), porcentajeBeneficio VARCHAR(45),
    responsableFiscalEEUU VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
		BEGIN
			UPDATE beneficiariosPn AS A
			SET A.codClienteJuridico = codClienteJuridico, A.cantidad = cantidad, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion,
            A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre,
            A.segundoNombre = segundoNombre, A.porcentajeBeneficio = porcentajeBeneficio, A.responsableFiscalEEUU = responsableFiscalEEUU,
            A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
            WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;
DROP PROCEDURE updateBeneficiariosPn;
CALL updateBeneficiariosPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
SELECT * FROM beneficiariosPn;