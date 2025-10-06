-- stored procedure listarSector v1
DELIMITER $$
	CREATE PROCEDURE listarSector()
		BEGIN
			SELECT COD_SECTOR, NOMBRE FROM sector;
		END$$
DELIMITER ;

CALL listarSector()