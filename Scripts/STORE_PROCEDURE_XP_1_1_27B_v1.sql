USE `ORIGINADOR_XP`;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionProducto`$$
CREATE PROCEDURE `agrupacionProducto`()
BEGIN
			SELECT 
				ROW_NUMBER() OVER (ORDER BY codAgrupador) AS id,
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			B.codProducto,
    			IF(B.codProducto = 3, '3 - CUENTA CORRIENTE', '4 - CUENTA DE AHORROS') AS Producto,
    			JSON_ARRAYAGG(C.codSubProducto) AS SubProducto
			FROM agrupaciones AS A
			JOIN parametrosProducto AS B 
    			ON B.codAgrupador = A.codAgrupador
			JOIN parametrosSubProducto AS C 
    			ON C.codProducto = B.codProducto AND C.codAgrupador = A.codAgrupador
			GROUP BY 
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			B.codProducto;
			END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionProductoFiltro`$$
CREATE PROCEDURE `agrupacionProductoFiltro`(IN pGRUPO VARCHAR(2), pPRODUCTO INT)
BEGIN
			SELECT 
				ROW_NUMBER() OVER (ORDER BY codAgrupador) AS id,
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			B.codProducto,
    			IF(B.codProducto = 3, '3 - CUENTA CORRIENTE', '4 - CUENTA DE AHORROS') AS Producto,
    			JSON_ARRAYAGG(C.codSubProducto) AS SubProducto
			FROM agrupaciones AS A
			JOIN parametrosProducto AS B 
    			ON B.codAgrupador = A.codAgrupador
			JOIN parametrosSubProducto AS C 
    			ON C.codProducto = B.codProducto AND C.codAgrupador = A.codAgrupador
			WHERE A.codAgrupador = pGRUPO AND B.codProducto = pPRODUCTO
			GROUP BY 
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			B.codProducto;
			END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionRol`$$
CREATE PROCEDURE `agrupacionRol`()
BEGIN
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion,
    			B.titular,
    			B.firmante,
    			B.secundario,
    			B.cotitular,
    			B.mensaje
			FROM agrupaciones AS A
			JOIN parametrosRol AS B 
				ON B.codAgrupador = A.codAgrupador;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionRolFiltro`$$
CREATE PROCEDURE `agrupacionRolFiltro`(IN pGRUPO VARCHAR(4))
BEGIN
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion,
    			B.titular,
    			B.firmante,
    			B.secundario,
    			B.cotitular,
    			B.mensaje
			FROM agrupaciones AS A
			JOIN parametrosRol AS B 
				ON B.codAgrupador = A.codAgrupador
			WHERE A.codAgrupador = pGRUPO;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionTipoCompania`$$
CREATE PROCEDURE `agrupacionTipoCompania`()
BEGIN
			SELECT 
				ROW_NUMBER() OVER (ORDER BY codAgrupador) AS id,
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			C.TIPOCLI,
    			JSON_ARRAYAGG(B.codCompania) AS codCompania
			FROM agrupaciones AS A
			JOIN parametrosTipoCompania AS B 
    			ON B.codAgrupador = A.codAgrupador
			JOIN tipo_cliente AS C
				ON C.COD_TIPO_CLIENTE = A.codTipoPersona
			GROUP BY 
    			A.codAgrupador,
    			A.agrupacionDescripcion,
    			A.codTipoPersona;
			END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionTipoCompaniaFiltro`$$
CREATE PROCEDURE `agrupacionTipoCompaniaFiltro`(IN pPERSONA INT, pTIPOCOMPANIA INT)
BEGIN
			DECLARE filtroTipoCompania BOOLEAN DEFAULT TRUE;
            SET filtroTipoCompania = (pPERSONA = 2);
            
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion, 
				A.codTipoPersona, B.codCompania
			FROM agrupaciones AS A
			JOIN parametrosTipoCompania AS B ON B.codAgrupador = A.codAgrupador
			WHERE A.codTipoPersona = pPERSONA
            AND ( filtroTipoCompania = FALSE OR B.codCompania = pTIPOCOMPANIA );
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionTitularidad`$$
CREATE PROCEDURE `agrupacionTitularidad`()
BEGIN
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion,
    			B.codTitularidad
			FROM agrupaciones AS A
			JOIN parametrosTitularidad AS B 
				ON B.codAgrupador = A.codAgrupador;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `agrupacionTitularidadFiltro`$$
CREATE PROCEDURE `agrupacionTitularidadFiltro`(IN pGRUPO VARCHAR(2))
BEGIN
			SELECT 
				A.codAgrupador,
				A.agrupacionDescripcion,
    			B.codTitularidad
			FROM agrupaciones AS A
			JOIN parametrosTitularidad AS B 
				ON B.codAgrupador = A.codAgrupador
			WHERE A.codAgrupador = pGRUPO;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `buscarRegional`$$
CREATE PROCEDURE `buscarRegional`(IN COD INT)
BEGIN
			SELECT REGIONAL_RAD FROM regional
			WHERE COD_REGIONAL_RAD = COD;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `crear_o_recuperar_sesion`$$
CREATE PROCEDURE `crear_o_recuperar_sesion`(IN p_usuario_id VARCHAR(15), IN p_usuario_ip VARCHAR(15), OUT p_token VARCHAR(255), OUT p_mensaje VARCHAR(255), OUT p_ip VARCHAR(15), OUT p_sessionActiva BOOLEAN)
BEGIN
			DECLARE v_token_existente VARCHAR(255);
			DECLARE v_ip VARCHAR(15);
			-- Verificar si el usuario ya tiene una sesión
			SELECT token, user_ip INTO v_token_existente, v_ip
			FROM sessions
			WHERE user_id = p_usuario_id
			LIMIT 1;
    
			IF v_token_existente IS NOT NULL THEN
				-- Si ya tiene una sesión, devolver el token y un mensaje
				SET p_token = v_token_existente;
				SET p_mensaje = 'El usuario ya tiene una sesión abierta.';
				SET p_ip = v_ip;
				SET p_sessionActiva=TRUE;
			ELSE
				-- Si no tiene una sesión, crear una nueva sesión
				INSERT INTO sessions (user_id, user_ip, token)
				VALUES (p_usuario_id, p_usuario_ip, MD5(CONCAT(NOW(), RAND()))); -- Usar MD5 solo como ejemplo, en la práctica usar algo más seguro
        
				-- Obtener el token de la nueva sesión
				SELECT token INTO p_token
				FROM sessions
				WHERE user_id = p_usuario_id
				ORDER BY created_at DESC
				LIMIT 1;

				SET p_mensaje = 'Se creó la sesión con éxito.';
			END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deleteFrecuenciaNomina`$$
CREATE PROCEDURE `deleteFrecuenciaNomina`(IN IDPN INT)
BEGIN
			DELETE FROM frecuenciaNomina
            WHERE idfrecuenciaNomina = IDPN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deleteGastosDirectosOficina`$$
CREATE PROCEDURE `deleteGastosDirectosOficina`(IN IDPN INT)
BEGIN
			DELETE FROM gastosDirectosOficina
            WHERE idgastosDirectosOficina = IDPN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deleteGastosDirectosPse`$$
CREATE PROCEDURE `deleteGastosDirectosPse`(IN IDPN INT)
BEGIN
			DELETE FROM gastosDirectosPse
            WHERE idgastosDirectosPse = IDPN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deleteNegociarNomina`$$
CREATE PROCEDURE `deleteNegociarNomina`(IN IDPN INT)
BEGIN
			DELETE FROM negociarNomina
            WHERE idnegociarNomina = IDPN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deletePagoTerseros`$$
CREATE PROCEDURE `deletePagoTerseros`(IN IDPN INT)
BEGIN
			DELETE FROM pagoTerseros
            WHERE idpagoTerseros = IDPN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deleteParametrosEfecty`$$
CREATE PROCEDURE `deleteParametrosEfecty`(IN ID INT)
BEGIN
			DELETE FROM ParametrosEfecty
            WHERE idParametrosEfecty = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deletePerfilUsuario`$$
CREATE PROCEDURE `deletePerfilUsuario`(USU VARCHAR(45))
BEGIN
			DELETE FROM perfiles_usuario
			WHERE USUARIO = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deletePlanRemuneracion`$$
CREATE PROCEDURE `deletePlanRemuneracion`(IN ID INT)
BEGIN
			DELETE FROM planRemuneracion
			WHERE idplanRemuneracion = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deletePromedioNomina`$$
CREATE PROCEDURE `deletePromedioNomina`(IN IDPN INT)
BEGIN
			DELETE FROM promedioNomina
            WHERE idpromedioNomina = IDPN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `deleteUsuario`$$
CREATE PROCEDURE `deleteUsuario`(IN id CHAR(15))
BEGIN
    		DELETE FROM usuario WHERE USUARIO = id;
            CALL deletePerfilUsuario(id);
            CALL queryDeleteParametrizador(id);
            CALL queryDeleteEnte (id);
    	END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `detalleLineaCredio`$$
CREATE PROCEDURE `detalleLineaCredio`()
BEGIN
			SELECT
				ROW_NUMBER() OVER (ORDER BY codLinea) AS id,
				A.codLinea,
				B.linea,
				IF(A.codTasa = 45, (SELECT JSON_ARRAYAGG(codTasa) AS codTasa FROM tipo_tasa WHERE codLinea = A.codLinea),
				JSON_ARRAY(A.codTasa)
				) AS codTasa,
				A.codSpreadMin,
				A.codSpreadMax,
				A.codPlazoMin,
				A.codPlazoMax,
				(SELECT JSON_ARRAYAGG(codCapital) AS codCapital FROM frecuenciaCapital WHERE codLinea = A.codLinea) AS codCapital,
				(SELECT JSON_ARRAYAGG(codInteres) AS codInteres FROM frecuenciaInteres WHERE codLinea = A.codLinea) AS codInteres,
				(SELECT JSON_ARRAYAGG(codPeriodo) AS codPeriodo FROM periodoGracia WHERE codLinea = A.codLinea) AS codPeriodo
			FROM detalleLineaCredito AS A
			JOIN lineaCredito AS B ON B.idlineaCredito = A.codLinea;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `eliminarControlVersionPlan`$$
CREATE PROCEDURE `eliminarControlVersionPlan`(IN pPlan INT, pCoPlan CHAR(6))
BEGIN
			DELETE FROM controlVersionPlan
			WHERE plan = pPlan AND codPlan = pCoPlan;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `eliminarInclusionPlan`$$
CREATE PROCEDURE `eliminarInclusionPlan`(IN pPlan INT, pCoPlan CHAR(6))
BEGIN
			DELETE FROM inclusionPlan
			WHERE plan = pPlan AND codPlan = pCoPlan;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `eliminarPlan`$$
CREATE PROCEDURE `eliminarPlan`(IN pPlan INT)
BEGIN
			DELETE FROM planes
			WHERE plan = pPlan;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `eliminarRangoPlanes`$$
CREATE PROCEDURE `eliminarRangoPlanes`(IN pPlan INT, pCoPlan CHAR(6))
BEGIN
			DELETE FROM rangoPlanes
			WHERE plan = pPlan AND codPlan = pCoPlan;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertAccionistasPj`$$
CREATE PROCEDURE `insertAccionistasPj`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoAccionista VARCHAR(45), porcentajeParticipacion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
BEGIN
			INSERT INTO accionistasPj 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoAccionista, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoAccionista, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertAccionistasPn`$$
CREATE PROCEDURE `insertAccionistasPn`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codTipoAccionista VARCHAR(45), porcentajeParticipacion VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
BEGIN
			INSERT INTO accionistasPn 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoAccionista, porcentajeParticipacion, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoAccionista, porcentajeParticipacion, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertActividadEconomicaPn`$$
CREATE PROCEDURE `insertActividadEconomicaPn`(IN codClienteNatural VARCHAR(45), profesion VARCHAR(45), ocupacion VARCHAR(45), nombreEstablecimiento VARCHAR(45), departamentoEstablecimiento VARCHAR(45),
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

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertAgrupacionProducto`$$
CREATE PROCEDURE `insertAgrupacionProducto`(IN pAgrupador VARCHAR(2), pProducto INT, pSubproducto INT)
BEGIN
			INSERT INTO parametrosSubProducto (codAgrupador,  codProducto, codSubProducto)
            VALUES
            (pAgrupador, pProducto, pSubproducto);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertAgrupacionRol`$$
CREATE PROCEDURE `insertAgrupacionRol`(
	IN pGrupo VARCHAR(2),
    IN pCampo VARCHAR(10),
    IN pValor VARCHAR(255)
)
BEGIN
    DECLARE sql_query TEXT;

    SET @sql_query = CONCAT(
        'UPDATE parametrosRol SET ',
        pCampo, ' = "', pValor, '" WHERE codAgrupador = \'', pGrupo, '\''
    );

    PREPARE stmt FROM @sql_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertAgrupacionTitularidad`$$
CREATE PROCEDURE `insertAgrupacionTitularidad`(IN pAgrupador VARCHAR(2), pTitularidad CHAR(1))
BEGIN
			UPDATE parametrosTitularidad
            SET codTitularidad = pTitularidad
			WHERE codAgrupador = pAgrupador;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertAgrupadores`$$
CREATE PROCEDURE `insertAgrupadores`(IN pAgrupador VARCHAR(2), pCompania INT)
BEGIN
			INSERT INTO parametrosTipoCompania (codAgrupador, codCompania)
            VALUES
            (pAgrupador, pCompania);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertAsignacionSobregiro`$$
CREATE PROCEDURE `insertAsignacionSobregiro`(
		IN pCLIENTID VARCHAR(255),
		IN pNCUENTA VARCHAR(255),
		IN pTSOBREGIRO VARCHAR(255), 
		IN pVIGENCIA VARCHAR(255),
		IN pMONTO DECIMAL(10,2),
		IN pFAPROBACION DATE,
		IN pFVENCIMIENTO DATE,
		IN pACTA VARCHAR(255),
		IN pUSU VARCHAR(15),
		IN pEdoSolicitud VARCHAR(255)
	)
BEGIN
			INSERT INTO cupo_sobregiro
			(cliente_id, numero_cuenta, tipo_sobregiro, dias_vigencia, monto, fecha_aprobacion, fecha_vencimiento, acta_aprobacion_id, usuario_radicador, fecha_solicitud_inicial, estado_solicitud)
			VALUES
			(pCLIENTID, pNCUENTA, pTSOBREGIRO, pVIGENCIA, pMONTO, pFAPROBACION, pFVENCIMIENTO, pACTA, pUSU, DATE(NOW()), pEdoSolicitud);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertBeneficiariosPJ`$$
CREATE PROCEDURE `insertBeneficiariosPJ`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), porcentajeParticipacion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
BEGIN
			INSERT INTO beneficiariosPJ 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, porcentajeParticipacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertBeneficiariosPn`$$
CREATE PROCEDURE `insertBeneficiariosPn`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), porcentajeBeneficio VARCHAR(45), responsableFiscalEEUU VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
BEGIN
			INSERT INTO beneficiariosPn 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, porcentajeBeneficio, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, porcentajeBeneficio, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertCIIU`$$
CREATE PROCEDURE `insertCIIU`(IN COD CHAR(8), VAL TEXT, USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_CIIU
				(CIIU, CIIUDescripcion, codUsu)
			VALUES
				(COD, VAL, USU);
                
			SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_actividad_ec';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertCiudades`$$
CREATE PROCEDURE `insertCiudades`(IN COD INT, VAL VARCHAR(45), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
        
			INSERT INTO list_Ciudades
				(codCiudad, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
                
			SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_ciudad';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertClienteJuridico`$$
CREATE PROCEDURE `insertClienteJuridico`(IN digitoVerificacion INT, nit INT, razonSocial VARCHAR(80), fechaConstitucion DATE, codPaisConstitucion VARCHAR(45), codCiiu VARCHAR(200), codSectorEconomico VARCHAR(45), codCategoriaCompañia VARCHAR(45), codTipoSociedad VARCHAR(45), numeroSocios INT, numeroEmpleados INT, numeroSucursales INT, codTipoEmpresa VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoClienteJuridico VARCHAR(45), paginaWeb VARCHAR(45), correoElectronico VARCHAR(45), envioCorrespondencia VARCHAR(45), envioRACT VARCHAR(45), fechaCorteEstadoCuenta INT, grupoCoomeva VARCHAR(45), antiguedadGrupoCoomeva VARCHAR(45), GECC VARCHAR(45), situacionImpositiva VARCHAR(45), tipopersona CHAR(2), codUsu CHAR(15))
BEGIN
			INSERT INTO clienteJuridico
			(digitoVerificacion, nit, razonSocial, fechaConstitucion, codPaisConstitucion, codCiiu, codSectorEconomico, codCategoriaCompañia, codTipoSociedad, numeroSocios, numeroEmpleados, numeroSucursales, codTipoEmpresa, codPrefijoTelefonico, telefonoClienteJuridico, paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva, tipopersona, codUsu)
			VALUES
			(digitoVerificacion, nit, razonSocial, fechaConstitucion, codPaisConstitucion, codCiiu, codSectorEconomico, codCategoriaCompañia, codTipoSociedad, numeroSocios, numeroEmpleados, numeroSucursales, codTipoEmpresa, codPrefijoTelefonico, telefonoClienteJuridico, paginaWeb, correoElectronico, envioCorrespondencia, envioRACT, fechaCorteEstadoCuenta, grupoCoomeva, antiguedadGrupoCoomeva, GECC, situacionImpositiva, tipopersona, codUsu);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertClientePn`$$
CREATE PROCEDURE `insertClientePn`(IN tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45),
    paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45),
    primerNombre VARCHAR(45), segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), departamentoNacimiento VARCHAR(45), ciudadNacimiento VARCHAR(45),
    fechaNacimiento DATE, codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45), sexo VARCHAR(45), nacionalidad1 VARCHAR(45),
    nacionalidad2 VARCHAR(45), edoCivil VARCHAR(45), tieneDiscapacidad VARCHAR(45), tipoDiscapacidad VARCHAR(45), oficina VARCHAR(45), oficialOficina VARCHAR(45),
    situacionImpositiva VARCHAR(45), desempeñoCargoPEP VARCHAR(45), tipoPEP VARCHAR(45), perteneceGrupoEtnico VARCHAR(45), tipopersona INT, codUsu CHAR(15))
BEGIN
			INSERT INTO clienteNatural
			(tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, paisExpedicion, departamentoExpedicion,
			ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, departamentoNacimiento,
            ciudadNacimiento, fechaNacimiento, codPrefijoTelefonico, telefono, correoElectronico, sexo, nacionalidad1, nacionalidad2,
            edoCivil, tieneDiscapacidad, tipoDiscapacidad, oficina, oficialOficina, situacionImpositiva, desempeñoCargoPEP, tipoPEP,
            perteneceGrupoEtnico, tipopersona, codUsu)
			VALUES
			(tipoDocumento, numeroIdentificacion, fechaExpedicion, lugarExpedicion, paisExpedicion, departamentoExpedicion,
			ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, departamentoNacimiento,
            ciudadNacimiento, fechaNacimiento, codPrefijoTelefonico, telefono, correoElectronico, sexo, nacionalidad1, nacionalidad2,
            edoCivil, tieneDiscapacidad, tipoDiscapacidad, oficina, oficialOficina, situacionImpositiva, desempeñoCargoPEP, tipoPEP,
            perteneceGrupoEtnico, tipopersona, codUsu);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertContactosAutorizados`$$
CREATE PROCEDURE `insertContactosAutorizados`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoContacto VARCHAR(45), correoElectronico VARCHAR(45))
BEGIN
			INSERT INTO contactosAutorizados 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoContacto, correoElectronico)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoContacto, correoElectronico);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertControlantes`$$
CREATE PROCEDURE `insertControlantes`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
BEGIN
			INSERT INTO controlantes 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, primerApellido, segundoApellido, primerNombre, segundoNombre, responsableFiscalEEUU, numeroIdentificacionTributaria);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertCorresponsales`$$
