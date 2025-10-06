import React from 'react'

export const Firmas = ({ View, Text, campoAdicionalesModal, diaLetras, dia, mes, yyy, tecnioOperador, clientModal }) => {
    return (
        <View wrap={false}>
            <View style={{ borderWidth: "1px", borderColor: "black", padding: "2px 0px" }}>
                <View style={{ marginTop: "2px", display: "flex", flexDirection: "row", fontSize: "8px", alignItems: "center", gap: 6 }}>

                    <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                        <Text>Para constancia se firma en la ciudad de</Text>
                        <View style={{ width: "140rem", textAlign: "center", borderBottomWidth: "1px", borderColor: "black" }}>
                            <Text >{campoAdicionalesModal?.ciudadFirma || '¨'}</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                        <Text>, a los</Text>
                        <View style={{ width: "80rem", textAlign: "center" }}>
                            <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}>{diaLetras[dia]}</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                        <Text>{`( ${dia}  ) días del mes `}</Text>
                        <View style={{ width: "30rem", textAlign: "center" }}>
                            <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}>{mes}</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", }}>
                        <Text>de</Text>
                        <View style={{ width: "30rem", textAlign: "center" }}>
                            <Text style={{ borderBottomWidth: "1px", borderColor: "black" }}>{yyy}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ borderWidth: "1px", borderColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-around", borderWidth: "1px", borderColor: "black", padding: "0px 0px" }}>
                <View style={{ width: "50%", padding: "2px 40px", borderRightWidth: "1px", borderColor: "black" }}>
                    <Text style={{ fontSize: "8px", fontWeight: "bold" }} >El BANCO</Text>
                    <Text style={{ fontSize: "8px", fontWeight: "inherit", margin: "68px 0px 5px 0px", borderTopWidth: "1px", borderColor: "black" }}>Firma Representante Legal</Text>
                    {/* <Text style={{ margin: "50px 0px", borderTopWidth: "1px", borderColor: "black" }}>Firma Representante Legal</Text> */}


                    <View style={{ display: "flex", flexDirection: "row", gap: "28px", fontSize: "8px", fontWeight: "inherit", padding: "10px 0px" }}>
                        <Text style={{ fontSize: "8px", fontWeight: "inherit", }}>Nombre</Text>
                        <Text style={{ fontSize: "8px", fontWeight: "inherit", borderBottomWidth: "1px", borderColor: "black", width: "70%", textAlign: "center" }}>{tecnioOperador?.representado}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: "40px", fontSize: "8px", fontWeight: "inherit", paddingBottom: "5px" }}>
                        <Text>CC No</Text>
                        <Text style={{ borderBottomWidth: "1px", borderColor: "black", width: "70%", textAlign: "center" }}>{tecnioOperador?.identificacion}</Text>
                    </View>
                </View>
                <View style={{ width: "50%", padding: "2px 40px" }}>
                    <View>
                        <Text style={{ fontSize: "8px", fontWeight: "bold", marginBottom: "6px" }}>LA EMPRESA</Text>
                        <Text style={{ fontSize: "8px", fontWeight: "inherit" }}>
                            En mi calidad de Representante Legal y/o Funcionario Responsable, declaró que la información suministrada es veraz y que a futuro cualquier cambio en la información procederé a comunicar por escrito a Bancoomeva:
                        </Text>

                        <Text style={{ fontSize: "8px", fontWeight: "inherit", margin: "28px 0px 5px 0px", borderTopWidth: "1px", borderColor: "black" }}>Firma Representante Legal</Text>

                        <View style={{ fontSize: "8px", fontWeight: "inherit", display: "flex", flexDirection: "row", gap: "28px", padding: "10px 0px" }}>
                            <Text>Nombre</Text>
                            <Text style={{ borderBottomWidth: "1px", borderColor: "black", width: "70%", textAlign: "center" }}>{clientModal?.representadoPorCli || ''}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", gap: "40px", paddingBottom: "5px" }}>
                            <Text style={{ fontSize: "8px", fontWeight: "inherit", }}>CC No</Text>
                            <Text style={{ fontSize: "8px", fontWeight: "inherit", borderBottomWidth: "1px", borderColor: "black", width: "70%", textAlign: "center" }}>{clientModal?.identificacionCli || ''}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: "15px 40px", fontSize: "8px", margin: "0px 0px", borderWidth: "1px", borderColor: "black", }}>
                <Text>
                    FIDUCIARIA
                </Text>
                <Text>* Aplica para los convenios con municipios</Text>

                <Text style={{ margin: "25px 0px 15px 0px", width: "350rem", borderTopWidth: "1px", borderColor: "black" }}>Firma Representante de la Fiducia</Text>

                <View style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                    <Text>Nombre</Text>
                    <Text style={{ color: "red" }}>{campoAdicionalesModal?.nombreGerente}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginTop: "6px", gap: "30px" }}>
                    <Text>CC No</Text>
                    <Text style={{ color: "red" }}>{campoAdicionalesModal?.cedulaGerente}</Text>
                </View>

            </View>
            <Text style={{ margin: "0px 10px", fontSize: "8px" }}>SF-FT-967/V20</Text>
        </View>
    )
}
