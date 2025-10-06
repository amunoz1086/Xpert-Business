DELIMITER $$
	CREATE PROCEDURE updatedDataCampos(IN IDC INT,  ACT_OBLI INT, ACT_EDI INT, CRE_OBLI INT, PROS_OBLI INT, NCLI_OBLI INT, USU CHAR(15))
		BEGIN
			UPDATE camposClientes
			SET actObligatorio = ACT_OBLI, actEditable = ACT_EDI, creaObligatorio = CRE_OBLI, prospObligatorio = PROS_OBLI, nCliObligatorio = NCLI_OBLI, codUsu = USU
			WHERE idCampo = IDC;
		END$$
DELIMITER ;

DROP PROCEDURE updatedDataCampos;
CALL updatedDataCampos(?, ?, ?, ?, ?, ?);
CALL updatedDataCampos(180, 0, 0, 0, 0, 1 'MAPO1982');