DELIMITER $$
	CREATE PROCEDURE insertJuntaDirectivaPj (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoIntegrante VARCHAR(45))
		BEGIN
			INSERT INTO juntaDirectivaPj 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoIntegrante)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoIntegrante);
		END$$
DELIMITER ;
DROP PROCEDURE insertJuntaDirectivaPj;
CALL insertJuntaDirectivaPj(?, ?, ?, ?, ?, ?);
-- CALL insertJuntaDirectivaPj(901801745, 1, 3, 901465791, 'Comercializadora Prime', '01');