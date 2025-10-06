DELIMITER $$
	CREATE PROCEDURE updateRecidenciaFiscal (IN codClienteJuridico VARCHAR(45), personaEEUU VARCHAR(45), personaEspecíficaEEUU VARCHAR(45),
    IdTributarioEEUU VARCHAR(45), OpcionesLista VARCHAR(45), clasificacionFATCA VARCHAR(45), numeroGIIN VARCHAR(45),
    tieneRecidenciaFiscal VARCHAR(45), paisRecidenciaFiscal VARCHAR(45), tipoIdentificacionTributaria VARCHAR(45),
    numeroIdentificacionTributaria VARCHAR(45))
    
		BEGIN
			UPDATE recidenciaFiscal AS A
			SET A.personaEEUU = personaEEUU, A.personaEspecíficaEEUU = personaEspecíficaEEUU, A.IdTributarioEEUU = IdTributarioEEUU,
            A.OpcionesLista = OpcionesLista, A.clasificacionFATCA = clasificacionFATCA, A.numeroGIIN = numeroGIIN,
            A.tieneRecidenciaFiscal = tieneRecidenciaFiscal, A.paisRecidenciaFiscal = paisRecidenciaFiscal,
            A.tipoIdentificacionTributaria = tipoIdentificacionTributaria, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteJuridico = codClienteJuridico;

		END$$
        
DELIMITER ;
DROP PROCEDURE updateRecidenciaFiscal;
CALL updateRecidenciaFiscal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL updateRecidenciaFiscal(901801745, 0, 0, '','','', 0, 0, '','','');
SELECT * FROM recidenciaFiscal