-- stored procedure queryJustificacionOficina
DELIMITER $$
	CREATE PROCEDURE queryJustificacionOficina()
		BEGIN
			SELECT A.idgastosDirectosOficina, A.tipoGastosDirectosOficina, B.idjustificacionOficina,
            B.tipoJustificacionOfi, B.permitirNegociar, B.tarifaPlena
			FROM gastosDirectosOficina AS A
			JOIN justificacionOficina AS B ON A.idgastosDirectosOficina = B.codGastosDirectosOfi
			ORDER BY A.idgastosDirectosOficina ASC;
		END$$
DELIMITER ;

CALL queryJustificacionOficina();