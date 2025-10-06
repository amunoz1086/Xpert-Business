-- stored procedure query IBRs con su valores v1
DELIMITER $$
	CREATE PROCEDURE queryIbrs()
		BEGIN
			SELECT I.cod_ibr, I.ibr_descripcion, C.cod_fech, valor_ibr FROM ibr AS I
			JOIN  ibr_control AS C ON I.cod_ibr = C.cod_ibr
			WHERE C.cod_fech = (SELECT cod_fech FROM ibr_control ORDER BY cod_fech DESC LIMIT 1);
		END$$
DELIMITER ;

DROP PROCEDURE queryIbrs;
CALL queryIbrs();
            