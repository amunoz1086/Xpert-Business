DELIMITER $$
	CREATE PROCEDURE insertControlantes (IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
		BEGIN
			INSERT INTO controlantes 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;
DROP PROCEDURE insertControlantes;
CALL insertControlantes(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertControlantes(901801745, 2, 'Peña', 'Ortiz', 'Raul', '', 1, 87457169, 0, 0);