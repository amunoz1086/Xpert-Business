-- stored procedure updatePromedioNomina
DELIMITER $$
	CREATE PROCEDURE updatePromedioNomina(IN IDPRO INT, TIPO VARCHAR(45), USU CHAR(15))
		BEGIN
			UPDATE promedioNomina AS A
			SET A.tipo = TIPO, A.usuario = USU
			WHERE A.idpromedioNomina = IDPRO;
		END$$
DELIMITER ;
DROP PROCEDURE updatePromedioNomina;
CALL updatePromedioNomina(205, 'Hasta un SMMLV', 'mapo1982');
-- SELECT * FROM promedioNomina;
-- 205	Hasta un SMMLV
-- 209	SMMLV-$1,6 MM
-- 210	Mayor a $1.6 MM