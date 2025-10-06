'use server';

/* MP: función para insertar(insert) nuevos usuarios */

import { pool } from '../../../../config/conectPRICINGDB';

export const fnQueryInsertUsusario = async (req) => {

    const perfiles = req.getAll('perfiles');

    const { idUsuario, nombre, correo, cargo, oficina, regional, canal, aprobador, perfilCliente, parametrizador, perfilProducto } = Object.fromEntries(req)

    const insertUsuario = {};

    const sqlString = `CALL insertUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?)`;


    try {
        const [rows] = await pool.query(sqlString, [idUsuario, nombre, correo, cargo, oficina, regional, canal, perfilCliente, perfilProducto]);

        console.log(rows)

        if (rows.affectedRows === 1) {

            if (perfiles[0] === '3') {
                let sqlString_Entes = `CALL insertEnteAprobacion(?, ?)`;
                console.log(idUsuario)
                console.log(aprobador)
                let [insert_rows] = await pool.query(sqlString_Entes, [aprobador, idUsuario]);
                insertUsuario.insertEnte = insert_rows.affectedRows;
            };

            if (perfiles[0] === '4') {
                let sqlString_insertParametrizador = `CALL insertEnteParametrizador(?, ?)`;
                console.log(idUsuario)
                let [insert_rows] = await pool.query(sqlString_insertParametrizador, [parametrizador, idUsuario]);
                insertUsuario.insertParametrizador = insert_rows.affectedRows;
            };

            let sqlString_Perfiles = `CALL insertPerfilUsuario(?, ?)`;
            let countPerfil = 0;

            for (let i of perfiles) {
                console.log(idUsuario)
                let [rws] = await pool.query(sqlString_Perfiles, [i, idUsuario]);

                if (i === '4') {
                    let sqlString_insertParametrizador = `CALL insertEnteParametrizador(?, ?)`;

                    console.log(idUsuario)

                    let [insert_rows] = await pool.query(sqlString_insertParametrizador, [parametrizador, idUsuario]);
                    insertUsuario.insertParametrizador = insert_rows.affectedRows;
                };

                countPerfil = countPerfil + rws.affectedRows;
            };

            if (perfiles.length === countPerfil) {
                insertUsuario.state = true;
                insertUsuario.message = `¡Usuario ${idUsuario} insertado!`;
                return JSON.parse(JSON.stringify(insertUsuario));
            } else {
                insertUsuario.state = false;
                insertUsuario.message = `Usuario ${idUsuario}, no insertado, falla con los perfiles`;
                return JSON.parse(JSON.stringify(insertUsuario));
            };
        } else {
            insertUsuario.state = false;
            insertUsuario.message = `Usuario ${idUsuario}, no pudo ser insertado`;
            return JSON.parse(JSON.stringify(insertUsuario));
        };
    } catch (e) {
        console.error(e);
        insertUsuario.state = false;
        insertUsuario.message = e.code === 'ER_DUP_ENTRY' ? `Transacción cancelada, el usuario ${idUsuario} ya existe en la Base de Datos de la aplicación.` : `${e.message}`;
        return JSON.parse(JSON.stringify(insertUsuario));
    };
};