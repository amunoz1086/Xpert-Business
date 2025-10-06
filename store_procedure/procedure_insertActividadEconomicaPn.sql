DELIMITER $$
	CREATE PROCEDURE insertActividadEconomicaPn (IN codClienteNatural VARCHAR(45), profesion VARCHAR(45), ocupacion VARCHAR(45), nombreEstablecimiento VARCHAR(45), departamentoEstablecimiento VARCHAR(45),
    ciudadEstablecimiento VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), CIIU VARCHAR(45), inicioActividadAño VARCHAR(45), inicioActividadMes VARCHAR(45), cargoActual VARCHAR(45),
    fuentePrincipalIngreso VARCHAR(45))
		
        BEGIN
			INSERT INTO actividadEconomicaPn
			(codClienteNatural, profesion, ocupacion, nombreEstablecimiento, departamentoEstablecimiento, ciudadEstablecimiento, codPrefijoTelefonico, telefono, CIIU,
            inicioActividadAño, inicioActividadMes, cargoActual, fuentePrincipalIngreso)
			VALUES
			(codClienteNatural, profesion, ocupacion, nombreEstablecimiento, departamentoEstablecimiento, ciudadEstablecimiento, codPrefijoTelefonico, telefono, CIIU,
            inicioActividadAño, inicioActividadMes, cargoActual, fuentePrincipalIngreso);
		END$$
        
DELIMITER ;
DROP PROCEDURE insertActividadEconomicaPn;
CALL insertActividadEconomicaPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL insertActividadEconomicaPn(80024797, 'Administrador', 'Independiente', 'DistriSuba', 'CO-DC', '11.001', '+57', '6012254970', 4755, 16, 1, 'Gerente', 'Distribución')