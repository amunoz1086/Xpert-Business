-- stored procedure queryDataFile
DELIMITER $$
	CREATE PROCEDURE queryDataFile(IN SOLI INT)
		BEGIN
			SELECT cod_solicitud, docCedula, docRut, docCertificado, docFormato, docContrato,
            docBuzon6, docBuzon7, docBuzon8, docBuzon9, docBuzon10, docBuzon11, docBuzon12,
            docBuzon13, docBuzon14, docBuzon15, docBuzon16, docBuzon17, docBuzon18, docBuzon19,
            docBuzon20, docBuzon21, docBuzon22, docBuzon23
            FROM controlDocumentos WHERE cod_solicitud = SOLI;
		END$$
DELIMITER ;

DROP PROCEDURE queryDataFile;
CALL queryDataFile(252);