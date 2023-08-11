import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Verify from "@/ldavis/components/Verify";
import Link from "next/link";
export default function Layout({ children, pagina ,time = 10}) {
  const router = useRouter();
  const [username, setUsername] = useState(0);
  const [isOpen,setIsOpen] = useState(false)
  useEffect(() => {
    try{
      getProfile();

    } catch (error){
      console.log(error)
    }
  }, []);
  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setUsername(res.data.username);
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

  return (
      <div className="bg-light">
        {username ? (
            <div className="container p-4">
              <div className="bg-warning p-3 mb-3 rounded d-flex justify-content-between align-items-center">
                <div>
                  <span className="home-link">
                <Link href="/">Home</Link>
              </span>
                  <Head>
                    <title>{pagina}</title>
                  </Head>
                  <div className="fs-4 text-secondary">{username}</div>
                </div>
                <div>
                  <Verify
                      isOpen={isOpen}
                      onRequestClose={() => setIsOpen(false)}
                      onConfirm={logout}
                      text={"Estas seguro de cerrar sesión?"}
                  />
                  <button onClick={() => setIsOpen(true)} className="btn btn-danger ms-2">Logout</button>
                </div>
              </div>
              {children}
              <div className="bg-warning p-3 mb-3 rounded d-flex justify-content-between align-items-center">
                <h1>Footer</h1>
              </div>
            </div>
        ) : null}
      </div>
  );
}
