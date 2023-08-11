import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Verify from "@/ldavis/Componentes/Verify";
import Link from "next/link";

export default function Layout({ children, pagina ,time = 10}) {
  const router = useRouter();
  const [username, setUsername] = useState(0);
  const [isOpen,setIsOpen] = useState(false)
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setUsername(res.data.username);
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

  return (
      <div>
        <h1>Header</h1>
        <Head>
          <title>{pagina}</title>
        </Head>
        <div>
          <div>Username: {username}</div>
        </div>
          <Verify
              isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
              onConfirm={logout}
              text={"Estas seguro de cerrar sesion?"}
          />
        <button onClick={() => {
            setIsOpen(true)
        }}>Logout</button>
        {children}
          <h1>Footer</h1>
      </div>
  );
}
