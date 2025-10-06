'use client'

const ResultadoSolicitudCumplimiento = ({ resultadoMotor }) => {

    let tipoAprobador = '';

    if (resultadoMotor.ENTE_APROBACION === '100') {
        tipoAprobador = 'Revisar Adquirencia';
    } else if (resultadoMotor.hasOwnProperty('DATOS_ENTE_FINAL')) {
        if (resultadoMotor.DATOS_ENTE_FINAL.length === 0) {
            tipoAprobador = 'Aprobadores no definidos';
        } else {
            tipoAprobador = resultadoMotor.DATOS_ENTE_FINAL[0].tipo_aprobador;
        };
    } else if (resultadoMotor.hasOwnProperty('responseKnime')) {
        if (resultadoMotor.responseKnime.hasOwnProperty('DATOS_ENTE_FINAL')) {
            if (resultadoMotor.responseKnime.DATOS_ENTE_FINAL.length === 0) {
                tipoAprobador = 'Aprobadores no definidos';
            } else {
                tipoAprobador = resultadoMotor.responseKnime.DATOS_ENTE_FINAL[0].tipo_aprobador;
            };
        } else {
            tipoAprobador = 'Aprobadores no definidos';
        };
    } else {
        tipoAprobador = 'Aprobadores no definidos';
    }

    const bodyTable = [{
        id: '1',
        desc1: "Ente de Atribución",
        porcentajea: `${tipoAprobador}`,
        desc2: "Parametrización",
        porcentajeb: `${resultadoMotor.DATOS_PARAMETRIZADOR === undefined ? resultadoMotor.responseKnime?.DATOS_PARAMETRIZADOR?.CARGO || '' : resultadoMotor.DATOS_PARAMETRIZADOR?.CARGO}`
    }];

    return (
        <div className="container w-full">
            <fieldset className="border bg-white shadow-md rounded-md w-full">
                <legend className={` bg-coomeva_color-grisPestaña2  ml-8 rounded-t-md`}>
                    <h4 className="text-coomeva_color-rojo mt-4 text-sm  text-center font-semibold">ENTE ATRIBUCION/PARAMETRIZACION</h4>
                </legend>
                <div>
                    <table className={`table-auto  w-[99%] text-sm  mx-auto mb-3 text-start `}>
                        <thead className="bg-coomeva_color-grisPestaña2">
                            <tr className={`font-roboto text-sm  bg-coomeva_color-grisPestaña2 h-[35px]`}>
                                <th colSpan='4' className={`align-bottom text-start px-2 text-coomeva_color-rojo  decoration-inherit  w-[20%]`} ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bodyTable?.map((servicio, i) => (
                                    <tr className={`text-[#002E49] text-left font-semibold ${i % 2 !== 0 ? 'bg-coomeva_color-grisPestaña2' : 'bg-white'} h-[36px] align-bottom`} key={servicio.id}>
                                        <td className="text-coomeva_color-rojo">
                                            {servicio.desc1}
                                        </td>
                                        <td>
                                            {servicio.porcentajea}
                                        </td>
                                        <td className="text-coomeva_color-rojo">
                                            {servicio.desc2}
                                        </td>
                                        <td>
                                            {servicio.porcentajeb}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </fieldset>
        </div>
    )
}

export default ResultadoSolicitudCumplimiento