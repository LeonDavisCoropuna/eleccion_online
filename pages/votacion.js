import React, { useEffect, useState } from "react";
import axios from "axios";
import Time from "@/ldavis/components/Time";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/ldavis/components/Layout";
import Verify from "@/ldavis/components/Verify";
import Success from "@/ldavis/components/Success";

export default function Votacion() {
  const [partidos, setPartidos] = useState([]);
  const [isOpen,setIsOpen] = useState(false)
  const [isSuccess,setIsSuccess] = useState(false)
  const [success,setSuccess] = useState(false)
  const [vote,setVote] = useState({
    idElector:0,
    idPoliticalParty:0,
    date:new Date(),
  })
  const router = useRouter();

  useEffect(() => {
    handleCandidatos();
    getProfile();
  }, []);

  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setVote({
      ...vote,
      idElector: res.data.id,
    })
  };
  const logout = async () => {
    try {
      const res = await axios.post("api/authentication/logout");
      router.push("/");
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };
  const handleCandidatos = async () => {
    const res = await axios.get("/api/voteElector/politicalParty");
    setPartidos(res.data);
  };
  const handleSubmit = async (e) => {
    if (vote.idPoliticalParty) {
      try {
        const res = await axios.post("/api/voteElector/vote",vote);
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
                          <td>{e._id}</td>
                          <td>{e._politicalParty}</td>
                          <td>
                            <img
                                src={"/partidos/" + e._politicalParty + ".png"}
                                alt={"Cargando"}
                                style={{ width: "100px", height: "100px" }}
                            />
                          </td>
                          <td>
                            <input
                                type="radio"
                                name="partido"
                                value={e._id}
                                onChange={() =>
                                    setVote({ ...vote, idPoliticalParty: e._id })
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
                      text={"Estas seguro de tu vote?"}
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