CREATE PROCEDURE `insertCorresponsales`(IN COR VARCHAR(45), PLE DECIMAL(7,1), EST INT, PRO INT, USU CHAR(15))
BEGIN
			INSERT INTO corresponsales (corresponsales, tarifaPlena, estado, ticket_promedio, cod_usu)
			VALUES(COR, PLE, EST, PRO, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDataBuzon`$$
CREATE PROCEDURE `insertDataBuzon`(IN SOLI INT, BUZON VARCHAR(9), DESCRIP VARCHAR(100), USU CHAR(15))
BEGIN
			INSERT INTO controlBuzon (cod_solicitud, buzon, descripcion, cod_usu)
			VALUES (SOLI, BUZON, DESCRIP, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDataFile`$$
CREATE PROCEDURE `insertDataFile`(IN SOLI INT, CED VARCHAR(50), RUT VARCHAR(50), CER VARCHAR(50), FRM VARCHAR(50), CON VARCHAR(50), B6 VARCHAR(45), B7 VARCHAR(45), B8 VARCHAR(45), B9 VARCHAR(45), B10 VARCHAR(45), B11 VARCHAR(45), B12 VARCHAR(45), B13 VARCHAR(45), B14 VARCHAR(45), B15 VARCHAR(45), B16 VARCHAR(45), B17 VARCHAR(45), B18 VARCHAR(45), B19 VARCHAR(45), B20 VARCHAR(45), B21 VARCHAR(45), B22 VARCHAR(45), B23 VARCHAR(45), USU CHAR(15))
BEGIN
			INSERT INTO controlDocumentos (cod_solicitud, docCedula, docRut, docCertificado, docFormato, docContrato, docBuzon6, docBuzon7, docBuzon8, docBuzon9, docBuzon10, docBuzon11, docBuzon12, docBuzon13, docBuzon14, docBuzon15, docBuzon16, docBuzon17, docBuzon18, docBuzon19, docBuzon20, docBuzon21, docBuzon22, docBuzon23, cod_usu)
			VALUES (SOLI, CED, RUT, CER, FRM, CON, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18, B19, B20, B21, B22, B23, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDataRemi`$$
CREATE PROCEDURE `insertDataRemi`(IN REMI LONGTEXT, USU VARCHAR(15))
BEGIN
			INSERT INTO remi (contenidoRemi, id_user)
			VALUES(REMI, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDatosImpositivos`$$
CREATE PROCEDURE `insertDatosImpositivos`(IN codClienteJuridico VARCHAR(45), codEnte VARCHAR(45), desempeñaDesempeño VARCHAR(45), relacionDependencia VARCHAR(45), rol VARCHAR(45), fechaIngreso DATE, fechaSalida DATE)
BEGIN
			INSERT INTO datosImpositivos 
			(codClienteJuridico, codEnte, desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida)
			VALUES
			(codClienteJuridico, codEnte, desempeñaDesempeño, relacionDependencia, rol, fechaIngreso, fechaSalida);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDepartamentos`$$
CREATE PROCEDURE `insertDepartamentos`(IN COD INT, VAL VARCHAR(45), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_Departamentos
				(codDepto, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_provincia';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDetalleActivEcoPn`$$
CREATE PROCEDURE `insertDetalleActivEcoPn`(IN codClienteNatural VARCHAR(45), claseBalance VARCHAR(45), tipoBalance VARCHAR(45), FechaCorte VARCHAR(45), ventasBrutas VARCHAR(45),
    ingresoAnual VARCHAR(45), ingresoPGJ VARCHAR(45), egresoPGJ VARCHAR(45), activosBGJ VARCHAR(45), activos VARCHAR(45), pasivosBGJ VARCHAR(45), PatrimonioBGJ VARCHAR(45))
BEGIN
			INSERT INTO detalleActivEcoPn
			(codClienteNatural, claseBalance, tipoBalance, FechaCorte, ventasBrutas, ingresoAnual, ingresoPGJ, egresoPGJ, activosBGJ, activos, pasivosBGJ, PatrimonioBGJ)
			VALUES
			(codClienteNatural, claseBalance, tipoBalance, FechaCorte, ventasBrutas, ingresoAnual, ingresoPGJ, egresoPGJ, activosBGJ, activos, pasivosBGJ, PatrimonioBGJ);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDireccion`$$
CREATE PROCEDURE `insertDireccion`(IN COD CHAR(5), VAL VARCHAR(10), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_Direccion
				(codListDirecc, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_tipo_via';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDireccionActividad`$$
CREATE PROCEDURE `insertDireccionActividad`(IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45), viaPrincipal VARCHAR(45),
    viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)
BEGIN
			INSERT INTO direccionActividad
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion)
			VALUES
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDirecciones`$$
CREATE PROCEDURE `insertDirecciones`(IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45), viaPrincipal VARCHAR(45), viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)
BEGIN
			INSERT INTO direcciones 
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion)
			VALUES
			(codEnte, codDepartamento, codCiudad, codDireccion, viaPrincipal, viaSecundaria, numeroInmueble, referenciaUbicacion);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDiscapacidad`$$
