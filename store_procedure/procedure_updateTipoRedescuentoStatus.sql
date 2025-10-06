-- stored procedure updateTipoRedescuentoStatus
DELIMITER $$
	CREATE PROCEDURE updateTipoRedescuentoStatus(IN CODRED INT, CODEST INT, USU CHAR(15))
		BEGIN
			UPDATE entidadRedescuento
			SET codEstado = CODEST, CodUsu = USU
			WHERE cod_redescuento = CODRED;
		END$$
DELIMITER ;
DROP PROCEDURE updateTipoRedescuentoStatus;
CALL updateTipoRedescuentoStatus(1, 0, 'mapo1982');
-- 1	Bancoldex
-- 2	Findeter
-- 3	Finagro
-- 99	No Aplica