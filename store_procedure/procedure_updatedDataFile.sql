-- stored procedure updatedDataFile
DELIMITER $$
	CREATE PROCEDURE updatedDataFile(IN SOLI INT, CED VARCHAR(50), RUT VARCHAR(50), CER VARCHAR(50), FRM VARCHAR(50), CON VARCHAR(50), B6 VARCHAR(45), B7 VARCHAR(45), B8 VARCHAR(45), B9 VARCHAR(45), B10 VARCHAR(45), B11 VARCHAR(45), B12 VARCHAR(45), B13 VARCHAR(45), B14 VARCHAR(45), B15 VARCHAR(45), B16 VARCHAR(45), B17 VARCHAR(45), B18 VARCHAR(45), B19 VARCHAR(45), B20 VARCHAR(45), B21 VARCHAR(45), B22 VARCHAR(45), B23 VARCHAR(45), USU CHAR(15))
		BEGIN
			UPDATE controlDocumentos
			SET docCedula = CED, docRut = RUT, docCertificado = CER, docFormato = FRM, docContrato = CON, docBuzon6 = B6, docBuzon7 = B7, docBuzon8 = B8, docBuzon9 = B9, docBuzon10 = B10, docBuzon11 = B11, docBuzon12 = B12, docBuzon13 = B13, docBuzon14 = B14, docBuzon15 = B15, docBuzon16 = B16, docBuzon17 = B17, docBuzon18 = B18, docBuzon19 = B19, docBuzon20 = B20, docBuzon21 = B21, docBuzon22 = B22, docBuzon23 = B23, cod_usu = USU
			WHERE cod_solicitud = SOLI;
		END$$
DELIMITER ;

DROP PROCEDURE updatedDataFile;
CALL updatedDataFile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);