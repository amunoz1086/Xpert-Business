-- stored procedure queryTipoCredIbrState
DELIMITER $$
	CREATE PROCEDURE queryTipoCredIbrState()
		BEGIN
			SELECT A.COD_TIP_PROD, B.NOMBRE, A.cod_ibr, C.ibr_descripcion, A.codEstado, D.descripcion
			FROM tipoCredIbrState AS A
			JOIN tipo_producto AS B ON B.COD_TIP_PROD = A.COD_TIP_PROD
			JOIN ibr AS C ON C.cod_ibr = A.cod_ibr
			JOIN Listas AS D ON D.lista = 'SiNo' AND D.codLista = A.codEstado
            ORDER BY A.COD_TIP_PROD DESC;
		END$$
DELIMITER ;
DROP PROCEDURE queryTipoCredIbrState;
CALL queryTipoCredIbrState();