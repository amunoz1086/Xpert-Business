export function validateDatosPersonalesCliente(context) {
    const { datosPersonales } = context()
    const errs = []
    if (!datosPersonales.nombre) errs.push('El nombre es obligatorio')
    if (!datosPersonales.identificacion) errs.push('La identificación es obligatoria')
    // …
    return errs
}

export function validateResidenciaFiscal(context) {
    const { residenciaFiscal } = context()
    const errs = []
    if (!residenciaFiscal.pais) errs.push('Debe seleccionar un país de residencia fiscal')
    // …
    return errs
}

export function validateDatosBasicos(context) {
    const { perfilPj } = context()
    const errs = []
    if (perfilPj.datosGenerales.categoriaCompania === "") errs.push('Debe seleccionar una categoria de compañia')
    // …
    return errs
}