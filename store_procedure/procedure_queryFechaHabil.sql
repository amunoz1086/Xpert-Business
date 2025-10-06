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

CALL queryFechaHabil('2025-04-17');

