DELIMITER $$
	CREATE PROCEDURE insertDetalleActivEcoPn (IN codClienteNatural VARCHAR(45), claseBalance VARCHAR(45), tipoBalance VARCHAR(45), FechaCorte VARCHAR(45), ventasBrutas VARCHAR(45),
    ingresoAnual VARCHAR(45), ingresoPGJ VARCHAR(45), egresoPGJ VARCHAR(45), activosBGJ VARCHAR(45), activos VARCHAR(45), pasivosBGJ VARCHAR(45), PatrimonioBGJ VARCHAR(45))
		
        BEGIN
			INSERT INTO detalleActivEcoPn
			(codClienteNatural, claseBalance, tipoBalance, FechaCorte, ventasBrutas, ingresoAnual, ingresoPGJ, egresoPGJ, activosBGJ, activos, pasivosBGJ, PatrimonioBGJ)
			VALUES
			(codClienteNatural, claseBalance, tipoBalance, FechaCorte, ventasBrutas, ingresoAnual, ingresoPGJ, egresoPGJ, activosBGJ, activos, pasivosBGJ, PatrimonioBGJ);
		END$$
        
DELIMITER ;
DROP PROCEDURE insertDetalleActivEcoPn;
CALL insertDetalleActivEcoPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL insertDetalleActivEcoPn(80024797, 'Balance General', 'Tipo_1', 4, 50000000.00, 600000000.00, 600000000.00, 300000000.00, 1200000000.00, 0, 780000000.00, 420000000.00)