'use client'


const InformacionCliente = ({ View, Text, data,clienteFiducia,fecha,clienteModal,fechaDuracion }) => {


    return (
        <View style={{ fontSize: 8 }}>
            <Text style={{ color: "white", textAlign: "center", backgroundColor: "#FF6B19", marginTop: "3px", fontSize: 8, padding: "4px 0px" }} >2. Información de las partes del Acuerdo Técnico Operativo - Cliente</Text>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", gap: 6, marginTop: "6px", marginLeft: "4px" }} >
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Nombre:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>{data?.cliente}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>NIT.</Text>
                    <Text style={{ borderBottom: "0.5px", width: "80px", textAlign: "center" }} >{data?.numDocumento}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Representado en este acto por:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "150px", textAlign: "center" }} >
                        {clienteModal?.representadoPorCli}
                    </Text>
                </View>


            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: "6px", marginLeft: "10px" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Identificado(a) con la cedula de ciudadanía No:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>
                        {clienteModal?.identificacionCli}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 4 }}>
                    <Text>de</Text>
                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>
                        {clienteModal?.deCli}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 4 }}>
                    <Text>Tipo de cliente</Text>
                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>
                        {data?.tipoPersona}
                    </Text>
                </View>
            </View>
            <View>
                <View style={{ display: "flex", flexDirection: "row", marginLeft: "8px", gap: 4, marginTop: "6px" }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                        <Text>Quien en este instrumento obra en su calidad de:</Text>
                        <Text style={{ borderBottom: "0.5px", width: "200px", textAlign: "center" }}>
                            {/* {data?.calidadde} */}
                            {"Representante legal"}
                        </Text>
                    </View>
                </View>

            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: "2px", marginTop: "6px", marginLeft: "8px" }} >
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Dirección:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "180px", textAlign: "center" }} >
                        {clienteModal?.direccionCli}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Ciudad:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "160px", textAlign: "center" }}>
                        {clienteModal?.ciudadCli}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Código CIIU:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "100px", textAlign: "center" }}>
                        {clienteModal?.codigoCiiu}
                    </Text>
                </View>

            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 4, marginLeft: "8px", marginTop: "6px" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Correo electrónico:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "500px", textAlign: "center" }}>
                        {clienteModal?.correoCli}
                    </Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "space-between", marginLeft: "8px", marginTop: "6px" }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                        <Text>Naturaleza Jurídica:</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                        <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>
                            {clienteFiducia?.naturaleza==='1' ? "X" : null}
                        </Text>
                        <Text>Publica</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                        <Text style={{ borderBottom: "0.5px", width: "30px", textAlign: "center" }}>
                            {clienteFiducia?.naturaleza==='2' ? "X" : null}
                        </Text>
                        <Text>Privada</Text>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Duración:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>
                        {fechaDuracion}
                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "4px" }}>
                    <Text>Fecha de Inicio:</Text>
                    <Text style={{ borderBottom: "0.5px", width: "60px", textAlign: "center" }}>
                        {fecha}
                    </Text>
                </View>

            </View>

        </View>
    )
}

export default InformacionCliente