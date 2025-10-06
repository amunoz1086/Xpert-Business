'use server'

/* MP: función para insertar(insert) nuevos IBRs desde Administracion-Modalidad:IBR*/

import { pool } from '../../../../config/conectPRICINGDB';
import { getSession } from "../../auth/auth";

export const fnInserIbr = async (req) => {


    let sesionUser = (await getSession()).userBACK.user;
    req.set('usuario', sesionUser);

    let { fechInicial, fechHasta, ibr0, ibr1, ibr3, ibr6, ibr12, usuario } = Object.fromEntries(req)

    const responsServer = {};
    const sqlString = `INSERT INTO ibr_fechas (fech_inic, fech_hast, cod_user)
                       VALUES('${fechInicial}', '${fechHasta}', '${usuario}');`;

    try {
        let [rows] = await pool.query(sqlString);
        if (rows.affectedRows === 1) {
            let sqlString_ibrControl = `INSERT INTO ibr_control (cod_fech, cod_ibr, valor_ibr)
                                        VALUES(${rows.insertId}, '0', ${ibr0}),
                                        (${rows.insertId}, '1', ${ibr1}),
                                        (${rows.insertId}, '3', ${ibr3}),
                                        (${rows.insertId}, '6', ${ibr6}),
                                        (${rows.insertId}, '12', ${ibr12});`;

            let [rws] = await pool.query(sqlString_ibrControl);
            if (rws.affectedRows === 5) {
                responsServer.STATE = true;
                responsServer.MESSAGE = `Registros insertados con exito`;
                return JSON.stringify(responsServer);
            };
        } else {
            responsServer.STATE = false;
            responsServer.MESSAGE = `Registros no insertados, intentelo nuevamente`;
            return JSON.stringify(responsServer);
        };
    } catch (e) {
        console.error(e.code);
        console.error(e.errno);
        console.error(e.message);
        return (JSON.stringify(e));
    };
};