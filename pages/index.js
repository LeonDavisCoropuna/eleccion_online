import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import Head from "next/head";
import axios from "axios";

export default function IndexPage() {
  const [candidatos,setCandidatos] = useState([]);
  useEffect(() => {
    getCandidatos();
  },[])

  const getCandidatos = async () => {
    const res = await axios.get("/api/candidatos/");
    console.log(res.data[0]);
    setCandidatos(res.data[0]);
    // Obtener el primer elemento del array que contiene los datos de los partidos políticos y candidatos
  }
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <div>Bienvenido</div>
    <div>
      {candidatos.length > 0 ? (
          <table>
            <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cargo</th>
              <th>Partido</th>
            </tr>
            </thead>
            <tbody>
            {candidatos.map((e,index) => {
              if(e.nombre_partido !== "Nulo") return (
                  <tr key={index}>
                    <td>{e.nombre}</td>
                    <td>{e.apellido}</td>
                    <td>{e.cargo}</td>
                    <td>{e.nombre_partido}</td>
                  </tr>
              )
            }
            )}
            </tbody>
          </table>
      ) : (
          <div>Vacio</div>
      )}
      <Link href='/login'>Iniciar sesion</Link>
      <Link href='/new'>Registrarse</Link>
    </div>
    </>
  )
}
