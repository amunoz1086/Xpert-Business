-- stored procedure queryListarTipoConvenio
DELIMITER $$
	CREATE PROCEDURE queryListarTipoConvenio()
		BEGIN
			SELECT COD_CONVENIO, NOMBRE FROM convenio;
		END$$
DELIMITER ;

DROP PROCEDURE queryListarTipoConvenio;
CALL queryListarTipoConvenio();