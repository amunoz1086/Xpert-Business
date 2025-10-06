-- stored procedure updateRecaudoPse
DELIMITER $$
	CREATE PROCEDURE updateRecaudoPse (IN TPLENA DECIMAL(7,1), TCOSTO DECIMAL(7,1), ID INT, USU VARCHAR(45))
		BEGIN
			UPDATE recaudoPse AS R 
			SET R.tarifaPlena = TPLENA, R.tarifaCosto = TCOSTO, R.cod_user = USU
			WHERE R.idrecaudoPse = ID;
		END$$
DELIMITER ;

DROP PROCEDURE updateRecaudoPse;
CALL updateRecaudoPse(8000, 7000, 2, 'mapo1982');

select * from recaudoPse;
insert into recaudoPse (tipoRecaudoPse, tarifaPlena, tarifaCosto, cod_user)
values('Portal de Pagos', 800, 26, 'dorjuela'),
('PSE Recaudos', 2300, 520, 'dorjuela');
