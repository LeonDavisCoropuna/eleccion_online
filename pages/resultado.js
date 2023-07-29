import Layout from "@/ldavis/Componentes/Layout";
import ResultadoEleccion from "@/ldavis/Data/Repositorio/ResultadoEleccion";
import React, {useEffect, useState} from "react";
export default function Resultado(){
    useEffect(()=>{
        getResultados();
    },[])
    const [resultado,setResultado] = useState([])
    const getResultados = async () => {
        const res = await ResultadoEleccion.getResultados();
        console.log(res.data)
        setResultado(res.data[0]);
    }
    return (
        <Layout pagina="Resultado">
            {resultado.length > 0 ? (
                <table className="table mt-4">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Partido</th>
                        <th>Presidente</th>
                        <th>Nro_Votos</th>
                        <th>Logo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resultado.map((e, index) => {
                            return (
                                <tr key={e.id_partido}>
                                    <td>{e.id_partido}</td>
                                    <td>{e.nombre_partido}</td>
                                    <td>{e.nombre + " " + e.apellido}</td>
                                    <td>{e.nro_votos}</td>
                                    <td>
                                        <img
                                            src={'/partidos/' + e.nombre_partido + '.png'}
                                            alt={'Cargando'}
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    </td>
                                </tr>
                            );
                    })}
                    </tbody>
                </table>
            ) : (
                <div>Vacio</div>
            )}
        </Layout>
    )
}