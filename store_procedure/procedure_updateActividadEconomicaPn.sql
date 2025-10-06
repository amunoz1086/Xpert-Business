DELIMITER $$
	CREATE PROCEDURE updateActividadEconomicaPn (IN codClienteNatural VARCHAR(45), profesion VARCHAR(45), ocupacion VARCHAR(45),
    nombreEstablecimiento VARCHAR(45), departamentoEstablecimiento VARCHAR(45), ciudadEstablecimiento VARCHAR(45), codPrefijoTelefonico VARCHAR(45),
    telefono VARCHAR(45), CIIU VARCHAR(45), inicioActividadAño VARCHAR(45), inicioActividadMes VARCHAR(45), cargoActual VARCHAR(45),
    fuentePrincipalIngreso VARCHAR(45))
		
        BEGIN
			UPDATE actividadEconomicaPn AS A
			SET A.profesion = profesion, A.ocupacion = ocupacion, A.nombreEstablecimiento = nombreEstablecimiento,
            A.departamentoEstablecimiento = departamentoEstablecimiento, A.ciudadEstablecimiento = ciudadEstablecimiento,
            A.codPrefijoTelefonico = codPrefijoTelefonico, A.telefono = telefono, A.CIIU = CIIU, A.inicioActividadAño = inicioActividadAño,
            A.inicioActividadMes = inicioActividadMes, A.cargoActual = cargoActual, A.fuentePrincipalIngreso = fuentePrincipalIngreso
			WHERE A.codClienteNatural = codClienteNatural;
		END$$
        
DELIMITER ;
DROP PROCEDURE updateActividadEconomicaPn;
CALL updateActividadEconomicaPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL updateActividadEconomicaPn(80024797, 'Administrador', 'Independiente', 'DistriSuba', 'CO-DC', '11.001', '+57', '6012254970', 4755, 16, 1, 'ADMINISTRADOR', 'Distribución');
SELECT * FROM actividadEconomicaPn;