CREATE PROCEDURE `insertDiscapacidad`(IN COD INT, VAL VARCHAR(20), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_Discapacidad
				(codListDiscap, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_discapacidad';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertDocumentos`$$
CREATE PROCEDURE `insertDocumentos`(
    IN pDocumento VARCHAR(150), 
    IN pNombreCorto VARCHAR(50), 
    IN pCodigo VARCHAR(10),
    IN pCredito INT,
    IN pCuenta INT,
    IN pCdt INT,
    IN pNomina INT,
    IN pPagoTerceros INT,
    IN pRecaudoOficina INT,
    IN pRecaudoCorresponsal INT
    )
BEGIN
        INSERT INTO documentos (documento, nombreCorto, codigo, credito, cuenta, cdt, nomina, pagoTerceros, recaudoOficina, recaudoCorresponsal)
		VALUES
		(pDocumento, pNombreCorto, pCodigo, pCredito, pCuenta, pCdt, pNomina, pPagoTerceros, pRecaudoOficina, pRecaudoCorresponsal);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertEnteAprobacion`$$
CREATE PROCEDURE `insertEnteAprobacion`(IN COD INT, USU CHAR(15))
BEGIN
			INSERT INTO ente_aprobacion (COD_APROBADOR, USUARIO)
			VALUES(COD, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertEnteParametrizador`$$
CREATE PROCEDURE `insertEnteParametrizador`(IN COD INT, USU CHAR(15))
BEGIN
			INSERT INTO ente_parametrizacion (COD_PARAMETRIZADOR, USUARIO)
			VALUES(COD, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertEstadoCivil`$$
CREATE PROCEDURE `insertEstadoCivil`(IN COD CHAR(2), VAL CHAR(15), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_EstadoCivil
				(codListEdoCivil, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_ecivil';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertFechCorte`$$
CREATE PROCEDURE `insertFechCorte`(IN COD INT, VAL INT, USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_fechCorte
				(codfechCorte, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_fechas_corte';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertFrecuenciaCapital`$$
CREATE PROCEDURE `insertFrecuenciaCapital`(IN pLinea INT, pCapital INT)
BEGIN
			INSERT INTO frecuenciaCapital (codLinea, codCapital)
            VALUES
            (pLinea, pCapital);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertFrecuenciaInteres`$$
CREATE PROCEDURE `insertFrecuenciaInteres`(IN pLinea INT, pInteres INT)
BEGIN
			INSERT INTO frecuenciaInteres (codLinea, codInteres)
            VALUES
            (pLinea, pInteres);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertFrecuenciaNomina`$$
CREATE PROCEDURE `insertFrecuenciaNomina`(IN TIPO VARCHAR(45), USU VARCHAR(45))
BEGIN
			INSERT INTO frecuenciaNomina (tipo, usuario)
			values (TIPO, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertGastosDirectosOficina`$$
CREATE PROCEDURE `insertGastosDirectosOficina`(IN TIPO VARCHAR(100), USU VARCHAR(45))
BEGIN
			INSERT INTO gastosDirectosOficina (tipoGastosDirectosOficina, cod_user)
			VALUES (TIPO, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertGastosDirectosPse`$$
CREATE PROCEDURE `insertGastosDirectosPse`(IN TIPO VARCHAR(100), USU VARCHAR(45))
BEGIN
			INSERT INTO gastosDirectosPse (tipoGastosDirectosPse, cod_user)
			VALUES (TIPO, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertIncluirEnPlan`$$
CREATE PROCEDURE `insertIncluirEnPlan`(IN PLAN INT, CODPLAN CHAR(6), IDCLIE INT, EDOIN INT, USU CHAR(15))
BEGIN
			INSERT INTO inclusionPlan
				(plan, codPlan, idCliente, fechaNovedad, estadoInclusion, codUsu)
			VALUES
				(PLAN, CODPLAN, IDCLIE, CURDATE(), EDOIN, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertInformacionFinanciera`$$
CREATE PROCEDURE `insertInformacionFinanciera`(IN codClienteJuridico CHAR(9), periodo INT, ventasAnualesMM DECIMAL(10,2), gastosAnualesMM DECIMAL(10,2), activosMM DECIMAL(10,2), pasivosMM DECIMAL(10,2), capitalSocial DECIMAL(10,2), patrimonioMM DECIMAL(10,2), ingresosMensualesMM DECIMAL(10,2), egresosMensulesMM DECIMAL(10,2), ingresosNoOperacionalesMM DECIMAL(10,2), ventasAnuales DOUBLE, gastosAnuales DOUBLE, ingresosBrutosOrdinarias DOUBLE)
BEGIN
			INSERT INTO informacionFinanciera 
			(codClienteJuridico, periodo, ventasAnualesMM, gastosAnualesMM, activosMM, pasivosMM, capitalSocial, patrimonioMM, ingresosMensualesMM, egresosMensulesMM, ingresosNoOperacionalesMM, ventasAnuales, gastosAnuales, ingresosBrutosOrdinarias)
			VALUES
			(codClienteJuridico, periodo, ventasAnualesMM, gastosAnualesMM, activosMM, pasivosMM, capitalSocial, patrimonioMM, ingresosMensualesMM, egresosMensulesMM, ingresosNoOperacionalesMM, ventasAnuales, gastosAnuales, ingresosBrutosOrdinarias);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertJuntaDirectivaPj`$$
CREATE PROCEDURE `insertJuntaDirectivaPj`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoIntegrante VARCHAR(45))
BEGIN
			INSERT INTO juntaDirectivaPj 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoIntegrante)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, nombreRazonSocial, codTipoIntegrante);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertJuntaDirectivaPn`$$
CREATE PROCEDURE `insertJuntaDirectivaPn`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codTipoIntegrante VARCHAR(45))
BEGIN
			INSERT INTO juntaDirectivaPn 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoIntegrante)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codTipoIntegrante);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertJustificacionOficina`$$
CREATE PROCEDURE `insertJustificacionOficina`(IN COD_GASTO INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
BEGIN
            INSERT INTO justificacionOficina (codGastosDirectosOfi, tipoJustificacionOfi, permitirNegociar, tarifaPlena, cod_usu)
			VALUES (COD_GASTO, TIPO, PERMITIR, PLENA, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertJustificacionPse`$$
CREATE PROCEDURE `insertJustificacionPse`(IN COD_GASTO INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
BEGIN
            INSERT INTO justificacionPse (codGastosDirectosPse, tipoJustificacionPse, permitirNegociar, tarifaPlena, cod_usu)
			VALUES (COD_GASTO, TIPO, PERMITIR, PLENA, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertNegociarNomina`$$
CREATE PROCEDURE `insertNegociarNomina`(IN PAGO VARCHAR(45), PLENA DECIMAL(7,1), COSTO DECIMAL(7,1), CANT INT, NEGO INT, FORMULA VARCHAR(45), USU VARCHAR(45))
BEGIN
			INSERT INTO negociarNomina (pagoNomina, tarifaPlena, tarifaCosto, cantidad, permitirNegociar, formulaCalculo, usuario)
			values (PAGO, PLENA, COSTO, CANT, NEGO, FORMULA, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertNewPlan`$$
CREATE PROCEDURE `insertNewPlan`(IN pDescrip VARCHAR(90), ptipoPlan INT, USU CHAR(15))
BEGIN
			DECLARE vNewPlan INT;
            
			INSERT INTO planes
			(descripcionPlan, tipoPlan, codUsu)
			VALUES
			(pDescrip, ptipoPlan, USU);
            
            SET vNewPlan = LAST_INSERT_ID();
            CALL insertNewVersion(vNewPlan, USU);
            
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertNewRango`$$
CREATE PROCEDURE `insertNewRango`(IN pPlan INT, pCodPlan INT, pRango INT, pRangoMin BIGINT, pRangoMax BIGINT, pTasaEA DECIMAL(4,2), pFechaIni DATE, pestadoPlan INT, USU CHAR(15))
BEGIN
			INSERT INTO rangoPlanes
			(plan, codPlan, rango, rangoMin, rangoMax, tasaEA, fechaInicial, estadoPlan, codUsu)
			VALUES
			(pPlan, pCodPlan, pRango, pRangoMin, pRangoMax, pTasaEA, pFechaIni, pestadoPlan, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertNewVersion`$$
CREATE PROCEDURE `insertNewVersion`(IN pPlan INT, USU CHAR(15))
BEGIN
			DECLARE vValVer INT;
            DECLARE vNewVer INT;
            DECLARE vNewCodPlan CHAR(6);
            DECLARE vRowAffec INT;
            
            SELECT max(version) INTO vValVer FROM controlVersionPlan WHERE plan = pPlan;
            IF isnull(vValVer) = 1 THEN
				SET vNewVer = 1;
			ELSE
				SET vNewVer = vValVer + 1;
			END IF;
            SET vNewCodPlan = CONCAT(pPlan, vNewVer);
            
			INSERT INTO controlVersionPlan
			(plan, version, codPlan, codUsu)
			VALUES
			(pPlan, vNewVer, vNewCodPlan, USU);
            SET vRowAffec = ROW_COUNT();
            
            SELECT pPlan, vNewCodPlan AS codPlan, vRowAffec;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertOficina`$$
CREATE PROCEDURE `insertOficina`(IN COD INT, VAL VARCHAR(45), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
			
			INSERT INTO oficina
				(COD_OFICINA, OFICINA, codUsu)
			VALUES
				(COD, VAL, USU);
                
			SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_oficina';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertPagoTerseros`$$
CREATE PROCEDURE `insertPagoTerseros`(IN PAGO VARCHAR(45), TARIFA DECIMAL(7,1), USU VARCHAR(45))
BEGIN
			INSERT INTO pagoTerseros (pagoTerseros, tarifaPlena, usuario)
			values (PAGO, TARIFA, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertPaises`$$
CREATE PROCEDURE `insertPaises`(IN COD INT, VAL VARCHAR(45), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_Paises
				(codPais, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
                
			SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_pais';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertParametrosEfecty`$$
CREATE PROCEDURE `insertParametrosEfecty`(IN TIPO VARCHAR(80), USU VARCHAR(45))
BEGIN
			INSERT INTO ParametrosEfecty (ParametrosEfecty, cod_usu)
			VALUES (TIPO, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertPerfilUsuario`$$
CREATE PROCEDURE `insertPerfilUsuario`(IN PER INT, USU VARCHAR(45))
BEGIN
			INSERT INTO perfiles_usuario (COD_PERFIL, USUARIO)
			VALUES(PER, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertPeriodoGracia`$$
CREATE PROCEDURE `insertPeriodoGracia`(IN pLinea INT, pPeriodo INT)
BEGIN
			INSERT INTO periodoGracia (codLinea, codPeriodo)
            VALUES
            (pLinea, pPeriodo);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertPlanRemuneracion`$$
CREATE PROCEDURE `insertPlanRemuneracion`(IN PLAN VARCHAR(25), INFERIOR DECIMAL(14,0), MAXIMO DECIMAL(14,0), TASA DECIMAL(5,2), USU VARCHAR(45))
BEGIN
			INSERT INTO planRemuneracion (planRemuneracion, rangoInferior, rangoMaximo, tasaEA, cod_usu)
			VALUE (PLAN, INFERIOR, MAXIMO, TASA, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertPrefijoPais`$$
CREATE PROCEDURE `insertPrefijoPais`(IN pVAL TEXT)
BEGIN
			DECLARE vStatus INT;
            
            SET @vSQL = CONCAT('INSERT INTO list_PrefijoPais (codListPrefijoPais, codPais, codUsu) VALUES ', pVAL);
			
            PREPARE STMT FROM @vSQL;
			EXECUTE STMT;
			DEALLOCATE PREPARE STMT;
            
            UPDATE catalogos
				SET fechaUltima = curdate()
			WHERE catalogo = 'cl_ddi_pais';
            
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				SELECT 200 AS STATUS, COUNT(*) AS ROWCOUNT FROM list_PrefijoPais;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
            
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertPromedioNomina`$$
CREATE PROCEDURE `insertPromedioNomina`(IN TIPO VARCHAR(45), USU VARCHAR(45))
BEGIN
			INSERT INTO promedioNomina (tipo, usuario)
			values (TIPO, USU);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertRecidenciaFiscal`$$
CREATE PROCEDURE `insertRecidenciaFiscal`(IN codClienteJuridico VARCHAR(45), personaEEUU VARCHAR(45), personaEspecíficaEEUU VARCHAR(45), IdTributarioEEUU VARCHAR(45), OpcionesLista VARCHAR(45), clasificacionFATCA VARCHAR(45), numeroGIIN VARCHAR(45), tieneRecidenciaFiscal VARCHAR(45), paisRecidenciaFiscal VARCHAR(45), tipoIdentificacionTributaria VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
BEGIN
			INSERT INTO recidenciaFiscal 
			(codClienteJuridico, personaEEUU, personaEspecíficaEEUU, IdTributarioEEUU, OpcionesLista, clasificacionFATCA, numeroGIIN, tieneRecidenciaFiscal, paisRecidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria)
			VALUES
			(codClienteJuridico, personaEEUU, personaEspecíficaEEUU, IdTributarioEEUU, OpcionesLista, clasificacionFATCA, numeroGIIN, tieneRecidenciaFiscal, paisRecidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertRecidenciaFiscalPn`$$
CREATE PROCEDURE `insertRecidenciaFiscalPn`(IN codClienteNatural VARCHAR(45), residenciaFiscalColombia VARCHAR(45), residenciaFiscalEEUU VARCHAR(45), residenciFiscalOtroPais VARCHAR(45),
    paisResidenciaFiscal VARCHAR(45), tipoIdentificacionTributaria VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
BEGIN
			INSERT INTO recidenciaFiscalPn
			(codClienteNatural, residenciaFiscalColombia, residenciaFiscalEEUU, residenciFiscalOtroPais, paisResidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria)
			VALUES
			(codClienteNatural, residenciaFiscalColombia, residenciaFiscalEEUU, residenciFiscalOtroPais, paisResidenciaFiscal, tipoIdentificacionTributaria, numeroIdentificacionTributaria);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertReferenciasPn`$$
CREATE PROCEDURE `insertReferenciasPn`(IN codClienteNatural VARCHAR(45), cantidad INT, primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), fechaNacimiento DATE, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45),
    codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45))
BEGIN
			INSERT INTO referenciasPn
			(codClienteNatural, cantidad, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, fechaNacimiento, tipoDocumento, numeroIdentificacion,
            fechaExpedicion, lugarExpedicion, codPrefijoTelefonico, telefono, correoElectronico)
			VALUES
			(codClienteNatural, cantidad, primerApellido, segundoApellido, primerNombre, segundoNombre, paisNacimiento, fechaNacimiento, tipoDocumento, numeroIdentificacion,
            fechaExpedicion, lugarExpedicion, codPrefijoTelefonico, telefono, correoElectronico);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertRepresentanteLegal`$$
CREATE PROCEDURE `insertRepresentanteLegal`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoRepresentante VARCHAR(45), correoElectronico VARCHAR(45))
BEGIN
			INSERT INTO representanteLegal 
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoRepresentante, correoElectronico)
			VALUES
			(codClienteJuridico, cantidad, tipoDocumento, numeroIdentificacion, fechaExpedicion, paisExpedicion, departamentoExpedicion, ciudadExpedicion, primerApellido, segundoApellido, primerNombre, segundoNombre, codPrefijoTelefonico, telefonoRepresentante, correoElectronico);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertSector`$$
CREATE PROCEDURE `insertSector`(IN pVAL TEXT)
BEGIN
			DECLARE vStatus INT;

			SET @vSQL = CONCAT('INSERT INTO list_sectorEconomico (codSectorEconomico, descripcion, codUsu) VALUES ', pVAL);
			
            PREPARE STMT FROM @vSQL;
			EXECUTE STMT;
			DEALLOCATE PREPARE STMT;

			UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_sector_economico';

            SET vStatus = ROW_COUNT();

            IF vStatus > 0 THEN
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertSexo`$$
CREATE PROCEDURE `insertSexo`(IN COD CHAR(2), VAL CHAR(10), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
        
			INSERT INTO list_Sexo
				(codListSexo, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_sexo';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertTipoBalance`$$
CREATE PROCEDURE `insertTipoBalance`(IN COD CHAR(3), VAL VARCHAR(45), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
        
			INSERT INTO list_TipoBalance
				(codTipoBalence, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
                
			SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_tipo_balance';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertTipoDocumentos`$$
CREATE PROCEDURE `insertTipoDocumentos`(IN COD CHAR(3), VAL VARCHAR(45), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
        
			INSERT INTO list_TipoDocumento
				(codLista, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_tipo_documento_pj' AND catalogo = 'cl_tipo_documento_pn';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertTipoIdFiscal`$$
CREATE PROCEDURE `insertTipoIdFiscal`(IN COD VARCHAR(4), VAL VARCHAR(80), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
			
			INSERT INTO list_TipoIdFiscal
				(codTipoIdFiscal, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
			
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_tipo_id_fiscal';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertTipoSociedad`$$
CREATE PROCEDURE `insertTipoSociedad`(IN COD INT, VAL VARCHAR(45), USU CHAR(15))
BEGIN
			DECLARE vStatus INT;
            
			INSERT INTO list_TipoSociedad
				(codTipoSoc, descripcion, codUsu)
			VALUES
				(COD, VAL, USU);
                
			SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				UPDATE catalogos
                SET fechaUltima = curdate()
                WHERE catalogo = 'cl_tip_soc';
				SELECT 200 AS STATUS;
			ELSE
				SELECT 500 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertTipoTasa`$$
CREATE PROCEDURE `insertTipoTasa`(IN pLinea INT, pTasa INT)
BEGIN
			INSERT INTO tipo_tasa (codLinea, codTasa)
            VALUES
            (pLinea, pTasa);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `insertUsuario`$$
CREATE PROCEDURE `insertUsuario`(IN USU VARCHAR(15), NOM VARCHAR(80), COR VARCHAR(80), CAR INT, OFI INT, REG INT, CAN INT, PCLI INT, PPRO VARCHAR(100))
BEGIN
			INSERT INTO usuario ( USUARIO, NOMBRE, CORREO, COD_CARGO, COD_OFICINA, COD_REGIONAL, COD_CANAL, COD_PERF_CLIENTE, COD_PERF_PRODUCTO)
			VALUES(USU, NOM, COR, CAR, OFI, REG, CAN, PCLI, PPRO);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarAsocCoomeva`$$
CREATE PROCEDURE `listarAsocCoomeva`()
BEGIN
			SELECT COD_ASOC, ASOC FROM asoc;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarCanal`$$
CREATE PROCEDURE `listarCanal`()
BEGIN
			SELECT COD_CANAL_RAD, CANAL_RAD FROM canal ORDER BY COD_CANAL_RAD ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarCargos`$$
CREATE PROCEDURE `listarCargos`()
BEGIN
			SELECT COD_CARGO, CARGO FROM cargos ORDER BY COD_CARGO ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarEstadoBanco`$$
CREATE PROCEDURE `listarEstadoBanco`()
BEGIN
			SELECT COD_ESTADO_BCO, ESTADO_BCO FROM estado_bco;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarEstadoCoomeva`$$
CREATE PROCEDURE `listarEstadoCoomeva`()
BEGIN
			SELECT COD_ESTADO_ASO, ESTADO_ASO FROM estado_aso;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarIbr`$$
CREATE PROCEDURE `listarIbr`()
BEGIN
			SELECT cod_ibr, ibr_descripcion FROM ibr_control;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarManejoCuota`$$
CREATE PROCEDURE `listarManejoCuota`()
BEGIN
			SELECT 
				codLista,
				descripcion
				FROM Listas
			WHERE lista = 'ManejoCuota';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarNaturaleza`$$
CREATE PROCEDURE `listarNaturaleza`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'Naturaleza';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarOficinas`$$
CREATE PROCEDURE `listarOficinas`()
BEGIN
			SELECT COD_OFICINA, concat(COD_OFICINA, " - ", OFICINA) AS OFICINA, REGIONAL
            FROM oficina ORDER BY COD_OFICINA ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarPerfil`$$
CREATE PROCEDURE `listarPerfil`()
BEGIN
			SELECT COD_PERFIL, PERFIL
            FROM perfiles 
            ORDER BY COD_PERFIL ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarRegional`$$
CREATE PROCEDURE `listarRegional`()
BEGIN
			SELECT COD_REGIONAL_RAD, REGIONAL_RAD FROM regional ORDER BY COD_REGIONAL_RAD ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarSector`$$
CREATE PROCEDURE `listarSector`()
BEGIN
			SELECT COD_SECTOR, NOMBRE FROM sector;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarTipoAprobador`$$
CREATE PROCEDURE `listarTipoAprobador`()
BEGIN
			SELECT cod_aprobador, tipo_aprobador FROM tipo_aprobador ORDER BY idtipo_aprobador ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarTipoCapitalizacion`$$
CREATE PROCEDURE `listarTipoCapitalizacion`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoCapitalizacion';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarTipoCliente`$$
CREATE PROCEDURE `listarTipoCliente`()
BEGIN
			SELECT COD_TIPO_CLIENTE, TIPOCLI FROM tipo_cliente;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarTipoContrato`$$
CREATE PROCEDURE `listarTipoContrato`()
BEGIN
			SELECT COD_TIP_CONTRATO, TIPO_CONTRATO FROM tipo_contrato;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `listarTipoPromedio`$$
CREATE PROCEDURE `listarTipoPromedio`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoPromedio';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `list_ProductosBancarios`$$
CREATE PROCEDURE `list_ProductosBancarios`()
BEGIN
			SELECT codProducto, descripcion FROM list_ProductosBancarios;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `procesoEliminarPlan`$$
CREATE PROCEDURE `procesoEliminarPlan`(IN pPlan INT, pCoPlan CHAR(6), pPlanContingencia INT)
BEGIN
			DECLARE vTipoPlan INT;
         DECLARE vPlan INT;
         DECLARE vVer INT;
         DECLARE vInclusion INT;
         DECLARE vRango INT;
            
         SELECT tipoPlan  INTO vTipoPlan
         FROM planes
         WHERE plan = pPlan;
            
			CALL eliminarPlan(pPlan);
            IF ROW_COUNT() > 0 THEN
				SET vplan = 1;
            END IF;
            
            CALL eliminarControlVersionPlan(pPlan, pCoPlan);
            IF ROW_COUNT() > 0 THEN
				SET vVer = 1;
            END IF;
            
            IF vTipoPlan = 1 THEN
				CALL eliminarInclusionPlan(pPlan, pCoPlan);
				IF ROW_COUNT() > 0 THEN
					SET vInclusion = 1;
				END IF;
            END IF;
            
            CALL eliminarRangoPlanes(pPlan, pCoPlan);
            IF ROW_COUNT() > 0 THEN
				SET vRango = 1;
			END IF;
            
            SELECT vPlan, vVer, vInclusion, vRango;
            
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryAccionistasPj`$$
CREATE PROCEDURE `queryAccionistasPj`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.cantidad, A.tipoDocumento, A.numeroIdentificacion, A.nombreRazonSocial, A.codTipoAccionista, A.porcentajeParticipacion,
            A.primerApellido, A.segundoApellido, A.primerNombre, A.segundoNombre, A.responsableFiscalEEUU,
            A.numeroIdentificacionTributaria, B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria,
            B.numeroInmueble, B.referenciaUbicacion
			FROM accionistasPj AS A
            LEFT JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryAccionistasPn`$$
CREATE PROCEDURE `queryAccionistasPn`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.cantidad, A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion, A.paisExpedicion, A.primerApellido, A.segundoApellido,
            A.primerNombre, A.segundoNombre, A.codTipoAccionista, A.porcentajeParticipacion, A.responsableFiscalEEUU, A.numeroIdentificacionTributaria,
            B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion,
            C.desempeñaDesempeño, C.relacionDependencia, C.rol, C.fechaIngreso, C.fechaSalida
			FROM accionistasPn AS A
            JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
            JOIN datosImpositivos AS C ON C.codEnte = A.numeroIdentificacion
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryActasContratos`$$
CREATE PROCEDURE `queryActasContratos`(IN pNombreActa VARCHAR(50))
BEGIN
			SELECT * FROM controlActa
			WHERE nombreActa = pNombreActa;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryActividadEconomicaPn`$$
CREATE PROCEDURE `queryActividadEconomicaPn`(IN CC VARCHAR(10))
BEGIN
			SELECT A.codClienteNatural, A.profesion, A.ocupacion, A.nombreEstablecimiento, A.departamentoEstablecimiento,
            A.ciudadEstablecimiento, A.codPrefijoTelefonico, A.telefono, A.CIIU, A.inicioActividadAño, A.inicioActividadMes,
            A.cargoActual, A.fuentePrincipalIngreso, B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal,
            B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion
			FROM actividadEconomicaPn AS A
            JOIN direccionActividad AS B ON A.codClienteNatural = B.codEnte
            WHERE A.codClienteNatural = CC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryAdquirencia`$$
CREATE PROCEDURE `queryAdquirencia`()
BEGIN
			SELECT idadquirencia, tipoAdquirencia, puntos, tarifaCosto  FROM adquirencia;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryAprobador`$$
CREATE PROCEDURE `queryAprobador`(IN COD INT)
BEGIN
			SELECT A.USUARIO, B.tipo_aprobador, C.CORREO
			FROM ente_aprobacion AS A
			JOIN tipo_aprobador AS B ON B.COD_APROBADOR = A.COD_APROBADOR
			JOIN usuario AS C ON C.USUARIO = A.USUARIO
			WHERE A.COD_APROBADOR = COD
            ORDER BY rand()
            LIMIT 1;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryAprobarCreditos`$$
CREATE PROCEDURE `queryAprobarCreditos`(IN SOLICITUD INT, DECISION INT, OBSER VARCHAR(1500), USU CHAR(15))
BEGIN
            DECLARE APRO INT;
            DECLARE REQUERIDAS INT;
            DECLARE ENTE CHAR(4);
            DECLARE TIPOENTE INT;
            DECLARE ENTES_ATRIBUCION VARCHAR(30);
            DECLARE NAPRO INT;
            DECLARE PARAMETRIZADOR CHAR(15);
            DECLARE CORREOS TEXT;
            
			SET APRO = (SELECT count(A.codSolicitud)
						FROM asignaciones AS A
						JOIN solicitudes AS B ON A.codSolicitud = B.COD_SOLICITUD
						JOIN estado_asignacion AS C ON C.idAsignacion = A.idasignacion
						WHERE A.codSolicitud = SOLICITUD AND codDecision = 1
						GROUP BY A.codSolicitud);
			
            SET APRO = (SELECT IFNULL(APRO, 0));
            
            SET ENTES_ATRIBUCION = (SELECT JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION
									FROM solicitudes AS A 
									WHERE COD_SOLICITUD = SOLICITUD);
                            
			SET REQUERIDAS = (SELECT JSON_LENGTH(ENTES_ATRIBUCION));
            
            SET PARAMETRIZADOR = (SELECT JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR')) AS COD_PARAMETRIZADOR
									FROM solicitudes AS A 
									WHERE COD_SOLICITUD = SOLICITUD);
            
            IF DECISION = 0 THEN
				-- ACTUALIZAR ESTADO_ASIGANACION;
                INSERT INTO estado_asignacion (idAsignacion, codDecision, observacion, codUsuario)
				VALUES ((SELECT idasignacion FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC Limit 1), DECISION, OBSER, USU);
                -- ACTUALIZAR ESTADO_SOLICITUD A NO APROBADOR;
                INSERT INTO estado_solicitud (codSolicitud, estadoAprobacion,fechaAprobacion, estadoParametrizacion, fechaParametrizacion)
				VALUES (SOLICITUD, DECISION, NOW(), DECISION, NOW());
                --
                SELECT 0 COD;
            ELSE
				IF (APRO + 1) < REQUERIDAS THEN
					-- ACTUALIZAR ESTADO_ASIGANACION;
                    INSERT INTO estado_asignacion (idAsignacion, codDecision, codUsuario)
					VALUES ((SELECT idasignacion FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC Limit 1), DECISION, USU);
					-- INSERTAR ASIGANCION;
                    SET NAPRO = APRO + 1;
                    SET TIPOENTE = (SELECT JSON_UNQUOTE(JSON_EXTRACT(ENTES_ATRIBUCION, CONCAT('$[', NAPRO, ']'))));
                    SET ENTE = TIPOENTE;
                    SET CORREOS = (SELECT json_arrayagg(A.CORREO) FROM usuario AS A JOIN ente_aprobacion AS B ON B.USUARIO = A.USUARIO WHERE B.COD_APROBADOR = TIPOENTE);
                    
                    CALL queryInsertAsignacion(SOLICITUD, ENTE, TIPOENTE);
                    CALL queryDatosCorreo(SOLICITUD, CORREOS);
				ELSE
					-- ACTUALIZAR ESTADO_ASIGANACION;
                    INSERT INTO estado_asignacion (idAsignacion, codDecision, codUsuario)
					VALUES ((SELECT idasignacion FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC Limit 1), DECISION, USU);
					-- ACTUALIZAR ESTADO PARAMETRIZADOR;
                    SET TIPOENTE = 0;
                    SET CORREOS = (SELECT CORREO FROM usuario WHERE USUARIO = PARAMETRIZADOR);
                    
                    CALL queryInsertAsignacion(SOLICITUD, PARAMETRIZADOR, TIPOENTE);
                    CALL queryDatosCorreo(SOLICITUD, CORREOS);
                    -- ACTUALIZAR ESTADO DE APROBACION
                    INSERT INTO estado_solicitud (codSolicitud, estadoAprobacion,fechaAprobacion)
					VALUES (SOLICITUD, DECISION, NOW());
				END IF;
			END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryAsignacionCuenta`$$
CREATE PROCEDURE `queryAsignacionCuenta`(IN pNumeroCuenta VARCHAR(255))
BEGIN
			SELECT 
				A.cliente_id,
				A.numero_cuenta,
				A.tipo_sobregiro,
				A.dias_vigencia,
				A.monto,
				A.fecha_aprobacion,
				A.fecha_vencimiento,
				A.acta_aprobacion_id,
                C.CORREO AS correo_radicador,
				A.estado_solicitud AS cod_Estado,
				B.descripcion AS estado
			FROM cupo_sobregiro AS A
			JOIN Listas AS B ON B.lista = 'EstadoSobregiro' AND B.codLista = A.estado_solicitud
            JOIN usuario AS C ON C.USUARIO = A.usuario_radicador
			WHERE A.numero_cuenta = pNumeroCuenta AND A.estado_solicitud = '40';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryBeneficiariosPJ`$$
CREATE PROCEDURE `queryBeneficiariosPJ`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.tipoDocumento, A.numeroIdentificacion, A.nombreRazonSocial, A.porcentajeParticipacion, A.primerApellido,
            A.segundoApellido, A.primerNombre, A.segundoNombre, A.responsableFiscalEEUU, A.numeroIdentificacionTributaria,
            B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion
			FROM beneficiariosPJ AS A
            LEFT JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte          
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryBeneficiariosPn`$$
CREATE PROCEDURE `queryBeneficiariosPn`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion, A.paisExpedicion, A.primerApellido, A.segundoApellido,
            A.primerNombre, A.segundoNombre, A.porcentajeBeneficio, A.responsableFiscalEEUU, A.numeroIdentificacionTributaria,
            B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion,
            C.desempeñaDesempeño, C.relacionDependencia, C.rol, C.fechaIngreso, C.fechaSalida
			FROM beneficiariosPn AS A
            JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
            JOIN datosImpositivos AS C ON C.codEnte = A.numeroIdentificacion
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCatalogo`$$
CREATE PROCEDURE `queryCatalogo`(IN pCAT VARCHAR(30))
BEGIN
			SELECT dataCatalogo
            FROM catalogos
			WHERE catalogo = pCAT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCdtNuevos`$$
CREATE PROCEDURE `queryCdtNuevos`(IN pcodClient VARCHAR(15))
BEGIN
			SELECT codClient, codCDT, codProducto AS producto, monto, interes, codPlazoApertura AS plazoApertura,
				fechaApertura, fechaVencimiento, codTipTasa AS tipoTasa, tasaBase, spread, codFormaPagoInteres AS formaPagoInteres,
				codFrecuenciaPago AS frecuenciaPago, codOrigenFondo AS origenFondo, codRazonApertura AS razonApertura,
				codTipoTitulo AS tipoTitulo, codEstadoCdt
			FROM cdt
			WHERE codClient = pcodClient AND codEstadoCdt = 'N';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `querycdtProcducto`$$
CREATE PROCEDURE `querycdtProcducto`(IN NIT VARCHAR(15))
BEGIN
			SELECT A.codCliente, A.nCdt, A.tipoCdt, A.claseCdt, A.montoCdt, A.plazo,
            A.fechaInicial, A.fechaFIn, A.tipoTasa, A.tasaBaseEa, A.spread, A.frecuPago,
            A.interesLiquidado, A.interesAcumalo, A.estadoCDT, A.bloqueo
			FROM cdtProcducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCdtVencidos`$$
CREATE PROCEDURE `queryCdtVencidos`(IN pcodClient VARCHAR(15))
BEGIN
			SELECT codClient, codCDT, codProducto AS producto, monto, interes, codPlazoApertura AS plazoApertura,
				fechaApertura, fechaVencimiento, codTipTasa AS tipoTasa, tasaBase, spread, codFormaPagoInteres AS formaPagoInteres,
				codFrecuenciaPago AS frecuenciaPago, codOrigenFondo AS origenFondo, codRazonApertura AS razonApertura,
				codTipoTitulo AS tipoTitulo, codEstadoCdt, codEdoCancelacion
			FROM cdt
			WHERE codClient = pcodClient AND codEstadoCdt = 'V' AND codEdoCancelacion <> 'C';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryClientePj`$$
CREATE PROCEDURE `queryClientePj`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.digitoVerificacion AS DV, A.nit AS NIT, CONCAT(A.nit, '-', A.digitoVerificacion) AS NIT_DV, 
				A.razonSocial, A.fechaConstitucion, A.codPaisConstitucion, A.codCiiu, A.codSectorEconomico, A.codCategoriaCompañia,
                A.codTipoSociedad, A.numeroSocios, A.numeroEmpleados, A.numeroSucursales, A.codTipoEmpresa, A.codPrefijoTelefonico,
                A.telefonoClienteJuridico, A.paginaWeb, A.correoElectronico, A.envioCorrespondencia, A.envioRACT,
                A.fechaCorteEstadoCuenta, A.grupoCoomeva, A.antiguedadGrupoCoomeva, A.GECC, A.situacionImpositiva, A.tipopersona,
                B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion
			FROM clienteJuridico AS A
			LEFT JOIN direcciones AS B ON A.nit = B.codEnte
            WHERE A.nit = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryClientePn`$$
CREATE PROCEDURE `queryClientePn`(IN CC VARCHAR(10))
BEGIN
			SELECT A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion, A.lugarExpedicion, A.paisExpedicion, A.departamentoExpedicion,
            A.ciudadExpedicion, A.primerApellido, A.segundoApellido, A.primerNombre, A.segundoNombre, A.paisNacimiento, A.departamentoNacimiento,
            A.ciudadNacimiento, A.fechaNacimiento, A.codPrefijoTelefonico, A.telefono, A.correoElectronico, A.sexo, A.nacionalidad1, A.nacionalidad2,
            A.edoCivil, A.tieneDiscapacidad, A.tipoDiscapacidad, A.oficina, A.oficialOficina, A.situacionImpositiva, A.desempeñoCargoPEP, A.tipoPEP,
            A.perteneceGrupoEtnico, A.tipopersona, B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble,
            B.referenciaUbicacion, C.desempeñaDesempeño, C.relacionDependencia, C.rol, C.fechaIngreso, C.fechaSalida
			FROM clienteNatural AS A
			JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
			JOIN datosImpositivos AS C ON C.codEnte = A.numeroIdentificacion
            WHERE A.numeroIdentificacion = CC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryContactosAutorizadosPj`$$
CREATE PROCEDURE `queryContactosAutorizadosPj`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.codClienteJuridico, A.cantidad, A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion, A.paisExpedicion,
            A.departamentoExpedicion, A.ciudadExpedicion, A.primerApellido, A.segundoApellido, A.primerNombre,
            A.segundoNombre, A.codPrefijoTelefonico, A.telefonoContacto, A.correoElectronico, B.codDepartamento,
            B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion,
            C.desempeñaDesempeño, C.relacionDependencia, C.rol, C.fechaIngreso, C.fechaSalida
			FROM contactosAutorizados AS A
            JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
            JOIN datosImpositivos AS C ON C.codEnte = A.numeroIdentificacion
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryControlantes`$$
CREATE PROCEDURE `queryControlantes`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.cantidad, A.tipoDocumento, A.numeroIdentificacion, A.primerApellido, A.segundoApellido, A.primerNombre, A.segundoNombre,
            A.responsableFiscalEEUU, A.numeroIdentificacionTributaria, B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion,
            C.desempeñaDesempeño, C.relacionDependencia, C.rol, C.fechaIngreso, C.fechaSalida
			FROM controlantes AS A
            JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
            JOIN datosImpositivos AS C ON C.codEnte = A.numeroIdentificacion
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryConvenioActualProducto`$$
CREATE PROCEDURE `queryConvenioActualProducto`(IN NIT VARCHAR(15))
BEGIN
			SELECT A.codCliente, A.servicio, A.unidad, A.cantidad, A.tarifa
			FROM convenioActualProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCorreoAprobadores`$$
CREATE PROCEDURE `queryCorreoAprobadores`(IN TIPOENTE INT)
BEGIN
			SELECT JSON_ARRAYAGG(A.CORREO) AS CORREOS
			FROM usuario AS A
			JOIN ente_aprobacion AS B ON B.USUARIO = A.USUARIO
			WHERE B.COD_APROBADOR = TIPOENTE;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCorreoParametrizador`$$
CREATE PROCEDURE `queryCorreoParametrizador`(IN SOLICITUD INT)
BEGIN
			SET @ENTE = (SELECT codEnte FROM asignaciones WHERE codSolicitud = SOLICITUD ORDER BY idasignacion DESC LIMIT 1);
            SET @CORREO = (SELECT CORREO FROM usuario WHERE USUARIO = @ENTE);
			CALL queryDatosCorreo(SOLICITUD, @CORREO);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCorreoRadicador`$$
CREATE PROCEDURE `queryCorreoRadicador`(IN SOLICITUD INT)
BEGIN
			SELECT CORREO FROM usuario
            WHERE USUARIO = (SELECT ID_RADICADOR FROM solicitudes WHERE COD_SOLICITUD = SOLICITUD);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCorresponsales`$$
CREATE PROCEDURE `queryCorresponsales`()
BEGIN
			SELECT idcorresponsales, corresponsales, tarifaPlena, estado, ticket_promedio
			FROM corresponsales;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCreditoProducto`$$
CREATE PROCEDURE `queryCreditoProducto`(IN NIT VARCHAR(15))
BEGIN
			SELECT A.codCliente, A.descripcion, A.montoTotalCupo, A.cupoUtilizado, A.fechaAproCupo, A.fechaVenciCupo, A.cupoDisponible, A.diasVigencia, A.tasaReferencia
			FROM creditoProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCuentasPlanes`$$
CREATE PROCEDURE `queryCuentasPlanes`(IN pPlan INT, pCodPlan INT)
BEGIN
			DECLARE vTipoPlan INT;
            
            SELECT tipoPlan INTO vTipoPlan
            FROM planes
			WHERE plan = pPlan;
            
            IF vTipoPlan = 1 THEN
				SELECT 200 AS STATUS, A.idCliente, B.razonSocial, A.cuenta
				FROM cuentaPlanes AS A
				LEFT JOIN clienteJuridico AS B ON B.nit = A.idCliente
				WHERE plan = pPlan AND codPlan = pCodPlan;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCuentasProducto`$$
CREATE PROCEDURE `queryCuentasProducto`(IN NIT VARCHAR(15))
BEGIN
			SELECT A.codCliente, A.cuentas,
            A.tipo, A.fechaInicial, A.tasaEA, A.saldo,
            A.estadoCuenta, A.bloqueo, A.totalCupoSobregiro,
            A.fechaAproSobregiro, A.fechaVencSobregiro,
            A.cupoDispoSobregiro, A.vigenciaCupoSobregiro
			FROM cuentasProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryCupoSobregiro`$$
CREATE PROCEDURE `queryCupoSobregiro`(IN pIdentification VARCHAR(255))
BEGIN
			SELECT 
				A.numero_cuenta,
				A.estado_solicitud AS cod_Estado,
				B.descripcion
			FROM cupo_sobregiro AS A
			JOIN Listas AS B ON B.lista = 'EstadoSobregiro' AND B.codLista = A.estado_solicitud
			WHERE A.cliente_id = pIdentification AND A.estado_solicitud = '40';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDataBuzon`$$
CREATE PROCEDURE `queryDataBuzon`(IN SOLI INT)
BEGIN
			SELECT cod_solicitud, buzon, descripcion
            FROM controlBuzon WHERE cod_solicitud = SOLI;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDataCampos`$$
CREATE PROCEDURE `queryDataCampos`()
BEGIN
			SELECT A.idCampo, A.descripcion, A.codTipoCliente, C.TIPOCLI, A.codFicha, B.nombre,
			A.actObligatorio, A.actEditable, A.creaObligatorio, A.prospObligatorio,
            A.nCliObligatorio
			FROM camposClientes AS A
			JOIN fichas AS B ON B.idFicha = codFicha
			JOIN tipo_cliente AS C ON C.COD_TIPO_CLIENTE = A.codTipoCliente;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDataFile`$$
CREATE PROCEDURE `queryDataFile`(IN SOLI INT)
BEGIN
			SELECT cod_solicitud, docCedula, docRut, docCertificado, docFormato, docContrato,
            docBuzon6, docBuzon7, docBuzon8, docBuzon9, docBuzon10, docBuzon11, docBuzon12,
            docBuzon13, docBuzon14, docBuzon15, docBuzon16, docBuzon17, docBuzon18, docBuzon19,
            docBuzon20, docBuzon21, docBuzon22, docBuzon23
            FROM controlDocumentos WHERE cod_solicitud = SOLI;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDataRemi`$$
CREATE PROCEDURE `queryDataRemi`()
BEGIN
			SELECT contenidoRemi 
			FROM remi ORDER BY idremi DESC
			LIMIT 1;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDatosCorreo`$$
CREATE PROCEDURE `queryDatosCorreo`(IN SOLICITUD INT, CORREOS TEXT)
BEGIN
			SELECT 1 AS COD, A.COD_SOLICITUD, A.NIT_CLIENTE,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.antiguedad_ban') AS ANTIGUEDAD, 
			(CORREOS) AS CORREO,
            (SELECT REGIONAL_RAD FROM regional WHERE COD_REGIONAL_RAD = CONVERT(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional'),SIGNED)) AS REGIONAL,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_MINIMO') AS RENTABILIDAD_MIN,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.UTILIDAD_ANUAL') AS UTILIDAD_ANUAL,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.POR_COSTO_INTEGRAL_Max') AS COSTO_INTEGRAL_MAX,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.TOTAL_PROMEDIO_COLOCA') AS TOTAL_CARTERA,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.VALOR_CAPTACION_1') AS TOTAL_CAPTACION,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.TOTAL_MARGEN_CARTERA') AS MARGEN_CARTERA,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.MARGEN_CAPTACION') AS MARGEN_CAPTACION,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.MARGEN_CONVENIOS') AS MARGEN_CONVENIOS,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ADQUI_RECIPRO') AS RECIPROCIDAD_ADQUIRIDA,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador') AS CARGO_APRO,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_PARAMETRIZADOR.CARGO') AS CARGO_PARA,
            
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[0].monto')) AS CUPO_MONTO,
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[1].monto')) AS TESO_MONTO,
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[0].plazo')) AS CUPO_PLAZO,
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[1].plazo')) AS TESO_PLAZO,
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[0].coberturaFng')) AS CUPO_COBERTURA,
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[1].coberturaFng')) AS TESO_COBERTURA,
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[0].spreadIbr')) AS CUPO_REDESCUENTO,
			JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO[1].spreadIbr')) AS TESO_REDESCUENTO,
            
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RECIPROCIDAD_RESUMEN.ahorro.monto1')AS AHORROMONTO,
			JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RECIPROCIDAD_RESUMEN.ahorro.tasa1')AS AHORROTASA,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RECIPROCIDAD_RESUMEN.corriente.monto0')AS CORRIENTEMONTO,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RECIPROCIDAD_RESUMEN.corriente.tasa0')AS CORRIENTETASA,
            
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.SOLICITUD.tipoProducto.credito')AS CREDITO,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.SOLICITUD.tipoProducto.convenio')AS CONVENIO,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.SOLICITUD.tipoOperacion.nuevo')AS OPERACION,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.SOLICITUD.tipoConvenio.convenioPago')AS CONVENIOPAGO,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.SOLICITUD.tipoConvenio.convenioRecaudo')AS CONVENIORECAUDO,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.SOLICITUD.tipoConvenio.servicioFinanciero')AS SERVICIOFINANCIERO,
            
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_PAGO.convenioPagoNominaTipo')AS CONVENIONOMINA,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_PAGO.convenioPagoTerceros')AS CONVENIOTERCEROS,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_RECAUDO.recaudoOficina')AS RECAUDOBARRAS,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_RECAUDO.recaudoOficina')AS RECAUDOREFERENCIA,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_RECAUDO.recaudoPSE')AS RECAUDOPSE,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_RECAUDO.recaudoPSE')AS RECAUDOPORTAL,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_RECAUDO.recaudoCorresponsales')AS RECAUDOCORRESPONSAL,
            JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_RECAUDO.adquirencia')AS RECAUDOADQUIRENCIA
			FROM solicitudes AS A
			WHERE A.COD_SOLICITUD = SOLICITUD;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDeleteEnte`$$
CREATE PROCEDURE `queryDeleteEnte`(IN USU CHAR(15))
BEGIN
			DELETE FROM ente_aprobacion
			WHERE USUARIO = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDeleteParametrizador`$$
CREATE PROCEDURE `queryDeleteParametrizador`(IN USU CHAR(15))
BEGIN
			DELETE FROM ente_parametrizacion
			WHERE USUARIO = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDeleteSesionUsuario`$$
CREATE PROCEDURE `queryDeleteSesionUsuario`(IN `USU` CHAR(15))
BEGIN
			DELETE FROM sessions
			WHERE user_id = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDetalleActividadPn`$$
CREATE PROCEDURE `queryDetalleActividadPn`(IN CC VARCHAR(10))
BEGIN
			SELECT A.codClienteNatural, A.claseBalance, A.tipoBalance, A.FechaCorte, A.ingresoAnual, A.ingresoPGJ, A.egresoPGJ, A.activosBGJ,
            A.activos, A.pasivosBGJ, A.PatrimonioBGJ
			FROM detalleActivEcoPn AS A
            WHERE A.codClienteNatural = CC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDetalleSolicitud`$$
CREATE PROCEDURE `queryDetalleSolicitud`(IN COD INT)
BEGIN			
            	SELECT 
                A.COD_SOLICITUD,
                A.ID_RADICADOR,
                A.NIT_CLIENTE,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.PRODUCTO') AS PRODUCTO,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO') AS CREDITO_NUEVO,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_PAGO') AS CONVENIO_PAGO,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_RECAUDO') AS CONVENIO_RECAUDO,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONVENIO_SERVICIO') AS SERVICIOS_FINANCIEROS,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION') AS RADICACION,
                JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.DOCUMENTO')) AS DOCUMENTO,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.REMI') AS REMI,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.DEPOSITO_VISTA') AS DEPOSITO_VISTA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RECIPROCIDAD_RESUMEN') AS RECIPROCIDAD_RESUMEN,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CONFIGURACIO') AS CONFIGURACION,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.TECNICO_OPERADOR') AS TECNICO_OPERADOR	,
                JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CLIENTE_MODAL')) AS CLIENTE_MODAL,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CAMPO_ADICIONALES_MODAL') AS CAMPO_ADICIONALES_MODAL,
                JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CLIENTE_FIDUCIA')) AS CLIENTE_FIDUCIA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.EDITAR') AS EDITAR,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.ESTADO_SOLICITUD') AS ESTADO_SOLICITUD,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.SOLICITUD') AS SOLICITUD,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME') AS KNIME
				FROM solicitudes AS A
				WHERE A.COD_SOLICITUD = COD;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryDocumentos`$$
CREATE PROCEDURE `queryDocumentos`()
BEGIN
			SELECT iddocumentos, documento,
				nombreCorto, codigo, credito,
				cuenta, cdt, nomina, pagoTerceros,
				recaudoOficina, recaudoCorresponsal
			FROM documentos;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryEnte`$$
CREATE PROCEDURE `queryEnte`(IN PERFIL CHAR(15), USU CHAR(15))
BEGIN
			IF PERFIL = 'Aprobación' THEN
				SELECT COD_APROBADOR FROM ente_aprobacion WHERE USUARIO = USU;
            ELSEIF PERFIL = 'Parametrización' THEN
				SELECT COD_PARAMETRIZADOR FROM ente_parametrizacion WHERE USUARIO = USU;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryEstadoEnvioParametrizador`$$
CREATE PROCEDURE `queryEstadoEnvioParametrizador`(IN COD INT)
BEGIN
			SELECT IF(isnull(estatusCorreo) = 1, 'false', 'true') AS statusCorreo FROM estado_solicitud WHERE codSolicitud = COD;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryEstadoSolicitud`$$
CREATE PROCEDURE `queryEstadoSolicitud`(IN SOLICITUD INT)
BEGIN
			SELECT codSolicitud, estadoAprobacion, estadoParametrizacion
            FROM estado_solicitud
            WHERE codSolicitud = SOLICITUD;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryFechaHabil`$$
CREATE PROCEDURE `queryFechaHabil`(
    IN pFecha DATE
)
BEGIN
    DECLARE vFecha DATE;
    SET vFecha = pFecha;

    -- Bucle hasta encontrar fecha hábil
    loop_buscar:
    LOOP
        -- Verificar si es sábado(7) o domingo(1), o está en diasFeriados
        IF DAYOFWEEK(vFecha) IN (1,7) 
           OR EXISTS (SELECT 1 FROM diasFeriados WHERE df_fecha = vFecha) THEN
            SET vFecha = DATE_ADD(vFecha, INTERVAL 1 DAY);
        ELSE
            LEAVE loop_buscar;
        END IF;
    END LOOP;

    SELECT vFecha as diaHabil;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryFormaPagoCdt`$$
CREATE PROCEDURE `queryFormaPagoCdt`(IN pCodCDT VARCHAR(15))
BEGIN
			SELECT codCDT, codFormaPago,
				cuenta, valor 
			FROM formaPagoCdt
			WHERE codCDT = pCodCDT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryFrecuenciaNomina`$$
CREATE PROCEDURE `queryFrecuenciaNomina`()
BEGIN
			SELECT idfrecuenciaNomina, tipo, valor FROM frecuenciaNomina;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryGastosDirectosOficina`$$
CREATE PROCEDURE `queryGastosDirectosOficina`()
BEGIN
			SELECT idgastosDirectosOficina, tipoGastosDirectosOficina FROM gastosDirectosOficina;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryGastosDirectosPse`$$
CREATE PROCEDURE `queryGastosDirectosPse`()
BEGIN
			SELECT idgastosDirectosPse, tipoGastosDirectosPse FROM gastosDirectosPse;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryIbrs`$$
CREATE PROCEDURE `queryIbrs`()
BEGIN
			SELECT I.cod_ibr, I.ibr_descripcion, C.cod_fech, valor_ibr FROM ibr AS I
			JOIN  ibr_control AS C ON I.cod_ibr = C.cod_ibr
			WHERE C.cod_fech = (SELECT cod_fech FROM ibr_control ORDER BY cod_fech DESC LIMIT 1);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryInclusion`$$
CREATE PROCEDURE `queryInclusion`(IN PLAN INT, CODPLAN INT)
BEGIN
			DROP TEMPORARY TABLE IF EXISTS tempInclusion;
			DROP TEMPORARY TABLE IF EXISTS tempMaxFecha;
            
			CREATE TEMPORARY TABLE tempInclusion AS
			SELECT A.plan, A.codPlan, A.idCliente,
				B.razonSocial AS cliente, 
				A.fechaNovedad, A.estadoInclusion
				FROM inclusionPlan AS A
				LEFT JOIN clienteJuridico AS B ON B.nit = A.idCliente
				WHERE A.estadoInclusion = 1 AND A.plan = PLAN AND A.codPlan = CODPLAN;

			CREATE TEMPORARY TABLE tempMaxFecha AS
			SELECT idCliente,
				MAX(fechaNovedad) AS maxFecha
			FROM tempInclusion
			GROUP BY idCliente;

			DELETE T FROM tempInclusion T
			LEFT JOIN tempMaxFecha M ON T.idCliente = M.idCliente AND T.fechaNovedad = M.maxFecha
			WHERE M.maxFecha IS NULL;

			SELECT * FROM tempInclusion;

			DROP TEMPORARY TABLE IF EXISTS tempInclusion;
			DROP TEMPORARY TABLE IF EXISTS tempMaxFecha;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryInformacionFinancieraPj`$$
CREATE PROCEDURE `queryInformacionFinancieraPj`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.periodo, A.ventasAnualesMM, A.gastosAnualesMM, A.activosMM, A.pasivosMM, A.capitalSocial, A.patrimonioMM,
            A.ingresosMensualesMM, A.egresosMensulesMM, A.ingresosNoOperacionalesMM, A.ventasAnuales,
            A.gastosAnuales, A.ingresosBrutosOrdinarias
			FROM informacionFinanciera AS A
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryInsertAsignacion`$$
CREATE PROCEDURE `queryInsertAsignacion`(IN SOLICITUD INT, ENTE CHAR(15), TIPOENTE INT)
BEGIN
			INSERT INTO asignaciones (codSolicitud, codEnte, codTipo)
			VALUES (SOLICITUD, ENTE, TIPOENTE);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryInsertSolicitud`$$
CREATE PROCEDURE `queryInsertSolicitud`(IN NIT CHAR(15), DATOS LONGTEXT, USU CHAR(15), APROBACIONES INT)
BEGIN
			INSERT INTO solicitudes (NIT_CLIENTE, DATOS_SOLICITUD, ID_RADICADOR, APROREQUERIDAS)
			VALUES (NIT, DATOS, USU, APROBACIONES);
            SELECT MAX(COD_SOLICITUD) AS SOLICITUD  FROM solicitudes;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryJuntaDirectivaPj`$$
CREATE PROCEDURE `queryJuntaDirectivaPj`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.cantidad, A.tipoDocumento, A.numeroIdentificacion, A.nombreRazonSocial, A.codTipoIntegrante
			FROM juntaDirectivaPj AS A
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryJuntaDirectivaPn`$$
CREATE PROCEDURE `queryJuntaDirectivaPn`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.cantidad, A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion, A.paisExpedicion, A.primerApellido,
            A.segundoApellido, A.primerNombre, A.segundoNombre, A.codTipoIntegrante, B.desempeñaDesempeño, B.relacionDependencia, 
            B.rol, B.fechaIngreso, B.fechaSalida
			FROM juntaDirectivaPn AS A
            LEFT JOIN datosImpositivos AS B ON B.codEnte = A.numeroIdentificacion
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryJustificacionOficina`$$
CREATE PROCEDURE `queryJustificacionOficina`()
BEGIN
			SELECT A.idgastosDirectosOficina, A.tipoGastosDirectosOficina, B.idjustificacionOficina,
            B.tipoJustificacionOfi, B.permitirNegociar, B.tarifaPlena
			FROM gastosDirectosOficina AS A
			JOIN justificacionOficina AS B ON A.idgastosDirectosOficina = B.codGastosDirectosOfi
			ORDER BY A.idgastosDirectosOficina ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryJustificacionPse`$$
CREATE PROCEDURE `queryJustificacionPse`()
BEGIN
			SELECT A.idgastosDirectosPse, A.tipoGastosDirectosPse,
            B.idjustificacionPse, B.tipoJustificacionPse, B.permitirNegociar, B.tarifaPlena
			FROM gastosDirectosPse AS A
			JOIN justificacionPse AS B ON A.idgastosDirectosPse = B.codGastosDirectosPse
			ORDER BY A.idgastosDirectosPse ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListaDocumentos`$$
CREATE PROCEDURE `queryListaDocumentos`()
BEGIN
			SELECT 
				iddocumentos AS id,
				codigo,
				nombreCorto,
				documento AS nombreCompleto,
				credito AS obligatorio,
				JSON_ARRAY() AS archivos
			FROM  documentos;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListaOrigenFondos`$$
CREATE PROCEDURE `queryListaOrigenFondos`()
BEGIN
			SELECT 
				code,
				value
			FROM list_origenFondos;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarAplica`$$
CREATE PROCEDURE `queryListarAplica`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'Aplica';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListaRazonApertura`$$
CREATE PROCEDURE `queryListaRazonApertura`()
BEGIN
			SELECT 
				code,
				value
			FROM list_razonApertura;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarCatalogos`$$
CREATE PROCEDURE `queryListarCatalogos`()
BEGIN
			SELECT idcatalogos, catalogo, 
            fech_actualizacion,  fechaUltima
            FROM catalogos;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarCoberturaFng`$$
CREATE PROCEDURE `queryListarCoberturaFng`()
BEGIN
			SELECT A.codCobertura, A.valor, A.descripcion
			FROM coberturaFng AS A;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarCreditoPorAprobacion`$$
CREATE PROCEDURE `queryListarCreditoPorAprobacion`(IN COD CHAR(15), NIT CHAR(10))
BEGIN			
            IF NIT = '' THEN
            SELECT A.COD_SOLICITUD, A.NIT_CLIENTE,
				(SELECT REGIONAL_RAD FROM regional WHERE COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)) AS REGIONAL,
				(SELECT OFICINA FROM oficina WHERE COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)) AS OFICINA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_MINIMO') AS RENTABILIDAD_MIN,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.UTILIDAD_ANUAL') AS UTILIDAD_ANUAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.POR_COSTO_INTEGRAL_Max') AS COSTO_INTEGRAL_MAX,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR') AS COD_PARAMETRIZADOR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoMonto') AS CUPO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoMonto') AS TESO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoPlazo') AS CUPO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoPlazo') AS TESO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoIBR') AS CUPO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoIBR') AS TESO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoCobertura') AS CUPO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoCobertura') AS TESO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.promedio') AS RECIPROCIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador') AS CARGO_APRO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_PARAMETRIZADOR.CARGO') AS CARGO_PARA,
				B.idasignacion, B.codEnte, C.codDecision, A.APROREQUERIDAS
				FROM solicitudes AS A
				JOIN asignaciones AS B ON A.COD_SOLICITUD = B.codSolicitud 
				LEFT JOIN estado_asignacion AS C ON B.idasignacion = C.idasignacion
				WHERE isnull(C.codDecision) AND B.codEnte = COD AND B.codTipo != 0
				ORDER BY COD_SOLICITUD ASC;
            ELSE
				SELECT A.COD_SOLICITUD, A.NIT_CLIENTE,
				(SELECT REGIONAL_RAD FROM regional WHERE COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)) AS REGIONAL,
				(SELECT OFICINA FROM oficina WHERE COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)) AS OFICINA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_MINIMO') AS RENTABILIDAD_MIN,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.UTILIDAD_ANUAL') AS UTILIDAD_ANUAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.POR_COSTO_INTEGRAL_Max') AS COSTO_INTEGRAL_MAX,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR') AS COD_PARAMETRIZADOR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoMonto') AS CUPO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoMonto') AS TESO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoPlazo') AS CUPO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoPlazo') AS TESO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoIBR') AS CUPO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoIBR') AS TESO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoCobertura') AS CUPO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoCobertura') AS TESO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.promedio') AS RECIPROCIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador') AS CARGO_APRO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_PARAMETRIZADOR.CARGO') AS CARGO_PARA,
				B.idasignacion, B.codEnte, C.codDecision, A.APROREQUERIDAS
				FROM solicitudes AS A
				JOIN asignaciones AS B ON A.COD_SOLICITUD = B.codSolicitud 
				LEFT JOIN estado_asignacion AS C ON B.idasignacion = C.idasignacion
				WHERE isnull(C.codDecision) AND B.codEnte = COD AND A.NIT_CLIENTE = NIT AND B.codTipo != 0
				ORDER BY COD_SOLICITUD ASC;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarCreditoPorParametrizar`$$
CREATE PROCEDURE `queryListarCreditoPorParametrizar`(IN COD CHAR(15), NIT CHAR(10))
BEGIN			
            IF NIT = '' THEN
            SELECT A.COD_SOLICITUD, A.NIT_CLIENTE,
				(SELECT REGIONAL_RAD FROM regional WHERE COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)) AS REGIONAL,
				(SELECT OFICINA FROM oficina WHERE COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)) AS OFICINA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_MINIMO') AS RENTABILIDAD_MIN,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.UTILIDAD_ANUAL') AS UTILIDAD_ANUAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.POR_COSTO_INTEGRAL_Max') AS COSTO_INTEGRAL_MAX,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR') AS COD_PARAMETRIZADOR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoMonto') AS CUPO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoMonto') AS TESO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoPlazo') AS CUPO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoPlazo') AS TESO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoIBR') AS CUPO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoIBR') AS TESO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoCobertura') AS CUPO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoCobertura') AS TESO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.promedio') AS RECIPROCIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador') AS CARGO_APRO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_PARAMETRIZADOR.CARGO') AS CARGO_PARA,
				B.idasignacion, B.codEnte, C.codDecision
				FROM solicitudes AS A
				JOIN asignaciones AS B ON A.COD_SOLICITUD = B.codSolicitud 
				LEFT JOIN estado_asignacion AS C ON B.idasignacion = C.idasignacion
				WHERE B.codEnte = COD AND B.codTipo = 0
				ORDER BY COD_SOLICITUD ASC;
            ELSE
				SELECT A.COD_SOLICITUD, A.NIT_CLIENTE,
				(SELECT REGIONAL_RAD FROM regional WHERE COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)) AS REGIONAL,
				(SELECT OFICINA FROM oficina WHERE COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)) AS OFICINA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_MINIMO') AS RENTABILIDAD_MIN,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.UTILIDAD_ANUAL') AS UTILIDAD_ANUAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.POR_COSTO_INTEGRAL_Max') AS COSTO_INTEGRAL_MAX,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR') AS COD_PARAMETRIZADOR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoMonto') AS CUPO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoMonto') AS TESO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoPlazo') AS CUPO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoPlazo') AS TESO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoIBR') AS CUPO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoIBR') AS TESO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoCobertura') AS CUPO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoCobertura') AS TESO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.promedio') AS RECIPROCIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador') AS CARGO_APRO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_PARAMETRIZADOR.CARGO') AS CARGO_PARA,
				B.idasignacion, B.codEnte, C.codDecision
				FROM solicitudes AS A
				JOIN asignaciones AS B ON A.COD_SOLICITUD = B.codSolicitud 
				LEFT JOIN estado_asignacion AS C ON B.idasignacion = C.idasignacion
				WHERE B.codEnte = COD AND A.NIT_CLIENTE = NIT AND B.codTipo = 0
				ORDER BY COD_SOLICITUD ASC;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarCreditos`$$
