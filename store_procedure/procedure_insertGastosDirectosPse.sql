-- stored procedure insertGastosDirectosPse
DELIMITER $$
	CREATE PROCEDURE insertGastosDirectosPse(IN TIPO VARCHAR(100), USU VARCHAR(45))
		BEGIN
			INSERT INTO gastosDirectosPse (tipoGastosDirectosPse, cod_user)
			VALUES (TIPO, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertGastosDirectosPse;
CALL insertGastosDirectosPse(?, ?);
select * from gastosDirectosPse;