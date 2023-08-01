# Estilos de Programación

## 1. Hooks
Los **hooks** son una característica importante de React que permite usar el estado y otras características de React en componentes funcionales sin tener que escribir clases. En Next.js, también puedes usar hooks para mantener el estado y la lógica del componente.

### /login

```javascript
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
```
### 2. Composición de Componentes
Next.js promueve la composición de **componentes**, lo que permite construir componentes más complejos a partir de componentes más pequeños y **reutilizables**.

### /Componentes/Layout.js
```javascript
return (
  <div>
    <h1>Header</h1>
    <Head>
      <title>{pagina}</title>
    </Head>
    <div>
      <div>Username: {username}</div>
    </div>
    <Verify {/*Como vemos esta etiqueta <Verify /> es un componente reutilizable */} 
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      onConfirm={logout}
      text={"Estas seguro de cerrar sesion?"}
    />
    <button onClick={() => {
      setIsOpen(true);
    }}>Logout</button>
    {children}
    <h1>Footer</h1>
  </div>
);
```
### /Componentes/Verify.js
```javascript
return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirmación"
    ariaHideApp={false}
    className="modal-dialog"
  >
    <div className="modal-content container ">
      <div className="modal-header">
        <h5 className="modal-title">{text}</h5>
        <button type="button" className="close" onClick={onRequestClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onConfirm}>
          Sí
        </button>
        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
          No
        </button>
      </div>
    </div>
  </Modal>
);
```
### 3.Fetching Data on the Client Side
En este enfoque, se realiza la solicitud a la API directamente desde el cliente (el navegador) utilizando JavaScript, generalmente con la ayuda de la función fetch() o 
mediante librerías como **axios**.
Este estilo se puede implementar dentro de componentes de función utilizando el hook useEffect para realizar la llamada a la API y **actualizar** el **estado** del 
componente con los datos recibidos

### /Componentes/Layout.js
```javascript
const [username, setUsername] = useState(0);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setUsername(res.data.username);
  };
```
### 4. Gestión de Sesiones con Cookies y JWT o "Session Management with Cookies and JWT" en inglés.
# 4.1 Uso de Cookies: El código utiliza la librería cookie para acceder a las cookies enviadas en la solicitud (req.cookies) y también para crear una cookie de logout al establecerla en la respuesta (res.setHeader("Set-Cookie", serialized)). Las cookies se utilizan para almacenar el token de autenticación y para eliminar la cookie al cerrar la sesión.
# 4.2 Uso de JWT (JSON Web Tokens): Se utiliza la función verify de la librería jsonwebtoken para verificar la validez del token de autenticación almacenado en la cookie MyTokenName. Si el token es válido, se procede a eliminar la cookie y cerrar la sesión.
# 4.3 Gestión de Sesiones: La función es responsable de gestionar la sesión del usuario. Si el token de autenticación no está presente o no es válido, se responde con un error (401 - Unauthorized) indicando que no se encuentra un token válido o que el usuario no está autenticado.

### /pages/api/services/login.js

```javascript
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
export default function logoutHandler(req, res) {
  const { MyTokenName } = req.cookies;
  if (!MyTokenName) {
    return res.status(401).json({ err: "No token" });
  }
  try {
    verify(MyTokenName, "secret");
    const serialized = serialize("MyTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json("Logout Succesfully");
  } catch (err) {
    return res.status(401).json({ err: "No token" });
  }
}
```
