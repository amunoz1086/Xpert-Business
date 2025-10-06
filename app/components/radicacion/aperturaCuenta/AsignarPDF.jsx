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
    borde: {
        marginTop: 20,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 1,
    },
    bordeInternoVertical: {
        borderLeft: '1 solid #196b24',
    },
    sectionTop: {
        padding: 7,
    },
    sectionBot: {
        padding: 7,
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
        marginBottom: 10
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
        marginTop: 10,
        paddingTop: 5,
        marginBottom: 5,
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
        bottom: 200,
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
        left: 370,
        bottom: 50,
        width: 140,
        height: 50
    }
});


const AsignarPDF = ({
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
                    <View style={[styles.row]}>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}></Text>  </Text>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}></Text>  </Text>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Oficina:</Text> {datosCuenta.oficina}</Text>
                    </View>
                    <Text style={styles.title}>Apertura de Producto de plan de ahorros programado</Text>
                </View>

                {/* Campos Descriptivos */}
                <View style={styles.sectionTop}>
                    <View style={[styles.row, styles.paddingAuxiliarTop]}>
                        <Text style={[styles.fieldCenter]}><Text style={styles.label}>No. del producto:</Text> {datosCuenta.numero}</Text>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Fecha apertura:</Text> {datosCuenta.fecha}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Titular:</Text> {cliente.nombre}</Text>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Identificación:</Text> {cliente.identificacion}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Valor mensual:</Text> {datosCuenta.valorMensual}</Text>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Plazo:</Text> {datosCuenta.plazo}</Text>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={[styles.field, styles.halfField]}><Text style={styles.label}>Fecha de facturación:</Text> {datosCuenta.fechaFacturacion}</Text>
                    </View>
                </View>

                {/* Declaración Voluntaria */}
                <View style={styles.sectionBot}>
                    <Text style={styles.subtitle}>Declaración Voluntaria de Origen de Fondos</Text>
                    <Text style={[styles.field, styles.paddingAuxiliarTop]}><Text style={styles.text}>Yo,</Text>  {cliente.nombre}  <Text style={[styles.text]}>identificado con el documento de identidad</Text>
                        <Text style={styles.text}>  No.</Text>  {cliente.identificacion}  <Text style={[styles.text]}>expedida en</Text>  {cliente.ciudad}  <Text style={[styles.text]}>{contenido.text1}</Text>
                    </Text>
                    <Text style={[styles.field, styles.paddingAuxiliarTop]}><Text style={styles.text}>{contenido.text2}</Text>  {cliente.recursos && cliente.recursos.trim() !== "" ? (
                        <Text style={[styles.field]}>{cliente.recursos}. </Text>
                    ) : (
                        <Text style={[styles.text]}>_____________________________________________________________________. </Text>
                    )}
                        <Text style={[styles.text]}>{contenido.text3}</Text>
                    </Text>

                    {/* Reglamento */}
                    <Text style={[styles.subtitle, styles.paddingAuxiliarTop]}>Reglamento de Productos</Text>
                    <Text style={[styles.text, styles.paddingAuxiliarTop]}>
                        {contenido.text4}
                    </Text>

                    {/* Información Sobre Seguro de Depósitos */}
                    <Text style={[styles.subtitle, styles.paddingAuxiliarTop]}>Información sobre Seguro de Depósitos</Text>
                    <Text style={[styles.text, styles.paddingAuxiliarTop]}>
                        {contenido.text5} <Text style={[styles.subtitle]}>www.bancoomeva.com.co</Text>.
                    </Text>
                </View>
                {/* Firmas */}
                <View style={styles.signatureRow}>
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
                        <Text style={[styles.paddingAuxiliarTop, styles.label]}>Firma Colaborador responsable:</Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Nombre:</Text></Text>
                        <Text style={[styles.field]}><Text style={styles.label}>Usuario:</Text></Text>
                    </View>
                </View>
                {/* Logo Anverso */}
                <View>
                    <Text style={[styles.text]}>{contenido.text6}</Text>
                </View>
                {/* Logo Fogafín */}
                <View>
                    {contenido.fogafin && (<Image src={contenido.fogafin} style={styles.fogafin} />)}
                </View>
            </View>
            {/* Logo Vigilados */}
            <View>
                {contenido.vigilado && <Image src={contenido.vigilado} style={styles.logoVigiladoDos} />}
            </View>
        </Page>
    </Document>
);

export default AsignarPDF;