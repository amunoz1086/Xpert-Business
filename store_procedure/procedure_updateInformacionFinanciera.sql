DELIMITER $$
	CREATE PROCEDURE updateInformacionFinanciera (IN codClienteJuridico CHAR(9), periodo INT, ventasAnualesMM DECIMAL(10,2),
    gastosAnualesMM DECIMAL(10,2), activosMM DECIMAL(10,2), pasivosMM DECIMAL(10,2), capitalSocial DECIMAL(10,2),
    patrimonioMM DECIMAL(10,2), ingresosMensualesMM DECIMAL(10,2), egresosMensulesMM DECIMAL(10,2), ingresosNoOperacionalesMM DECIMAL(10,2),
    ventasAnuales DOUBLE, gastosAnuales DOUBLE, ingresosBrutosOrdinarias DOUBLE)
		
        BEGIN
			UPDATE informacionFinanciera AS A
			SET A.periodo = periodo, A.ventasAnualesMM = ventasAnualesMM, A.gastosAnualesMM = gastosAnualesMM, A.activosMM = activosMM,
            A.pasivosMM = pasivosMM, A.capitalSocial = capitalSocial, A.patrimonioMM = patrimonioMM, A.ingresosMensualesMM = ingresosMensualesMM,
            A.egresosMensulesMM = egresosMensulesMM, A.ingresosNoOperacionalesMM = ingresosNoOperacionalesMM, A.ventasAnuales = ventasAnuales,
            A.gastosAnuales = gastosAnuales, A.ingresosBrutosOrdinarias =ingresosBrutosOrdinarias
			WHERE A.codClienteJuridico = codClienteJuridico AND  A.periodo = periodo;
		END$$
        
DELIMITER ;
DROP PROCEDURE updateInformacionFinanciera;
CALL updateInformacionFinanciera(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
SELECT * FROM informacionFinanciera;