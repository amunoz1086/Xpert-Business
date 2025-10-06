-- stored procedure updateServiciosFinancieros
DELIMITER $$
	CREATE PROCEDURE updateServiciosFinancieros (IN ID INT, TARIFA INT, COSTO INT, OBLI INT, USU VARCHAR(45))
		BEGIN
            UPDATE financieros AS A
			SET A.tarifa = TARIFA, A.costo= COSTO, A.obligatorio = OBLI, A.cod_usu = USU
			WHERE A.idFinanciero = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updateServiciosFinancieros;
CALL updateServiciosFinancieros(?, ?, ?, ?, ?);