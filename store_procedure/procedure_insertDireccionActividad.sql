DELIMITER $$
	CREATE PROCEDURE insertDireccionActividad (IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45), viaPrincipal VARCHAR(45),
    viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)
		
        BEGIN
			INSERT INTO direccionActividad
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion)
			VALUES
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion);
		END$$
        
DELIMITER ;
DROP PROCEDURE insertDireccionActividad;
CALL insertDireccionActividad(?, ?, ?, ?, ?, ?, ?, ?);
CALL insertDireccionActividad(80024796, 'CO-DC', '11.001', 1, '1', '10', '15', 'Los Lagartos');