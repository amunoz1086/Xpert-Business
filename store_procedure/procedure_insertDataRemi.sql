-- stored procedure insert data remi
DELIMITER $$
	CREATE PROCEDURE insertDataRemi (IN REMI LONGTEXT, USU VARCHAR(15))
		BEGIN
			INSERT INTO remi (contenidoRemi, id_user)
			VALUES(REMI, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertDataRemi;
CALL insertDataRemi(?, ?);

select * from remi;