DELIMITER $$
	CREATE PROCEDURE updateJuntaDirectivaPj (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoIntegrante VARCHAR(45))
		BEGIN
			UPDATE juntaDirectivaPj AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.nombreRazonSocial = nombreRazonSocial, A.codTipoIntegrante = codTipoIntegrante
			WHERE A.codClienteJuridico = codClienteJuridico AND  A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;
DROP PROCEDURE updateJuntaDirectivaPj;
CALL updateJuntaDirectivaPj(?, ?, ?, ?, ?, ?);
-- CALL insertJuntaDirectivaPj(901801745, 1, 3, 901465791, 'Comercializadora Prime', '01');
SELECT * FROM juntaDirectivaPj;