import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font,
} from "@react-pdf/renderer";

// Registrar fuente Arial
Font.register({
    family: "arial",
    fonts: [
        { src: "/fonts/arial.ttf" },
        { src: "/fonts/arialbd.ttf", fontWeight: "bold" },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontSize: 9,
        lineHeight: 1.4,
        fontFamily: "arial",
        padding: 25,
    },
    logo: {
        width: 140,
        height: 45,
        marginBottom: 10,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#196b24",
    },
    subtitle: {
        fontWeight: "bold",
        color: "#196b24",
        marginTop: 6,
    },
    label: {
        fontWeight: "bold",
        color: "#196b24",
    },
    text: {
        textAlign: "justify",
        color: "#196b24",
    },
    textBlack: {
        textAlign: "justify",
        color: "#000",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 4,
    },
    halfField: {
        width: "48%",
    },
    field: {
        marginBottom: 4,
    },
    fieldCenter: {
        textAlign: "center",
    },
    bordeTabla: {
        borderWidth: 1,
        borderColor: "#196b24",
        //marginTop: 10,
    },
    rowTabla: {
        flexDirection: "row",
    },
    fieldTabla: {
        flex: 1,
        padding: 4,
        //fontSize: 10,
    },
    bordeVertical: {
        borderRightWidth: 1,
        borderColor: "#196b24",
    },
    borderBot: {
        borderBottomWidth: 1,
        borderColor: "#196b24",
    },
    signatureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingTop: 5,
        marginBottom: 5,
    },
    signatureBlock: {
        width: "48%",
        padding: 5,
    },
    fogafin: {
        position: "absolute",
        left: 370,
        bottom: 50,
        width: 140,
        height: 50,
    },
    sf_ft_p2: {
        position: "absolute",
        left: 30,
        bottom: 50,
        width: 140,
        height: 50,
    },
    sf_ft_p1: {
        position: "absolute",
        left: 30,
        bottom: 3,
        width: 140,
        height: 20,
    },
    logoVigilado: {
        position: "absolute",
        left: 5,
        bottom: 200,
        height: 250,
        width: 20,
    },
});

