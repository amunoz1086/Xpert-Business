-- stored procedure queryGastosDirectosPse
DELIMITER $$
	CREATE PROCEDURE queryGastosDirectosPse()
		BEGIN
			SELECT idgastosDirectosPse, tipoGastosDirectosPse FROM gastosDirectosPse;
		END$$
DELIMITER ;

CALL queryGastosDirectosPse();
SELECT * FROM PRICINGDB.gastosDirectosPse;
insert into gastosDirectosPse (tipoGastosDirectosPse, cod_user)
values('Pago web Service PSE Hosting Implementación 1', 'dorjuela'),
('Pago web Service PSE Hosting Implementación 2', 'dorjuela'),
('Pago web Service PSE Hosting Implementación 3', 'dorjuela'),
('Pago web Service PSE Hosting Implementación 4', 'dorjuela');