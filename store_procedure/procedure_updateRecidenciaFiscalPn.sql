DELIMITER $$
	CREATE PROCEDURE updateRecidenciaFiscalPn (IN codClienteNatural VARCHAR(45), residenciaFiscalColombia VARCHAR(45), residenciaFiscalEEUU VARCHAR(45),
    residenciFiscalOtroPais VARCHAR(45), paisResidenciaFiscal VARCHAR(45), tipoIdentificacionTributaria VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
		
        BEGIN
			UPDATE recidenciaFiscalPn AS A
			SET A.residenciaFiscalColombia = residenciaFiscalColombia, A.residenciaFiscalEEUU = residenciaFiscalEEUU,
            A.residenciFiscalOtroPais = residenciFiscalOtroPais, A.paisResidenciaFiscal = paisResidenciaFiscal, 
            A.tipoIdentificacionTributaria = tipoIdentificacionTributaria, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteNatural = codClienteNatural;
		END$$
        
DELIMITER ;
DROP PROCEDURE updateRecidenciaFiscalPn;
CALL updateRecidenciaFiscalPn(?, ?, ?, ?, ?, ?, ?);
CALL updateRecidenciaFiscalPn(80024797, 1, 0, 0, '', '', 'E');
SELECT * FROM recidenciaFiscalPn;