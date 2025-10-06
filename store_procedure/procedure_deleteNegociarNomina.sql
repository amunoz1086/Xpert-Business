-- stored procedure deleteNegociarNomina
DELIMITER $$
	CREATE PROCEDURE deleteNegociarNomina(IN IDPN INT)
		BEGIN
			DELETE FROM negociarNomina
            WHERE idnegociarNomina = IDPN;
		END$$
DELIMITER ;

CALL deleteNegociarNomina(?);