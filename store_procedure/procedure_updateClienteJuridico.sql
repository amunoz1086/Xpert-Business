DELIMITER $$
	CREATE PROCEDURE updateClienteJuridico (IN nit INT, razonSocial VARCHAR(80), fechaConstitucion DATE,
    codPaisConstitucion VARCHAR(45), codCiiu VARCHAR(200), codSectorEconomico VARCHAR(45), codCategoriaCompañia VARCHAR(45),
    codTipoSociedad VARCHAR(45), numeroSocios INT, numeroEmpleados INT, numeroSucursales INT, codTipoEmpresa VARCHAR(45),
    codPrefijoTelefonico VARCHAR(45), telefonoClienteJuridico VARCHAR(45), paginaWeb VARCHAR(45), correoElectronico VARCHAR(45),
    envioCorrespondencia VARCHAR(45), envioRACT VARCHAR(45), fechaCorteEstadoCuenta INT, grupoCoomeva VARCHAR(45),
    antiguedadGrupoCoomeva VARCHAR(45), GECC VARCHAR(45), situacionImpositiva VARCHAR(45), codUsu CHAR(15))
		BEGIN
			UPDATE clienteJuridico AS A
			SET A.nit = nit, A.razonSocial = razonSocial, A.fechaConstitucion = fechaConstitucion, A.codPaisConstitucion = codPaisConstitucion,
            A.codCiiu = codCiiu, A.codSectorEconomico = codSectorEconomico, A.codCategoriaCompañia = codCategoriaCompañia,
            A.codTipoSociedad = codTipoSociedad, A.numeroSocios = numeroSocios, A.numeroEmpleados = numeroEmpleados,
            A.numeroSucursales = numeroSucursales, A.codTipoEmpresa = codTipoEmpresa, A.codPrefijoTelefonico = codPrefijoTelefonico,
            A.telefonoClienteJuridico = telefonoClienteJuridico, A.paginaWeb = paginaWeb, A.correoElectronico = correoElectronico,
            A.envioCorrespondencia = envioCorrespondencia, A.envioRACT = envioRACT, A.fechaCorteEstadoCuenta = fechaCorteEstadoCuenta,
            A.grupoCoomeva = grupoCoomeva, A.antiguedadGrupoCoomeva = antiguedadGrupoCoomeva, A.GECC = GECC,
            A.situacionImpositiva = situacionImpositiva, A.codUsu = codUsu
			WHERE A.nit = nit;
		END$$
DELIMITER ;
DROP PROCEDURE updateClienteJuridico;
CALL updateClienteJuridico(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
SELECT * FROM clienteJuridico;