-- stored procedure crear_o_recuperar_sesion
DELIMITER $$
	CREATE PROCEDURE crear_o_recuperar_sesion (IN p_usuario_id VARCHAR(15), IN p_usuario_ip VARCHAR(15), OUT p_token VARCHAR(255), OUT p_mensaje VARCHAR(255), OUT p_ip VARCHAR(15), OUT p_sessionActiva BOOLEAN)
		BEGIN
			DECLARE v_token_existente VARCHAR(255);
			DECLARE v_ip VARCHAR(15);
			-- Verificar si el usuario ya tiene una sesión
			SELECT token, user_ip INTO v_token_existente, v_ip
			FROM sessions
			WHERE user_id = p_usuario_id
			LIMIT 1;
    
			IF v_token_existente IS NOT NULL THEN
				-- Si ya tiene una sesión, devolver el token y un mensaje
				SET p_token = v_token_existente;
				SET p_mensaje = 'El usuario ya tiene una sesión abierta.';
				SET p_ip = v_ip;
				SET p_sessionActiva=TRUE;
			ELSE
				-- Si no tiene una sesión, crear una nueva sesión
				INSERT INTO sessions (user_id, user_ip, token)
				VALUES (p_usuario_id, p_usuario_ip, MD5(CONCAT(NOW(), RAND()))); -- Usar MD5 solo como ejemplo, en la práctica usar algo más seguro
        
				-- Obtener el token de la nueva sesión
				SELECT token INTO p_token
				FROM sessions
				WHERE user_id = p_usuario_id
				ORDER BY created_at DESC
				LIMIT 1;

				SET p_mensaje = 'Se creó la sesión con éxito.';
			END IF;
		END$$
DELIMITER ;

DROP PROCEDURE crear_o_recuperar_sesion;
CALL crear_o_recuperar_sesion(?, ?, ?, ?, ?, ?);