CREATE PROCEDURE `queryListarCreditos`(IN NIT CHAR(10))
BEGIN			
            IF NIT is null THEN
				SELECT A.COD_SOLICITUD, A.NIT_CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_MINIMO') AS RENTABILIDAD_MIN,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.UTILIDAD_ANUAL') AS UTILIDAD_ANUAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.POR_COSTO_INTEGRAL_Max') AS COSTO_INTEGRAL_MAX,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR') AS COD_PARAMETRIZADOR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoMonto') AS CUPO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoMonto') AS TESO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoPlazo') AS CUPO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoPlazo') AS TESO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoIBR') AS CUPO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoIBR') AS TESO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoCobertura') AS CUPO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoCobertura') AS TESO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.promedio') AS RECIPROCIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador') AS CARGO_APRO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_PARAMETRIZADOR.CARGO') AS CARGO_PARA,
				if(B.estadoAprobacion is null, 'En Proceso', if(B.estadoAprobacion = 1, 'Aprobado', 'No Aprobado')) AS Aprobacion,
				if(B.estadoAprobacion = 1, 'Asignado', if(B.estadoParametrizacion = 0, 'No Aprobado', if(B.estadoParametrizacion = 1, 'Aprobado', 'No Asignado'))) AS Parametrizacion
				FROM solicitudes AS A
				LEFT JOIN estado_solicitud AS B ON A.COD_SOLICITUD = codSolicitud
                ORDER BY COD_SOLICITUD ASC
                Limit 50;
            ELSE
				SELECT A.COD_SOLICITUD, A.NIT_CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_MINIMO') AS RENTABILIDAD_MIN,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.UTILIDAD_ANUAL') AS UTILIDAD_ANUAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.POR_COSTO_INTEGRAL_Max') AS COSTO_INTEGRAL_MAX,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR') AS COD_PARAMETRIZADOR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoMonto') AS CUPO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoMonto') AS TESO_MONTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoPlazo') AS CUPO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoPlazo') AS TESO_PLAZO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoIBR') AS CUPO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoIBR') AS TESO_IBR,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.cupoCobertura') AS CUPO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.tesoCobertura') AS TESO_COBERTURA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.CREDITO_NUEVO.promedio') AS RECIPROCIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_ENTE_ATRIBUCION_FINAL[0].tipo_aprobador') AS CARGO_APRO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.DATOS_PARAMETRIZADOR.CARGO') AS CARGO_PARA,
				if(B.estadoAprobacion is null, 'En Proceso', if(B.estadoAprobacion = 1, 'Aprobado', 'No Aprobado')) AS Aprobacion,
				if(B.estadoAprobacion = 1, 'Asignado', if(B.estadoParametrizacion = 0, 'No Aprobado', if(B.estadoParametrizacion = 1, 'Aprobado', 'No Asignado'))) AS Parametrizacion
				FROM solicitudes AS A
				LEFT JOIN estado_solicitud AS B ON A.COD_SOLICITUD = codSolicitud
				WHERE A.NIT_CLIENTE = NIT
				ORDER BY COD_SOLICITUD ASC;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarEstado`$$
CREATE PROCEDURE `queryListarEstado`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'Estado';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarIbrsTipoCred`$$
CREATE PROCEDURE `queryListarIbrsTipoCred`()
BEGIN
			SELECT A.COD_TIP_PROD, B.NOMBRE, json_arrayagg(A.cod_ibr) AS cod_ibr,
            json_arrayagg(C.ibr_descripcion) AS ibr_descripcion, json_arrayagg(E.cod_fech) AS cod_fech,
            json_arrayagg(E.valor_ibr) AS valor_ibr
			FROM tipoCredIbrState AS A
			JOIN tipo_producto AS B ON B.COD_TIP_PROD = A.COD_TIP_PROD
			JOIN ibr AS C ON C.cod_ibr = A.cod_ibr
			JOIN  ibr_control AS E ON A.cod_ibr = E.cod_ibr
			WHERE A.codEstado = 1 AND E.cod_fech = (SELECT cod_fech FROM ibr_control ORDER BY cod_fech DESC LIMIT 1)
			GROUP BY A.COD_TIP_PROD
			ORDER BY A.COD_TIP_PROD DESC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarObligacion`$$
CREATE PROCEDURE `queryListarObligacion`()
BEGIN
			SELECT 
    			codLista, 
    			descripcion
			FROM Listas
            WHERE lista = 'Obligatorio';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarOpcionProducto`$$
