-- stored procedure updateTipoCredIbrState
DELIMITER $$
	CREATE PROCEDURE updateTipoCredIbrState(IN TIP_PROD INT, IBR INT, ESTADO INT, USU CHAR(15))
		BEGIN
			UPDATE tipoCredIbrState AS A 
			SET A.codEstado = ESTADO, A.codUsu = USU
			WHERE A.COD_TIP_PROD = TIP_PROD  AND  A.cod_ibr = IBR;
		END$$
DELIMITER ;
DROP PROCEDURE updateTipoCredIbrState;
CALL updateTipoCredIbrState(?, ?, ?, ?);