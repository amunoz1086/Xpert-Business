-- stored procedure queryNegociarNomina
DELIMITER $$
	CREATE PROCEDURE queryNegociarNomina()
		BEGIN
			SELECT idnegociarNomina, pagoNomina, tarifaPlena, tarifaCosto, cantidad, permitirNegociar, formulaCalculo FROM negociarNomina;
		END$$
DELIMITER ;

CALL queryNegociarNomina();