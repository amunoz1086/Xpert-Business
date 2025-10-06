CREATE DATABASE  IF NOT EXISTS `ORIGINADOR_XP` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ORIGINADOR_XP`;

DROP TABLE IF EXISTS `agrupaciones`;
CREATE TABLE `agrupaciones` (
  `idagrupaciones` int NOT NULL AUTO_INCREMENT,
  `codAgrupador` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agrupacionDescripcion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codTipoPersona` int DEFAULT NULL,
  PRIMARY KEY (`codAgrupador`),
  UNIQUE KEY `idagrupaciones_UNIQUE` (`idagrupaciones`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='		';

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
) ENGINE=InnoDB AUTO_INCREMENT=10093 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `controlActa`;
CREATE TABLE `controlActa` (
  `idcontrolActa` int NOT NULL AUTO_INCREMENT,
  `nombreActa` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text1` mediumtext COLLATE utf8mb4_unicode_ci,
  `text2` mediumtext COLLATE utf8mb4_unicode_ci,
  `text3` mediumtext COLLATE utf8mb4_unicode_ci,
  `text4` mediumtext COLLATE utf8mb4_unicode_ci,
  `text5` mediumtext COLLATE utf8mb4_unicode_ci,
  `text6` mediumtext COLLATE utf8mb4_unicode_ci,
  `text7` mediumtext COLLATE utf8mb4_unicode_ci,
  `text8` mediumtext COLLATE utf8mb4_unicode_ci,
  `textt9` mediumtext COLLATE utf8mb4_unicode_ci,
  `text10` mediumtext COLLATE utf8mb4_unicode_ci,
  `logo` longtext COLLATE utf8mb4_unicode_ci,
  `anverso` longtext COLLATE utf8mb4_unicode_ci,
  `reverso` longtext COLLATE utf8mb4_unicode_ci,
  `vigilado` longtext COLLATE utf8mb4_unicode_ci,
  `fogafin` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`idcontrolActa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `controlBuzon`;
CREATE TABLE `controlBuzon` (
  `idcontrolBuzon` int NOT NULL AUTO_INCREMENT,
  `cod_solicitud` int NOT NULL,
  `buzon` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cod_usu` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fech_carga` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcontrolBuzon`)
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `controlListas`;
CREATE TABLE `controlListas` (
  `idcontrolListas` int NOT NULL AUTO_INCREMENT,
  `lista` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcontrolListas`),
  UNIQUE KEY `idcontrolListas_UNIQUE` (`idcontrolListas`),
  UNIQUE KEY `Lista_UNIQUE` (`lista`)
) ENGINE=InnoDB AUTO_INCREMENT=50017 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cupo_sobregiro`;
CREATE TABLE `cupo_sobregiro` (
  `id_cupo` int NOT NULL AUTO_INCREMENT,
  `cliente_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_cuenta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_sobregiro` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dias_vigencia` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha_aprobacion` date DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `acta_aprobacion_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario_radicador` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_solicitud_inicial` date DEFAULT NULL,
  `usuario_aprobador` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '“Creado, Aprobado, Rechazado”',
  `fecha_aprobador_final` date DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `estado_solicitud` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_cupo`),
  UNIQUE KEY `acta_aprobacion_id_UNIQUE` (`acta_aprobacion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `diasFeriados`;
CREATE TABLE `diasFeriados` (
  `iddiasFeriados` int NOT NULL AUTO_INCREMENT,
  `df_ciudad` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `df_fecha` datetime DEFAULT NULL,
  `df_real` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`iddiasFeriados`),
  KEY `idx_df_fecha` (`df_fecha`)
) ENGINE=InnoDB AUTO_INCREMENT=760 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ente_aprobacion`;
CREATE TABLE `ente_aprobacion` (
  `COD_APROBADOR` int NOT NULL,
  `USUARIO` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `USUARIO_UNIQUE` (`USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ente_parametrizacion`;
CREATE TABLE `ente_parametrizacion` (
  `COD_PARAMETRIZADOR` int NOT NULL,
  `USUARIO` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `USUARIO_UNIQUE` (`USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

