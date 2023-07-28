import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../Componentes/Header";
export default function Votacion() {
  const [tableCandidatos,setTablaCandidatos] = useState([]);
  useEffect(() => {
    handleCandidatos();
  },[])
  const handleCandidatos = async () =>{
    const res = await axios.get("/api/candidatos");
    setTablaCandidatos(res.data);
  }
  return (
    <div>
      <Header pagina={"Votacion"}>
        <div>
          {tableCandidatos.length > 0 ?  (<table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
            {tableCandidatos.map((e) => (
              <tr key={e.username}>
                <td>{e.username}</td>
                <td>{e.password}</td>
              </tr>
            ))}
          </tbody>
          </table>) : (<div>Vacio</div>)}        
        </div>
      </Header>
      
    </div>
  );
}