CREATE PROCEDURE `queryListarOpcionProducto`()
BEGIN
			SELECT 
				codeOpcionProducto,
				descripcion
			FROM opcionProducto
			WHERE estatus = 1
			ORDER BY codeOpcionProducto ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarPlanContingencia`$$
CREATE PROCEDURE `queryListarPlanContingencia`()
BEGIN
			SELECT codLista, descripcion
			FROM Listas
			WHERE lista = 'PlanContingencia';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarPlanes`$$
CREATE PROCEDURE `queryListarPlanes`()
BEGIN
			SELECT A.plan AS codPlan, B.descripcionPlan AS plan, B.tipoPlan AS tipo, C.descripcion AS tipoPlan, MAX(A.tasaEA) AS tasaEA, A.estadoPlan
			FROM rangoPlanes AS A
			JOIN planes AS B ON A.plan = B.plan
			JOIN tipoPlan AS C ON C.codTipoPlan = B.tipoPlan
			WHERE estadoPlan = 1
			GROUP BY A.plan
			ORDER BY A.plan ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarPlanRem`$$
CREATE PROCEDURE `queryListarPlanRem`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'PlanRem';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarProducto`$$
CREATE PROCEDURE `queryListarProducto`()
BEGIN
			SELECT COD_TIP_PROD, NOMBRE FROM tipo_producto
            ORDER BY NOMBRE ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarReciprocidadMinima`$$
CREATE PROCEDURE `queryListarReciprocidadMinima`()
BEGIN
			SELECT A.idReciprocidadMinima, A.monto
			FROM reciprocidadMinima AS A;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarRedescuento`$$
