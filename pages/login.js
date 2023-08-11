import React, {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";
export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [login,setLogin] = useState(1);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
//Enviar por axios un objeto a api/authentication/login para autenticar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/authentication/login",credentials);
      console.log(res)
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
    } catch (e){
      setLogin(0);
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
          {login === 1 ? (<div></div>) : (<div className="text-danger">Contraseña o usuario incorrecta</div>)}
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <Link href={"/"}>Home</Link>
      </div>
  );
}
