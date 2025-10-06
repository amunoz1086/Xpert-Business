USE `ORIGINADOR_XP`;

DELIMITER $$

DROP PROCEDURE IF EXISTS querySesion $$
CREATE PROCEDURE querySesion(
    IN pToken VARCHAR(120),
    IN pRol INT
)
BEGIN
    DECLARE userId VARCHAR(15);
	
    SELECT user_id 
    INTO userId
    FROM sessions
    WHERE token = pToken
    LIMIT 1;

    IF userId IS NULL OR userId = '' THEN
        SELECT 0 AS result;
    ELSE
        IF EXISTS(SELECT COD_PERFIL FROM perfiles_usuario WHERE USUARIO = userId AND COD_PERFIL = pRol) THEN
			SELECT 1 AS result;
        ELSE
			SELECT 0 AS result;
		END IF;
    END IF;
END$$

DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS queryFechaHabil $$
CREATE PROCEDURE queryFechaHabil(
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

    SELECT vFecha AS diaHabil;
END$$
DELIMITER ;


DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListaOrigenFondos $$
	CREATE PROCEDURE queryListaOrigenFondos()
		BEGIN
			SELECT 
				code,
				value
			FROM list_origenFondos;
		END$$
DELIMITER ;


DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListaRazonApertura $$
	CREATE PROCEDURE queryListaRazonApertura()
		BEGIN
			SELECT 
				code,
				value
			FROM list_razonApertura;
		END$$
DELIMITER ;

DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListaTipoCuenta $$
	CREATE PROCEDURE queryListaTipoCuenta()
		BEGIN
			SELECT 
				code,
				value
			FROM list_tipoCuenta;
		END$$
DELIMITER ;

DELIMITER $$

DROP PROCEDURE IF EXISTS queryMinimoMaximos $$
CREATE PROCEDURE queryMinimoMaximos (
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

DROP PROCEDURE IF EXISTS queryPlazosFrecuencias $$
CREATE PROCEDURE queryPlazosFrecuencias (
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
DROP PROCEDURE IF EXISTS queryTitulosSubtiMensajes $$
CREATE PROCEDURE queryTitulosSubtiMensajes(
    IN pCode INT
)
BEGIN
    SELECT valor
    FROM parametrosFrontEnd
    WHERE idparametrizaFront = pCode;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS insertAgrupacionRol $$
CREATE PROCEDURE insertAgrupacionRol (
    IN pGrupo VARCHAR(10),
    IN pCampo VARCHAR(64),
    IN pValor VARCHAR(255)
)
BEGIN
    CASE pCampo
        WHEN 'titular' THEN UPDATE parametrosRol SET titular = pValor WHERE codAgrupador = pGrupo;
        WHEN 'firmante' THEN UPDATE parametrosRol SET firmante = pValor WHERE codAgrupador = pGrupo;
        WHEN 'secundario' THEN UPDATE parametrosRol SET secundario = pValor WHERE codAgrupador = pGrupo;
        WHEN 'cotitular' THEN UPDATE parametrosRol SET cotitular = pValor WHERE codAgrupador = pGrupo;
        WHEN 'mensaje' THEN UPDATE parametrosRol SET mensaje = pValor WHERE codAgrupador = pGrupo;
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Columna inválida';
    END CASE;
END$$
DELIMITER ;





