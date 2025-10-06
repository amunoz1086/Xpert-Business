'use client'
const TecnicoOperativo = ({ View, Text, data }) => {

   
    return (
        <View style={{ fontSize: 8, fontWeight: "normal" }} id='infoBanco'>
            <Text style={{ backgroundColor: "#FF6B19", textAlign: "center", color: "white", marginTop: "10px", padding: "3px 0px 3px 0px" }}>1. Información de las partes del Acuerdo Técnico Operativo - Banco</Text>
            <View style={{ display: "flex", flexDirection: "row", marginTop: "6px", justifyContent: "space-evenly" }} >
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <Text style={{ fontWeight: "bold", fontSize: "9" }}>Nombre:</Text>
                    <Text>Bancoomeva</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <Text>Nit.</Text>
                    <Text>900.406.150-5</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <Text>Representado por:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "160px", textAlign: "center" }}>
                        {data?.representado}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <Text>Mayor de edad y vecino(a) de:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }}>
                        {data?.amyorEdadVencino}
                    </Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 2, marginTop: "5px", marginLeft: "8px" }} >
                <View style={{ display: "flex", flexDirection: "row", gap: 4, justifyContent: "center" }}>
                    <Text>Identificado(a) con la cedula de ciudadanía No:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "160px", textAlign: "center" }}>
                        {data?.identificacion}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 2 }} >
                    <Text>de</Text>
                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>
                        {data?.de}
                    </Text>
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 2, marginLeft: "8px", marginTop: "5px" }} >
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 4 }} >
                    <Text>Quien en este instrumento obra en su calidad de:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>
                        {/* {data?.intrumentoCalidad} */}
                        {"Representante legal"}
                    </Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 2, marginLeft: "8px", marginTop: "5px" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 4 }}>
                    <Text>Dirección:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>
                        {data?.direccion}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 4 }}>
                    <Text>Ciudad:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>
                        {data?.ciudad}
                    </Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 2, marginLeft: "6px", marginTop: "5px" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 4 }}>
                    <Text>Correo electrónico:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "87%", textAlign: "center" }}>
                        {data?.correo}
                    </Text>
                </View>

            </View>
        </View>
    )
}

export default TecnicoOperativo