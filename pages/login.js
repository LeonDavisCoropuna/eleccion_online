import React, { useState} from 'react';
import { useRouter } from 'next/router';
import UserRepository from "@/ldavis/Data/Repositorio/UserRepository";
export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
//Enviar por axios un objeto a api/services/login para autenticar
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UserRepository.getUsers(credentials);
    try{
        if (res.status === 200) {
          if (res.data.userType === 1) {
            router.push("/votacion")
          } else if (res.data.userType === 2) {
            router.push("/resultado")
          }
          else{
            router.push("/")
          }
        }
    } catch (error){
      console.log(error);
    }
  }
  return (
      <div className="container mt-5">
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                name="username"
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={credentials.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
                value={credentials.password}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
  );
}
