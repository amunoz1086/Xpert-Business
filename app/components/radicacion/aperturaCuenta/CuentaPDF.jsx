import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import { Font } from '@react-pdf/renderer';

Font.register({
    family: 'arial',
    fonts: [
        { src: '/fonts/arial.ttf' },
        { src: '/fonts/arialbd.ttf', fontWeight: 'bold' }
    ]
});

const styles = StyleSheet.create({
    page: {
        fontSize: 9,
        lineHeight: 1.4,
        fontFamily: 'arial',
    },
    pageDos: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 1,
        fontSize: 9,
        lineHeight: 1.3,
        fontFamily: 'arial',
    },
    borde: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 1,
        border: '1 solid #196b24',
    },
    bordeInternoVertical: {
        borderLeft: '1 solid #196b24',
    },
    sectionTop: {
        padding: 7,
        borderBottom: '1 solid #196b24',
        borderTop: '1 solid #196b24'
    },
    sectionBot: {
        padding: 7,
        borderBottom: '1 solid #196b24'
    },
    borderBot: {
        borderBottom: '1 solid #196b24'
    },
    paddingAuxiliarTop: {
        paddingTop: 7
    },
    paddingAuxiliar: {
        padding: 7
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    halfField: {
        width: '48%'
    },
    rowCompleto: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    halfFiel: {
        width: '50%'
    },
    logo: {
        width: 140,
        height: 45,
        marginBottom: 15
    },
    title: {
        textAlign: "center",
        fontWeight: 'bold',
        color: '#196b24',
    },
    subtitle: {
        fontWeight: 'bold',
        color: '#196b24',
    },
    label: {
        fontWeight: "bold",
        color: '#196b24'
    },
    fieldCenter: {
        textAlign: "center",
    },
    field: {
        marginBottom: 4
    },
    text: {
        textAlign: 'justify',
        color: '#196b24'
    },
    signatureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 70,
        paddingTop: 20,
        marginBottom: 30,
    },
    signatureBlock: {
        width: '48%',
        padding: 5
    },
    backg: {
        backgroundColor: '#ddd'
    },
    logoAnverso: {
        width: 120,
        height: 25,
        marginLeft: 25,
    },
    logoVigilado: {
        position: 'absolute',
        left: 5,
        bottom: 130,
        height: 250,
        width: 20,
    },
    logoVigiladoDos: {
        position: 'absolute',
        left: 5,
        bottom: 20,
        height: 250,
        width: 20,
    },
    logoReverso: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 120,
        height: 20,
        marginLeft: 20,
    },
    fogafin: {
        position: 'absolute',
        left: 350,
        top: 200,
        width: 180,
        height: 60
    }
});


const agruparDeADos = (array) => {
    const resultado = [];
    for (let i = 0; i < array.length; i += 2) {
        resultado.push(array.slice(i, i + 2));
    }
    return resultado;
};