DROP TABLE IF EXISTS `Listas`;
CREATE TABLE `Listas` (
  `idListas` int NOT NULL AUTO_INCREMENT,
  `lista` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codLista` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idListas`),
  KEY `idx_Listas` (`lista`,`codLista`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_PerfilCliente`;
CREATE TABLE `list_PerfilCliente` (
  `idlist_PerfilCliente` int NOT NULL AUTO_INCREMENT,
  `codPerfilCliente` int NOT NULL,
  `descripcion` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`codPerfilCliente`),
  UNIQUE KEY `idlist_PerfilCliente_UNIQUE` (`idlist_PerfilCliente`)
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

DROP TABLE IF EXISTS `list_ProductosBancarios`;
CREATE TABLE `list_ProductosBancarios` (
  `codProducto` int NOT NULL,
  `descripcion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`codProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_razonApertura`;
CREATE TABLE `list_razonApertura` (
  `idlist_razonApertura` int NOT NULL AUTO_INCREMENT,
  `code` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idlist_razonApertura`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_TipoParametrizador`;
CREATE TABLE `list_TipoParametrizador` (
  `idlist_TipoParametrizador` int NOT NULL AUTO_INCREMENT,
  `codTipPardor` int NOT NULL,
  `descripcion` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`codTipPardor`),
  UNIQUE KEY `idlist_TipoParametrizador_UNIQUE` (`idlist_TipoParametrizador`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_origenFondos`;
CREATE TABLE `list_origenFondos` (
  `idlist_origenFondos` int NOT NULL AUTO_INCREMENT,
  `code` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idlist_origenFondos`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_tipoCuenta`;
CREATE TABLE `list_tipoCuenta` (
  `idlist_tipoCuenta` int NOT NULL AUTO_INCREMENT,
  `code` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idlist_tipoCuenta`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `log_pricing`;
CREATE TABLE `log_pricing` (
  `COD_LOGPRICING` int NOT NULL,
  `EVENTO` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `FECHA` date NOT NULL,
  `USUARIO` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_LOGPRICING`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `oficina`;
CREATE TABLE `oficina` (
  `COD_OFICINA` int NOT NULL,
  `OFICINA` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `REGIONAL` int NOT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`COD_OFICINA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `opcionProducto`;
CREATE TABLE `opcionProducto` (
  `codeOpcionProducto` int NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estatus` tinyint DEFAULT NULL,
  PRIMARY KEY (`codeOpcionProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `operacion`;
CREATE TABLE `operacion` (
  `COD_OPERACION` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_OPERACION`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `parametrosProducto`;
CREATE TABLE `parametrosProducto` (
  `idparametrosProducto` int NOT NULL AUTO_INCREMENT,
  `codAgrupador` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codProducto` int DEFAULT NULL,
  PRIMARY KEY (`idparametrosProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `parametrosRol`;
CREATE TABLE `parametrosRol` (
  `idparametrosRol` int NOT NULL AUTO_INCREMENT,
  `codAgrupador` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titular` int DEFAULT NULL,
  `firmante` int DEFAULT NULL,
  `secundario` int DEFAULT NULL,
  `cotitular` int DEFAULT NULL,
  `mensaje` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idparametrosRol`),
  UNIQUE KEY `codAgrupador_UNIQUE` (`codAgrupador`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `parametrosSubProducto`;
CREATE TABLE `parametrosSubProducto` (
  `idparametrosSubProducto` int NOT NULL AUTO_INCREMENT,
  `codAgrupador` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codProducto` int DEFAULT NULL,
  `codSubProducto` int DEFAULT NULL,
  PRIMARY KEY (`idparametrosSubProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `parametrosTipoCompania`;
CREATE TABLE `parametrosTipoCompania` (
  `idParametrosTipo` int NOT NULL AUTO_INCREMENT,
  `codAgrupador` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codCompania` int DEFAULT NULL,
  PRIMARY KEY (`idParametrosTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `parametrosTitularidad`;
CREATE TABLE `parametrosTitularidad` (
  `idparametrosTitularidad` int NOT NULL AUTO_INCREMENT,
  `codAgrupador` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codTitularidad` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idparametrosTitularidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

DROP TABLE IF EXISTS `planes`;
CREATE TABLE `planes` (
  `plan` int NOT NULL AUTO_INCREMENT,
  `descripcionPlan` varchar(90) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipoPlan` int DEFAULT NULL,
  `codUsu` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fech_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`plan`)
) ENGINE=InnoDB AUTO_INCREMENT=10065 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `plazos_frecuencias_IBR_1`;
CREATE TABLE `plazos_frecuencias_IBR_1` (
  `plazo_regular_dias` int DEFAULT NULL,
  `plazo_regular_meses` int DEFAULT NULL,
  `pagos` int DEFAULT NULL,
  `frecuencia` int DEFAULT NULL,
  `plazo_minimo` int DEFAULT NULL,
  `plazo_maximo` int DEFAULT NULL,
  KEY `idx_plazo_regular_dia` (`plazo_regular_dias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `plazos_frecuencias_IBR_3`;
CREATE TABLE `plazos_frecuencias_IBR_3` (
  `plazo_regular_dias` int DEFAULT NULL,
  `plazo_regular_meses` int DEFAULT NULL,
  `pagos` int DEFAULT NULL,
  `frecuencia` int DEFAULT NULL,
  KEY `idx_plazo_regular_dia` (`plazo_regular_dias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `plazos_frecuencias_IPC_3`;
CREATE TABLE `plazos_frecuencias_IPC_3` (
  `plazo_regular_dias` int DEFAULT NULL,
  `plazo_regular_meses` int DEFAULT NULL,
  `pagos` int DEFAULT NULL,
  `frecuencia` int DEFAULT NULL,
  KEY `idx_plazo_regular_dia` (`plazo_regular_dias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `plazos_frecuencias_tasa_fija`;
CREATE TABLE `plazos_frecuencias_tasa_fija` (
  `plazo_regular_dias` int DEFAULT NULL,
  `plazo_regular_meses` int DEFAULT NULL,
  `1` int DEFAULT NULL,
  `2` text COLLATE utf8mb4_unicode_ci,
  `3` text COLLATE utf8mb4_unicode_ci,
  `4` text COLLATE utf8mb4_unicode_ci,
  `6` text COLLATE utf8mb4_unicode_ci,
  `12` text COLLATE utf8mb4_unicode_ci,
  KEY `idx_plazo_regular_dia` (`plazo_regular_dias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `COD_PRODUCTO` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOMBRE` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_PRODUCTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `regional`;
CREATE TABLE `regional` (
  `COD_REGIONAL_RAD` int NOT NULL,
  `REGIONAL_RAD` char(18) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_REGIONAL_RAD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_aprobador`;
CREATE TABLE `tipo_aprobador` (
  `idtipo_aprobador` int NOT NULL AUTO_INCREMENT,
  `cod_aprobador` int NOT NULL,
  `tipo_aprobador` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idtipo_aprobador`),
  UNIQUE KEY `cod_aprobador_UNIQUE` (`cod_aprobador`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tipo_cliente`;
CREATE TABLE `tipo_cliente` (
  `COD_TIPO_CLIENTE` int NOT NULL,
  `TIPOCLI` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_TIPO_CLIENTE`)
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
  `COD_PERF_PRODUCTO` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`USUARIO`),
  UNIQUE KEY `idx_usuario` (`USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;