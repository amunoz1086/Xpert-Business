-- stored procedure insertDataFile
DELIMITER $$
	CREATE PROCEDURE insertDataFile(IN SOLI INT, CED VARCHAR(50), RUT VARCHAR(50), CER VARCHAR(50), FRM VARCHAR(50), CON VARCHAR(50), B6 VARCHAR(45), B7 VARCHAR(45), B8 VARCHAR(45), B9 VARCHAR(45), B10 VARCHAR(45), B11 VARCHAR(45), B12 VARCHAR(45), B13 VARCHAR(45), B14 VARCHAR(45), B15 VARCHAR(45), B16 VARCHAR(45), B17 VARCHAR(45), B18 VARCHAR(45), B19 VARCHAR(45), B20 VARCHAR(45), B21 VARCHAR(45), B22 VARCHAR(45), B23 VARCHAR(45), USU CHAR(15))
		BEGIN
			INSERT INTO controlDocumentos (cod_solicitud, docCedula, docRut, docCertificado, docFormato, docContrato, docBuzon6, docBuzon7, docBuzon8, docBuzon9, docBuzon10, docBuzon11, docBuzon12, docBuzon13, docBuzon14, docBuzon15, docBuzon16, docBuzon17, docBuzon18, docBuzon19, docBuzon20, docBuzon21, docBuzon22, docBuzon23, cod_usu)
			VALUES (SOLI, CED, RUT, CER, FRM, CON, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18, B19, B20, B21, B22, B23, USU);
		END$$
DELIMITER ;

DROP PROCEDURE insertDataFile;
CALL insertDataFile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);