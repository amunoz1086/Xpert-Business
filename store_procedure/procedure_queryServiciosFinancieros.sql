-- stored procedure queryServiciosFinancieros
DELIMITER $$
	CREATE PROCEDURE queryServiciosFinancieros()
		BEGIN
			SELECT A.idFinanciero, A.servicio, A.tarifa,
            A.costo, A.obligatorio
			FROM financieros AS A;
		END$$
DELIMITER ;

CALL queryServiciosFinancieros();