-- Eliminar 'planes'
DELIMITER $$
	CREATE PROCEDURE eliminarPlan(IN pPlan INT)
		BEGIN
			DELETE FROM planes
			WHERE plan = pPlan;
		END$$
DELIMITER ;
DROP PROCEDURE eliminarPlan;
CALL eliminarPlan(10002);

-- Eliminar 'controlVersionPlan'
DELIMITER $$
	CREATE PROCEDURE eliminarControlVersionPlan(IN pPlan INT, pCoPlan CHAR(6))
		BEGIN
			DELETE FROM controlVersionPlan
			WHERE plan = pPlan AND codPlan = pCoPlan;
		END$$
DELIMITER ;
DROP PROCEDURE eliminarControlVersionPlan;
CALL eliminarControlVersionPlan(10001, 100011);

-- Eliminar 'rangoPlanes'
DELIMITER $$
	CREATE PROCEDURE eliminarRangoPlanes(IN pPlan INT, pCoPlan CHAR(6))
		BEGIN
			DELETE FROM rangoPlanes
			WHERE plan = pPlan AND codPlan = pCoPlan;
		END$$
DELIMITER ;
DROP PROCEDURE eliminarRangoPlanes;
CALL eliminarRangoPlanes(10001, 100011);

-- Eliminar 'inclusionPlan'
DELIMITER $$
	CREATE PROCEDURE eliminarInclusionPlan(IN pPlan INT, pCoPlan CHAR(6))
		BEGIN
			DELETE FROM inclusionPlan
			WHERE plan = pPlan AND codPlan = pCoPlan;
		END$$
DELIMITER ;
DROP PROCEDURE eliminarInclusionPlan;
CALL eliminarInclusionPlan(10001, 100011);
