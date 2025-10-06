-- stored procedure deleteGastosDirectosOficina
DELIMITER $$
	CREATE PROCEDURE deleteGastosDirectosOficina(IN IDPN INT)
		BEGIN
			DELETE FROM gastosDirectosOficina
            WHERE idgastosDirectosOficina = IDPN;
		END$$
DELIMITER ;

CALL deleteGastosDirectosOficina(?);
select* from gastosDirectosOficina;