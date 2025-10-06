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

CALL queryTitulosSubtiMensajes(1);

