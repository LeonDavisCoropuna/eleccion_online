import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
export default function IndexPage() {
  const [candidatos, setCandidatos] = useState([]);
  useEffect(() => {
    getCandidatos();
  }, []);

  const getCandidatos = async () => {
    const res = await axios.get("/api/candidate/");
    //const data = res.data.sort((a, b) => a._nombre_partido.localeCompare(b._nombre_partido));
    setCandidatos(res.data);
  };

  return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <div className="container mt-5">
          <div>Bienvenido</div>
          {candidatos.length > 0 ? (
              <table className="table mt-4">
                <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cargo</th>
                  <th>Partido</th>
                  <th>Logo</th>
                </tr>
                </thead>
                <tbody>
                {candidatos.map((e, index) => {
                  if (e._politicalParty !== 'Nulo' && e._job == "Presidente")
                    return (
                        <tr key={e._id}>
                          <td>{e._name}</td>
                          <td>{e._lastName}</td>
                          <td>{e._job}</td>
                          <td>{e._politicalParty}</td>
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
          <div className="mt-3">
              <div><Link href="/resultado">Ver resultados (Solo administradores)</Link></div>
              <div><Link href="/votacion">Votar (solo electores)</Link></div>
          </div>
        </div>
      </>
  );
}
