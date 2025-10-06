-- stored procedure insertGastosDirectosOficina
DELIMITER $$
	CREATE PROCEDURE insertGastosDirectosOficina(IN TIPO VARCHAR(100), USU VARCHAR(45))
		BEGIN
			INSERT INTO gastosDirectosOficina (tipoGastosDirectosOficina, cod_user)
			VALUES (TIPO, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertGastosDirectosOficina;
CALL insertGastosDirectosOficina(?, ?);
select * from gastosDirectosOficina;