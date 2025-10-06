-- stored procedure updatePagoTerseros
DELIMITER $$
	CREATE PROCEDURE updatePagoTerceros (IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), ID INT, USU CHAR(15))
		BEGIN
            UPDATE pagoTerseros AS P 
			SET P.tarifaPlena = TPLENA, P.tarifaCosto = TCOSTO, P.usuario = USU
			WHERE P.idpagoTerseros = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updatePagoTerceros;
CALL updatePagoTerceros(?, ?, ?, ?);
CALL updatePagoTerceros(2, 4, 472, 'mapo1982');