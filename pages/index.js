import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import UserRepository from "@/ldavis/Data/Repositorio/UserRepository";
export default function IndexPage() {
  const [candidatos, setCandidatos] = useState([]);
  useEffect(() => {
    getCandidatos();
  }, []);

  const getCandidatos = async () => {
    const res = await axios.get('/api/candidatos/');
    const data = res.data[0].sort((a, b) => a.nombre_partido.localeCompare(b.nombre_partido));
    setCandidatos(data);
    // Obtener el primer elemento del array que contiene los datos de los partidos políticos y candidatos
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
                  if (e.nombre_partido !== 'Nulo' && e.cargo == "Presidente")
                    return (
                        <tr key={index}>
                          <td>{e.nombre}</td>
                          <td>{e.apellido}</td>
                          <td>{e.cargo}</td>
                          <td>{e.nombre_partido}</td>
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
          <div className="mt-3">
            <Link href="/login">Iniciar sesion</Link>
          </div>
          <div>
            <Link href="/new">Registrarse</Link>
          </div>
        </div>
      </>
  );
}
