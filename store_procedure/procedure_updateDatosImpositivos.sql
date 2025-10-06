DELIMITER $$
	CREATE PROCEDURE updateDatosImpositivos (IN codClienteJuridico VARCHAR(45), codEnte VARCHAR(45), desempeñaDesempeño VARCHAR(45),
    relacionDependencia VARCHAR(45), rol VARCHAR(45), fechaIngreso DATE, fechaSalida DATE)
		BEGIN
			UPDATE datosImpositivos AS A
			SET A.codClienteJuridico = codClienteJuridico, A.codEnte = codEnte, A.desempeñaDesempeño = desempeñaDesempeño,
            A.relacionDependencia = relacionDependencia, A.rol = rol, A.fechaIngreso = fechaIngreso, A.fechaSalida = fechaSalida
			WHERE A.codClienteJuridico = codClienteJuridico AND A.codEnte = codEnte;
		END$$
DELIMITER ;
DROP PROCEDURE updateDatosImpositivos;
CALL updateDatosImpositivos(?, ?, ?, ?, ?, ?, ?, ?);
CALL updateDatosImpositivos(901801701, 1020322544, 0, 2, 2, '2020-11-19', '2023-11-19');
SELECT * FROM datosImpositivos;
