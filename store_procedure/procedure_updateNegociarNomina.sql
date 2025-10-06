-- stored procedure updateNegociarNomina
DELIMITER $$
	CREATE PROCEDURE updateNegociarNomina (IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), CANT DECIMAL(3,2), PNEGOCIAR INT, FCALCULO VARCHAR(60), ID INT, USU CHAR(15))
		BEGIN
            UPDATE negociarNomina AS N	
			SET N.tarifaPlena = TPLENA, N.tarifaCosto = TCOSTO, N.cantidad = CANT, N.permitirNegociar = PNEGOCIAR, N.formulaCalculo = FCALCULO, N.usuario = USU
			WHERE N.idnegociarNomina = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updateNegociarNomina;
CALL updateNegociarNomina(?, ?, ?, ?, ?, ?, ?);
CALL updateNegociarNomina(2, 4, 4, 0, 0, '1096', 'mapo1982');