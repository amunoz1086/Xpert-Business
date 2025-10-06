/* DELIMITER $$
	DROP PROCEDURE IF EXISTS queryListarUsuario;
	CREATE PROCEDURE queryListarUsuario ()
		BEGIN
    		SELECT A.USUARIO, A.NOMBRE, A.CORREO, D.CARGO,
			E.REGIONAL_RAD AS REGIONAL, 
            F.OFICINA, G.CANAL_RAD AS CANAL,
			(SELECT json_arrayagg(J.PERFIL)
				FROM perfiles_usuario AS H
				JOIN usuario AS I ON H.USUARIO = I.USUARIO
				JOIN perfiles AS J ON H.COD_PERFIL = J.COD_PERFIL
			WHERE H.USUARIO = A.USUARIO) AS PERFIL,
			if(K.tipo_aprobador IS NULL, '--', K.tipo_aprobador) AS TIPO_APROBADOR,
            M.descripcion AS PERFIL_CLIENTE,
            if(L.descripcion IS NULL, '--', L.descripcion) AS TIPO_PARAMETRIZADOR
			FROM usuario AS A
			LEFT JOIN ente_aprobacion AS B ON B.USUARIO = A.USUARIO
            LEFT JOIN ente_parametrizacion AS C ON C.USUARIO = A.USUARIO
			LEFT JOIN cargos AS D ON A.COD_CARGO = D.COD_CARGO
			LEFT JOIN regional AS E ON A.COD_REGIONAL = E.COD_REGIONAL_RAD
			LEFT JOIN oficina AS F ON A.COD_OFICINA = F.COD_OFICINA
			LEFT JOIN canal AS G ON A.COD_CANAL = G.COD_CANAL_RAD
			LEFT JOIN tipo_aprobador AS K ON B.COD_APROBADOR = K.cod_aprobador
            LEFT JOIN list_TipoParametrizador AS L ON C.COD_PARAMETRIZADOR = L.codTipPardor
            LEFT JOIN list_PerfilCliente AS M ON C.COD_PARAMETRIZADOR = M.codPerfilCliente;
    	END$$
DELIMITER ;

CALL queryListarUsuario(); */