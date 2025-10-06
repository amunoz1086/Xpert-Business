USE `ORIGINADOR_XP`;

DROP TABLE IF EXISTS `diasFeriados`;
CREATE TABLE `diasFeriados` (
  `iddiasFeriados` int NOT NULL AUTO_INCREMENT,
  `df_ciudad` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `df_fecha` datetime DEFAULT NULL,
  `df_real` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`iddiasFeriados`),
  KEY `idx_df_fecha` (`df_fecha`)
) ENGINE=InnoDB AUTO_INCREMENT=760 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `list_razonApertura`;
CREATE TABLE `list_razonApertura` (
  `idlist_razonApertura` int NOT NULL AUTO_INCREMENT,
  `code` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idlist_razonApertura`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

DROP TABLE IF EXISTS `parametrosFrontEnd`;
CREATE TABLE `parametrosFrontEnd` (
  `idparametrizaFront` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pantalla` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valor` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`idparametrizaFront`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;