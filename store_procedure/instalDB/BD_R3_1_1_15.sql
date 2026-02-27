CREATE DATABASE  IF NOT EXISTS `ORIGINADOR_DB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ORIGINADOR_DB`;

DROP TABLE IF EXISTS `adquirencia`;
CREATE TABLE `adquirencia` (
  `idadquirencia` int NOT NULL AUTO_INCREMENT,
  `tipoAdquirencia` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `puntos` int DEFAULT NULL,
  `tarifaCosto` int DEFAULT NULL,
  `cod_usu` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idadquirencia`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `asignaciones`;
CREATE TABLE `asignaciones` (
  `idasignacion` int NOT NULL AUTO_INCREMENT,
  `codSolicitud` int DEFAULT NULL,
  `codEnte` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codTipo` int DEFAULT NULL,
  `fechaAsignacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idasignacion`)
) ENGINE=InnoDB AUTO_INCREMENT=1569 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `asoc`;
CREATE TABLE `asoc` (
  `COD_ASOC` int DEFAULT NULL,
  `ASOC` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `calificacion`;
CREATE TABLE `calificacion` (
  `COD_CALIF_MES` int NOT NULL AUTO_INCREMENT,
  `CALIF_MES` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`COD_CALIF_MES`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `canal`;
CREATE TABLE `canal` (
  `COD_CANAL_RAD` int NOT NULL AUTO_INCREMENT,
  `CANAL_RAD` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_CANAL_RAD`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cargos`;
CREATE TABLE `cargos` (
  `COD_CARGO` int NOT NULL AUTO_INCREMENT,
  `CARGO` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_CARGO`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `coberturaFng`;
CREATE TABLE `coberturaFng` (
  `idcoberturaFng` int NOT NULL AUTO_INCREMENT,
  `codCobertura` int DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `descripcion` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idcoberturaFng`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `controlBuzon`;
CREATE TABLE `controlBuzon` (
  `idcontrolBuzon` int NOT NULL AUTO_INCREMENT,
  `cod_solicitud` int NOT NULL,
  `buzon` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cod_usu` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fech_carga` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcontrolBuzon`)
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `controlDocumentos`;
CREATE TABLE `controlDocumentos` (
  `idcontrolDocumentos` int NOT NULL AUTO_INCREMENT,
  `cod_solicitud` int NOT NULL,
  `docCedula` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docRut` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docCertificado` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docFormato` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docContrato` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cod_usu` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fech_carga` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `docBuzon6` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon7` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon8` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon9` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon10` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon11` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon12` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon13` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon14` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon15` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon16` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon17` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon18` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon19` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon20` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon21` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon22` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docBuzon23` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idcontrolDocumentos`),
  UNIQUE KEY `cod_solicitud_UNIQUE` (`cod_solicitud`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `convenio`;
CREATE TABLE `convenio` (
  `COD_CONVENIO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`COD_CONVENIO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `corresponsales`;
CREATE TABLE `corresponsales` (
  `idcorresponsales` int NOT NULL AUTO_INCREMENT,
  `corresponsales` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarifaPlena` decimal(7,1) DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `ticket_promedio` int DEFAULT NULL,
  `cod_usu` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcorresponsales`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ente_aprobacion`;
CREATE TABLE `ente_aprobacion` (
  `COD_APROBADOR` int NOT NULL,
  `USUARIO` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `USUARIO_UNIQUE` (`USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ente_parametrizacion`;
CREATE TABLE `ente_parametrizacion` (
  `COD_PARAMETRIZADOR` int NOT NULL AUTO_INCREMENT,
  `USUARIO` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_PARAMETRIZADOR`),
  UNIQUE KEY `USUARIO_UNIQUE` (`USUARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `entidadRedescuento`;
CREATE TABLE `entidadRedescuento` (
  `idEntidadRedescuento` int NOT NULL AUTO_INCREMENT,
  `cod_redescuento` int DEFAULT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codEstado` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idEntidadRedescuento`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `estado_asignacion`;
CREATE TABLE `estado_asignacion` (
  `idAsignacion` int DEFAULT NULL,
  `codDecision` int DEFAULT NULL,
  `codUsuario` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacion` varchar(1500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaDecision` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `idAsignacion_UNIQUE` (`idAsignacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `estado_aso`;
CREATE TABLE `estado_aso` (
  `COD_ESTADO_ASO` int DEFAULT NULL,
  `ESTADO_ASO` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `estado_bco`;
CREATE TABLE `estado_bco` (
  `COD_ESTADO_BCO` int NOT NULL,
  `ESTADO_BCO` char(47) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`COD_ESTADO_BCO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `estado_solicitud`;
CREATE TABLE `estado_solicitud` (
  `codSolicitud` int DEFAULT NULL,
  `estadoAprobacion` int DEFAULT NULL,
  `fechaAprobacion` datetime DEFAULT NULL,
  `estadoParametrizacion` int DEFAULT NULL,
  `fechaParametrizacion` datetime DEFAULT NULL,
  `estatusCorreo` int DEFAULT NULL,
  `fechaCorreo` datetime DEFAULT NULL,
  UNIQUE KEY `codSolicitud_UNIQUE` (`codSolicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `financieros`;
CREATE TABLE `financieros` (
  `idFinanciero` int NOT NULL AUTO_INCREMENT,
  `servicio` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarifa` int DEFAULT NULL,
  `costo` int DEFAULT NULL,
  `obligatorio` int DEFAULT NULL,
  `cod_usu` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idFinanciero`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `frecuenciaNomina`;
CREATE TABLE `frecuenciaNomina` (
  `idfrecuenciaNomina` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `usuario` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `frecuenciaNominacol` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idfrecuenciaNomina`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `gastosDirectosOficina`;
CREATE TABLE `gastosDirectosOficina` (
  `idgastosDirectosOficina` int NOT NULL AUTO_INCREMENT,
  `tipoGastosDirectosOficina` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cod_user` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idgastosDirectosOficina`)
) ENGINE=InnoDB AUTO_INCREMENT=998 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `gastosDirectosPse`;
CREATE TABLE `gastosDirectosPse` (
  `idgastosDirectosPse` int NOT NULL AUTO_INCREMENT,
  `tipoGastosDirectosPse` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cod_user` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idgastosDirectosPse`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ibr`;
CREATE TABLE `ibr` (
  `cod_ibr` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ibr_descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cod_ibr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ibr_control`;
CREATE TABLE `ibr_control` (
  `cod_fech` int DEFAULT NULL,
  `cod_ibr` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valor_ibr` decimal(5,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ibr_fechas`;
CREATE TABLE `ibr_fechas` (
  `cod_fech` int NOT NULL AUTO_INCREMENT,
  `fech_inic` date DEFAULT NULL,
  `fech_hast` date DEFAULT NULL,
  `cod_user` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cod_fech`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `justificacionOficina`;
CREATE TABLE `justificacionOficina` (
  `idjustificacionOficina` int NOT NULL AUTO_INCREMENT,
  `codGastosDirectosOfi` int DEFAULT NULL COMMENT 'codigo foraneo gastos directos',
  `tipoJustificacionOfi` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permitirNegociar` int DEFAULT NULL COMMENT 'codigo foraneo de permitir negociar',
  `tarifaPlena` decimal(10,1) DEFAULT NULL,
  `cod_usu` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idjustificacionOficina`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `justificacionPse`;
CREATE TABLE `justificacionPse` (
  `idjustificacionPse` int NOT NULL AUTO_INCREMENT,
  `codGastosDirectosPse` int DEFAULT NULL,
  `tipoJustificacionPse` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permitirNegociar` int DEFAULT NULL,
  `tarifaPlena` decimal(10,1) DEFAULT NULL,
  `cod_usu` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idjustificacionPse`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Listas`;
CREATE TABLE `Listas` (
  `idListas` int NOT NULL AUTO_INCREMENT,
  `lista` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codLista` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idListas`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `log_motor`;
CREATE TABLE `log_motor` (
  `COD_LOGMOTOR` int NOT NULL,
  `ERROR` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FECHA` date NOT NULL,
  `HORA` time(6) NOT NULL,
  `COD_SOLICITUD` int NOT NULL,
  PRIMARY KEY (`COD_LOGMOTOR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `log_pricing`;
CREATE TABLE `log_pricing` (
  `COD_LOGPRICING` int NOT NULL,
  `USUARIO` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EVENTO` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FECHA` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DATA_ACTUAL` longtext COLLATE utf8mb4_unicode_ci,
  `DATA_NUEVA` longtext COLLATE utf8mb4_unicode_ci,
  `OBSERVACION` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`COD_LOGPRICING`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `negociarNomina`;
CREATE TABLE `negociarNomina` (
  `idnegociarNomina` int NOT NULL AUTO_INCREMENT,
  `pagoNomina` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarifaPlena` int DEFAULT NULL,
  `tarifaCosto` int DEFAULT NULL,
  `cantidad` decimal(3,2) DEFAULT NULL,
  `permitirNegociar` int DEFAULT NULL COMMENT 'Clave foranea de la lista desplegable Permitir Negociar.',
  `formulaCalculo` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idnegociarNomina`)
) ENGINE=InnoDB AUTO_INCREMENT=1111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `oficina`;
CREATE TABLE `oficina` (
  `COD_OFICINA` int NOT NULL,
  `OFICINA` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `REGIONAL` int NOT NULL,
  PRIMARY KEY (`COD_OFICINA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `operacion`;
CREATE TABLE `operacion` (
  `COD_OPERACION` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_OPERACION`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pagoTerseros`;
CREATE TABLE `pagoTerseros` (
  `idpagoTerseros` int NOT NULL AUTO_INCREMENT,
  `pagoTerseros` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarifaPlena` decimal(7,1) DEFAULT NULL,
  `tarifaCosto` decimal(7,1) DEFAULT NULL,
  `usuario` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idpagoTerseros`)
) ENGINE=InnoDB AUTO_INCREMENT=480 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ParametrosEfecty`;
CREATE TABLE `ParametrosEfecty` (
  `idParametrosEfecty` int NOT NULL AUTO_INCREMENT,
  `ParametrosEfecty` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cod_usu` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idParametrosEfecty`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `perfiles`;
CREATE TABLE `perfiles` (
  `COD_PERFIL` int NOT NULL,
  `PERFIL` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_PERFIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `perfiles_usuario`;
CREATE TABLE `perfiles_usuario` (
  `COD_PERFIL` int NOT NULL,
  `USUARIO` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  KEY `FK_PERFILES_USUARIO_PERFILES` (`COD_PERFIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `permitirNegociar`;
CREATE TABLE `permitirNegociar` (
  `cod_permitir` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cod_permitir`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `planRemuneracion`;
CREATE TABLE `planRemuneracion` (
  `idplanRemuneracion` int NOT NULL AUTO_INCREMENT,
  `planRemuneracion` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rangoInferior` decimal(14,0) DEFAULT NULL,
  `rangoMaximo` decimal(14,0) DEFAULT NULL,
  `tasaEA` decimal(5,2) DEFAULT NULL,
  `cod_usu` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idplanRemuneracion`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `COD_PRODUCTO` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOMBRE` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_PRODUCTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `promedioNomina`;
CREATE TABLE `promedioNomina` (
  `idpromedioNomina` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idpromedioNomina`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `recaudoOficina`;
CREATE TABLE `recaudoOficina` (
  `idrecaudoOficina` int NOT NULL AUTO_INCREMENT,
  `tipoRecaudoOficina` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarifaPlena` decimal(7,1) DEFAULT NULL,
  `tarifaCosto` decimal(7,1) DEFAULT NULL,
  `cod_user` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idrecaudoOficina`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `recaudoPse`;
CREATE TABLE `recaudoPse` (
  `idrecaudoPse` int NOT NULL AUTO_INCREMENT,
  `tipoRecaudoPse` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarifaPlena` decimal(7,1) DEFAULT NULL,
  `tarifaCosto` decimal(7,1) DEFAULT NULL,
  `cod_user` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idrecaudoPse`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `reciprocidadMinima`;
CREATE TABLE `reciprocidadMinima` (
  `idReciprocidadMinima` int NOT NULL AUTO_INCREMENT,
  `monto` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idReciprocidadMinima`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `regional`;
CREATE TABLE `regional` (
  `COD_REGIONAL_RAD` int NOT NULL,
  `REGIONAL_RAD` char(18) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_REGIONAL_RAD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `remi`;
CREATE TABLE `remi` (
  `idremi` int NOT NULL AUTO_INCREMENT,
  `contenidoRemi` longtext COLLATE utf8mb4_unicode_ci,
  `id_user` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idremi`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `sector`;
CREATE TABLE `sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `COD_SECTOR` int NOT NULL,
  `NOMBRE` char(21) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `COD_SECTOR_UNIQUE` (`COD_SECTOR`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_ip` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `token` (`token`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5425 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `solicitudes`;
CREATE TABLE `solicitudes` (
  `COD_SOLICITUD` int NOT NULL AUTO_INCREMENT,
  `NIT_CLIENTE` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DATOS_SOLICITUD` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `ID_RADICADOR` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FECHA_HORA` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `APROREQUERIDAS` int NOT NULL,
  PRIMARY KEY (`COD_SOLICITUD`)
) ENGINE=InnoDB AUTO_INCREMENT=502 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_aprobador`;
CREATE TABLE `tipo_aprobador` (
  `idtipo_aprobador` int NOT NULL AUTO_INCREMENT,
  `cod_aprobador` int NOT NULL,
  `tipo_aprobador` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idtipo_aprobador`),
  UNIQUE KEY `cod_aprobador_UNIQUE` (`cod_aprobador`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_cliente`;
CREATE TABLE `tipo_cliente` (
  `COD_TIPO_CLIENTE` int NOT NULL,
  `TIPOCLI` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_TIPO_CLIENTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_contrato`;
CREATE TABLE `tipo_contrato` (
  `COD_TIP_CONTRATO` int DEFAULT NULL,
  `TIPO_CONTRATO` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_convenio`;
CREATE TABLE `tipo_convenio` (
  `COD_CONVENIO` int NOT NULL,
  `TIPO_CONVENIO` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`COD_CONVENIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_decision`;
CREATE TABLE `tipo_decision` (
  `COD_DECISION` int NOT NULL,
  `DECISION` char(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  UNIQUE KEY `COD_DECISION_UNIQUE` (`COD_DECISION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_producto`;
CREATE TABLE `tipo_producto` (
  `COD_TIP_PROD` int NOT NULL,
  `NOMBRE` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`COD_TIP_PROD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipoCredIbrState`;
CREATE TABLE `tipoCredIbrState` (
  `idtipoCredIbrState` int NOT NULL AUTO_INCREMENT,
  `COD_TIP_PROD` int NOT NULL,
  `cod_ibr` int NOT NULL,
  `codEstado` int NOT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtipoCredIbrState`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `USUARIO` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOMBRE` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CORREO` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COD_OFICINA` int NOT NULL,
  `COD_CANAL` int NOT NULL,
  `COD_REGIONAL` int NOT NULL,
  `COD_CARGO` int NOT NULL,
  `COD_PERF_CLIENTE` int NOT NULL,
  PRIMARY KEY (`USUARIO`),
  UNIQUE KEY `idx_usuario` (`USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `catalogos`;
CREATE TABLE `catalogos` (
  `idcatalogos` int NOT NULL AUTO_INCREMENT,
  `codList` int DEFAULT NULL,
  `catalogo` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dataCatalogo` longtext COLLATE utf8mb4_unicode_ci,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaUltima` date DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcatalogos`),
  UNIQUE KEY `catalogo_UNIQUE` (`catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=10076 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `fichas`;
CREATE TABLE `fichas` (
  `idFicha` int NOT NULL,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codTipoCliente` int DEFAULT NULL,
  `estatus` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idFicha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_TipoParametrizador`;
CREATE TABLE `list_TipoParametrizador` (
  `idlist_TipoParametrizador` int NOT NULL AUTO_INCREMENT,
  `codTipPardor` int NOT NULL,
  `descripcion` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`codTipPardor`),
  UNIQUE KEY `idlist_TipoParametrizador_UNIQUE` (`idlist_TipoParametrizador`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `camposClientes`;
CREATE TABLE `camposClientes` (
  `idCampo` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codTipoCliente` int NOT NULL,
  `codFicha` int NOT NULL,
  `actObligatorio` int DEFAULT NULL,
  `actEditable` int DEFAULT NULL,
  `creaObligatorio` int DEFAULT NULL,
  `prospObligatorio` int DEFAULT NULL,
  `nCliObligatorio` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fech_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCampo`)
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cdt`;
CREATE TABLE `cdt` (
  `idcdt` int NOT NULL AUTO_INCREMENT,
  `codClient` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codCDT` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codProducto` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monto` int DEFAULT NULL,
  `interes` int DEFAULT NULL,
  `codPlazoApertura` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaApertura` date DEFAULT NULL,
  `fechaVencimiento` date DEFAULT NULL,
  `codTipTasa` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tasaBase` decimal(4,2) DEFAULT NULL,
  `spread` decimal(4,2) DEFAULT NULL,
  `codFormaPagoInteres` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codFrecuenciaPago` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codOrigenFondo` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codRazonApertura` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codTipoTitulo` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codEstadoCdt` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codEdoCancelacion` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcdt`),
  UNIQUE KEY `codCDT_UNIQUE` (`codCDT`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cdtProcducto`;
CREATE TABLE `cdtProcducto` (
  `idcdtProcducto` int NOT NULL AUTO_INCREMENT,
  `codCliente` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nCdt` int DEFAULT NULL,
  `tipoCdt` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `claseCdt` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `montoCdt` int DEFAULT NULL,
  `plazo` int DEFAULT NULL,
  `fechaInicial` date DEFAULT NULL,
  `fechaFIn` date DEFAULT NULL,
  `tipoTasa` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tasaBaseEa` decimal(4,2) DEFAULT NULL,
  `spread` decimal(4,2) DEFAULT NULL,
  `frecuPago` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interesLiquidado` int DEFAULT NULL,
  `interesAcumalo` int DEFAULT NULL,
  `estadoCDT` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bloqueo` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idcdtProcducto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `convenioActualProducto`;
CREATE TABLE `convenioActualProducto` (
  `idconvenioActualProducto` int NOT NULL AUTO_INCREMENT,
  `codCliente` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `servicio` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unidad` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarifa` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`idconvenioActualProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cuentaPlanes`;
CREATE TABLE `cuentaPlanes` (
  `idcuentaPlanes` int NOT NULL AUTO_INCREMENT,
  `cuenta` int DEFAULT NULL,
  `idCliente` int DEFAULT NULL,
  `codPlan` int DEFAULT NULL,
  `plan` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcuentaPlanes`),
  KEY `idx_cuentaPlanes` (`cuenta`,`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `creditoProducto`;
CREATE TABLE `creditoProducto` (
  `idcreditoProducto` int NOT NULL AUTO_INCREMENT,
  `codCliente` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `montoTotalCupo` bigint DEFAULT NULL,
  `cupoUtilizado` bigint DEFAULT NULL,
  `fechaAproCupo` date DEFAULT NULL,
  `fechaVenciCupo` date DEFAULT NULL,
  `cupoDisponible` bigint DEFAULT NULL,
  `diasVigencia` int DEFAULT NULL,
  `tasaReferencia` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idcreditoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cuentas`;
CREATE TABLE `cuentas` (
  `codCuenta` int NOT NULL AUTO_INCREMENT,
  `idCliente` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nCuenta` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codProducto` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codProdBancario` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaApertura` date DEFAULT NULL,
  `saldoFecha` int DEFAULT NULL,
  `codPlanActual` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estadoCuenta` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codCuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cuentasProducto`;
CREATE TABLE `cuentasProducto` (
  `idcuentasProductos` int NOT NULL AUTO_INCREMENT,
  `codCliente` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cuentas` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaInicial` date DEFAULT NULL,
  `tasaEA` decimal(4,2) DEFAULT NULL,
  `saldo` int DEFAULT NULL,
  `estadoCuenta` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bloqueo` char(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalCupoSobregiro` int DEFAULT NULL,
  `fechaAproSobregiro` date DEFAULT NULL,
  `fechaVencSobregiro` date DEFAULT NULL,
  `cupoDispoSobregiro` int DEFAULT NULL,
  `vigenciaCupoSobregiro` int DEFAULT NULL,
  PRIMARY KEY (`idcuentasProductos`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `detalleCreditoProducto`;
CREATE TABLE `detalleCreditoProducto` (
  `iddetalle` int NOT NULL AUTO_INCREMENT,
  `idCreditoProducto` int DEFAULT NULL,
  `detalle` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nObligaCartera` int DEFAULT NULL,
  `linea` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `montoDesembolso` int DEFAULT NULL,
  `fechaDesembolso` date DEFAULT NULL,
  `plazo` int DEFAULT NULL,
  `tasaReferencia` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spread` decimal(4,2) DEFAULT NULL,
  `saldoCapital` int DEFAULT NULL,
  `garantia` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calificacion` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diasMora` int DEFAULT NULL,
  `saldoMora` int DEFAULT NULL,
  `pagoMinimo` int DEFAULT NULL,
  `pagoTotal` int DEFAULT NULL,
  `redescuento` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spreadRedescuento` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`iddetalle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `controlVersionPlan`;
CREATE TABLE `controlVersionPlan` (
  `codIdPlanes` int NOT NULL AUTO_INCREMENT,
  `plan` int NOT NULL,
  `version` int NOT NULL,
  `codPlan` char(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codPlan`),
  UNIQUE KEY `codIdPlanes_UNIQUE` (`codIdPlanes`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `estadoInclusion`;
CREATE TABLE `estadoInclusion` (
  `codEstadoPlan` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codEstadoPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `estadoPlan`;
CREATE TABLE `estadoPlan` (
  `codEstadoPlan` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codEstadoPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `formaPagoCdt`;
CREATE TABLE `formaPagoCdt` (
  `idformaPagoCdt` int NOT NULL AUTO_INCREMENT,
  `codCDT` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codFormaPago` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cuenta` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valor` int DEFAULT NULL,
  PRIMARY KEY (`idformaPagoCdt`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `inclusionPlan`;
CREATE TABLE `inclusionPlan` (
  `idinclusionPlan` int NOT NULL AUTO_INCREMENT,
  `plan` int NOT NULL,
  `codPlan` char(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idCliente` int DEFAULT NULL,
  `fechaNovedad` date DEFAULT NULL,
  `estadoInclusion` int DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idinclusionPlan`),
  KEY `idx_inclusionPlan` (`estadoInclusion`,`plan`,`codPlan`,`fechaNovedad`,`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `rangoPlanes`;
CREATE TABLE `rangoPlanes` (
  `codIdRangos` int NOT NULL AUTO_INCREMENT,
  `plan` int NOT NULL,
  `codPlan` char(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rango` int NOT NULL,
  `rangoMin` bigint DEFAULT NULL,
  `rangoMax` bigint DEFAULT NULL,
  `tasaEA` decimal(4,2) DEFAULT NULL,
  `fechaInicial` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `fechaAplicacion` date DEFAULT NULL,
  `estadoPlan` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codIdRangos`),
  KEY `idx_rangoPlanes` (`estadoPlan`,`plan`,`codPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `planes`;
CREATE TABLE `planes` (
  `plan` int NOT NULL AUTO_INCREMENT,
  `descripcionPlan` varchar(90) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipoPlan` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`plan`)
) ENGINE=InnoDB AUTO_INCREMENT=10058 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `reciprocidadProducto`;
CREATE TABLE `reciprocidadProducto` (
  `idreciprocidadProducto` int NOT NULL AUTO_INCREMENT,
  `codCliente` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monto` int DEFAULT NULL,
  PRIMARY KEY (`idreciprocidadProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `reinversionCdt`;
CREATE TABLE `reinversionCdt` (
  `idreinversionCdt` int NOT NULL AUTO_INCREMENT,
  `codCDT` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monto` int DEFAULT NULL,
  `codReinvercion` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reinversion` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saldoFavor` int DEFAULT NULL,
  `adicion` int DEFAULT NULL,
  PRIMARY KEY (`idreinversionCdt`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `rolCdt`;
CREATE TABLE `rolCdt` (
  `idrolCdt` int NOT NULL AUTO_INCREMENT,
  `codCDT` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codRol` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipoId` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nIdentificacion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombreEmpresa` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codTipoCuenta` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idrolCdt`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipoPlan`;
CREATE TABLE `tipoPlan` (
  `codTipoPlan` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codTipoPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_Producto`;
CREATE TABLE `list_Producto` (
  `codListProducto` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codListProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_ProductoBanco`;
CREATE TABLE `list_ProductoBanco` (
  `codProductoBanco` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codCuenta` int DEFAULT NULL,
  `codUsu` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codProductoBanco`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_formaPago`;
CREATE TABLE `list_formaPago` (
  `codFormaPago` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codFormaPago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_frecuenciaPago`;
CREATE TABLE `list_frecuenciaPago` (
  `codFrecuenciaPago` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`codFrecuenciaPago`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_PerfilCliente`;
CREATE TABLE `list_PerfilCliente` (
  `idlist_PerfilCliente` int NOT NULL AUTO_INCREMENT,
  `codPerfilCliente` int NOT NULL,
  `descripcion` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`codPerfilCliente`),
  UNIQUE KEY `idlist_PerfilCliente_UNIQUE` (`idlist_PerfilCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
