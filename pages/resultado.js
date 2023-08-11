import Layout from "@/ldavis/components/Layout";
import axios from "axios";
import React, {useEffect, useState} from "react";
export default function Resultado(){
    useEffect(()=>{
        getResultados();
    },[])
    const [resultado,setResultado] = useState([])
    const getResultados = async () => {
        const res = await axios.get("/api/result");
        setResultado(res.data);
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
                                <tr key={e._id}>
                                    <td>{e._id}</td>
                                    <td>{e._politicalParty}</td>
                                    <td>{e._president}</td>
                                    <td>{e._numVotes}</td>
                                    <td>
                                        <img
                                            src={'/partidos/' + e._politicalParty + '.png'}
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