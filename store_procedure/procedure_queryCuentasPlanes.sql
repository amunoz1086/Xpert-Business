DELIMITER $$
	CREATE PROCEDURE queryCuentasPlanes(IN pPlan INT, pCodPlan INT)
		BEGIN
			DECLARE vTipoPlan INT;
            
            SELECT tipoPlan INTO vTipoPlan
            FROM planes
			WHERE plan = pPlan;
            
            IF vTipoPlan = 1 THEN
				SELECT 200 AS STATUS, A.idCliente, B.razonSocial, A.cuenta
				FROM cuentaPlanes AS A
				LEFT JOIN clienteJuridico AS B ON B.nit = A.idCliente
				WHERE plan = pPlan AND codPlan = pCodPlan;
            ELSE
				SELECT 204 AS STATUS;
            END IF;
		END$$
DELIMITER ;
DROP PROCEDURE queryCuentasPlanes;
CALL queryCuentasPlanes(10002, 100022);

