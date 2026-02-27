use PRICINGDB;

Insert into permitirNegociar (cod_permitir, descripcion)
values( 1, 'ilimitado'),
(2, 'No'),
(3, 'Si'),
(4, 'Inactivo'),
(5, 'Calculo');

update permitirNegociar
set descripcion = 'Ilimitado'
where cod_permitir = 1;

select * from Listas;

insert into Listas (lista, codLista, descripcion)
values('TipoCuenta', 1, 'Ahorro'),
('TipoCuenta', 2, 'Corriente');

Insert into producto (NOMBRE)
VALUES('Crédito'),
('Captación'),
('Convenio');

Insert into operacion (NOMBRE)
VALUES('Nuevo'),
('Ajuste');

Insert into convenio (NOMBRE)
VALUES('Convenio de Pago'),
('Convenio de Recaudo'),
('Servicios Financieros');

insert into Listas (lista, codLista, descripcion)
values('PlanRem', 1, 'PN'),
('PlanRem', 2, 'COOP1'),
('PlanRem', 3, 'COOP2'),
('PlanRem', 4, 'PYME1'),
('PlanRem', 5, 'PYME2'),
('PlanRem', 6, 'Nesgocios Especiales');

insert into usuario (USUARIO, CORREO, COD_OFICINA, USU_PASSWORD, COD_CANAL, COD_REGIONAL, COD_CARGO)
VALUES ('MAPO1982', 'mipadilla.o@gmail.com', 1901, '0', 1, 3, 1);

insert into perfiles_usuario (COD_PERFIL, USUARIO)
VALUES(1,'MAPO1982'),
(2, 'MAPO1982');