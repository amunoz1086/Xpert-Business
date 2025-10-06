DELIMITER $$
	CREATE PROCEDURE insertJuntaDirectivaPn (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codTipoIntegrante VARCHAR(45))
		BEGIN
			INSERT INTO juntaDirectivaPn 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoIntegrante)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoIntegrante);
		END$$
DELIMITER ;
DROP PROCEDURE insertJuntaDirectivaPn;
CALL insertJuntaDirectivaPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertJuntaDirectivaPn(901801745, 2, 1,1050987123,'2018-05-05','11.001','Romero','Fernandez','Sandra','', '01');