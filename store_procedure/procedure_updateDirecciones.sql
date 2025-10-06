DELIMITER $$
	CREATE PROCEDURE updateDirecciones (IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45),
    viaPrincipal VARCHAR(45), viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)
		BEGIN
			UPDATE direcciones  AS A
			SET A.codEnte = codEnte, A.codDepartamento = codDepartamento, A.codCiudad = codCiudad, A.codDireccion = codDireccion,
            A.viaPrincipal = viaPrincipal, A.viaSecundaria = viaSecundaria, A.numeroInmueble = numeroInmueble, A.referenciaUbicacion = referenciaUbicacion
			WHERE A.codEnte = codEnte;
		END$$
DELIMITER ;
DROP PROCEDURE updateDirecciones;
CALL updateDirecciones(?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertDirecciones(901801745, 'CO-VAC', '76.113', '01', '6', '29A', '6', 'Zona 1');
SELECT * FROM direcciones;
