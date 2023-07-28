import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const res = await axios.post("/api/services/login", credentials);
    if(res.status === 200){
      router.push('/votacion');
    }

  };
  return (
    <div>
      <form>
        <input
          name="username"
          type="text"
          placeholder="text"
          onChange={handleChange}
          value={credentials.username}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}
