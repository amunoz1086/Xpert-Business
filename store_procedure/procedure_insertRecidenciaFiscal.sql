DELIMITER $$
	CREATE PROCEDURE insertRecidenciaFiscal (IN codClienteJuridico VARCHAR(45), personaEEUU VARCHAR(45), personaEspecíficaEEUU VARCHAR(45), IdTributarioEEUU VARCHAR(45), OpcionesLista VARCHAR(45), clasificacionFATCA VARCHAR(45), numeroGIIN VARCHAR(45), tieneRecidenciaFiscal VARCHAR(45), paisRecidenciaFiscal VARCHAR(45), tipoIdentificacionTributaria VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
		BEGIN
			INSERT INTO recidenciaFiscal 
			(codClienteJuridico, personaEEUU, personaEspecíficaEEUU, IdTributarioEEUU, OpcionesLista, clasificacionFATCA, numeroGIIN, tieneRecidenciaFiscal, paisRecidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, personaEEUU, personaEspecíficaEEUU, IdTributarioEEUU, OpcionesLista, clasificacionFATCA, numeroGIIN, tieneRecidenciaFiscal, paisRecidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria);
		END$$
DELIMITER ;
DROP PROCEDURE insertRecidenciaFiscal;
CALL insertRecidenciaFiscal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertRecidenciaFiscal(901801745, 0, 0, '','','', 0, 0, '','','');