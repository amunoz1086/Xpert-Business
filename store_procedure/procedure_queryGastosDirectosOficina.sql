-- stored procedure queryGastosDirectosOficina
DELIMITER $$
	CREATE PROCEDURE queryGastosDirectosOficina()
		BEGIN
			SELECT idgastosDirectosOficina, tipoGastosDirectosOficina FROM gastosDirectosOficina;
		END$$
DELIMITER ;

CALL queryGastosDirectosOficina();
select * from gastosDirectosOficina;
insert into gastosDirectosOficina (tipoGastosDirectosOficina, cod_user)
values('Pago web Service Oficina-Código de Barras', 'dorjuela'),
('Pago web Service Oficina-Referencia', 'dorjuela');