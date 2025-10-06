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


CALL queryMinimoMaximos('CDTV');