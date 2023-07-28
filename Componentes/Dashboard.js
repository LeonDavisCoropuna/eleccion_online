import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Dashboard({children}) {
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
      <h1>Dasbord</h1>
      <pre>
        <div>
          <div>{user.username}</div>
        </div>
      </pre>
      <button onClick={() => logout()}>Logout</button>
      {children}
    </div>
  );
}