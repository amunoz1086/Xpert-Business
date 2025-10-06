-- stored procedure queryRegionalSegunOficina
DELIMITER $$
	CREATE PROCEDURE queryRegionalSegunOficina(IN OFICINA INT)
		BEGIN
			SELECT REGIONAL_RAD FROM regional
			WHERE COD_REGIONAL_RAD = (SELECT REGIONAL FROM oficina WHERE COD_OFICINA = OFICINA);
		END$$
DELIMITER ;

DROP PROCEDURE queryRegionalSegunOficina;
CALL queryRegionalSegunOficina(?);
CALL queryRegionalSegunOficina(461);
