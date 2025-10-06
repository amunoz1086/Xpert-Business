self.onmessage = async function (e) {
    const { customerReferences } = e.data;
    const rawCustomerReferences = JSON.parse(customerReferences)

    try {

        const validDetallesParticipantes = {
            "beneficiario": []
        };

        //beneficiario
        if (rawCustomerReferences.beneficiario.length > 0) {
            let contRepre = 0;
            for (let i of rawCustomerReferences.beneficiario) {

                let reqData = {
                    "customerReference": i.CustomerReference,
                    "customerType": 'PJ'
                };

                const res = await fetch('/api/detailedLotParticipants', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reqData })
                });

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text}`);
                }

                const rawReq = await res.json();
                const rawStatus = JSON.parse(rawReq.rawData);
                const parsedStatus = JSON.parse(rawStatus);

                if (+parsedStatus.status === 200) {
                    const reqParsed = {
                        "tipo": 'PJ',
                        "data": parsedStatus.data
                    };

                    const resParsed = await fetch('/api/parsedDetailedLotParticipants', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ reqParsed })
                    });

                    if (!resParsed.ok) {
                        const text = await resParsed.text();
                        throw new Error(`HTTP ${resParsed.status}: ${text}`);
                    }

                    contRepre++;
                    const json = await resParsed.json();
                    validDetallesParticipantes.beneficiario.push(JSON.parse(json.resultados));

                } else {
                    reqData.customerType = 'PN';
                    //Consultando Participante Juridico
                    const res = await fetch('/api/detailedLotParticipants', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ reqData })
                    });

                    if (!res.ok) {
                        const text = await res.text();
                        throw new Error(`HTTP ${res.status}: ${text}`);
                    }

                    const rawReq = await res.json();
                    const rawStatus = JSON.parse(rawReq.rawData);
                    const parsedStatus = JSON.parse(rawStatus);

                    if (+parsedStatus.status === 200) {
                        const reqParsed = {
                            "tipo": 'PN',
                            "data": parsedStatus.data
                        };

                        const resParsed = await fetch('/api/parsedDetailedLotParticipants', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ reqParsed })
                        });

                        if (!resParsed.ok) {
                            const text = await resParsed.text();
                            throw new Error(`HTTP ${resParsed.status}: ${text}`);
                        }

                        contRepre++;
                        const json = await resParsed.json();
                        validDetallesParticipantes.beneficiario.push(JSON.parse(json.resultados));

                    } else {
                        contRepre++;
                    }
                }

                if (contRepre === rawCustomerReferences.beneficiario.length) {
                    break;
                };
            };
        };

        const rawJson = JSON.stringify(validDetallesParticipantes);
        self.postMessage({ data: rawJson });

    } catch (err) {
        self.postMessage({ error: err.message });
    }
};