DELIMITER $$
	CREATE PROCEDURE updateDireccionActividad (IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45),
    viaPrincipal VARCHAR(45), viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)

        BEGIN
			UPDATE direccionActividad AS A
            SET A.codEnte = codEnte, A.codDepartamento = codDepartamento, A.codCiudad = codCiudad, A.codDireccion = codDireccion,
            A.viaPrincipal = viaPrincipal, A.viaSecundaria = viaSecundaria, A.numeroInmueble = numeroInmueble, A.referenciaUbicacion = referenciaUbicacion
			WHERE A.codEnte = codEnte;
		END$$
        
DELIMITER ;
DROP PROCEDURE updateDireccionActividad;
CALL updateDireccionActividad(?, ?, ?, ?, ?, ?, ?, ?);
CALL updateDireccionActividad(80024796, 'CO-DC', '11.001', 1, '1', '10', '15', 'Los Lagartos');
SELECT * FROM direccionActividad;