CREATE PROCEDURE `queryListarRedescuento`()
BEGIN
			SELECT A.cod_redescuento, A.descripcion
			FROM entidadRedescuento AS A
			WHERE A.codEstado = 1;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarSiNo`$$
CREATE PROCEDURE `queryListarSiNo`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'SiNo';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarSolicitudes`$$
CREATE PROCEDURE `queryListarSolicitudes`()
BEGIN		        
			SELECT A.COD_SOLICITUD,
				date_format(A.FECHA_HORA, '%d-%m-%Y') AS FECHA_HORA,
				D.OFICINA,
				E.REGIONAL_RAD,
				A.NIT_CLIENTE,
                F.tipopersona AS ESTADO_PERSONA,
				G.descripcion AS DESCRIP_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.tipoPersona') AS TIPO_PERSONA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.PRODUCTO.producto') AS PRODUCTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.TOTAL_PROMEDIO_COLOCA') AS TOTAL_CARTERA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.VALOR_CAPTACION_1') AS TOTAL_CAPTACION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
                if((if(B.estadoAprobacion = 1, 'Asignado', if(B.estadoParametrizacion = 0, 'No Aprobado', if(B.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado')))) = 'No Asignado', 
					(SELECT tipo_aprobador 
						FROM tipo_aprobador 
                        WHERE cod_aprobador = (SELECT codTipo 
												FROM asignaciones 
                                                WHERE codSolicitud = A.COD_SOLICITUD 
                                                ORDER BY idasignacion 
                                                DESC LIMIT 1)), '--') AS codEnte,
				if(B.estadoAprobacion is null, 'En Proceso', if(B.estadoAprobacion = 1, 'Aprobado', 'No Aprobado')) AS Aprobacion,
				if(B.estadoAprobacion = 1 and B.estadoParametrizacion is null, 'Asignado', if(B.estadoParametrizacion = 0, 'No Aprobado', if(B.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado'))) AS Parametrizacion,
				C.idasignacion
			FROM solicitudes AS A
			LEFT JOIN estado_solicitud AS B ON A.COD_SOLICITUD = B.codSolicitud
			LEFT JOIN asignaciones AS C ON A.COD_SOLICITUD = C.codSolicitud
            LEFT JOIN oficina AS D ON D.COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)
            LEFT JOIN regional AS E ON E.COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)
            LEFT JOIN clienteJuridico AS F ON F.nit = A.NIT_CLIENTE
            LEFT JOIN Listas AS G ON G.lista = 'TipoPersona' AND G.codLista= F.tipopersona
			GROUP BY COD_SOLICITUD
			ORDER BY COD_SOLICITUD ASC
			LIMIT 500;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarTipoConvenio`$$
CREATE PROCEDURE `queryListarTipoConvenio`()
BEGIN
			SELECT COD_CONVENIO, NOMBRE FROM convenio;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarTipoCuenta`$$
CREATE PROCEDURE `queryListarTipoCuenta`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoCuenta';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarTipoId`$$
CREATE PROCEDURE `queryListarTipoId`()
BEGIN
			SELECT codLista, descripcion FROM Listas
			WHERE lista = 'TipoId';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarTipoOperacion`$$
CREATE PROCEDURE `queryListarTipoOperacion`()
BEGIN
			SELECT COD_OPERACION, NOMBRE FROM operacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarTipoProducto`$$
CREATE PROCEDURE `queryListarTipoProducto`()
BEGIN
			SELECT COD_PRODUCTO, NOMBRE FROM producto;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarUltimaFecha`$$
CREATE PROCEDURE `queryListarUltimaFecha`()
BEGIN
    		SELECT cod_fech, 
				DATE_FORMAT((DATE_ADD(fech_hast, INTERVAL 1 DAY)),"%Y-%m-%d") AS fech_hast
			FROM ibr_fechas
			ORDER BY cod_fech DESC 
			LIMIT 1;
    	END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListarUsuario`$$
CREATE PROCEDURE `queryListarUsuario`()
BEGIN
    		SELECT 
			A.USUARIO,
			A.NOMBRE,
			A.CORREO,
			A.COD_CARGO AS CARGO,
			A.COD_REGIONAL AS REGIONAL, 
            A.COD_OFICINA AS OFICINA,
			A.COD_CANAL AS CANAL,
			(SELECT json_arrayagg(J.COD_PERFIL)
				FROM perfiles_usuario AS H
				JOIN usuario AS I ON H.USUARIO = I.USUARIO
				JOIN perfiles AS J ON H.COD_PERFIL = J.COD_PERFIL
			WHERE H.USUARIO = A.USUARIO) AS PERFIL,
			B.COD_APROBADOR AS TIPO_APROBADOR,
            COD_PERF_CLIENTE AS PERFIL_CLIENTE,
            C.COD_PARAMETRIZADOR AS TIPO_PARAMETRIZADOR,
			A.COD_PERF_PRODUCTO AS PERFIL_PRODUCTO
			FROM usuario AS A
			LEFT JOIN ente_aprobacion AS B ON B.USUARIO = A.USUARIO
            LEFT JOIN ente_parametrizacion AS C ON C.USUARIO = A.USUARIO;
    	END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListaTipoCuenta`$$
CREATE PROCEDURE `queryListaTipoCuenta`()
BEGIN
			SELECT 
				code,
				value
			FROM list_tipoCuenta;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListCatCompañia`$$
CREATE PROCEDURE `queryListCatCompañia`()
BEGIN
		SELECT A.idCatCompañia, A.Descripcion
		FROM list_CatCompañia AS A
        ORDER BY A.idCatCompañia ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListCIIU`$$
CREATE PROCEDURE `queryListCIIU`()
BEGIN
		SELECT A.CIIU, CONCAT(A.CIIU,'-', A.CIIUDescripcion) AS CIIUDescripcion
		FROM list_CIIU AS A
        ORDER BY A.CIIU ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListCiudades`$$
CREATE PROCEDURE `queryListCiudades`()
BEGIN
		SELECT A.codCiudad, A.descripcion
		FROM list_Ciudades AS A
        ORDER BY A.descripcion ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListConfigurarIbr`$$
CREATE PROCEDURE `queryListConfigurarIbr`()
BEGIN
    		SELECT 
				f.cod_fech AS dKey, 
				DATE_FORMAT(f.fech_inic, "%d-%m-%Y") AS fech_inic, 
				DATE_FORMAT(f.fech_hast, "%d-%m-%Y") AS fech_hast, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '0' THEN c.valor_ibr END), "%") AS ibr0, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '1' THEN c.valor_ibr END), "%") AS ibr1, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '3' THEN c.valor_ibr END), "%") AS ibr3, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '6' THEN c.valor_ibr END), "%") AS ibr6, 
				CONCAT(MAX(CASE WHEN c.cod_ibr = '12' THEN c.valor_ibr END), "%") AS ibr12
			FROM ibr_fechas f
			JOIN ibr_control c ON f.cod_fech = c.cod_fech
			WHERE f.fech_inic BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND CURDATE()
			GROUP BY f.cod_fech, f.fech_inic, f.fech_hast
			ORDER BY f.cod_fech DESC;
    	END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListCuentas`$$
CREATE PROCEDURE `queryListCuentas`(IN pIdCliente VARCHAR(15))
BEGIN
			SELECT A.nCuenta, concat(B.descripcion," - ", A.nCuenta) as Cuenta
			FROM cuentas AS A 
			JOIN Listas AS B ON B.lista = 'TipoCuenta' AND B.codLista = A.codProducto
			WHERE idCliente =  800070225 AND estadoCuenta = 'A';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListCuentasPorCliente`$$
CREATE PROCEDURE `queryListCuentasPorCliente`(IN pIdCliente VARCHAR(15))
BEGIN
			SELECT A.nCuenta, B.descripcion AS producto,
				C.descripcion AS productoBancario, A.fechaApertura,
				A.saldoFecha, D.descripcionPlan AS planActual
			FROM cuentas AS A
			JOIN Listas AS B ON B.lista = 'TipoCuenta' AND B.codLista = A.codProducto
			JOIN list_ProductoBanco AS C ON C.codProductoBanco = A.codProdBancario
			JOIN planes AS D ON D.plan = A.codPlanActual
			WHERE idCliente =  pIdCliente;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListDepartamentos`$$
CREATE PROCEDURE `queryListDepartamentos`()
BEGIN
			SELECT A.codDepto, A.descripcion
			FROM list_Departamentos AS A
            ORDER BY A.descripcion ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListDireccion`$$
CREATE PROCEDURE `queryListDireccion`()
BEGIN
			SELECT A.codListDirecc, A.descripcion
			FROM list_Direccion AS A
            ORDER BY A.codListDirecc ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListDiscapacidad`$$
CREATE PROCEDURE `queryListDiscapacidad`()
BEGIN
			SELECT A.codListDiscap, A.descripcion
			FROM list_Discapacidad AS A
            ORDER BY A.codListDiscap ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListEstadoCivil`$$
CREATE PROCEDURE `queryListEstadoCivil`()
BEGIN
			SELECT A.codListEdoCivil, A.descripcion
			FROM list_EstadoCivil AS A
            ORDER BY A.descripcion ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListFechCorte`$$
CREATE PROCEDURE `queryListFechCorte`()
BEGIN
			SELECT A.codfechCorte, A.descripcion
			FROM list_fechCorte AS A
            ORDER BY A.descripcion ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListFormaPago`$$
CREATE PROCEDURE `queryListFormaPago`()
BEGIN
			SELECT codFormaPago, descripcion
			FROM list_formaPago;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListFrecuencia`$$
CREATE PROCEDURE `queryListFrecuencia`()
BEGIN
			SELECT idlist_Frecuencia, frecuencia
			FROM list_Frecuencia;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListFrecuenciaPago`$$
CREATE PROCEDURE `queryListFrecuenciaPago`()
BEGIN
			SELECT codFrecuenciaPago, descripcion
			FROM list_frecuenciaPago;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListIbr`$$
CREATE PROCEDURE `queryListIbr`()
BEGIN
			SELECT cod_ibr, ibr_descripcion
			FROM ibr;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListIniActAño`$$
CREATE PROCEDURE `queryListIniActAño`()
BEGIN
			SELECT A.codIniActAño, A.descripcion
			FROM list_IniActAño AS A
            ORDER BY A.descripcion ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListIniActMes`$$
CREATE PROCEDURE `queryListIniActMes`()
BEGIN
			SELECT A.codIniActMes, A.descripcion
			FROM list_IniActMes AS A
            ORDER BY A.descripcion ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListLineaCredito`$$
CREATE PROCEDURE `queryListLineaCredito`()
BEGIN
			SELECT idlineaCredito, linea
			FROM lineaCredito;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListOrigenFondos`$$
CREATE PROCEDURE `queryListOrigenFondos`()
BEGIN
			SELECT codOrigenFondos, descripcion
			FROM list_OrigenFondos;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListPaises`$$
CREATE PROCEDURE `queryListPaises`()
BEGIN
			SELECT A.codPais, A.descripcion
			FROM list_Paises AS A
            ORDER BY A.descripcion ASC;
		 END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListPerfilCliente`$$
CREATE PROCEDURE `queryListPerfilCliente`()
BEGIN
			SELECT A.codPerfilCliente, A.descripcion
			FROM list_PerfilCliente AS A
            ORDER BY A.codPerfilCliente ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListPeriodoGracia`$$
CREATE PROCEDURE `queryListPeriodoGracia`()
BEGIN
			SELECT idlist_PeriodoGracia, periodo
			FROM list_PeriodoGracia;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListPeriodos`$$
CREATE PROCEDURE `queryListPeriodos`()
BEGIN
			SELECT A.idListPeriodos, A.Periodos
			FROM list_Periodos AS A
            ORDER BY A.Periodos ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListPrefijoPais`$$
CREATE PROCEDURE `queryListPrefijoPais`()
BEGIN
			SELECT A.idListPrefijoPais, A.codListPrefijoPais, B.descripcion
			FROM list_PrefijoPais AS A
            JOIN list_Paises AS B ON B.codPais = A.codPais
            ORDER BY A.codListPrefijoPais ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListProducto`$$
CREATE PROCEDURE `queryListProducto`()
BEGIN
			SELECT codListProducto, descripcion
			FROM list_Producto;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `querylistProductoBanco`$$
CREATE PROCEDURE `querylistProductoBanco`()
BEGIN
			SELECT codProductoBanco, descripcion, codCuenta
			FROM list_ProductoBanco;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListRazonApertura`$$
CREATE PROCEDURE `queryListRazonApertura`()
BEGIN
			SELECT codRazonApertura, descripcion
			FROM list_RazonApertura;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListRelacionDependencia`$$
CREATE PROCEDURE `queryListRelacionDependencia`()
BEGIN
			SELECT A.codListRelDep, A.descripcion
			FROM list_RelacionDependencia AS A
            ORDER BY A.codListRelDep ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListSexo`$$
CREATE PROCEDURE `queryListSexo`()
BEGIN
			SELECT A.codListSexo, A.descripcion
			FROM list_Sexo AS A
            ORDER BY A.descripcion ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoAccionista`$$
CREATE PROCEDURE `queryListTipoAccionista`()
BEGIN
			SELECT A.codListTipAccta, A.descripcion
			FROM list_Tipo_Accionista AS A
            ORDER BY A.codListTipAccta ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoBalance`$$
CREATE PROCEDURE `queryListTipoBalance`()
BEGIN
			SELECT tipoBalance AS codTipoBalance,  tipoBalance AS descripcion
			FROM detalleActivEcoPn
			GROUP BY tipoBalance
			ORDER BY tipoBalance ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoEmpresa`$$
CREATE PROCEDURE `queryListTipoEmpresa`()
BEGIN
			SELECT A.codTipoEmp, A.descripcion
			FROM list_TipoEmpresa AS A
            ORDER BY A.codTipoEmp ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoIntegrante`$$
CREATE PROCEDURE `queryListTipoIntegrante`()
BEGIN
			SELECT A.codListTipInte, A.descripcion
			FROM list_TipoIntegrante AS A
            ORDER BY A.codListTipInte ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoParametrizador`$$
CREATE PROCEDURE `queryListTipoParametrizador`()
BEGIN
			SELECT A.codTipPardor, A.descripcion
			FROM list_TipoParametrizador AS A
            ORDER BY A.codTipPardor ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoSociedad`$$
CREATE PROCEDURE `queryListTipoSociedad`()
BEGIN
			SELECT A.codTipoSoc, A.descripcion
			FROM list_TipoSociedad AS A
            ORDER BY A.codTipoSoc ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoTasa`$$
CREATE PROCEDURE `queryListTipoTasa`()
BEGIN
			SELECT codTipoTasa, descripcion
			FROM list_TipoTasa;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryListTipoTitulo`$$
CREATE PROCEDURE `queryListTipoTitulo`()
BEGIN
			SELECT codTipoTitulo, descripcion
			FROM list_TipoTitulo;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryLoginUsuario`$$
CREATE PROCEDURE `queryLoginUsuario`(IN LOGIN VARCHAR(45))
BEGIN
			SELECT USU.USUARIO, USU.CORREO, PER.PERFIL, PRU.COD_PERFIL, USU.COD_PERF_CLIENTE
			FROM usuario AS USU
			JOIN perfiles_usuario AS PRU ON USU.USUARIO = PRU.USUARIO
			JOIN perfiles AS PER ON PRU.COD_PERFIL = PER.COD_PERFIL
			WHERE USU.USUARIO = LOGIN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryMinimoMaximos`$$
CREATE PROCEDURE `queryMinimoMaximos`(
    IN pProducto VARCHAR(8)
)
BEGIN
    IF pProducto = 'VIBR1' THEN
        SELECT 
            MIN(plazo_regular_dias) AS valor_minimo,
            MAX(plazo_regular_dias) AS valor_maximo
        FROM plazos_frecuencias_IBR_1;

    ELSEIF pProducto = 'VIBR3' THEN
        SELECT 
            MIN(plazo_regular_dias) AS valor_minimo,
            MAX(plazo_regular_dias) AS valor_maximo
        FROM plazos_frecuencias_IBR_3;

    ELSEIF pProducto = 'VIPC3' THEN
        SELECT 
            MIN(plazo_regular_dias) AS valor_minimo,
            MAX(plazo_regular_dias) AS valor_maximo
        FROM plazos_frecuencias_IPC_3;

    ELSEIF pProducto = 'CDTV' OR pProducto = 'FDLV' THEN
        SELECT 
            MIN(plazo_regular_dias) AS valor_minimo,
            MAX(plazo_regular_dias) AS valor_maximo
        FROM plazos_frecuencias_tasa_fija;

    ELSE
        SELECT 
            MAX(plazo_regular_dias) AS valor_maximo
        FROM plazos_frecuencias_tasa_fija;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryNegociarNomina`$$
CREATE PROCEDURE `queryNegociarNomina`()
BEGIN
			SELECT idnegociarNomina, pagoNomina, tarifaPlena, tarifaCosto, cantidad, permitirNegociar, formulaCalculo FROM negociarNomina;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryPagoTerseros`$$
CREATE PROCEDURE `queryPagoTerseros`()
BEGIN
			SELECT idpagoTerseros, pagoTerseros, tarifaPlena, tarifaCosto FROM pagoTerseros;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryParametrizador`$$
CREATE PROCEDURE `queryParametrizador`(IN USU CHAR(15))
BEGIN
			SELECT B.CORREO, C.CARGO
			FROM ente_parametrizacion AS A
			JOIN usuario AS B ON B.USUARIO = A.USUARIO
			JOIN cargos AS C ON C.COD_CARGO = B.COD_CARGO
			WHERE A.USUARIO = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryParametrizarCreditos`$$
CREATE PROCEDURE `queryParametrizarCreditos`(IN SOLICITUD INT, DECISION INT, USU CHAR(15))
BEGIN
            DECLARE ASIGNACION INT;
            DECLARE PARAMETRIZADOR CHAR(15);
            DECLARE TIPOENTE INT;
			
            SET ASIGNACION = (SELECT A.idasignacion FROM asignaciones AS A
								WHERE A.codSolicitud = SOLICITUD AND codTipo = 0
								ORDER BY idasignacion DESC Limit 1);
                                
			SET PARAMETRIZADOR = (SELECT A.codEnte FROM asignaciones AS A
									WHERE A.codSolicitud = SOLICITUD AND codTipo = 0
                                    ORDER BY idasignacion DESC Limit 1);
		
            SET TIPOENTE = (SELECT COD_PARAMETRIZADOR FROM ente_parametrizacion
							WHERE USUARIO = PARAMETRIZADOR);
            
            IF DECISION = 1 THEN
				-- ACTUALIZAR ASIGNACION
                UPDATE asignaciones
				SET codTipo = TIPOENTE
				WHERE idasignacion = ASIGNACION;
				-- ACTUALIZAR ESTADO_ASIGANACION;
                INSERT INTO estado_asignacion (idAsignacion, codDecision, codUsuario)
				VALUES (ASIGNACION, DECISION, USU);
                -- ACTUALIZAR ESTADO_SOLICITUD;
				UPDATE estado_solicitud
				SET estadoParametrizacion = DECISION, fechaParametrizacion = NOW()
				WHERE codSolicitud = SOLICITUD;
			END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryParametrosEfecty`$$
CREATE PROCEDURE `queryParametrosEfecty`()
BEGIN
			SELECT idParametrosEfecty, ParametrosEfecty FROM ParametrosEfecty;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryPerfilProducto`$$
CREATE PROCEDURE `queryPerfilProducto`(IN USU VARCHAR(15))
BEGIN
			SELECT COD_PERF_PRODUCTO FROM usuario
			WHERE USUARIO = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `querypermitirNegociar`$$
CREATE PROCEDURE `querypermitirNegociar`()
BEGIN
			SELECT cod_permitir, descripcion FROM permitirNegociar;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryPlan`$$
CREATE PROCEDURE `queryPlan`(IN CODPLAN INT)
BEGIN
			SELECT 
				A.plan, A.codPlan,
				B.descripcionPlan AS Nombre,
				B.tipoPlan, DATE(MAX(A.fechaInicial)) AS fechaInicial,
				DATE(B.fech_actualizacion) AS fechaUltimo,
				A.estadoPlan
			FROM rangoPlanes AS A
			JOIN planes AS B ON A.plan = B.plan
			WHERE A.estadoPlan = 1 AND A.plan = CODPLAN
			GROUP BY A.plan;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryPlanRemuneracion`$$
CREATE PROCEDURE `queryPlanRemuneracion`()
BEGIN
			SELECT A.idplanRemuneracion, A.planRemuneracion, 
			A.rangoInferior, A.rangoMaximo, A.tasaEA
			FROM planRemuneracion AS A
            ORDER BY A.rangoInferior ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryPlazosFrecuencias`$$
CREATE PROCEDURE `queryPlazosFrecuencias`(
    IN pProducto VARCHAR(8),
    IN pValue INT
)
BEGIN
    IF pProducto = 'VIBR1' THEN
        SELECT 
            frecuencia
        FROM plazos_frecuencias_IBR_1
        WHERE plazo_regular_dias = pValue;

    ELSEIF pProducto = 'VIBR3' THEN
        SELECT 
            frecuencia
        FROM plazos_frecuencias_IBR_3
        WHERE plazo_regular_dias = pValue;

    ELSEIF pProducto = 'VIPC3' THEN
        SELECT 
            frecuencia
        FROM plazos_frecuencias_IPC_3
        WHERE plazo_regular_dias = pValue;

    ELSEIF pProducto = 'CDTV' OR pProducto = 'FDLV' THEN
        SELECT 
            JSON_ARRAY(`1`, `2`,`3`, `4`, `6`, `12` ) AS frecuencia
        FROM plazos_frecuencias_tasa_fija
        WHERE plazo_regular_dias = pValue;

    ELSE
        SELECT 'Producto no válido' AS mensaje;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryPromedioNomina`$$
CREATE PROCEDURE `queryPromedioNomina`()
BEGIN
			SELECT idpromedioNomina, tipo FROM promedioNomina;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryProspectoPn`$$
CREATE PROCEDURE `queryProspectoPn`(IN CC VARCHAR(10))
BEGIN
			SELECT A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion, A.lugarExpedicion, A.paisExpedicion, A.departamentoExpedicion,
            A.ciudadExpedicion, A.primerApellido, A.segundoApellido, A.primerNombre, A.segundoNombre, A.paisNacimiento, A.departamentoNacimiento,
            A.ciudadNacimiento, A.fechaNacimiento, A.codPrefijoTelefonico, A.telefono, A.correoElectronico, A.sexo, A.nacionalidad1, A.nacionalidad2,
            A.edoCivil, A.tieneDiscapacidad, A.tipoDiscapacidad, A.oficina, A.oficialOficina, A.situacionImpositiva, A.desempeñoCargoPEP, A.tipoPEP,
            A.perteneceGrupoEtnico, B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble,
            B.referenciaUbicacion, C.desempeñaDesempeño, C.relacionDependencia, C.rol, C.fechaIngreso, C.fechaSalida
			FROM prospectoNatural AS A
			JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
			JOIN datosImpositivos AS C ON C.codEnte = A.numeroIdentificacion
            WHERE A.numeroIdentificacion = CC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryRangoPlan`$$
CREATE PROCEDURE `queryRangoPlan`(IN PLAN INT, CODPLAN INT)
BEGIN
			SELECT A.plan, A.codPlan, A.rangoMin, A.rangoMax, A.tasaEA, A.estadoPlan
			FROM rangoPlanes AS A
			WHERE A.estadoPlan = 1 AND A.plan = PLAN AND A.codPlan = CODPLAN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryRangoPlanes`$$
CREATE PROCEDURE `queryRangoPlanes`(IN PLAN INT, CODPLAN INT)
BEGIN
			SELECT A.plan, A.codPlan, A.rangoMin, A.rangoMax, A.tasaEA, A.estadoPlan
			FROM rangoPlanes AS A
			WHERE A.estadoPlan = 1 AND A.plan = PLAN AND codPlan = CODPLAN;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryRecaudoOficina`$$
CREATE PROCEDURE `queryRecaudoOficina`()
BEGIN
			SELECT idrecaudoOficina, tipoRecaudoOficina, tarifaPlena, tarifaCosto FROM recaudoOficina;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryRecaudoPse`$$
CREATE PROCEDURE `queryRecaudoPse`()
BEGIN
			SELECT idrecaudoPse, tipoRecaudoPse, tarifaPlena, tarifaCosto FROM recaudoPse;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryReciprocidadProducto`$$
CREATE PROCEDURE `queryReciprocidadProducto`(IN NIT VARCHAR(15))
BEGIN
			SELECT A.codCliente, A.monto
			FROM reciprocidadProducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryReferenciasPn`$$
CREATE PROCEDURE `queryReferenciasPn`(IN CC VARCHAR(10))
BEGIN
			SELECT A.codClienteNatural, A.cantidad, A.primerApellido, A.segundoApellido, A.primerNombre, A.segundoNombre, A.paisNacimiento, A.fechaNacimiento,
            A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion, A.lugarExpedicion, A.codPrefijoTelefonico, A.telefono, A.correoElectronico,
            B.codDepartamento, B.codCiudad, B.codDireccion, B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion
			FROM referenciasPn AS A
			JOIN direcciones AS B ON B.codEnte = A.numeroIdentificacion
            WHERE A.codClienteNatural = CC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryRegionalSegunOficina`$$
CREATE PROCEDURE `queryRegionalSegunOficina`(IN OFICINA INT)
BEGIN
			SELECT REGIONAL_RAD FROM regional
			WHERE COD_REGIONAL_RAD = (SELECT REGIONAL FROM oficina WHERE COD_OFICINA = OFICINA);
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryReinversionCdt`$$
CREATE PROCEDURE `queryReinversionCdt`(IN pCodCDT VARCHAR(15))
BEGIN
			SELECT codCDT, monto, codReinvercion,
            reinversion, saldoFavor, adicion
			FROM reinversionCdt
			WHERE codCDT = pCodCDT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryRepresentanteLegalPj`$$
CREATE PROCEDURE `queryRepresentanteLegalPj`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.codClienteJuridico, A.cantidad, A.tipoDocumento, A.numeroIdentificacion, A.fechaExpedicion,
				A.paisExpedicion, A.departamentoExpedicion, A.ciudadExpedicion, A.primerApellido,
				A.segundoApellido, A.primerNombre, A.segundoNombre, A.codPrefijoTelefonico,
				A.telefonoRepresentante, A.correoElectronico, B.codDepartamento, B.codCiudad, B.codDireccion,
				B.viaPrincipal, B.viaSecundaria, B.numeroInmueble, B.referenciaUbicacion,
				C.desempeñaDesempeño, C.relacionDependencia, C.rol, C.fechaIngreso, C.fechaSalida
		FROM representanteLegal AS A
		JOIN direcciones AS B ON A.numeroIdentificacion = B.codEnte
		JOIN datosImpositivos AS C ON C.codEnte = A.numeroIdentificacion
		WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryResidenciaFiscalPj`$$
CREATE PROCEDURE `queryResidenciaFiscalPj`(IN NIT VARCHAR(9))
BEGIN
			SELECT A.codClienteJuridico, A.personaEEUU, A.personaEspecíficaEEUU, A.idTributarioEEUU, A.opcionesLista,
            A.clasificacionFATCA, A.numeroGIIN, A.tieneRecidenciaFiscal, A.paisRecidenciaFiscal, A.tipoIdentificacionTributaria,
            A.numeroIdentificacionTributaria
			FROM recidenciaFiscal AS A
            WHERE A.codClienteJuridico = NIT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryResidenciaFiscalPn`$$
CREATE PROCEDURE `queryResidenciaFiscalPn`(IN CC VARCHAR(10))
BEGIN
			SELECT A.codClienteNatural, A.residenciaFiscalColombia, A.residenciaFiscalEEUU, A.residenciFiscalOtroPais, A.paisResidenciaFiscal,
            A.tipoIdentificacionTributaria, A.numeroIdentificacionTributaria
			FROM recidenciaFiscalPn AS A
            WHERE A.codClienteNatural = CC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryRolCdtNuevo`$$
CREATE PROCEDURE `queryRolCdtNuevo`(IN pCodCDT VARCHAR(15))
BEGIN
			SELECT codCDT, codRol, tipoId, 
				nIdentificacion, nombreEmpresa, codTipoCuenta
			FROM rolCdt
			WHERE codCDT = pCodCDT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryServiciosFinancieros`$$
CREATE PROCEDURE `queryServiciosFinancieros`()
BEGIN
			SELECT A.idFinanciero, A.servicio, A.tarifa,
            A.costo, A.obligatorio
			FROM financieros AS A;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `querySolicitudesPorAprobacion`$$
CREATE PROCEDURE `querySolicitudesPorAprobacion`(IN USU CHAR(15))
BEGIN			
            	SELECT A.COD_SOLICITUD,
                date_format(A.FECHA_HORA, '%d-%m-%Y') AS FECHA_HORA,
                E.OFICINA,
				F.REGIONAL_RAD,
				A.NIT_CLIENTE,
                G.tipopersona AS ESTADO_PERSONA,
				H.descripcion AS DESCRIP_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.tipoPersona') AS TIPO_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.PRODUCTO.producto') AS PRODUCTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.TOTAL_PROMEDIO_COLOCA') AS TOTAL_CARTERA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.VALOR_CAPTACION_1') AS TOTAL_CAPTACION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
                (SELECT tipo_aprobador 
					FROM tipo_aprobador 
                    WHERE cod_aprobador= (SELECT codTipo 
											FROM asignaciones 
                                            WHERE codSolicitud = A.COD_SOLICITUD 
                                            ORDER BY idasignacion 
                                            DESC LIMIT 1)) AS codEnte,
                if(D.estadoAprobacion is null, 'En Proceso', if(D.estadoAprobacion = 1, 'Aprobado', 'No Aprobado')) AS Aprobacion,
				if(D.estadoAprobacion = 1 and D.estadoParametrizacion is null, 'Asignado', if(D.estadoParametrizacion = 0, 'No Aprobado', if(D.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado'))) AS Parametrizacion,
				B.idasignacion
				FROM solicitudes AS A
				JOIN asignaciones AS B ON A.COD_SOLICITUD = B.codSolicitud 
				LEFT JOIN estado_asignacion AS C ON B.idasignacion = C.idasignacion
                LEFT JOIN estado_solicitud AS D ON A.COD_SOLICITUD = D.codSolicitud
                LEFT JOIN oficina AS E ON E.COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)
				LEFT JOIN regional AS F ON F.COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)
				LEFT JOIN clienteJuridico AS G ON G.nit = A.NIT_CLIENTE
				JOIN Listas AS H ON H.lista = 'TipoPersona' AND H.codLista= G.tipopersona
				WHERE isnull(C.codDecision) AND B.codTipo = (SELECT COD_APROBADOR 
																FROM ente_aprobacion
                                                                WHERE USUARIO = USU)
				ORDER BY COD_SOLICITUD ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `querySolicitudesPorParametrizar`$$
CREATE PROCEDURE `querySolicitudesPorParametrizar`(IN USU CHAR(15))
BEGIN	
				SELECT A.COD_SOLICITUD,
                date_format(A.FECHA_HORA, '%d-%m-%Y') AS FECHA_HORA,
                E.OFICINA,
				F.REGIONAL_RAD,
				A.NIT_CLIENTE,
                G.tipopersona AS ESTADO_PERSONA,
				H.descripcion AS DESCRIP_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.tipoPersona') AS TIPO_PERSONA,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.cliente') AS CLIENTE,
                JSON_EXTRACT(A.DATOS_SOLICITUD,'$.PRODUCTO.producto') AS PRODUCTO,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.TOTAL_PROMEDIO_COLOCA') AS TOTAL_CARTERA,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.VALOR_CAPTACION_1') AS TOTAL_CAPTACION,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_ROA_EA') AS RENTABILIDAD,
				JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PORC_COSTO_INTEGRAL') AS COSTO_INTEGRAL,
                if((if(D.estadoAprobacion = 1, 'Asignado', if(D.estadoParametrizacion = 0, 'No Aprobado', if(D.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado')))) = 'No Asignado', (SELECT tipo_aprobador FROM tipo_aprobador WHERE cod_aprobador= (SELECT COD_APROBADOR FROM ente_aprobacion WHERE USUARIO = B.codEnte)), '--') AS codEnte,
                if(D.estadoAprobacion is null, 'En Proceso', if(D.estadoAprobacion = 1, 'Aprobado', 'No Aprobado')) AS Aprobacion,
				if(D.estadoAprobacion = 1 and D.estadoParametrizacion is null, 'Asignado', if(D.estadoParametrizacion = 0, 'No Aprobado', if(D.estadoParametrizacion = 1, 'Parametrizado', 'No Asignado'))) AS Parametrizacion,
				B.idasignacion
				FROM solicitudes AS A
				JOIN asignaciones AS B ON A.COD_SOLICITUD = B.codSolicitud 
				LEFT JOIN estado_asignacion AS C ON B.idasignacion = C.idasignacion
                LEFT JOIN estado_solicitud AS D ON A.COD_SOLICITUD = D.codSolicitud
                LEFT JOIN oficina AS E ON E.COD_OFICINA = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.oficina') AS SIGNED)
				LEFT JOIN regional AS F ON F.COD_REGIONAL_RAD = CAST(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.RADICACION.regional') AS SIGNED)
				LEFT JOIN clienteJuridico AS G ON G.nit = A.NIT_CLIENTE
				JOIN Listas AS H ON H.lista = 'TipoPersona' AND H.codLista= G.tipopersona
				WHERE B.codEnte = USU AND B.codTipo = 0 AND D.estatusCorreo = 1
				ORDER BY COD_SOLICITUD ASC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryTipoAprobador`$$
CREATE PROCEDURE `queryTipoAprobador`(IN USU CHAR(15))
BEGIN
			SELECT A.COD_APROBADOR AS cod_aprobador, B.tipo_aprobador 
			FROM ente_aprobacion AS A
            JOIN tipo_aprobador AS B ON B.cod_aprobador = A.COD_APROBADOR
			WHERE A.USUARIO = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryTipoCredIbrState`$$
CREATE PROCEDURE `queryTipoCredIbrState`()
BEGIN
			SELECT A.COD_TIP_PROD, B.NOMBRE, A.cod_ibr, C.ibr_descripcion, A.codEstado, D.descripcion
			FROM tipoCredIbrState AS A
			JOIN tipo_producto AS B ON B.COD_TIP_PROD = A.COD_TIP_PROD
			JOIN ibr AS C ON C.cod_ibr = A.cod_ibr
			JOIN Listas AS D ON D.lista = 'SiNo' AND D.codLista = A.codEstado
            ORDER BY A.COD_TIP_PROD DESC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryTipoPlan`$$
CREATE PROCEDURE `queryTipoPlan`()
BEGIN
			SELECT codTipoPlan, descripcion
			FROM tipoPlan;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryTipoRedescuentoStatus`$$
CREATE PROCEDURE `queryTipoRedescuentoStatus`()
BEGIN
			SELECT A.cod_redescuento, A.descripcion, A.codEstado, B.descripcion AS descripcionEstado
			FROM entidadRedescuento AS A
			JOIN Listas AS B ON B.lista = 'SiNo' AND B.codLista = A.codEstado;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryTipoTasa`$$
CREATE PROCEDURE `queryTipoTasa`()
BEGIN
			SELECT codLista, descripcion
			FROM Listas
			WHERE lista = 'TipoTasa';
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryTitulosSubtiMensajes`$$
CREATE PROCEDURE `queryTitulosSubtiMensajes`(
    IN pCode INT
)
BEGIN
    SELECT valor
    FROM parametrosFrontEnd
    WHERE idparametrizaFront = pCode;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryUpdateEnte`$$
CREATE PROCEDURE `queryUpdateEnte`(IN COD INT, USU CHAR(15))
BEGIN
			UPDATE ente_aprobacion
            SET COD_APROBADOR = COD
            WHERE USUARIO = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryUserPerfilCliente`$$
CREATE PROCEDURE `queryUserPerfilCliente`(IN LOGIN CHAR(15))
BEGIN
	SELECT COD_PERF_CLIENTE
	FROM usuario
	WHERE USUARIO = LOGIN;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryUsuario`$$
CREATE PROCEDURE `queryUsuario`(IN id CHAR(15))
BEGIN
    		SELECT U.USUARIO, U.NOMBRE, U.CORREO, U.COD_CARGO, U.COD_OFICINA, U.COD_REGIONAL, U.COD_CANAL,
    		P.COD_PERFIL, P.PERFIL
    		FROM usuario U
    		JOIN perfiles_usuario PU ON U.USUARIO = PU.USUARIO
    		JOIN perfiles P ON PU.COD_PERFIL = P.COD_PERFIL
    		WHERE U.USUARIO = id;
    	END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryUsuarioOficina`$$
CREATE PROCEDURE `queryUsuarioOficina`(IN pUsuario VARCHAR(15))
BEGIN
			SELECT A.NOMBRE, CONCAT_WS(' - ', A.COD_OFICINA, B.OFICINA) AS OFICINA
			FROM usuario AS A
			JOIN oficina AS B ON B.COD_OFICINA = A.COD_OFICINA
			WHERE usuario = pUsuario;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryValidarEntes`$$
CREATE PROCEDURE `queryValidarEntes`(IN SOLICITUD INT)
BEGIN
            DECLARE APRO INT;
            DECLARE REQUERIDAS INT;
            DECLARE ENTE CHAR(15);
            DECLARE TIPOENTE INT;
            DECLARE ENTES_ATRIBUCION VARCHAR(30);
            DECLARE NAPRO INT;
            DECLARE PARAMETRIZADOR CHAR(15);
            DECLARE RADICADOR CHAR(15);
            
			SET APRO = (SELECT count(A.codSolicitud)
						FROM asignaciones AS A
						JOIN solicitudes AS B ON A.codSolicitud = B.COD_SOLICITUD
						JOIN estado_asignacion AS C ON C.idAsignacion = A.idasignacion
						WHERE A.codSolicitud = SOLICITUD AND codDecision = 1
						GROUP BY A.codSolicitud);
			
            SET APRO = (SELECT IFNULL(APRO, 0));
            
            SET ENTES_ATRIBUCION = (SELECT JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.ENTE_ATRIBUCION_FINAL') AS ENTE_ATRIBUCION
									FROM solicitudes AS A 
									WHERE COD_SOLICITUD = SOLICITUD);
                            
			SET REQUERIDAS = (SELECT JSON_LENGTH(ENTES_ATRIBUCION));
            
            SET PARAMETRIZADOR = (SELECT USUARIO AS COD_PARAMETRIZADOR FROM ente_parametrizacion WHERE USUARIO = (SELECT JSON_UNQUOTE(JSON_EXTRACT(A.DATOS_SOLICITUD,'$.KNIME.PARAMETRIZADOR'))
									FROM solicitudes AS A 
									WHERE COD_SOLICITUD = SOLICITUD));
                                    
			SET RADICADOR = (SELECT USUARIO FROM usuario 
								WHERE USUARIO = (SELECT ID_RADICADOR FROM solicitudes WHERE COD_SOLICITUD = SOLICITUD));
                                    
			IF (APRO + 1) < REQUERIDAS THEN
				-- VALIDAR APROBADOR;
                SET NAPRO = APRO + 1;
                SET TIPOENTE = (SELECT JSON_UNQUOTE(JSON_EXTRACT(ENTES_ATRIBUCION, CONCAT('$[', NAPRO, ']'))));
                SET ENTE = (SELECT USUARIO FROM ente_aprobacion WHERE COD_APROBADOR = TIPOENTE ORDER BY RAND() LIMIT 1);
                SELECT ENTE;
			ELSE
				-- VALIDAR PARAMETRIZADOR;
                SELECT PARAMETRIZADOR, RADICADOR;
			END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryValidarProducto`$$
CREATE PROCEDURE `queryValidarProducto`(IN pCODPRO CHAR(2))
BEGIN		        
			SELECT NOMBRE 
			FROM producto
			WHERE COD_PRODUCTO = pCODPRO;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `queryValidarSesion`$$
CREATE PROCEDURE `queryValidarSesion`(IN `USU` VARCHAR(15))
BEGIN
			SELECT A.ip_user
			FROM sessions AS A
			WHERE A.user_id = USU;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `truncateAgrupacionProducto`$$
CREATE PROCEDURE `truncateAgrupacionProducto`()
BEGIN
		 TRUNCATE parametrosSubProducto;           
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `truncateAgrupadores`$$
CREATE PROCEDURE `truncateAgrupadores`()
BEGIN
		 TRUNCATE parametrosTipoCompania;           
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `truncateFrecuenciaCapital`$$
CREATE PROCEDURE `truncateFrecuenciaCapital`()
BEGIN
		 TRUNCATE frecuenciaCapital;           
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `truncateFrecuenciaInteres`$$
CREATE PROCEDURE `truncateFrecuenciaInteres`()
BEGIN
		 TRUNCATE frecuenciaInteres;           
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `truncatePeriodoGracia`$$
CREATE PROCEDURE `truncatePeriodoGracia`()
BEGIN
		 TRUNCATE periodoGracia;           
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `truncateTipoTasa`$$
CREATE PROCEDURE `truncateTipoTasa`()
BEGIN
		 TRUNCATE tipo_tasa;           
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateAccionistasPj`$$
CREATE PROCEDURE `updateAccionistasPj`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoAccionista VARCHAR(45), porcentajeParticipacion VARCHAR(45),
    primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU INT,
    numeroIdentificacionTributaria INT)
BEGIN
			UPDATE accionistasPj AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.nombreRazonSocial = nombreRazonSocial, A.codTipoAccionista = codTipoAccionista, A.porcentajeParticipacion = porcentajeParticipacion,
            A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre,
            A.responsableFiscalEEUU = responsableFiscalEEUU, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateAccionistasPn`$$
CREATE PROCEDURE `updateAccionistasPn`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45),
    segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codTipoAccionista VARCHAR(45),
    porcentajeParticipacion VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
BEGIN
			UPDATE accionistasPn AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion, A.primerApellido = primerApellido,
            A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre,
            A.codTipoAccionista = codTipoAccionista, A.porcentajeParticipacion = porcentajeParticipacion,
            A.responsableFiscalEEUU = responsableFiscalEEUU, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateActividadEconomicaPn`$$
CREATE PROCEDURE `updateActividadEconomicaPn`(IN codClienteNatural VARCHAR(45), profesion VARCHAR(45), ocupacion VARCHAR(45),
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

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateAdquirencia`$$
CREATE PROCEDURE `updateAdquirencia`(IN ID INT, PUNTO INT, COSTO INT, USU VARCHAR(45))
BEGIN
			UPDATE adquirencia AS A
			SET A.puntos = PUNTO, A.tarifaCosto = COSTO, A.cod_usu = USU
			WHERE A.idadquirencia = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateBeneficiariosPJ`$$
CREATE PROCEDURE `updateBeneficiariosPJ`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), porcentajeParticipacion VARCHAR(45), primerApellido VARCHAR(45),
    segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), responsableFiscalEEUU VARCHAR(45),
    numeroIdentificacionTributaria VARCHAR(45))
BEGIN
			UPDATE beneficiariosPJ AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.nombreRazonSocial = nombreRazonSocial, A.porcentajeParticipacion = porcentajeParticipacion, A.primerApellido = primerApellido,
            A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre,
            A.responsableFiscalEEUU = responsableFiscalEEUU, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateBeneficiariosPn`$$
CREATE PROCEDURE `updateBeneficiariosPn`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45),
    segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), porcentajeBeneficio VARCHAR(45),
    responsableFiscalEEUU VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
BEGIN
			UPDATE beneficiariosPn AS A
			SET A.codClienteJuridico = codClienteJuridico, A.cantidad = cantidad, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion,
            A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre,
            A.segundoNombre = segundoNombre, A.porcentajeBeneficio = porcentajeBeneficio, A.responsableFiscalEEUU = responsableFiscalEEUU,
            A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
            WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateCatalogos`$$
CREATE PROCEDURE `updateCatalogos`(IN pVAL LONGTEXT, pCAT VARCHAR(20), pUSU VARCHAR(15))
BEGIN
			DECLARE vStatus INT;
			            
            UPDATE catalogos
				SET dataCatalogo = pVAL, codUsu = pUSU
			WHERE idcatalogos = pCAT;
            
            SET vStatus = ROW_COUNT();
            IF vStatus > 0 THEN
				SELECT 200 AS STATUS;
				UPDATE catalogos
				SET fechaUltima = curdate()
				WHERE idcatalogos = pCAT;
			ELSE
				SELECT 500 AS STATUS, COUNT(*) AS count, pCAT FROM catalogos WHERE catalogo = pCAT;
            END IF;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateCdtVencidos`$$
CREATE PROCEDURE `updateCdtVencidos`(IN pcodCDT VARCHAR(15))
BEGIN
			UPDATE cdt
				SET codEdoCancelacion = 'C'
			WHERE codCDT = pcodCDT;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateClienteJuridico`$$
CREATE PROCEDURE `updateClienteJuridico`(IN nit INT, razonSocial VARCHAR(80), fechaConstitucion DATE,
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

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateClientePn`$$
CREATE PROCEDURE `updateClientePn`(IN numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45), paisExpedicion VARCHAR(45),
    departamentoExpedicion VARCHAR(45), ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), departamentoNacimiento VARCHAR(45), ciudadNacimiento VARCHAR(45), fechaNacimiento DATE,
    codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45), sexo VARCHAR(45), nacionalidad1 VARCHAR(45),
    nacionalidad2 VARCHAR(45), edoCivil VARCHAR(45), tieneDiscapacidad VARCHAR(45), tipoDiscapacidad VARCHAR(45), oficina VARCHAR(45),
    oficialOficina VARCHAR(45), situacionImpositiva VARCHAR(45), desempeñoCargoPEP VARCHAR(45), tipoPEP VARCHAR(45), perteneceGrupoEtnico VARCHAR(45),
    codUsu CHAR(15))
BEGIN
			UPDATE clienteNatural AS A
			SET A.fechaExpedicion = fechaExpedicion, A.lugarExpedicion = lugarExpedicion, A.paisExpedicion = paisExpedicion,
            A.departamentoExpedicion = departamentoExpedicion, A.ciudadExpedicion = ciudadExpedicion, A.primerApellido = primerApellido,
            A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre, A.paisNacimiento = paisNacimiento,
            A.departamentoNacimiento = departamentoNacimiento, A.ciudadNacimiento = ciudadNacimiento, A.fechaNacimiento = fechaNacimiento,
            A.codPrefijoTelefonico = codPrefijoTelefonico, A.telefono = telefono, A.correoElectronico = correoElectronico, A.sexo = sexo,
            A.nacionalidad1 = nacionalidad1, A.nacionalidad2 = nacionalidad2, A.edoCivil = edoCivil, A.tieneDiscapacidad = tieneDiscapacidad,
            A.tipoDiscapacidad = tipoDiscapacidad, A.oficina = oficina, A.oficialOficina = oficialOficina, A.situacionImpositiva = situacionImpositiva,
            A.desempeñoCargoPEP = desempeñoCargoPEP, A.tipoPEP = tipoPEP, A.perteneceGrupoEtnico = perteneceGrupoEtnico, A.codUsu = codUsu
			WHERE A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateContactosAutorizados`$$
CREATE PROCEDURE `updateContactosAutorizados`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45),
    ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoContacto VARCHAR(45), correoElectronico VARCHAR(45))
BEGIN
			UPDATE contactosAutorizados AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion, A.departamentoExpedicion = departamentoExpedicion,
            A.ciudadExpedicion = ciudadExpedicion, A.primerApellido = primerApellido, A.segundoApellido = segundoApellido,
            A.primerNombre = primerNombre, A.segundoNombre = segundoNombre, A.codPrefijoTelefonico = codPrefijoTelefonico,
            A.telefonoContacto = telefonoContacto, A.correoElectronico = correoElectronico
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
        END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateControlantes`$$
CREATE PROCEDURE `updateControlantes`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), responsableFiscalEEUU INT, numeroIdentificacionTributaria INT)
BEGIN
			UPDATE controlantes AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre,
            A.segundoNombre = segundoNombre, A.responsableFiscalEEUU = responsableFiscalEEUU,
            A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateCorreoParametrizador`$$
CREATE PROCEDURE `updateCorreoParametrizador`(IN COD INT, ESTADO INT)
BEGIN
			UPDATE estado_solicitud
			SET estatusCorreo = ESTADO, fechaCorreo = now()
			WHERE codSolicitud = COD;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateCorresponsales`$$
CREATE PROCEDURE `updateCorresponsales`(IN ID INT, TPLENA DECIMAL(7,1), ESTADO INT, TICKET INT, USU VARCHAR(45))
BEGIN
			UPDATE corresponsales AS A
			SET A.tarifaPlena = TPLENA, A.estado = ESTADO, A.ticket_promedio = TICKET, A.cod_usu = USU
			WHERE A.idcorresponsales = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateCupoSobregiro`$$
CREATE PROCEDURE `updateCupoSobregiro`(
		IN USU VARCHAR(15), 
		IN pEdoSolicitud VARCHAR(255), 
		IN pNumeroCuenta VARCHAR(255),
		IN pACTA VARCHAR(255),
		IN pObservacion VARCHAR(255)
	)
BEGIN
			UPDATE cupo_sobregiro
			SET 
				fecha_aprobador_final = DATE(NOW()),
				usuario_aprobador = USU,
				estado_solicitud = pEdoSolicitud,
				observacion = pObservacion
			WHERE numero_cuenta = pNumeroCuenta AND acta_aprobacion_id = pACTA;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateDatosImpositivos`$$
CREATE PROCEDURE `updateDatosImpositivos`(IN codClienteJuridico VARCHAR(45), codEnte VARCHAR(45), desempeñaDesempeño VARCHAR(45),
    relacionDependencia VARCHAR(45), rol VARCHAR(45), fechaIngreso DATE, fechaSalida DATE)
BEGIN
			UPDATE datosImpositivos AS A
			SET A.codClienteJuridico = codClienteJuridico, A.codEnte = codEnte, A.desempeñaDesempeño = desempeñaDesempeño,
            A.relacionDependencia = relacionDependencia, A.rol = rol, A.fechaIngreso = fechaIngreso, A.fechaSalida = fechaSalida
			WHERE A.codClienteJuridico = codClienteJuridico AND A.codEnte = codEnte;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updatedDataCampos`$$
CREATE PROCEDURE `updatedDataCampos`(IN IDC INT,  ACT_OBLI INT, ACT_EDI INT, CRE_OBLI INT, PROS_OBLI INT, NCLI_OBLI INT, USU CHAR(15))
BEGIN
			UPDATE camposClientes
			SET actObligatorio = ACT_OBLI, actEditable = ACT_EDI, creaObligatorio = CRE_OBLI, prospObligatorio = PROS_OBLI, nCliObligatorio = NCLI_OBLI, codUsu = USU
			WHERE idCampo = IDC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updatedDataFile`$$
CREATE PROCEDURE `updatedDataFile`(IN SOLI INT, CED VARCHAR(50), RUT VARCHAR(50), CER VARCHAR(50), FRM VARCHAR(50), CON VARCHAR(50), B6 VARCHAR(45), B7 VARCHAR(45), B8 VARCHAR(45), B9 VARCHAR(45), B10 VARCHAR(45), B11 VARCHAR(45), B12 VARCHAR(45), B13 VARCHAR(45), B14 VARCHAR(45), B15 VARCHAR(45), B16 VARCHAR(45), B17 VARCHAR(45), B18 VARCHAR(45), B19 VARCHAR(45), B20 VARCHAR(45), B21 VARCHAR(45), B22 VARCHAR(45), B23 VARCHAR(45), USU CHAR(15))
BEGIN
			UPDATE controlDocumentos
			SET docCedula = CED, docRut = RUT, docCertificado = CER, docFormato = FRM, docContrato = CON, docBuzon6 = B6, docBuzon7 = B7, docBuzon8 = B8, docBuzon9 = B9, docBuzon10 = B10, docBuzon11 = B11, docBuzon12 = B12, docBuzon13 = B13, docBuzon14 = B14, docBuzon15 = B15, docBuzon16 = B16, docBuzon17 = B17, docBuzon18 = B18, docBuzon19 = B19, docBuzon20 = B20, docBuzon21 = B21, docBuzon22 = B22, docBuzon23 = B23, cod_usu = USU
			WHERE cod_solicitud = SOLI;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateDetalleActivEcoPn`$$
CREATE PROCEDURE `updateDetalleActivEcoPn`(IN codClienteNatural VARCHAR(45), claseBalance VARCHAR(45), tipoBalance VARCHAR(45), FechaCorte VARCHAR(45), ventasBrutas VARCHAR(45),
    ingresoAnual VARCHAR(45), ingresoPGJ VARCHAR(45), egresoPGJ VARCHAR(45), activosBGJ VARCHAR(45), activos VARCHAR(45), pasivosBGJ VARCHAR(45), PatrimonioBGJ VARCHAR(45))
BEGIN
			UPDATE detalleActivEcoPn AS A
			SET A.claseBalance = claseBalance, A.tipoBalance = tipoBalance, A.ventasBrutas = ventasBrutas,
            A.ingresoAnual = ingresoAnual, A.ingresoPGJ = ingresoPGJ, A.egresoPGJ = egresoPGJ, A.activosBGJ = activosBGJ,
            A.activos = activos, A.pasivosBGJ = pasivosBGJ, A.PatrimonioBGJ = PatrimonioBGJ
			WHERE A.codClienteNatural = codClienteNatural AND A.FechaCorte = FechaCorte;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateDireccionActividad`$$
CREATE PROCEDURE `updateDireccionActividad`(IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45),
    viaPrincipal VARCHAR(45), viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)
BEGIN
			UPDATE direccionActividad AS A
            SET A.codEnte = codEnte, A.codDepartamento = codDepartamento, A.codCiudad = codCiudad, A.codDireccion = codDireccion,
            A.viaPrincipal = viaPrincipal, A.viaSecundaria = viaSecundaria, A.numeroInmueble = numeroInmueble, A.referenciaUbicacion = referenciaUbicacion
			WHERE A.codEnte = codEnte;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateDirecciones`$$
CREATE PROCEDURE `updateDirecciones`(IN codEnte VARCHAR(45), codDepartamento VARCHAR(45), codCiudad VARCHAR(45), codDireccion VARCHAR(45),
    viaPrincipal VARCHAR(45), viaSecundaria VARCHAR(45), numeroInmueble VARCHAR(45), referenciaUbicacion TEXT)
BEGIN
			UPDATE direcciones  AS A
			SET A.codEnte = codEnte, A.codDepartamento = codDepartamento, A.codCiudad = codCiudad, A.codDireccion = codDireccion,
            A.viaPrincipal = viaPrincipal, A.viaSecundaria = viaSecundaria, A.numeroInmueble = numeroInmueble, A.referenciaUbicacion = referenciaUbicacion
			WHERE A.codEnte = codEnte;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updatedLineaCredito`$$
CREATE PROCEDURE `updatedLineaCredito`(IN pLinea INT, pTasa INT, pMin DECIMAL(4,2), pMax DECIMAL(4,2), pPlazoMin INT, pPlazoMax INT)
BEGIN
			UPDATE detalleLineaCredito
			SET codTasa = pTasa, codSpreadMin = pMin, codSpreadMax = pMax, codPlazoMin = pPlazoMin, codPlazoMax = pPlazoMax
			WHERE codLinea = pLinea;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateDocument`$$
CREATE PROCEDURE `updateDocument`(IN ID INT, PATHS VARCHAR(50), VALOR LONGTEXT)
BEGIN
			SET @CLAVE = CONCAT('$.', PATHS);
            UPDATE solicitudes AS A
			SET A.DATOS_SOLICITUD = JSON_SET(DATOS_SOLICITUD, @CLAVE, VALOR) 
			WHERE COD_SOLICITUD = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateDocumentos`$$
CREATE PROCEDURE `updateDocumentos`(
    IN pCodigo VARCHAR(10),
    IN pCredito INT
    )
BEGIN
        UPDATE documentos
		SET credito = pCredito
		WHERE codigo = pCodigo;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateEstadoExcluirPlan`$$
CREATE PROCEDURE `updateEstadoExcluirPlan`(IN PLAN INT, CODPLAN CHAR(6), IDCLIE INT, EDOIN INT, USU CHAR(15))
BEGIN
			UPDATE inclusionPlan
			SET estadoInclusion = EDOIN, codUsu = USU
			WHERE plan = PLAN AND codPlan = CODPLAN AND idCliente = IDCLIE;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateEstadoPlanRango`$$
CREATE PROCEDURE `updateEstadoPlanRango`(IN pPlan INT, pCodPlan INT, USU CHAR(15))
BEGIN
            DECLARE vRowAffec INT;
                        
			UPDATE rangoPlanes
			SET estadoPlan = 2, codUsu = USU
			WHERE plan = pPlan AND codPlan = pCodPlan;
            SET vRowAffec = ROW_COUNT();
            
            IF vRowAffec > 0 THEN
				SELECT 200 AS STATUS;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
            
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateFechaAplicacion`$$
CREATE PROCEDURE `updateFechaAplicacion`(IN pPlan INT, pCodPlan INT, pFechaAplica DATE, USU CHAR(15))
BEGIN
            DECLARE vRowAffec INT;
                        
			UPDATE rangoPlanes
			SET fechaAplicacion = pFechaAplica, codUsu = USU
			WHERE plan = pPlan AND codPlan = pCodPlan;
            SET vRowAffec = ROW_COUNT();
            
            IF vRowAffec > 0 THEN
				SELECT 200 AS STATUS;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
            
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateInformacionFinanciera`$$
CREATE PROCEDURE `updateInformacionFinanciera`(IN codClienteJuridico CHAR(9), periodo INT, ventasAnualesMM DECIMAL(10,2),
    gastosAnualesMM DECIMAL(10,2), activosMM DECIMAL(10,2), pasivosMM DECIMAL(10,2), capitalSocial DECIMAL(10,2),
    patrimonioMM DECIMAL(10,2), ingresosMensualesMM DECIMAL(10,2), egresosMensulesMM DECIMAL(10,2), ingresosNoOperacionalesMM DECIMAL(10,2),
    ventasAnuales DOUBLE, gastosAnuales DOUBLE, ingresosBrutosOrdinarias DOUBLE)
BEGIN
			UPDATE informacionFinanciera AS A
			SET A.periodo = periodo, A.ventasAnualesMM = ventasAnualesMM, A.gastosAnualesMM = gastosAnualesMM, A.activosMM = activosMM,
            A.pasivosMM = pasivosMM, A.capitalSocial = capitalSocial, A.patrimonioMM = patrimonioMM, A.ingresosMensualesMM = ingresosMensualesMM,
            A.egresosMensulesMM = egresosMensulesMM, A.ingresosNoOperacionalesMM = ingresosNoOperacionalesMM, A.ventasAnuales = ventasAnuales,
            A.gastosAnuales = gastosAnuales, A.ingresosBrutosOrdinarias =ingresosBrutosOrdinarias
			WHERE A.codClienteJuridico = codClienteJuridico AND  A.periodo = periodo;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateJuntaDirectivaPj`$$
CREATE PROCEDURE `updateJuntaDirectivaPj`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), nombreRazonSocial VARCHAR(45), codTipoIntegrante VARCHAR(45))
BEGIN
			UPDATE juntaDirectivaPj AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.nombreRazonSocial = nombreRazonSocial, A.codTipoIntegrante = codTipoIntegrante
			WHERE A.codClienteJuridico = codClienteJuridico AND  A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateJuntaDirectivaPn`$$
CREATE PROCEDURE `updateJuntaDirectivaPn`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), primerApellido VARCHAR(45),
    segundoApellido VARCHAR(45), primerNombre VARCHAR(45), segundoNombre VARCHAR(45), codTipoIntegrante VARCHAR(45))
BEGIN
			UPDATE juntaDirectivaPn AS A
			SET A.codClienteJuridico = codClienteJuridico, A.cantidad = cantidad, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion,
            A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre, A.segundoNombre = segundoNombre,
            A.codTipoIntegrante = codTipoIntegrante
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateJustificacionOficina`$$
CREATE PROCEDURE `updateJustificacionOficina`(IN COD_JUST INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
BEGIN
            UPDATE justificacionOficina AS A
			SET A.tipoJustificacionOfi = TIPO, A.permitirNegociar= PERMITIR, A.tarifaPlena = PLENA, A.cod_usu = USU
			WHERE A.idjustificacionOficina = COD_JUST;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateJustificacionPse`$$
CREATE PROCEDURE `updateJustificacionPse`(IN COD_JUST INT, TIPO VARCHAR(100), PERMITIR INT, PLENA DECIMAL(10,1), USU VARCHAR(45))
BEGIN
            UPDATE justificacionPse AS A
			SET A.tipoJustificacionPse = TIPO, A.permitirNegociar= PERMITIR, A.tarifaPlena = PLENA, A.cod_usu = USU
			WHERE A.idjustificacionPse = COD_JUST;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateNegociarNomina`$$
CREATE PROCEDURE `updateNegociarNomina`(IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), CANT DECIMAL(3,2), PNEGOCIAR INT, FCALCULO VARCHAR(60), ID INT, USU CHAR(15))
BEGIN
            UPDATE negociarNomina AS N	
			SET N.tarifaPlena = TPLENA, N.tarifaCosto = TCOSTO, N.cantidad = CANT, N.permitirNegociar = PNEGOCIAR, N.formulaCalculo = FCALCULO, N.usuario = USU
			WHERE N.idnegociarNomina = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updatePagoTerceros`$$
CREATE PROCEDURE `updatePagoTerceros`(IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), ID INT, USU CHAR(15))
BEGIN
            UPDATE pagoTerseros AS P 
			SET P.tarifaPlena = TPLENA, P.tarifaCosto = TCOSTO, P.usuario = USU
			WHERE P.idpagoTerseros = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateParametrosEfecty`$$
