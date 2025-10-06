DELIMITER $$
	CREATE PROCEDURE insertRecidenciaFiscalPn (IN codClienteNatural VARCHAR(45), residenciaFiscalColombia VARCHAR(45), residenciaFiscalEEUU VARCHAR(45), residenciFiscalOtroPais VARCHAR(45),
    paisResidenciaFiscal VARCHAR(45), tipoIdentificacionTributaria VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
		
        BEGIN
			INSERT INTO recidenciaFiscalPn
			(codClienteNatural, residenciaFiscalColombia, residenciaFiscalEEUU, residenciFiscalOtroPais, paisResidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria)
			VALUES
			(codClienteNatural, residenciaFiscalColombia, residenciaFiscalEEUU, residenciFiscalOtroPais, paisResidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria);
		END$$
        
DELIMITER ;
DROP PROCEDURE insertRecidenciaFiscalPn;
CALL insertRecidenciaFiscalPn(?, ?, ?, ?, ?, ?, ?);
CALL insertRecidenciaFiscalPn(80024797, 1, 0, 0, '', '', '')
