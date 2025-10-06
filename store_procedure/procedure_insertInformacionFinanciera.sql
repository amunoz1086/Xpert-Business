DELIMITER $$
	CREATE PROCEDURE insertInformacionFinanciera (IN codClienteJuridico CHAR(9), periodo INT, ventasAnualesMM DECIMAL(10,2), gastosAnualesMM DECIMAL(10,2), activosMM DECIMAL(10,2), pasivosMM DECIMAL(10,2), capitalSocial DECIMAL(10,2), patrimonioMM DECIMAL(10,2), ingresosMensualesMM DECIMAL(10,2), egresosMensulesMM DECIMAL(10,2), ingresosNoOperacionalesMM DECIMAL(10,2), ventasAnuales DOUBLE, gastosAnuales DOUBLE, ingresosBrutosOrdinarias DOUBLE)
		BEGIN
			INSERT INTO informacionFinanciera 
			(codClienteJuridico, periodo, ventasAnualesMM, gastosAnualesMM, activosMM, pasivosMM, capitalSocial, patrimonioMM, ingresosMensualesMM, egresosMensulesMM, ingresosNoOperacionalesMM, ventasAnuales, gastosAnuales, ingresosBrutosOrdinarias)
			VALUES
			(codClienteJuridico, periodo, ventasAnualesMM, gastosAnualesMM, activosMM, pasivosMM, capitalSocial, patrimonioMM, ingresosMensualesMM, egresosMensulesMM, ingresosNoOperacionalesMM, ventasAnuales, gastosAnuales, ingresosBrutosOrdinarias);
		END$$
DELIMITER ;
DROP PROCEDURE insertInformacionFinanciera;
CALL insertInformacionFinanciera(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertInformacionFinanciera(901801745, 3, 1500.52, 750.26, 21007.28, 14705.10, 5671.97, 6302.18, 125.04, 70.02, 3.75, 1500520000.00, 750260000.00, 1200416000.00);