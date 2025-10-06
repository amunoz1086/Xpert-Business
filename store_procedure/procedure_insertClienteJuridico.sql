DELIMITER $$
	CREATE PROCEDURE insertClienteJuridico (IN digitoVerificacion INT, nit INT, razonSocial VARCHAR(80), fechaConstitucion DATE, codPaisConstitucion VARCHAR(45), codCiiu VARCHAR(200), codSectorEconomico VARCHAR(45), codCategoriaCompañia VARCHAR(45), codTipoSociedad VARCHAR(45), numeroSocios INT, numeroEmpleados INT, numeroSucursales INT, codTipoEmpresa VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoClienteJuridico VARCHAR(45), paginaWeb VARCHAR(45), correoElectronico VARCHAR(45), envioCorrespondencia VARCHAR(45), envioRACT VARCHAR(45), fechaCorteEstadoCuenta INT, grupoCoomeva VARCHAR(45), antiguedadGrupoCoomeva VARCHAR(45), GECC VARCHAR(45), situacionImpositiva VARCHAR(45), tipopersona CHAR(2), codUsu CHAR(15))
		BEGIN
			INSERT INTO clienteJuridico
			(digitoVerificacion, nit, razonSocial, fechaConstitucion, codPaisConstitucion, codCiiu, codSectorEconomico, codCategoriaCompañia, codTipoSociedad, numeroSocios, numeroEmpleados, numeroSucursales, codTipoEmpresa, codPrefijoTelefonico, telefonoClienteJuridico, paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva, tipopersona, codUsu)
			VALUES
			(digitoVerificacion, nit, razonSocial, fechaConstitucion, codPaisConstitucion, codCiiu, codSectorEconomico, codCategoriaCompañia, codTipoSociedad, numeroSocios, numeroEmpleados, numeroSucursales, codTipoEmpresa, codPrefijoTelefonico, telefonoClienteJuridico, paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva, tipopersona, codUsu);
		END$$
DELIMITER ;
DROP PROCEDURE insertClienteJuridico;
CALL insertClienteJuridico(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
-- CALL insertClienteJuridico(5, 901801745,'Cooperativa Agripollos','2023-01-05', 'CO', 1020, 34, 5, 14, 4, 120, 3, '01','+57', '6022293959', 'www.agripollo.com', 'servicio@agripollos.com', 'Tipo_1', 'Envio_1', 5, 1, '15', 0, 0, '20', 'mapo1982');