CREATE PROCEDURE `updateParametrosEfecty`(IN IDPARA INT, TIPO VARCHAR(45), USU CHAR(15))
BEGIN
			UPDATE ParametrosEfecty AS A
			SET A.ParametrosEfecty = TIPO, A.cod_usu = USU
			WHERE A.idParametrosEfecty = IDPARA;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updatePlanFechaUltimo`$$
CREATE PROCEDURE `updatePlanFechaUltimo`(IN pPlan INT, USU CHAR(15))
BEGIN
            DECLARE vRowAffec INT;
                        
			UPDATE planes
			SET codUsu = USU
			WHERE plan = pPlan;
            SET vRowAffec = ROW_COUNT();
            
            IF vRowAffec > 0 THEN
				SELECT 200 AS STATUS;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
            
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updatePromedioNomina`$$
CREATE PROCEDURE `updatePromedioNomina`(IN IDPRO INT, TIPO VARCHAR(45), USU CHAR(15))
BEGIN
			UPDATE promedioNomina AS A
			SET A.tipo = TIPO, A.usuario = USU
			WHERE A.idpromedioNomina = IDPRO;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateRecaudoOficina`$$
CREATE PROCEDURE `updateRecaudoOficina`(IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), ID INT, USU VARCHAR(45))
BEGIN
			UPDATE recaudoOficina AS R 
			SET R.tarifaPlena = TPLENA, R.tarifaCosto = TCOSTO, R.cod_user = USU
			WHERE R.idrecaudoOficina = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateRecaudoPse`$$