const CdtPDF = ({ datosCuenta, formaRecepcion = {}, contenido }) => {
    const totalMonto =
        formaRecepcion?.recepcion?.reduce(
            (acc, row) => acc + (parseFloat(row.fr_monto) || 0),
            0
        ) || 0;

    const nRows = formaRecepcion?.recepcion?.length;

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                {/* Encabezado */}
                {contenido.logo && <Image src={contenido.logo} style={styles.logo} />}
                <View style={styles.row}>
                    <Text style={[styles.field, styles.halfField]}></Text>
                    <Text style={[styles.field, styles.halfField]}></Text>
                    <Text style={[styles.field, styles.halfField]}>
                        <Text style={styles.label}>Oficina: </Text>
                        {datosCuenta.oficina}
                    </Text>
                </View>
                <Text style={styles.title}>Apertura de Productos CDT - CDAT</Text>
                <Text style={[styles.title, { marginTop: 4 }]}>
                    {+datosCuenta.desmaterializado === 1 ? "DESMATERIALIZADO" : ""}
                </Text>

                {/* Datos principales */}
                <View style={+datosCuenta.desmaterializado === 1 ? { marginTop: 4 } : { marginTop: 10 }}>
                    <View style={styles.row}>
                        <Text style={styles.fieldCenter}>
                            <Text style={styles.label}>No. del producto: </Text>
                            {datosCuenta.producto}
                        </Text>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Fecha apertura: </Text>
                            {datosCuenta.fechaApertura}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Titular: </Text>
                            {datosCuenta.nombre}
                        </Text>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Identificación: </Text>
                            {datosCuenta.identificacion}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Tipo de cuenta: </Text>
                            {datosCuenta.tipoCuenta}
                        </Text>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Monto: </Text>
                            {datosCuenta.monto}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Plazo en días: </Text>
                            {datosCuenta.plazo}
                        </Text>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Tasa de interés nominal anual: </Text>
                            {datosCuenta.tasaNominal}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Fecha de vencimiento: </Text>
                            {datosCuenta.fechaVencimiento}
                        </Text>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Tasa efectiva anual: </Text>
                            {datosCuenta.tasaEfectiva}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Cuenta abono intereses: </Text>
                            {datosCuenta.cuentaAbonoInteres}
                        </Text>
                        <Text style={[styles.field, styles.halfField]}>
                            <Text style={styles.label}>Forma de pago intereses: </Text>
                            {datosCuenta.formaPagoInteres}
                        </Text>
                    </View>
                </View>

                {/* Tabla de recepción */}
                <View style={[styles.bordeTabla, +datosCuenta.desmaterializado === 1 ? { marginTop: 5 } : { marginTop: 15 }]}>
                    <View style={[styles.rowTabla, styles.borderBot]}>
                        <Text style={[styles.fieldTabla, styles.label, styles.bordeVertical]}>Moneda</Text>
                        <Text style={[styles.fieldTabla, styles.label, styles.bordeVertical]}>
                            Forma de recepción
                        </Text>
                        <Text style={[styles.fieldTabla, styles.label, styles.bordeVertical]}>Cuenta</Text>
                        <Text style={[styles.fieldTabla, styles.label]}>Monto</Text>
                    </View>
                    {formaRecepcion?.recepcion?.map((row, idx) => (
                        <View key={idx} style={[styles.rowTabla, styles.borderBot]}>
                            <Text style={[styles.fieldTabla, styles.bordeVertical]}>
                                {row.fr_moneda || ""}
                            </Text>
                            <Text style={[styles.fieldTabla, styles.bordeVertical]}>
                                {row.formaRecepcion || ""}
                            </Text>
                            <Text style={[styles.fieldTabla, styles.bordeVertical]}>
                                {row.fr_cuenta || ""}
                            </Text>
                            <Text style={styles.fieldTabla}>{row.fr_monto || ""}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.rowTabla}>
                    <Text style={[styles.fieldTabla]}></Text>
                    <Text style={[styles.fieldTabla]}></Text>
                    <Text style={[styles.fieldTabla]}></Text>
                    <Text style={[styles.fieldTabla, styles.textBlack]}>
                        <Text style={styles.label}>Total: </Text>
                        {datosCuenta.totalMonto}
                    </Text>
                </View>

                {/* Textos */}
                <Text style={[styles.text, +datosCuenta.desmaterializado === 1 ? { marginTop: 5 } : { marginTop: 15 }]}>
                    {+datosCuenta.desmaterializado === 1 ? contenido.text1 : ""}
                </Text>

                <Text style={styles.subtitle}>Declaración Voluntaria de Origen de Fondos</Text>
                <Text style={[styles.text, nRows > 1 ? { marginTop: 4 } : { marginTop: 5 }]}>
                    Yo, <Text style={[styles.textBlack]}>{datosCuenta.nombre}</Text>, identificado con documento No.{" "}
                    <Text style={[styles.textBlack]}>{datosCuenta.identificacion}</Text>, expedida en <Text style={[styles.textBlack]}>{datosCuenta.ciudad}</Text>{" "}
                    {contenido.text2}
                </Text>
                <Text style={[styles.text, nRows > 1 ? { marginTop: 4 } : { marginTop: 5 }]}>
                    {contenido.text3}{" "}
                    {datosCuenta.recursos && datosCuenta.recursos.trim() !== ""
                        ? <Text style={[styles.textBlack]}>{datosCuenta.recursos}</Text>
                        : "___________________________"}
                </Text>

                <Text style={[styles.text, nRows > 1 ? { marginTop: 0 } : { marginTop: 2 }]}>{contenido.text4}</Text>
                <Text style={[styles.text, nRows > 1 ? { marginTop: 0 } : { marginTop: 2 }]}>{contenido.text5}</Text>
                <Text style={[styles.text, nRows > 1 ? { marginTop: 0 } : { marginTop: 2 }]}>{contenido.text6}</Text>

                <Text style={styles.subtitle}>Reglamento de Productos</Text>
                <Text style={[styles.text, nRows > 1 ? { marginTop: 4 } : { marginTop: 5 }]}>{contenido.text7}</Text>

                <Text style={styles.subtitle}>Información Sobre Seguro de Depósitos</Text>
                <Text style={[styles.text, nRows > 1 ? { marginTop: 4 } : { marginTop: 5 }]}>
                    {contenido.text8} <Text style={styles.subtitle}>www.bancoomeva.com.co</Text>.
                </Text>

                {/* Texto extra y logos */}
                <Text style={[styles.text, styles.sf_ft_p1]}>{contenido.text9}</Text>
                {contenido.vigilado && <Image src={contenido.vigilado} style={styles.logoVigilado} />}
            </Page>

            <Page size="LETTER" style={styles.page}>
                {/* Firmas */}
                <View style={[styles.signatureRow, { marginTop: 20 }]}>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.text}>________________________________________</Text>
                        <Text style={styles.label}>Firma Colaborador responsable:</Text>
                        <Text style={styles.label}>Nombre:</Text>
                    </View>
                </View>
                <View style={styles.signatureRow}>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.text}>________________________________________</Text>
                        <Text style={styles.label}>Firma Cliente:</Text>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.label}>Número de Identificación:</Text>
                    </View>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.text}>________________________________________</Text>
                        <Text style={styles.label}>Firma Cliente:</Text>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.label}>Número de Identificación:</Text>
                    </View>
                </View>
                <View style={styles.signatureRow}>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.text}>________________________________________</Text>
                        <Text style={styles.label}>Firma Cliente:</Text>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.label}>Número de Identificación:</Text>
                    </View>
                </View>

                {/* Texto extra y logos */}
                <Text style={[styles.text, styles.sf_ft_p2]}>{contenido.text9}</Text>
                {contenido.fogafin && <Image src={contenido.fogafin} style={styles.fogafin} />}
                {contenido.vigilado && <Image src={contenido.vigilado} style={styles.logoVigilado} />}
            </Page>
        </Document >
    );
};

export default CdtPDF;