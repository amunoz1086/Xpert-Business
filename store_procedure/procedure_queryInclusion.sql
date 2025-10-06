DELIMITER $$
	CREATE PROCEDURE queryInclusion(IN PLAN INT, CODPLAN INT)
		BEGIN
			DROP TEMPORARY TABLE IF EXISTS tempInclusion;
			DROP TEMPORARY TABLE IF EXISTS tempMaxFecha;
            
			CREATE TEMPORARY TABLE tempInclusion AS
			SELECT A.plan, A.codPlan, A.idCliente,
				B.razonSocial AS cliente, 
				A.fechaNovedad, A.estadoInclusion
				FROM inclusionPlan AS A
				LEFT JOIN clienteJuridico AS B ON B.nit = A.idCliente
				WHERE A.estadoInclusion = 1 AND A.plan = PLAN AND A.codPlan = CODPLAN;

			CREATE TEMPORARY TABLE tempMaxFecha AS
			SELECT idCliente,
				MAX(fechaNovedad) AS maxFecha
			FROM tempInclusion
			GROUP BY idCliente;

			DELETE T FROM tempInclusion T
			LEFT JOIN tempMaxFecha M ON T.idCliente = M.idCliente AND T.fechaNovedad = M.maxFecha
			WHERE M.maxFecha IS NULL;

			SELECT * FROM tempInclusion;

			DROP TEMPORARY TABLE IF EXISTS tempInclusion;
			DROP TEMPORARY TABLE IF EXISTS tempMaxFecha;
		END$$
DELIMITER ;
DROP PROCEDURE queryInclusion;
CALL queryInclusion(?, ?);
CALL queryInclusion(10001, 100012);