CREATE PROCEDURE `updateRecaudoPse`(IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), ID INT, USU VARCHAR(45))
BEGIN
			UPDATE recaudoPse AS R 
			SET R.tarifaPlena = TPLENA, R.tarifaCosto = TCOSTO, R.cod_user = USU
			WHERE R.idrecaudoPse = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateRecidenciaFiscal`$$
CREATE PROCEDURE `updateRecidenciaFiscal`(IN codClienteJuridico VARCHAR(45), personaEEUU VARCHAR(45), personaEspecíficaEEUU VARCHAR(45),
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

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateRecidenciaFiscalPn`$$
CREATE PROCEDURE `updateRecidenciaFiscalPn`(IN codClienteNatural VARCHAR(45), residenciaFiscalColombia VARCHAR(45), residenciaFiscalEEUU VARCHAR(45),
    residenciFiscalOtroPais VARCHAR(45), paisResidenciaFiscal VARCHAR(45), tipoIdentificacionTributaria VARCHAR(45), numeroIdentificacionTributaria VARCHAR(45))
BEGIN
			UPDATE recidenciaFiscalPn AS A
			SET A.residenciaFiscalColombia = residenciaFiscalColombia, A.residenciaFiscalEEUU = residenciaFiscalEEUU,
            A.residenciFiscalOtroPais = residenciFiscalOtroPais, A.paisResidenciaFiscal = paisResidenciaFiscal, 
            A.tipoIdentificacionTributaria = tipoIdentificacionTributaria, A.numeroIdentificacionTributaria = numeroIdentificacionTributaria
			WHERE A.codClienteNatural = codClienteNatural;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateReciprocidadMinima`$$
CREATE PROCEDURE `updateReciprocidadMinima`(IN IDREC INT, MONTO INT, USU CHAR(15))
BEGIN
			UPDATE reciprocidadMinima AS A
			SET A.monto = MONTO, A.codUsu = USU
			WHERE A.idReciprocidadMinima = IDREC;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateReferenciasPn`$$
CREATE PROCEDURE `updateReferenciasPn`(IN codClienteNatural VARCHAR(45), cantidad INT, primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), paisNacimiento VARCHAR(45), fechaNacimiento DATE, tipoDocumento VARCHAR(45), numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, lugarExpedicion VARCHAR(45),
    codPrefijoTelefonico VARCHAR(45), telefono VARCHAR(45), correoElectronico VARCHAR(45))
BEGIN
			UPDATE referenciasPn AS A
			SET A.cantidad = cantidad, A.primerApellido = primerApellido, A.segundoApellido = segundoApellido, A.primerNombre = primerNombre,
            A.segundoNombre = segundoNombre, A.paisNacimiento = paisNacimiento, A.fechaNacimiento = fechaNacimiento, A.tipoDocumento = tipoDocumento,
            A.numeroIdentificacion = numeroIdentificacion, A.fechaExpedicion = fechaExpedicion, A.lugarExpedicion = lugarExpedicion,
            A.codPrefijoTelefonico = codPrefijoTelefonico, A.telefono = telefono, A.correoElectronico = correoElectronico
			WHERE A.codClienteNatural = codClienteNatural AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateRepresentanteLegal`$$
CREATE PROCEDURE `updateRepresentanteLegal`(IN codClienteJuridico VARCHAR(45), cantidad INT, tipoDocumento VARCHAR(45),
    numeroIdentificacion VARCHAR(45), fechaExpedicion DATE, paisExpedicion VARCHAR(45), departamentoExpedicion VARCHAR(45),
    ciudadExpedicion VARCHAR(45), primerApellido VARCHAR(45), segundoApellido VARCHAR(45), primerNombre VARCHAR(45),
    segundoNombre VARCHAR(45), codPrefijoTelefonico VARCHAR(45), telefonoRepresentante VARCHAR(45), correoElectronico VARCHAR(45))
BEGIN
			UPDATE representanteLegal AS A
			SET A.cantidad = cantidad, A.tipoDocumento = tipoDocumento, A.numeroIdentificacion = numeroIdentificacion,
            A.fechaExpedicion = fechaExpedicion, A.paisExpedicion = paisExpedicion, A.departamentoExpedicion = departamentoExpedicion,
            A.ciudadExpedicion = ciudadExpedicion, A.primerApellido = primerApellido, A.segundoApellido = segundoApellido,
            A.primerNombre = primerNombre, A.segundoNombre = segundoNombre, A.codPrefijoTelefonico = codPrefijoTelefonico,
            A.telefonoRepresentante = telefonoRepresentante, A.correoElectronico = correoElectronico
			WHERE A.codClienteJuridico = codClienteJuridico AND A.numeroIdentificacion = numeroIdentificacion;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateServiciosFinancieros`$$
CREATE PROCEDURE `updateServiciosFinancieros`(IN ID INT, TARIFA INT, COSTO INT, OBLI INT, USU VARCHAR(45))
BEGIN
            UPDATE financieros AS A
			SET A.tarifa = TARIFA, A.costo= COSTO, A.obligatorio = OBLI, A.cod_usu = USU
			WHERE A.idFinanciero = ID;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateTipoCredIbrState`$$
CREATE PROCEDURE `updateTipoCredIbrState`(IN TIP_PROD INT, IBR INT, ESTADO INT, USU CHAR(15))
BEGIN
			UPDATE tipoCredIbrState AS A 
			SET A.codEstado = ESTADO, A.codUsu = USU
			WHERE A.COD_TIP_PROD = TIP_PROD  AND  A.cod_ibr = IBR;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateTipoRedescuentoStatus`$$
CREATE PROCEDURE `updateTipoRedescuentoStatus`(IN CODRED INT, CODEST INT, USU CHAR(15))
BEGIN
			UPDATE entidadRedescuento
			SET codEstado = CODEST, CodUsu = USU
			WHERE cod_redescuento = CODRED;
		END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS `updateUsuario`$$
CREATE PROCEDURE `updateUsuario`(IN USU VARCHAR(15), CAR INT, OFI INT, REG INT, CAN INT, PCLI INT, PPRO VARCHAR(100))
BEGIN
			UPDATE usuario AS U 
			SET U.COD_CARGO = CAR, U.COD_OFICINA = OFI, U.COD_REGIONAL = REG, U.COD_CANAL = CAN, COD_PERF_CLIENTE = PCLI, COD_PERF_PRODUCTO = PPRO
			WHERE U.USUARIO = USU;
		END$$
DELIMITER ;
