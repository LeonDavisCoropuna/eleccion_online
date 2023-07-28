import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head"
export default function Dashboard({children,pagina}) {
  const [user, setUser] = useState({
    username: "",
    admin: 0,
  });
  useEffect(() => {
    getProfile();
  },[])
  const router = useRouter();
  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setUser(res.data);
    console.log(res);
  };
  const logout = async () => {
    try{
      const res = await axios.post('api/auth/logout');
      router.push('/');
    }catch (err){
      console.log(err)
      router.push('/');
    }
  }
  return (
    <div>
      <h1>Header</h1>
      <Head  >
        <title>{pagina}</title>
      </Head>
        <div>
          <div>{user.username}</div>
        </div>
        <button onClick={() => logout()}>Logout</button>
        {children}
    </div>
  );
}