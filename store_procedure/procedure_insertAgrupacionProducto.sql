DELIMITER $$
	DROP PROCEDURE IF EXISTS insertAgrupacionProducto;
	CREATE PROCEDURE insertAgrupacionProducto(IN pAgrupador VARCHAR(2), pProducto INT, pSubproducto INT)
		BEGIN
			INSERT INTO parametrosSubProducto (codAgrupador,  codProducto, codSubProducto)
            VALUES
            (pAgrupador, pProducto, pSubproducto);
		END$$
DELIMITER ;

CALL insertAgrupacionProducto();