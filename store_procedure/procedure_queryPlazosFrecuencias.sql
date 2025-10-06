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


CALL queryPlazosFrecuencias('CDTV', 30);