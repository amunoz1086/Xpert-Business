DELIMITER $$
	CREATE PROCEDURE querycdtProcducto (IN NIT VARCHAR(15))
		BEGIN
			SELECT A.codCliente, A.nCdt, A.tipoCdt, A.claseCdt, A.montoCdt, A.plazo,
            A.fechaInicial, A.fechaFIn, A.tipoTasa, A.tasaBaseEa, A.spread, A.frecuPago,
            A.interesLiquidado, A.interesAcumalo, A.estadoCDT, A.bloqueo
			FROM cdtProcducto AS A
            WHERE A.codCliente = NIT;
		END$$
DELIMITER ;
DROP PROCEDURE querycdtProcducto;
CALL querycdtProcducto(901801701);