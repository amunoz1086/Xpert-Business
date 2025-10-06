-- stored procedure updateParametrosEfecty
DELIMITER $$
	CREATE PROCEDURE updateParametrosEfecty(IN IDPARA INT, TIPO VARCHAR(45), USU CHAR(15))
		BEGIN
			UPDATE ParametrosEfecty AS A
			SET A.ParametrosEfecty = TIPO, A.cod_usu = USU
			WHERE A.idParametrosEfecty = IDPARA;
		END$$
DELIMITER ;
DROP PROCEDURE updateParametrosEfecty;
CALL updateParametrosEfecty(1, '$1-$200.000', 'mapo1982');
SELECT * FROM ParametrosEfecty;
-- 1	$1-$200.000
-- 10	$200.001-$300.000
-- 11	$300.001-$500.000
-- 12	$500.001-$1000.000