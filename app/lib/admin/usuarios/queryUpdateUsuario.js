'use server';

/* MP: función para actualizar(update) usuarios desde el boton Editar */

import { pool } from '../../../../config/conectPRICINGDB';


export const fnQueryUpdateUsuarios = async (req) => {

    console.log(req);

    let perfiles = req.getAll('perfiles');
    let { usuario, cargo, oficina, regional, canal, aprobador, perfilCliente, parametrizador, perfilProducto } = Object.fromEntries(req);


    const updateUsuario = {};
    const sqlString = `CALL updateUsuario(?, ?, ?, ?, ?, ?, ?)`;


    try {

        const [rows] = await pool.query(sqlString, [usuario, cargo, oficina, regional, canal, perfilCliente, perfilProducto]);

        if (rows.affectedRows === 1) {

            if (perfiles[0] === '3') {
                let sqlString_updateEntes = `CALL queryUpdateEnte(?, ?)`;
                let [update_rows] = await pool.query(sqlString_updateEntes, [aprobador, usuario]);

                if (update_rows.affectedRows < 1) {
                    let sqlString_insertEntes = `CALL insertEnteAprobacion(?, ?)`;
                    let [insert_rows] = await pool.query(sqlString_insertEntes, [aprobador, usuario]);
                    updateUsuario.insertEnte = insert_rows.affectedRows;
                };

            } else {
                let sqlString_deleteEntes = `CALL queryDeleteEnte(?)`;
                let [delete_rows] = await pool.query(sqlString_deleteEntes, usuario);
                updateUsuario.deleteEnte = delete_rows.affectedRows;
            };

            if (perfiles[0] === '4') {
                let sqlString_deleteParametrizador = `CALL queryDeleteParametrizador(?)`;
                let [delete_rows] = await pool.query(sqlString_deleteParametrizador, usuario);
                updateUsuario.deleteParametrizador = delete_rows.affectedRows;

                let sqlString_insertParametrizador = `CALL insertEnteParametrizador(?, ?)`;
                let [insert_rows] = await pool.query(sqlString_insertParametrizador, [parametrizador, usuario]);
                updateUsuario.insertEnte = insert_rows.affectedRows;

            } else {
                let sqlString_deleteParametrizador = `CALL queryDeleteParametrizador(?)`;
                let [delete_rows] = await pool.query(sqlString_deleteParametrizador, usuario);
                updateUsuario.deleteParametrizador = delete_rows.affectedRows;
            };

            let sqlString_deletePerfil = `CALL deletePerfilUsuario(?)`;
            const [deleteRows] = await pool.query(sqlString_deletePerfil, usuario);

            if (deleteRows.affectedRows > 0) {
                let sqlString_Perfiles = `CALL insertPerfilUsuario(?, ?)`;
                let countPerfil = 0;
                for (let i of perfiles) {
                    let [rws] = await pool.query(sqlString_Perfiles, [i, usuario]);

                    if (i === '4') {
                        let sqlString_deleteParametrizador = `CALL queryDeleteParametrizador(?)`;
                        let [delete_rows] = await pool.query(sqlString_deleteParametrizador, usuario);
                        updateUsuario.deleteParametrizador = delete_rows.affectedRows;

                        let sqlString_insertParametrizador = `CALL insertEnteParametrizador(?, ?)`;
                        let [insert_rows] = await pool.query(sqlString_insertParametrizador, [parametrizador, usuario]);
                        updateUsuario.insertEnte = insert_rows.affectedRows;
                    }

                    countPerfil = countPerfil + rws.affectedRows;
                };
                if (perfiles.length === countPerfil) {
                    updateUsuario.state = true;
                    updateUsuario.message = `¡Usuario ${usuario} actualizado!`;
                    return JSON.parse(JSON.stringify(updateUsuario));
                } else {
                    updateUsuario.state = false;
                    updateUsuario.message = `Usuario ${usuario}, no insertado, falla con los perfiles`;
                    return JSON.parse(JSON.stringify(updateUsuario));
                };
            };
        } else {
            updateUsuario.state = false;
            updateUsuario.message = `Usuario ${usuario}, no pudo ser actualizado`;
            return JSON.parse(JSON.stringify(updateUsuario));
        };

    } catch (e) {
        console.error(e);
        return JSON.parse(JSON.stringify(e));
    };
};