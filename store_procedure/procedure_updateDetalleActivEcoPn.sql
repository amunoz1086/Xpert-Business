DELIMITER $$
	CREATE PROCEDURE updateDetalleActivEcoPn (IN codClienteNatural VARCHAR(45), claseBalance VARCHAR(45), tipoBalance VARCHAR(45), FechaCorte VARCHAR(45), ventasBrutas VARCHAR(45),
    ingresoAnual VARCHAR(45), ingresoPGJ VARCHAR(45), egresoPGJ VARCHAR(45), activosBGJ VARCHAR(45), activos VARCHAR(45), pasivosBGJ VARCHAR(45), PatrimonioBGJ VARCHAR(45))
		
        BEGIN
			UPDATE detalleActivEcoPn AS A
			SET A.claseBalance = claseBalance, A.tipoBalance = tipoBalance, A.ventasBrutas = ventasBrutas,
            A.ingresoAnual = ingresoAnual, A.ingresoPGJ = ingresoPGJ, A.egresoPGJ = egresoPGJ, A.activosBGJ = activosBGJ,
            A.activos = activos, A.pasivosBGJ = pasivosBGJ, A.PatrimonioBGJ = PatrimonioBGJ
			WHERE A.codClienteNatural = codClienteNatural AND A.FechaCorte = FechaCorte;
		END$$
			
DELIMITER ;
DROP PROCEDURE updateDetalleActivEcoPn;
CALL updateDetalleActivEcoPn(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
CALL updateDetalleActivEcoPn(80024797, 'Balance General', 'Tipo_2', 4, 60000000.00, 700000000.00, 800000000.00, 900000000.00, 1200000000.00, 0, 780000000.00, 420000000.00);
SELECT * FROM detalleActivEcoPn;