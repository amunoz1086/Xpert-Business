-- stored procedure queryJustificacionPse
DELIMITER $$
	CREATE PROCEDURE queryJustificacionPse()
		BEGIN
			SELECT A.idgastosDirectosPse, A.tipoGastosDirectosPse,
            B.idjustificacionPse, B.tipoJustificacionPse, B.permitirNegociar, B.tarifaPlena
			FROM gastosDirectosPse AS A
			JOIN justificacionPse AS B ON A.idgastosDirectosPse = B.codGastosDirectosPse
			ORDER BY A.idgastosDirectosPse ASC;
		END$$
DELIMITER ;

CALL queryJustificacionPse();