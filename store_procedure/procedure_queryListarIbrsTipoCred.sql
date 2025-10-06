-- stored procedure queryListarIbrsTipoCred
DELIMITER $$
	CREATE PROCEDURE queryListarIbrsTipoCred()
		BEGIN
			SELECT A.COD_TIP_PROD, B.NOMBRE, json_arrayagg(A.cod_ibr) AS cod_ibr,
            json_arrayagg(C.ibr_descripcion) AS ibr_descripcion, json_arrayagg(E.cod_fech) AS cod_fech,
            json_arrayagg(E.valor_ibr) AS valor_ibr
			FROM tipoCredIbrState AS A
			JOIN tipo_producto AS B ON B.COD_TIP_PROD = A.COD_TIP_PROD
			JOIN ibr AS C ON C.cod_ibr = A.cod_ibr
			JOIN  ibr_control AS E ON A.cod_ibr = E.cod_ibr
			WHERE A.codEstado = 1 AND E.cod_fech = (SELECT cod_fech FROM ibr_control ORDER BY cod_fech DESC LIMIT 1)
			GROUP BY A.COD_TIP_PROD
			ORDER BY A.COD_TIP_PROD DESC;
		END$$
DELIMITER ;
DROP PROCEDURE queryListarIbrsTipoCred;
CALL queryListarIbrsTipoCred();
