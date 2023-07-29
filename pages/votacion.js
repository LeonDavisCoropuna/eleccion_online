import React, { useEffect, useState } from "react";
import axios from "axios";
import Time from "@/ldavis/Componentes/Time";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../Componentes/Layout";
import PartidosPoliticos from "@/ldavis/Data/Repositorio/PartidosPoliticos";
import Verify from "@/ldavis/Componentes/Verify";
import SendVoto from "@/ldavis/Data/Repositorio/SendVoto";
import Success from "@/ldavis/Componentes/Success";

export default function Votacion() {
  const [partidos, setPartidos] = useState([]);
  const [isOpen,setIsOpen] = useState(false)
  const [isSuccess,setIsSuccess] = useState(false)
  const [success,setSuccess] = useState(false)
  const [voto,setVoto] = useState({
    id_elector:0,
    id_partido:0,
    fecha:new Date(),
  })
  const router = useRouter();

  useEffect(() => {
    handleCandidatos();
    getProfile();
  }, []);
  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setVoto({
      ...voto,
      id_elector: res.data.id,
    })
  };
  const logout = async () => {
    try {
      const res = await axios.post("api/auth/logout");
      router.push("/");
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };
  const handleCandidatos = async () => {
    const res = await PartidosPoliticos.getPartidos();
    setPartidos(res.data);
  };

  const handleSubmit = async (e) => {
    if (voto.id_partido) {
      console.log("Partido seleccionado:", voto.id_partido);
      try {
        const res = await SendVoto.Sufragar(voto);

        // La petición fue exitosa
        if (res.status === 200) {
          setSuccess(true);

        }
      } catch (error) {
        // Si ocurre un error en la petición (por ejemplo, status 401)
        // puedes acceder a la respuesta usando error.response
        if (error.response && error.response.status === 401) {
          console.log("Error: Usuario ya votó");
        } else {
          console.log("Error en la petición:", error);
        }
        setSuccess(false);

      }
    } else {
      console.log("Debes seleccionar un partido antes de votar");
    }
    setIsOpen(false);
    setIsSuccess(true)

  };return (
      <div>
        <Layout pagina={"Votacion"}>
          <Time time={10} />
          <div>
            {partidos.length > 0 ? (
                <form>
                  <table>
                    <thead>
                    <tr>
                      <th>id</th>
                      <th>Partido</th>
                      <th>Logo</th>
                      <th>Seleccionar</th> {/* Nueva columna para los radio buttons */}
                    </tr>
                    </thead>
                    <tbody>
                    {partidos.map((e) => (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.partido}</td>
                          <td>
                            <img
                                src={"/partidos/" + e.partido + ".png"}
                                alt={"Cargando"}
                                style={{ width: "100px", height: "100px" }}
                            />
                          </td>
                          <td>
                            <input
                                type="radio"
                                name="partido"
                                value={e.id}
                                onChange={() =>
                                    setVoto({ ...voto, id_partido: e.id })
                                }
                            />
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                  <Success
                      show={isSuccess}
                      handleClose={logout}
                      isSuccess={success}
                  />
                  <Verify
                      isOpen={isOpen}
                      onRequestClose={() => setIsOpen(false)}
                      onConfirm={handleSubmit}
                      text={"Estas seguro de tu voto?"}
                  />
                  <button onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}>Votar</button>
                </form>
            ) : (
                <div>Vacio</div>
            )}
          </div>
        </Layout>
      </div>
  );
}