const CuentaPDF = ({
    cliente,
    colaborador,
    datosCuenta,
    firmas = {},
    contenido, // base64 string: "data:image/png;base64,..."
}) => (
    <Document>
        <Page size="LETTER" style={styles.page}>
            <View style={styles.borde}>

                {/* Titulo */}
                <View>
                    {contenido.logo && <Image src={contenido.logo} style={styles.logo} />}
                    <Text style={styles.title}>Apertura de Cuenta</Text>
                    <Text style={[styles.fieldCenter]}><Text style={styles.label}>Producto:</Text> {datosCuenta.producto}</Text>
                    <Text style={[styles.fieldCenter]}><Text style={styles.label}>Nro:</Text> {datosCuenta.numero}</Text>
                </View>

                {/* Campos Descriptivos */}
                <View style={styles.sectionTop}>
                    <View style={[styles.row, styles.paddingAuxiliarTop]}>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Fecha apertura:</Text> {datosCuenta.fecha}</Text>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Titular:</Text> {cliente.nombre}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Oficina:</Text> {datosCuenta.oficina}</Text>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Identificación:</Text> {cliente.identificacion}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Ciudad expedición:</Text> {cliente.ciudad}</Text>
                    </View>
                </View>

                {/* Autorizaciones */}
                <View style={[styles.rowCompleto, styles.borderBot]}>
                    <View style={[styles.halfFiel, styles.paddingAuxiliar]}>
                        <Text style={[styles.subtitle]}>Autorización para Cargar otros Conceptos y Pago</Text>
                        <Text style={[styles.text, styles.paddingAuxiliarTop]}>
                            {contenido.text1}
                        </Text>
                    </View>
                    <View style={[styles.bordeInternoVertical]}></View>
                    <View style={[styles.halfFiel, styles.paddingAuxiliar]}>
                        <Text style={[styles.subtitle]}>Autorización para Compensación de Obligaciones</Text>
                        <Text style={[styles.text, styles.paddingAuxiliarTop]}>
                            {contenido.text2}
                        </Text>
                    </View>
                </View>

                {/* Declaración Voluntaria */}
                <View style={styles.sectionBot}>
                    <Text style={styles.subtitle}>Declaración Voluntaria de Origen de Fondos</Text>
                    <Text style={[styles.field, styles.paddingAuxiliarTop]}><Text style={styles.text}>Yo,</Text>  {cliente.nombre}  <Text style={[styles.text]}>identificado con el documento de identidad</Text>
                        <Text style={styles.text}>  No.</Text>  {cliente.identificacion}  <Text style={[styles.text]}>expedida en</Text>  {cliente.ciudad}  <Text style={[styles.text]}>{contenido.text3}</Text>  {cliente.recursos && cliente.recursos.trim() !== "" ? (
                            <Text style={[styles.field]}>{cliente.recursos}</Text>
                        ) : (
                            <Text style={[styles.text]}>_____________________________________________________________________.</Text>
                        )}
                    </Text>
                    <Text style={[styles.text, styles.paddingAuxiliarTop]}>
                        {contenido.text4}
                    </Text>
                    {/* Reglamento */}
                    <Text style={[styles.subtitle, styles.paddingAuxiliarTop]}>Reglamento de Productos</Text>
                    <Text style={[styles.text, styles.paddingAuxiliarTop]}>
                        {contenido.text5}
                    </Text>
                    <Text style={[styles.text]}>
                        <Text style={[styles.subtitle]}>www.bancoomeva.com.co</Text>, {contenido.text6}
                    </Text>
                </View>

                {/* Información Sobre Seguro de Depósitos */}
                <View style={styles.backg}>
                    <Text style={[styles.subtitle, styles.sectionBot]}>Información sobre Seguro de Depósitos</Text>
                </View>
                <View style={[styles.sectionBot]}>
                    <Text style={[styles.text]}>
                        {contenido.text7}
                    </Text>
                </View>
            </View>
            {/* Logo Anverso */}
            <View>
                {contenido.anverso && <Image src={contenido.anverso} style={styles.logoAnverso} />}
            </View>
            <View>
                {contenido.vigilado && <Image src={contenido.vigilado} style={styles.logoVigilado} />}
            </View>
        </Page>

        <Page size="LETTER" style={styles.page}>
            {/* Firmas */}
            <View style={styles.pageDos}>
                <View style={styles.signatureRow}>
                    <View style={styles.signatureBlock}>
                        <Text style={[styles.text]}>________________________________________</Text>
                        <Text style={[styles.paddingAuxiliarTop, styles.label]}>Firma Cliente:</Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Nombre:</Text></Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Numero de Identificación:</Text></Text>
                    </View>
                    <View style={styles.signatureBlock}>
                        <Text style={[styles.text]}>________________________________________</Text>
                        <Text style={[styles.paddingAuxiliarTop, styles.label]}>Firma Cliente:</Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Nombre:</Text></Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Numero de Identificación:</Text></Text>
                    </View>
                </View>

                <View style={styles.signatureRow}>
                    <View style={styles.signatureBlock}>
                        <Text style={[styles.text]}>________________________________________</Text>
                        <Text style={[styles.paddingAuxiliarTop, styles.label]}>Firma Cliente:</Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Nombre:</Text></Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Numero de Identificación:</Text></Text>
                    </View>
                    <View style={styles.signatureBlock}>
                        <Text style={[styles.text]}>________________________________________</Text>
                        <Text style={[styles.paddingAuxiliarTop, styles.label]}>Firma Colaborador:</Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Nombre:</Text></Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Usuario:</Text></Text>
                    </View>
                </View>

                {/* {Array.isArray(firmas.extra) && agruparDeADos(firmas.extra).map((fila, index) => (
                <View key={index} style={styles.signatureRow}>
                    {fila.map((firma, subIndex) => (
                        <View key={subIndex} style={styles.signatureBlock}>
                            <Text style={styles.text}>________________________________________</Text>
                            <Text style={styles.label}>Firma Cliente:</Text>
                            <Text style={styles.field}>
                                <Text style={styles.label}>Nombre:</Text> {firma.nombreCliente ?? ''}
                            </Text>
                            <Text style={styles.field}>
                                <Text style={styles.label}>Número de Identificación:</Text> {firma.numeroDocumento ?? ''}
                            </Text>
                        </View>
                    ))}
                    {fila.length === 1 && <View style={styles.signatureBlock} />} {/Bloque vacío si la fila está incompleta/}
                </View>
                ))} */}
                <View>
                    {contenido.fogafin && (<Image src={contenido.fogafin} style={styles.fogafin} />)}
                </View>
                <View style={[{ height: '300' }]}></View>
            </View>

            {/* Logos al pie */}
            <View>
                {contenido.vigilado && <Image src={contenido.vigilado} style={styles.logoVigiladoDos} />}
            </View>
            <View>
                {contenido.reverso && (<Image src={contenido.reverso} style={styles.logoAnverso} />)}
            </View>
        </Page>
    </Document>
);

export default CuentaPDF;