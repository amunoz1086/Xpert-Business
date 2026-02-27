USE PRICINGDB;
BEGIN;
INSERT INTO PRICINGDB.ibr_fechas (fech_inic, fech_hast, cod_user)
VALUES('2023-08-07', '2023-08-11','usu1010');
INSERT INTO PRICINGDB.ibr_control (cod_fech, cod_ibr, valor_ibr)
VALUES(LAST_INSERT_ID(), 'ibr0', 5.05),
(LAST_INSERT_ID(), 'ibr1', 5.03),
(LAST_INSERT_ID(), 'ibr3', 5.10),
(LAST_INSERT_ID(), 'ibr6', 5.02),
(LAST_INSERT_ID(), 'ibr12', 5.43);
COMMIT;

SELECT * FROM PRICINGDB.ibr_control;
SELECT * FROM PRICINGDB.ibr_fechas