'use server'

import { pool } from "@/config/conectPRICINGDB";


export const fnQueryListarRegional = async () => {

    const listadoRegional = {};
    const sqlString = `CALL listarRegional()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoRegional.state = true;
        listadoRegional.message = `200`;
        listadoRegional.regional = rows[0];
        return JSON.stringify(listadoRegional);

    } catch (e) {

        // console.error(e);
        listadoRegional.STATUS = 500;
        listadoRegional.CODE = e?.code;
        listadoRegional.MESSAGE = e?.sqlMessage;
        return JSON.stringify(listadoRegional);
    };
};

export const fnQueryListarOficinas = async () => {

    const listadoOficinas = {};
    const sqlString = `CALL listarOficinas()`;

    try {

        const [rows] = await pool.query(sqlString);

        listadoOficinas.state = true;
        listadoOficinas.message = `200`;
        listadoOficinas.oficinas = rows[0];

        //  listadoOficinas.oficinas =  rows[0].filter(o => o.REGIONAL == idRegion)
        return JSON.stringify(listadoOficinas);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

export const fnQueryListarVinculo = async () => {

    const sqlString = `CALL queryListarSiNo()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListarTipoContrato = async () => {

    const sqlString = `CALL listarTipoContrato()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListarTipoCliente = async () => {

    const sqlString = `CALL listarTipoCliente()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log('Error:', error.sqlMessage)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const querylistarSector = async () => {

    const sqlString = `CALL queryCatalogo('cl_sector_economico')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListarEstadoBanco = async (req, res,) => {

    const sqlString = `CALL listarEstadoBanco()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log(error);
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListarEstadoCoomeva = async () => {

    const sqlString = `CALL listarEstadoCoomeva()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListarAsocCoomeva = async () => {

    const sqlString = `CALL listarAsocCoomeva()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const fnQueryBuscarRegional = async (codRegional) => {

    const listadoRegional = {};
    const sqlString = `CALL buscarRegional(?)`;

    try {

        const [rows] = await pool.query(sqlString, [codRegional]);

        listadoRegional.state = true;
        listadoRegional.message = `200`;
        listadoRegional.regional = rows[0];
        return JSON.stringify(listadoRegional);

    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    };
};

export const queryListTipoIntegrante = async () => {

    const sqlString = `CALL queryListTipoIntegrante()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListTipoEmpresa = async () => {

    const sqlString = `CALL queryListTipoEmpresa()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListCiudades = async () => {

    const sqlString = `CALL queryCatalogo('cl_ciudad')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListDepartamentos = async () => {

    const sqlString = `CALL queryCatalogo('cl_provincia')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListPaises = async () => {

    const sqlString = `CALL queryCatalogo('cl_pais')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListTipoSociedad = async () => {

    const sqlString = `CALL queryCatalogo('cl_tip_soc')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListCatCompañia = async () => {

    const sqlString = `CALL queryCatalogo('cl_categoria_compania')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListCIIU = async () => {

    const sqlString = `CALL queryListCIIU()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListDireccion = async () => {

    const sqlString = `CALL queryListDireccion()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListDiscapacidad = async () => {

    const sqlString = `CALL queryCatalogo('cl_discapacidad')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

/* export const queryListTipoAccionista = async () => {

    const sqlString = `CALL queryListTipoAccionista()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);

    };
}; */

export const queryListPrefijoPais = async () => {

    const sqlString = `CALL queryCatalogo('cl_ddi_pais')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);;
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListRelacionDependencia = async () => {

    const sqlString = `CALL queryListRelacionDependencia()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListSexo = async () => {

    const sqlString = `CALL queryCatalogo('cl_sexo')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListEstadoCivil = async () => {

    const sqlString = `CALL queryCatalogo('cl_ecivil')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListPeriodos = async () => {

    const sqlString = `CALL queryListPeriodos()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListTipoBalance = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_balance')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListIniActAño = async () => {

    const sqlString = `CALL queryListIniActAño()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListIniActMes = async () => {

    const sqlString = `CALL queryListIniActMes()`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = rows[0];
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};

export const queryListFechCorte = async () => {

    const sqlString = `CALL queryCatalogo('cl_fechas_corte')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListOficinas = async () => {

    const sqlString = `CALL queryCatalogo('cl_oficina')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListActividadEconomica = async () => {

    const sqlString = `CALL queryCatalogo('cl_actividad_ec')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryFuentePrincipalIngreso = async () => {

    const sqlString = `CALL queryCatalogo('cl_fuente_ingreso')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryCoberturageografica = async () => {

    const sqlString = `CALL queryCatalogo('cl_cobertura_geografica')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoTelefono = async () => {

    const sqlString = `CALL queryCatalogo('cl_ttelefono')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoContacto = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_contacto')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryOpcionesCheck = async () => {

    const sqlString = `CALL queryCatalogo('cl_opcion')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoOperador = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_operador')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoContrato = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_contrato')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoMensajeria = async () => {

    const sqlString = `CALL queryCatalogo('cl_mensajeria_celular')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoDireccionVirtual = async () => {

    const sqlString = `CALL queryCatalogo('cl_tdireccion_virtual')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoDireccion = async () => {

    const sqlString = `CALL queryCatalogo('cl_tdireccion')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoVia = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_via')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoLetraVia = async () => {

    const sqlString = `CALL queryCatalogo('cl_letra_via')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoSectorVia = async () => {

    const sqlString = `CALL queryCatalogo('cl_sector_dir')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoConjunto = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_conjunto')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoEdificio = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_edificio')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoViviendaInterior = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_vivienda_interior')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const querySeccionFatca = async () => {

    const sqlString = `CALL queryCatalogo('cl_seccion_fatca')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoIdFiscal = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_id_fiscal')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoCliente = async () => {

    const sqlString = `CALL queryCatalogo('cl_tip_cliente')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoCorrespondencia = async () => {

    const sqlString = `CALL queryCatalogo('cl_corresp_pj')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoJuntaDirectiva = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_junta_dire')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoAccionista = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_accionista')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoBalance = async () => {

    const sqlString = `CALL queryCatalogo('cl_clasebalance')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryEstadosEnte = async () => {

    const sqlString = `CALL queryCatalogo('cl_estados_ente')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoGenero = async () => {

    const sqlString = `CALL queryCatalogo('cl_genero')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryNivelEstudio = async () => {

    const sqlString = `CALL queryCatalogo('cl_nivel_estudio')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);
        
        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoOcupacion = async () => {

    const sqlString = `CALL queryCatalogo('cl_ocupacion')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const querySituacionImpositiva = async () => {

    const sqlString = `CALL queryCatalogo('cl_situacion_impositiva_pn')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoPep = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_pep')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoParentesco = async () => {

    const sqlString = `CALL queryCatalogo('cl_parentesco')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoProductoVincuLaft = async () => {

    const sqlString = `CALL queryCatalogo('cl_productos_vincu_laft')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoVinculacion = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_vinculacion')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryAtencionClientes = async () => {

    const sqlString = `CALL queryCatalogo('cl_atencion_clientes')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryMarcacionCorrespondencia = async () => {

    const sqlString = `CALL queryCatalogo('cl_corresp')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoEstablecimiento = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_local')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoMoneda = async () => {

    const sqlString = `CALL queryCatalogo('cl_moneda')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoContratoLaboral = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_contr')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryRolEmpresa = async () => {

    const sqlString = `CALL queryCatalogo('cl_rol_empresa')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryDependenciaLaboral = async () => {

    const sqlString = `CALL queryCatalogo('cl_dependencia_laboral')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryGrupoEtnico = async () => {

    const sqlString = `CALL queryCatalogo('cl_grupo_etnico')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTiempoEmpleado = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipemp_empleado')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryConoceIf = async () => {

    const sqlString = `CALL queryCatalogo('cl_conoce_if')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        console.log(error)
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryDiasAtencion = async () => {

    const sqlString = `CALL queryCatalogo('ad_dia_semana')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListOficiales = async () => {

    const sqlString = `CALL queryCatalogo('ad_oficial_login')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryClientePep = async () => {

    const sqlString = `CALL queryCatalogo('cl_cliente_pep')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoVivinda = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_vivienda')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryTipoPropiedad = async () => {

    const sqlString = `CALL queryCatalogo('cl_tpropiedad')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryFuncionPep = async () => {

    const sqlString = `CALL queryCatalogo('cl_funcion_pep')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryDependenciaPep = async () => {

    const sqlString = `CALL queryCatalogo('cl_dependencia_pep')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryReferenciaTiempo = async () => {

    const sqlString = `CALL queryCatalogo('cl_referencia_tiempo')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryCargosPep = async () => {

    const sqlString = `CALL queryCatalogo('cl_cargos_pep')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListDocumentoPj = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_documento_pj')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListDocumentoPn = async () => {

    const sqlString = `CALL queryCatalogo('cl_tipo_documento_pn')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListCategoria = async () => {

    const sqlString = `CALL queryCatalogo('pe_categoria')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListOrigen = async () => {

    const sqlString = `CALL queryCatalogo('ah_tipocta')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListProducto = async () => {

    const sqlString = `CALL queryCatalogo('cl_producto')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListRol = async () => {

    const sqlString = `CALL queryCatalogo('cl_rol')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListTitularidad = async () => {

    const sqlString = `CALL queryCatalogo('re_titularidad')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListProductoCorriente = async () => {

    const sqlString = `CALL queryCatalogo('cc_subproductoscc_pj')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListProductoAhorro = async () => {

    const sqlString = `CALL queryCatalogo('ah_subproductosahorro_pj')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListTipoSobregiro = async () => {

    const sqlString = `CALL queryCatalogo('cc_tsobregiro')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListMotivoAhorro = async () => {

    const sqlString = `CALL queryCatalogo('ah_motivo_ahorro')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListFrecuenciaAhorro = async () => {

    const sqlString = `CALL queryCatalogo('ah_frecuencia_ahoprog')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListTipoServicio = async () => {

    const sqlString = `CALL queryCatalogo('ah_tiposervicio')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListProductoCDT = async () => {

    const sqlString = `CALL queryCatalogo('pf_tipo_deposito')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListFormaPago = async () => {

    const sqlString = `CALL queryCatalogo('pf_forma_pago')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListOficinasFisicas = async () => {

    const sqlString = `CALL queryCatalogo('cl_oficinas_fisicas')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListFrecuenciaPago = async () => {

    const sqlString = `CALL queryCatalogo('pf_frecuencia_pago_intereses')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListCategoriaPlazo = async () => {

    const sqlString = `CALL queryCatalogo('pf_categoria')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};


export const queryListFormaRecepcionPago = async () => {

    const sqlString = `CALL queryCatalogo('pf_forma_recepcion_pago')`;
    let responsServer = {};

    try {
        const [rows] = await pool.query(sqlString);

        if (rows[0][0].length === 0) {
            responsServer.STATUS = 202;
            responsServer.MESSAGE = 'Entidad sin registros';
            return JSON.stringify(responsServer);

        } else {
            responsServer.STATUS = 200;
            responsServer.DATA = JSON.parse(rows[0][0].dataCatalogo);
            return JSON.stringify(responsServer);
        }

    } catch (error) {
        responsServer.STATUS = 500;
        responsServer.CODE = error.code;
        responsServer.MESSAGE = error.sqlMessage;
        return JSON.stringify(responsServer);
    };
};