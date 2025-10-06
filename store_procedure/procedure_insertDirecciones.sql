DELIMITER $$
	CREATE PROCEDURE insertDirecciones (IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45), viaPrincipal VARCHAR(45), viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)
		BEGIN
			INSERT INTO direcciones 
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion)
			VALUES
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion);
		END$$
DELIMITER ;
DROP PROCEDURE insertDirecciones;
CALL insertDirecciones(?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertDirecciones(901801745, 'CO-VAC', '76.113', '01', '6', '29A', '6', 'Zona 1');