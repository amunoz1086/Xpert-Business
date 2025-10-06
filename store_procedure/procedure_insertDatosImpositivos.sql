DELIMITER $$
	CREATE PROCEDURE insertDatosImpositivos (IN codClienteJuridico VARCHAR(45), codEnte VARCHAR(45), desempeñaDesempeño VARCHAR(45), relacionDependencia VARCHAR(45), rol VARCHAR(45), fechaIngreso DATE, fechaSalida DATE)
		BEGIN
			INSERT INTO datosImpositivos 
			(codClienteJuridico, codEnte, desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida)
			VALUES
			(codClienteJuridico, codEnte, desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida);
		END$$
DELIMITER ;
DROP PROCEDURE insertDatosImpositivos;
CALL insertDatosImpositivos(?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertDatosImpositivos(901801745, 1019222338, 0, '', '', null, null);

