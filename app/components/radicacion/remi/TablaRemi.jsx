'use client'

import { DataContext } from "@/app/provider/Providers"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { FaFileUpload } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { upFileRemi } from '@/app/lib/admin/remi/fn_upFileRemi';
import { readFileRemi } from '@/app/lib/admin/remi/fn_readFileRemi';
import { rmFile } from '@/app/lib/admin/remi/fn_cleanDirectory';
import { queryDataRemi } from '@/app/lib/admin/remi/fn_queryDataRemi';
import Loading from "../../share/Loading";

const dataApi = [{}];

const TablaRemi = ({ searchParams, rolActivo }) => {

    const [showLoading, setShowLoading] = useState(false)

    const valorConsulta = searchParams?.q || ''

    const router = useRouter()
    const [data, setData] = useState(dataApi)
    const { updateDataRemi } = useContext(DataContext)

    useEffect(() => {
        qrDataRemi()
    }, []);

    const enviarMccConsulta = (valoresRemi) => {

        if (rolActivo !== 1) {
            let nuevaData = { ...valoresRemi }
            delete nuevaData['id']
            delete nuevaData['actividadeconomica']
            const list = Object.values(nuevaData)
            updateDataRemi(list)

            router.push("/radicacion/convenioServicios/convenioRecaudo")
        }
    };

    // filtrar data
    const filtrardData = data.filter((item) => {
        const values = Object.values(item);
        return values.some((value) =>
            value.toString().toLowerCase().includes(valorConsulta.toLowerCase())
        );
    });

    // cargar archivo csv
    const onChangeFileCsv = async (e) => {
        const formData = new FormData()
        formData.append("csv", e.target.files[0])
        const typeFile = formData.get('csv');

        if (typeFile.type === 'text/csv') {
            setData([{}]);
            let response = JSON.parse(await upFileRemi(formData));
            if (response.status === 200) {
                await readFileCsv(response.path, response.dirPath);
                formData.delete("csv");
                document.getElementById("csv").value = "";
            } else {
                console.log(response.message);
            };
        } else {
            console.log('Solo se admiten archivos con extensión .csv')
        };
    };

    // leer el archivo
    const readFileCsv = async (pathFile, dirPath) => {
        let response = JSON.parse(await readFileRemi(pathFile));
        if (response.status === 200) {
            await rmFilCsv(dirPath);
            setData(JSON.parse(response.value));
        } else {
            // console.log(response.message);
        };
    };

    // limpiar el dirrectorio
    const rmFilCsv = async (pathDir) => {
        await rmFile(pathDir);
    };

    // actualizar vista de datos
    const qrDataRemi = async () => {
        setData([{}]);
        setShowLoading(true)
        let response = await queryDataRemi();
        setShowLoading(false)
        let parserRes = JSON.parse(JSON.parse(response)?.DATA[0].contenidoRemi);
        setData(parserRes);
    };

    return (
        <div className='w-full'>
            {
                showLoading && <Loading />
            }

            {
                rolActivo !== 1 ? undefined :
                    <div className="flex justify-end">
                        <div className='flex justify-between' style={{ height: '5rem', width: '6%' }}>
                            <RxUpdate style={{ fontSize: '2.2rem', color: '#1f3b61', cursor: 'pointer' }} title="Actualizar Tabla" onClick={qrDataRemi} />
                            <label htmlFor="csv" title="Subir nuevo CSV">
                                <FaFileUpload style={{ fontSize: '2.2rem', color: '#1f3b61', cursor: 'pointer' }} />
                            </label>
                            <input
                                className='hidden'
                                type="file"
                                accept='csv'
                                name='csv'
                                id='csv'
                                onChange={onChangeFileCsv}
                            />
                        </div>
                    </div>
            }

            <div className='max-h-[535px] overflow-y-auto'>
                <table className='w-full'>
                    <thead className='text-sm'>
                        <tr>
                            <th className="text-center" >MCC</th>
                            <th className="text-center" >ACTIVIDAD ECONOMICA</th>
                            <th className="text-center" >Crédito Visa</th>
                            <th className="text-center" >Débito Visa</th>
                            <th className="text-center" >Débito Electron</th>
                            <th className="text-center" >Débito Mastercard</th>
                            <th className="text-center" >Crédito Mastercard</th>
                            <th className="text-center" >Débito Maestro</th>
                        </tr>
                    </thead>
                    <tbody className='font-normal'>
                        {
                            filtrardData.map((val, i) => (
                                <tr key={val.id} onClick={() => enviarMccConsulta(val)} className={`cursor-pointer text-right h-[35px] ${i % 2 !== 0 && "bg-gray-200 "} `}>
                                    <td className="text-start">{val.mcc}</td>
                                    <td className='text-start pl-2'>{val.actividadeconomica}</td>
                                    <td className="text-center" >{val.créditovisa}</td>
                                    <td className="text-center" >{val.débitovisa}</td>
                                    <td className="text-center" >{val.débitoelectron}</td>
                                    <td className="text-center" >{val.débitomastercard}</td>
                                    <td className="text-center" >{val.créditomastercard}</td>
                                    <td className='pr-4 text-center'>{val.débitomaestro}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablaRemi